import { projects as seedProjects } from '../content/projects.ts'
import type { Project } from '../content/types.ts'
import { ensureSchema, withConnection } from './db.ts'
import {
  mapProjectRow,
  serializeLinks,
  serializeTags,
  tagLikePattern,
  type ProjectRow,
} from './project-mapper.ts'
import type { ProjectStatus } from '../content/types.ts'

export type ProjectQuery = {
  status?: ProjectStatus
  tag?: string
  featured?: boolean
}

const SELECT_PROJECTS = `
  SELECT id, title, summary, description, status, tags, featured, year, links
  FROM projects
`

let readyPromise: Promise<void> | null = null

async function seedIfEmpty(): Promise<void> {
  await withConnection(async (conn) => {
    const countTable = await conn.query('SELECT count(*) AS n FROM projects')
    const countRows = countTable.toArray() as Array<{ n: number | bigint }>
    const n = Number(countRows[0]?.n ?? 0)
    if (n > 0) return

    const stmt = await conn.prepare(`
      INSERT INTO projects
        (id, title, summary, description, status, tags, featured, year, links)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    for (const project of seedProjects) {
      await stmt.query(
        project.id,
        project.title,
        project.summary,
        project.description,
        project.status,
        serializeTags(project.tags),
        project.featured,
        project.year,
        serializeLinks(project.links),
      )
    }

    await stmt.close()
  })
}

export async function initProjects(): Promise<void> {
  if (!readyPromise) {
    readyPromise = (async () => {
      await ensureSchema()
      await seedIfEmpty()
    })().catch((error: unknown) => {
      readyPromise = null
      throw error
    })
  }
  return readyPromise
}

function rowsToProjects(table: { toArray: () => ProjectRow[] }): Project[] {
  return table.toArray().map(mapProjectRow)
}

export async function listProjects(query: ProjectQuery = {}): Promise<Project[]> {
  await initProjects()

  return withConnection(async (conn) => {
    const clauses: string[] = []
    const params: Array<string | boolean> = []

    if (query.status) {
      clauses.push('status = ?')
      params.push(query.status)
    }
    if (query.tag) {
      clauses.push('tags LIKE ?')
      params.push(tagLikePattern(query.tag))
    }
    if (query.featured !== undefined) {
      clauses.push('featured = ?')
      params.push(query.featured)
    }

    const where = clauses.length > 0 ? `WHERE ${clauses.join(' AND ')}` : ''
    const sql = `${SELECT_PROJECTS} ${where} ORDER BY year DESC, title ASC`

    if (params.length === 0) {
      const table = await conn.query(sql)
      return rowsToProjects(table as unknown as { toArray: () => ProjectRow[] })
    }

    const stmt = await conn.prepare(sql)
    const table = await stmt.query(...params)
    await stmt.close()
    return rowsToProjects(table as unknown as { toArray: () => ProjectRow[] })
  })
}

export async function listFeaturedProjects(): Promise<Project[]> {
  return listProjects({ featured: true })
}

export async function listProjectTags(): Promise<string[]> {
  const all = await listProjects()
  return [...new Set(all.flatMap((project) => project.tags))].sort()
}

export function resetProjectsReady(): void {
  readyPromise = null
}
