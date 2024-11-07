import * as core from '@actions/core'
import * as glob from '@actions/glob'
import * as httpClient from '@actions/http-client'
import { hash as blake3hash } from 'blake3-wasm'
import { access, stat, readFile, readdir } from 'node:fs/promises'
import { extname, join } from 'node:path'
import {
  createMigrationsTable,
  fetchRemoteMigrations,
  queryDatabase
} from './database'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const { default: mime } = await import('mime')

    const projectKeyInput = core.getInput('project-key')
    const directory = core.getInput('directory')
    const hubUrl = core.getInput('hub-url')

    const MAX_ASSET_SIZE = 25 * 1024 * 1024

    if (projectKeyInput) core.debug(`Linked with: ${projectKeyInput}`)
    core.debug(`Nuxt output directory: ${directory}`)
    core.debug(`NuxtHub URL: ${hubUrl}`)

    // Get CI/CD token
    const audience = projectKeyInput
      ? new URL(`${hubUrl}/projects/${projectKeyInput}`).toString()
      : undefined
    const idToken = await core.getIDToken(audience)

    core.debug(`Got ID token`)

    // Get project info
    const http = new httpClient.HttpClient('nuxt-hub-action')
    const projectInfoResponse = await http.getJson<{
      accessToken: string
      teamSlug: string
      projectSlug: string
      projectKey: string
      environment: 'production' | 'preview'
    }>(`${hubUrl}/api/cicd/token`, {
      authorization: `Bearer ${idToken}`
    })
    if (!projectInfoResponse.result || projectInfoResponse.statusCode !== 200) {
      throw new Error('Project not found')
    }
    const projectInfo = projectInfoResponse.result
    const projectKey = projectInfo.projectKey
    core.setSecret(projectInfo.accessToken)
    core.debug(`Retrieved project info ${JSON.stringify(projectInfo)}`)

    core.info(
      `Deploying ${projectInfo.projectSlug} to ${projectInfo.environment} environment...`
    )

    // Validate directory
    try {
      await access(directory)
    } catch {
      throw new Error(`Directory ${directory} does not exist`)
    }

    // Get files
    const globber = await glob.create(`${directory}/**/*`, {
      implicitDescendants: false
    })
    const files = await globber.glob().then(async files => {
      const fileStats = await Promise.all(files.map(async file => stat(file)))
      return files.filter((file, index) => fileStats[index].isFile())
    })

    const fileKeys = files.map(file => {
      const relativePath = file.replace(`${process.cwd()}/`, '')
      return relativePath.substring(directory.length + 1)
    })

    const filesToDeploy = fileKeys.filter(fileKey => {
      if (fileKey.startsWith('.wrangler/')) return false
      if (fileKey.startsWith('node_modules/')) return false
      if (fileKey.startsWith('database/migrations/')) return false
      if (fileKey === 'wrangler.toml') return false
      if (fileKey === '.dev.vars') return false
      return true
    })

    core.debug(`Files to deploy ${JSON.stringify(filesToDeploy)}`)

    if (!filesToDeploy.includes('hub.config.json')) {
      throw new Error(
        `${directory}/hub.config.json is missing, please make sure that @nuxthub/core is enabled in your nuxt.config.ts.`
      )
    }

    // Prepare files for deployment
    const deployFiles = await Promise.all(
      filesToDeploy.map(async fileKey => {
        const filePath = `${process.cwd()}/${directory}/${fileKey}`
        const fileSize = (await stat(filePath)).size
        const content = await readFile(filePath)
        const contentBase64 = content.toString('base64')

        if (fileSize > MAX_ASSET_SIZE) {
          throw new Error(
            `NuxtHub deploy only supports files up to ${MAX_ASSET_SIZE} in size. ${filePath} is ${fileSize} in size.`
          )
        }

        return {
          path: `/${fileKey}`,
          key: hashFile(filePath, contentBase64),
          value: contentBase64,
          base64: true,
          metadata: {
            contentType: mime.getType(filePath) || 'application/octet-stream'
          }
        }
      })
    )

    // Deploy
    const deployment = await http.postJson<{
      url: string
      primaryUrl: string
    }>(
      `${hubUrl}/api/teams/${projectInfo.teamSlug}/projects/${projectInfo.projectSlug}/deploy`,
      { files: deployFiles },
      { authorization: `Bearer ${projectInfo.accessToken}` }
    )

    core.debug(`Deployment details ${JSON.stringify(deployment.result)}`)

    if (!deployment.result || deployment.statusCode !== 200) {
      const result = deployment.result as any

      if (result?.data?.name === 'ZodError') {
        throw new Error(JSON.stringify(result.data.issues))
      } else if (result?.message?.includes('Error: ')) {
        throw new Error(result.message.split('Error: ')[1])
      } else if (result?.message) {
        throw new Error(result.message.split(' - ')[1] || result.message)
      }

      throw new Error('Deployment failed')
    }

    // Set outputs
    core.setOutput('deployment-url', deployment.result.url)
    core.setOutput('primary-deployment-url', deployment.result.primaryUrl)
    core.setOutput('environment', projectInfo.environment)
    core.info(
      `Deployed to ${projectInfo.environment}: ${deployment.result.url ?? deployment.result.primaryUrl}`
    )

    // Apply migrations
    const hubConfigPath = join(process.cwd(), directory, 'hub.config.json')
    const hubConfig = JSON.parse(await readFile(hubConfigPath, 'utf-8')) as {
      database?: boolean
    }

    // debug log if database not enabled
    if (!hubConfig.database) {
      core.debug(
        'Skipping database migrations - database not enabled in config'
      )
    }

    if (hubConfig.database) {
      core.info('Processing database migrations...')

      const deployEnv = projectInfo.environment
      const migrationsDir = join(process.cwd(), 'server/database/migrations')

      await createMigrationsTable({
        hubUrl,
        projectKey,
        accessToken: projectInfo.accessToken,
        env: deployEnv
      })

      const remoteMigrations = await fetchRemoteMigrations({
        hubUrl,
        projectKey,
        accessToken: projectInfo.accessToken,
        env: deployEnv
      })
      core.info(`Found ${remoteMigrations.length} existing migrations`)

      const localMigrations = (await readdir(migrationsDir))
        .filter(file => file.endsWith('.sql'))
        .map(file => file.replace('.sql', ''))

      const pendingMigrations = localMigrations.filter(
        localName => !remoteMigrations.find(({ name }) => name === localName)
      )

      if (!pendingMigrations.length) {
        core.info('No pending migrations to apply')
      }

      for (const migration of pendingMigrations) {
        core.info(`Applying migration ${migration}...`)

        let query = await readFile(
          join(migrationsDir, `${migration}.sql`),
          'utf-8'
        )

        if (query.at(-1) !== ';') query += ';'
        query += `INSERT INTO _hub_migrations (name) values ('${migration}');`

        try {
          await queryDatabase({
            hubUrl,
            projectKey,
            accessToken: projectInfo.accessToken,
            env: deployEnv,
            query
          })
          core.info(`Successfully applied migration ${migration}`)
        } catch (error: any) {
          const errorMessage = error?.response?._data?.message || error?.message
          // Add GitHub error annotation to the migration file
          core.error(errorMessage as string, {
            file: join('server/database/migrations', `${migration}.sql`),
            title: 'Migration failed'
          })
          throw new Error(
            `Failed to apply migration ${migration}: ${errorMessage}`
          )
        }
      }
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

export function hashFile(filepath: string, base64: string) {
  const extension = extname(filepath).substring(1)

  return blake3hash(base64 + extension)
    .toString('hex')
    .slice(0, 32)
}
