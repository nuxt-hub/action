import { ofetch } from 'ofetch'
import { CreateDatabaseMigrationsTableQuery, ListDatabaseMigrationsQuery } from 'nuxthub/internal'

export async function queryDatabase(options: {
  hubUrl: string
  projectKey: string
  token: string
  env: string
  query: string
}) {
  return await ofetch(`${options.hubUrl}/api/projects/${options.projectKey}/database/${options.env}/query`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${options.token}`
    },
    body: {
      query: options.query
    }
  }).catch((error) => {
    throw new Error(`Failed to query database: ${error.data?.message || error.message}`)
  })
}

export async function createMigrationsTable(options: {
  hubUrl: string
  projectKey: string
  token: string
  env: string
}) {
  await queryDatabase({ ...options, query: CreateDatabaseMigrationsTableQuery })
}

export async function fetchRemoteMigrations(options: {
  hubUrl: string
  projectKey: string
  token: string
  env: string
}): Promise<{ id: number, name: string, applied_at: string }[]> {
  try {
    const res = (await queryDatabase({ ...options, query: ListDatabaseMigrationsQuery })) as {
      results: { id: number, name: string, applied_at: string }[]
    }[]

    return res[0]?.results ?? []
  }
  catch (error) {
    if (error?.response?._data?.message?.includes('no such table')) {
      return []
    }
    throw error
  }
}
