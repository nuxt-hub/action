import * as core from '@actions/core'
import * as glob from '@actions/glob'
import * as httpClient from '@actions/http-client'
import * as fs from 'fs/promises'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const { default: mime } = await import('mime')

    const projectKey = core.getInput('project-key')
    const directory = core.getInput('directory')
    const hubUrl = core.getInput('hub-url')

    if (projectKey) core.debug(`Linked with: ${projectKey}`)
    core.debug(`Using Nuxt output directory: ${directory}`)
    core.debug(`Using Hub URL: ${hubUrl}`)

    // Get CICD token
    const audience = projectKey
      ? new URL(`${hubUrl}/projects/${projectKey}`).toString()
      : undefined
    const idToken = await core.getIDToken(audience)

    // Get project info
    const http = new httpClient.HttpClient('nuxt-hub-action')
    const projectInfoResponse = await http.getJson<{
      accessToken: string
      teamSlug: string
      projectSlug: string
    }>(`${hubUrl}/api/cicd/token`, {
      authorization: `Bearer ${idToken}`
    })
    if (!projectInfoResponse.result) {
      throw new Error('Project not found')
    }
    const projectInfo = projectInfoResponse.result!

    core.setSecret(projectInfo.accessToken)

    // Validate directory
    try {
      await fs.access(directory)
    } catch {
      throw new Error(`Directory ${directory} does not exist`)
    }

    // Glob files
    const globber = await glob.create(`${directory}/**/*`, {
      implicitDescendants: false
    })
    const files = await globber.glob()

    // Process files for deployment
    const fileKeys = files.map(file => {
      return file.substring(directory.length + 1)
    })

    // Filter files to deploy
    const filesToDeploy = fileKeys.filter(fileKey => {
      if (fileKey.startsWith('.wrangler/')) return false
      if (fileKey.startsWith('node_modules/')) return false
      if (fileKey.startsWith('database/migrations/')) return false
      if (fileKey === 'wrangler.toml') return false
      if (fileKey === '.dev.vars') return false
      return true
    })

    // Validate hub.config.json existence
    if (!filesToDeploy.includes('hub.config.json')) {
      throw new Error(
        `${directory}/hub.config.json is missing, please make sure that @nuxthub/core is enabled in your nuxt.config.ts.`
      )
    }

    // Create deployment file array
    const deployFiles = await Promise.all(
      filesToDeploy.map(async fileKey => {
        const filepath = `${directory}/${fileKey}`
        const content = await fs.readFile(filepath)
        return {
          path: fileKey,
          key: Buffer.from(filepath).toString('base64'),
          value: content.toString('base64'),
          base64: true,
          metadata: {
            contentType: mime.getType(filepath) || 'application/octet-stream'
          }
        }
      })
    )

    const deployment = await http.postJson<{
      url: string
      primaryUrl: string
    }>(
      `${hubUrl}/teams/${projectInfo.teamSlug}/projects/${projectInfo.projectSlug}/deploy`,
      { files: deployFiles },
      { authorization: `Bearer ${projectInfo.accessToken}` }
    )

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
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
