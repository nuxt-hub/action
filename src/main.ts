import { joinURL } from 'ufo'
import { ofetch } from 'ofetch'
import colors from "picocolors"
import prettyBytes from 'pretty-bytes'
import * as core from '@actions/core'
import { getStorage, getPathsToDeploy, getFile, uploadAssetsToCloudflare, isMetaPath, isServerPath, getPublicFiles } from 'nuxthub/internal'
import { createMigrationsTable, fetchRemoteMigrations, queryDatabase } from './database.js'
import { join } from 'node:path'

export async function run() {
  try {
    const projectKeyInput = core.getInput('project-key')
    const directory = core.getInput('directory')
    const hubUrl = core.getInput('hub-url')

    if (projectKeyInput) core.debug(`Linked with: ${projectKeyInput}`)
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
      environment: 'production' | 'preview'
    }>(`/ci-cd/token`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }).catch((err) => {
      if (err.data?.statusCode === 404) throw new Error('Project not found')
      core.debug(`Error: ${err.message}`)
      throw err
    })
    accessToken = projectInfo.accessToken
    const projectKey = projectInfo.projectKey
    core.setSecret(projectInfo.accessToken)
    core.debug(`Retrieved project info ${JSON.stringify(projectInfo)}`)

    core.info(`Deploying ${colors.blueBright(projectInfo.projectSlug)} to ${colors.blueBright(projectInfo.environment)} environment...`)
    // #endregion

    // #region Deploy
    core.debug(`Processing files in ${directory}...`)

    const storage = await getStorage(directory)
    const fileKeys = await storage.getKeys()
    const pathsToDeploy = getPathsToDeploy(fileKeys)
    const config = await storage.getItem('hub.config.json')
    const { format: formatNumber } = new Intl.NumberFormat('en-US')

    try {
      const publicFiles = await getPublicFiles(storage, pathsToDeploy)

      core.debug('Preparing deployment...')
      const deploymentInfo = await $api(`/teams/${projectInfo.teamSlug}/projects/${projectInfo.projectSlug}/${projectInfo.environment}/deploy/prepare`, {
        method: 'POST',
        body: {
          config,
          /**
           * Public manifest is a map of file paths to their unique hash (SHA256 sliced to 32 characters).
           * @example
           * {
           *   "/index.html": "hash",
           *   "/assets/image.png": "hash"
           * }
           */
          publicManifest: publicFiles.reduce((acc, file) => {
            acc[file.path] = file.hash
            return acc
          }, {})
        }
      })
      const { deploymentKey, missingPublicHashes, cloudflareUploadJwt } = deploymentInfo
      const publicFilesToUpload = publicFiles.filter(file => missingPublicHashes.includes(file.hash))

      core.debug('Uploading assets to Cloudflare...')
      if (publicFilesToUpload.length) {
        const totalSizeToUpload = publicFilesToUpload.reduce((acc, file) => acc + file.size, 0)
        core.debug(`Uploading ${colors.blueBright(formatNumber(publicFilesToUpload.length))} new static assets (${colors.blueBright(prettyBytes(totalSizeToUpload))})...`)
        await uploadAssetsToCloudflare(publicFilesToUpload, cloudflareUploadJwt, ({ progressSize, totalSize }) => {
          const percentage = Math.round((progressSize / totalSize) * 100)
          core.debug(`${percentage}% uploaded (${prettyBytes(progressSize)}/${prettyBytes(totalSize)})`)
        })
        core.info(`${colors.blueBright(formatNumber(publicFilesToUpload.length))} new static assets uploaded (${colors.blueBright(prettyBytes(totalSizeToUpload))})`)
      }

      if (publicFiles.length) {
        const totalSize = publicFiles.reduce((acc, file) => acc + file.size, 0)
        const totalGzipSize = publicFiles.reduce((acc, file) => acc + file.gzipSize, 0)
        core.info(`${colors.blueBright(formatNumber(publicFiles.length))} static assets (${colors.blueBright(prettyBytes(totalSize))} / ${colors.blueBright(prettyBytes(totalGzipSize))} gzip)`)
      }

      const metaFiles = await Promise.all(pathsToDeploy.filter(isMetaPath).map(p => getFile(storage, p, 'base64')))
      const serverFiles = await Promise.all(pathsToDeploy.filter(isServerPath).map(p => getFile(storage, p, 'base64')))
      const serverFilesSize = serverFiles.reduce((acc, file) => acc + file.size, 0)
      const serverFilesGzipSize = serverFiles.reduce((acc, file) => acc + file.gzipSize, 0)
      core.info(`${colors.blueBright(formatNumber(serverFiles.length))} server files (${colors.blueBright(prettyBytes(serverFilesSize))} / ${colors.blueBright(prettyBytes(serverFilesGzipSize))} gzip)`)
      const deployment = await $api(`/teams/${projectInfo.teamSlug}/projects/${projectInfo.projectSlug}/${projectInfo.environment}/deploy/complete`, {
        method: 'POST',
        body: {
          deploymentKey,
          serverFiles,
          metaFiles
        },
      })

      core.debug(`Deployment details ${JSON.stringify(deployment)}`)

      // Set outputs
      core.setOutput('deployment-url', deployment.primaryUrl)
      core.setOutput('branch-url', deployment.branchUrl)
      core.setOutput('environment', projectInfo.environment)
      core.info(`Deployed to ${projectInfo.environment}: ${deployment.url ?? deployment.primaryUrl}`)
    } catch (err) {
      if (err.data?.data?.name === 'ZodError') {
        throw new Error(err.data.data.issues)
      }
      else if (err.message.includes('Error: ')) {
        throw new Error(err.message.split('Error: ')[1])
      } else {
        throw new Error(err.message.split(' - ')[1] || err.message)
      }
    }
    // #endregion

    // #region Database migrations
    if (!config.database) {
      core.debug('Skipping database migrations - database not enabled in config')
    }

    if (config.database) {
      core.info('Processing database migrations...')

      const localMigrations = fileKeys
        .filter(fileKey => fileKey.startsWith('database:migrations:') && fileKey.endsWith('.sql'))
        .map(fileKey => fileKey.replace('database:migrations:', '').replace('.sql', ''))
      if (!localMigrations.length) {
        core.info('No pending migrations to apply')
        core.debug(`No database migrations found in ${colors.blueBright(`${directory}/database/migrations`)}`)
        return
      }

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
      if (!pendingMigrations.length) {
        core.info('No pending migrations to apply')
        return
      }

      for (const queryName of pendingMigrations) {
        let query = await storage.getItem(`database/migrations/${queryName}.sql`)

        if (query.at(-1) !== ';') query += ';'
        query += `INSERT INTO _hub_migrations (name) values ('${queryName}');`

        core.debug(`Applying database migration ${colors.blueBright(queryName)}...`)
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

      core.info(`${colors.blueBright(formatNumber(localMigrations.length))} database migrations applied`)
    }
    // #endregion
  }
  catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
