import * as httpClient from '@actions/http-client'

export async function queryDatabase(options: {
  hubUrl: string
  projectKey: string
  accessToken: string
  env: string
  query: string
}) {
  const http = new httpClient.HttpClient('nuxt-hub-action')
  const response = await http.postJson(
    `${options.hubUrl}/api/projects/${options.projectKey}/database/${options.env}/query`,
    { query: options.query },
    { authorization: `Bearer ${options.accessToken}` }
  )
  if (response.statusCode !== 200) {
    throw new Error(
      `Failed to query database: HTTP ${response.statusCode} ${response.result}`
    )
  }
  return response.result
}

const CreateMigrationsTableQuery = `CREATE TABLE IF NOT EXISTS _hub_migrations (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT UNIQUE,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);`

export async function createMigrationsTable(options: {
  hubUrl: string
  projectKey: string
  accessToken: string
  env: string
}) {
  await queryDatabase({ ...options, query: CreateMigrationsTableQuery })
}

export async function fetchRemoteMigrations(options: {
  hubUrl: string
  projectKey: string
  accessToken: string
  env: string
}): Promise<{ id: number; name: string; applied_at: string }[]> {
  const query =
    'select "id", "name", "applied_at" from "_hub_migrations" order by "_hub_migrations"."id"'
  try {
    const res = (await queryDatabase({ ...options, query })) as {
      results: { id: number; name: string; applied_at: string }[]
    }[]

    return res[0]?.results ?? []
  } catch (error: any) {
    if (error?.response?._data?.message?.includes('no such table')) {
      return []
    }
    throw error
  }
}
