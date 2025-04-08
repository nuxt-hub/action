import { joinURL } from 'ufo'
import { ofetch } from 'ofetch'
import colors from "picocolors"
import prettyBytes from 'pretty-bytes'
import * as core from '@actions/core'
import { getStorage, getPathsToDeploy, getFile, uploadAssetsToCloudflare, uploadWorkersAssetsToCloudflare, isMetaPath, isWorkerMetaPath, isServerPath, isWorkerServerPath, getPublicFiles, getWorkerPublicFiles } from 'nuxthub/internal'
import { createMigrationsTable, fetchRemoteMigrations, queryDatabase } from './database.js'
import { join } from 'node:path'

export async function run() {
  try {
    const projectKeyInput = core.getInput('project-key')
    const directory = core.getInput('directory')
    const hubUrl = core.getInput('hub-url')

    if (projectKeyInput !== undefined) core.debug(`Linked with: \`${projectKeyInput}\``)
    core.debug(`Nuxt output directory: ${directory}`)
    core.debug(`NuxtHub URL: ${hubUrl}`)

    let accessToken = ''
    const $api = ofetch.create({
      baseURL: joinURL(hubUrl, '/api'),
      onRequest({ options }) {
        if (!options.headers.has('Authorization')) {
          options.headers.set('Authorization', `Bearer ${accessToken}`)
        }
      }
    })

    // #region Get CI/CD token
    const audience = projectKeyInput
      ? new URL(`${hubUrl}/projects/${projectKeyInput}`).toString()
      : undefined
    const idToken = await core.getIDToken(audience)
    core.debug(`Got ID token`)
    // #endregion

    // #region Get project info
    core.debug('Retrieving project information...')
    const projectInfo = await $api<{
      accessToken: string
      teamSlug: string
      projectSlug: string
      projectKey: string
      type: 'pages' | 'worker'
      environment: 'production' | 'preview'
    }>(`/ci-cd/token`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }).catch((err) => {
      if (err.data?.statusCode === 404) throw new Error('Project not found')
      core.debug(`Error: ${err.data?.message || err.message}`)
      throw err
    })
    accessToken = projectInfo.accessToken
    const projectKey = projectInfo.projectKey
    core.setSecret(projectInfo.accessToken)
    core.debug(`Retrieved project info ${JSON.stringify(projectInfo)}`)

    core.info(`Deploying ${colors.blueBright(projectInfo.projectSlug)} to ${colors.blueBright(projectInfo.environment)} environment...`)
    // #endregion

    // #region Prepare deployment
    core.debug(`Processing files in ${directory}...`)

    const storage = await getStorage(directory)
    const fileKeys = await storage.getKeys()
    const pathsToDeploy = getPathsToDeploy(fileKeys)
    const config = await storage.getItem('hub.config.json')
    if (!config.nitroPreset && projectInfo.type === 'worker') {
      throw new Error('Please upgrade `@nuxthub/core` to the latest version to deploy to a worker project.')
    }
    const isWorkerPreset = ['cloudflare_module', 'cloudflare_durable', 'cloudflare-module', 'cloudflare-durable'].includes(config.nitroPreset)
    const { format: formatNumber } = new Intl.NumberFormat('en-US')

    const publicFiles = await getPublicFiles(storage, pathsToDeploy)

    core.debug('Preparing deployment...')
    let deploymentInfo
    try {
      let prepareUrl = `/teams/${projectInfo.teamSlug}/projects/${projectInfo.projectSlug}/${projectInfo.environment}/deploy/prepare`
      let publicFiles, publicManifest

      if (isWorkerPreset) {
        // Workers
        prepareUrl = `/teams/${projectInfo.teamSlug}/projects/${projectInfo.projectSlug}/${projectInfo.environment}/deploy/worker/prepare`
        publicFiles = await getWorkerPublicFiles(storage, pathsToDeploy)
        /**
         * {  "/index.html": { hash: "hash", size: 30 }
         */
        publicManifest = publicFiles.reduce((acc, file) => {
          acc[file.path] = {
            hash: file.hash,
            size: file.size
          }
          return acc
        }, {})
      } else {
        // Pages
        publicFiles = await getPublicFiles(storage, pathsToDeploy)
        /**
         * {  "/index.html": "hash" }
         */
        publicManifest = publicFiles.reduce((acc, file) => {
          acc[file.path] = file.hash
          return acc
        }, {})
      }

      // Get deployment info by preparing the deployment
      deploymentInfo = await $api(prepareUrl, {
        method: 'POST',
        body: {
          config,
          publicManifest
        }
      })

    } catch (err) {
      if (err.data) {
        core.debug(JSON.stringify(err.data))
        throw new Error(`Error while preparing deployment: ${JSON.stringify(err.data.data?.issues || err.data.message || err.data.statusMessage || err.data)} - ${err.message}`)
      }
      else {
        throw new Error(`Error while preparing deployment: ${err.message.split(' - ')[1] || err.message}`)
      }
    }

    const { deploymentKey, buckets, cloudflareUploadJwt, accountId } = deploymentInfo
    // missingPublicHash is sent for pages & buckets for worker
      let missingPublicHashes = deploymentInfo.missingPublicHashes || buckets.flat()

    const publicFilesToUpload = publicFiles.filter(file => missingPublicHashes.includes(file.hash))

    core.debug('Uploading assets to Cloudflare...')
    let completionToken
    if (publicFilesToUpload.length) {
      const totalSizeToUpload = publicFilesToUpload.reduce((acc, file) => acc + file.size, 0)
      core.info(`Uploading ${colors.blueBright(formatNumber(publicFilesToUpload.length))} new static assets (${colors.blueBright(prettyBytes(totalSizeToUpload))})...`)

      if (projectInfo.type === 'pages') {
        await uploadAssetsToCloudflare(publicFilesToUpload, cloudflareUploadJwt, ({ progressSize, totalSize }) => {
          const percentage = Math.round((progressSize / totalSize) * 100)
          core.info(`${percentage}% uploaded (${prettyBytes(progressSize)}/${prettyBytes(totalSize)})`)
        })
      } else {
        completionToken = await uploadWorkersAssetsToCloudflare(accountId, publicFilesToUpload, cloudflareUploadJwt, ({ progressSize, totalSize }) => {
          const percentage = Math.round((progressSize / totalSize) * 100)
          core.info(`${percentage}% uploaded (${prettyBytes(progressSize)}/${prettyBytes(totalSize)})`)
        })
      }


      core.info(`${colors.blueBright(formatNumber(publicFilesToUpload.length))} new static assets uploaded (${colors.blueBright(prettyBytes(totalSizeToUpload))})`)
    }

    if (publicFiles.length) {
      const totalSize = publicFiles.reduce((acc, file) => acc + file.size, 0)
      const totalGzipSize = publicFiles.reduce((acc, file) => acc + file.gzipSize, 0)
      core.info(`${colors.blueBright(formatNumber(publicFiles.length))} static assets (${colors.blueBright(prettyBytes(totalSize))} / ${colors.blueBright(prettyBytes(totalGzipSize))} gzip)`)
    }

    const metaFiles = await Promise.all(pathsToDeploy.filter(isWorkerPreset ? isWorkerMetaPath : isMetaPath).map(p => getFile(storage, p, 'base64')))
    let serverFiles = await Promise.all(pathsToDeploy.filter(isWorkerPreset ? isWorkerServerPath : isServerPath).map(p => getFile(storage, p, 'base64')))
    if (isWorkerPreset) {
      serverFiles = serverFiles.map(file => ({
        ...file,
        path: file.path.replace('/server/', '/')
      }))
    }

    const serverFilesSize = serverFiles.reduce((acc, file) => acc + file.size, 0)
    const serverFilesGzipSize = serverFiles.reduce((acc, file) => acc + file.gzipSize, 0)
    core.info(`${colors.blueBright(formatNumber(serverFiles.length))} server files (${colors.blueBright(prettyBytes(serverFilesSize))} / ${colors.blueBright(prettyBytes(serverFilesGzipSize))} gzip)`)
    // #endregion

    // #region Database migrations
    if (!config.database) {
      core.info('Skipping database migrations and queries - database not enabled in config')
    }

    if (config.database) {
      core.info('Processing database migrations...')

      const localMigrations = fileKeys
        .filter(fileKey => fileKey.startsWith('database:migrations:') && fileKey.endsWith('.sql'))
        .map(fileKey => fileKey.replace('database:migrations:', '').replace('.sql', ''))
      if (!localMigrations.length) {
        core.info(`Skipping database migrations - no database migrations found in ${colors.blueBright(`${directory}/database/migrations`)}`)
        core.info('No pending migrations to apply')
      }

      if (localMigrations.length) {
        core.debug('Creating migrations table if non-existent...')
        await createMigrationsTable({
          hubUrl,
          projectKey,
          token: projectInfo.accessToken,
          env: projectInfo.environment,
        })

        core.debug('Fetching remote migrations...')
        const remoteMigrations = await fetchRemoteMigrations({
          hubUrl,
          projectKey,
          token: projectInfo.accessToken,
          env: projectInfo.environment,
        })
        core.info(`Found ${colors.blueBright(remoteMigrations.length)} applied database migration${remoteMigrations.length === 1 ? '' : 's'}`)

        const pendingMigrations = localMigrations.filter(localName => !remoteMigrations.find(({ name }) => name === localName))
        if (!pendingMigrations.length) core.info('No pending migrations to apply')

        for (const queryName of pendingMigrations) {
          let query = await storage.getItem(`database/migrations/${queryName}.sql`)

          if (query.at(-1) !== ';') query += ';'
          query += `INSERT INTO _hub_migrations (name) values ('${queryName}');`

          core.info(`Applying database migration ${colors.blueBright(queryName)}...`)
          core.debug(query)

          try {
            await queryDatabase({
              hubUrl,
              projectKey,
              token: projectInfo.accessToken,
              env: projectInfo.environment,
              query,
            })
            core.info(`Applied database migration ${colors.blueBright(queryName)}`)
          }
          catch (error) {
            const errorMessage = error?.response?._data?.message || error?.message
            core.error(errorMessage as string, {
              file: join('server/database/migrations', `${queryName}.sql`),
              title: 'Database migration failed',
            })
            throw new Error(`Failed to apply database migration ${queryName}: ${errorMessage}`)
          }
        }
        if (pendingMigrations.length) core.info(`${colors.blueBright(formatNumber(localMigrations.length))} database migrations applied`)
      }
      // #endregion

      // #region Database queries
      const localQueries = fileKeys
        .filter(fileKey => fileKey.startsWith('database:queries:') && fileKey.endsWith('.sql'))
        .map(fileKey => fileKey.replace('database:queries:', '').replace('.sql', ''))
      if (!localQueries.length) {
        core.info(`Skipping database queries - no database queries found in ${colors.blueBright(`${directory}/database/queries`)}`)
      }

      if (localQueries.length) {
        core.info(`Applying ${colors.blueBright(formatNumber(localQueries.length))} database ${localQueries.length === 1 ? 'query' : 'queries'}...`)
        for (const queryName of localQueries) {
          const query = await storage.getItem(`database/queries/${queryName}.sql`)

          core.info(`Applying database query ${colors.blueBright(queryName)}...`)
          core.debug(query)

          try {
            await queryDatabase({
              hubUrl,
              projectKey,
              token: projectInfo.accessToken,
              env: projectInfo.environment,
              query
            })
            core.info(`Applied database query ${colors.blueBright(queryName)}`)
          } catch (error) {
            const errorMessage = error?.response?._data?.message || error?.message
            core.error(errorMessage as string, {
              file: join('server/database/queries', `${queryName}.sql`),
              title: 'Database query failed',
            })
            throw new Error(`Failed to apply database query ${queryName}: ${errorMessage}`)
          }

        }
        core.info(`${colors.blueBright(formatNumber(localQueries.length))} database ${localQueries.length === 1 ? 'query' : 'queries'} applied`)
      }
      // #endregion
    }

    // #region Complete deployment
    core.info(`Publishing deployment...`)
    const deployment = await $api(`/teams/${projectInfo.teamSlug}/projects/${projectInfo.projectSlug}/${projectInfo.environment}/deploy/${isWorkerPreset ? 'worker/complete' : 'complete'}`, {
      method: 'POST',
      body: {
        deploymentKey,
        serverFiles,
        metaFiles,
        completionToken
      },
    }).catch((err) => {
      if (err.data) {
        core.debug(JSON.stringify(err.data))
        throw new Error(`Error while publishing deployment: ${JSON.stringify(err.data.data?.issues || err.data.message || err.data.statusMessage || err.data)} - ${err.message}`)
      }
      else {
        throw new Error(`Error while publishing deployment: ${err.message.split(' - ')[1] || err.message}`)
      }
    })

    core.debug(`Deployment details ${JSON.stringify(deployment)}`)

    // Set outputs
    core.setOutput('deployment-url', deployment.primaryUrl)
    core.setOutput('branch-url', deployment.branchUrl)
    core.setOutput('environment', projectInfo.environment)
    core.info(`Deployed to ${projectInfo.environment}: ${deployment.url ?? deployment.primaryUrl}`)
    // #endregion
  }
  catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
