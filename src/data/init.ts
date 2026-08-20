import { projects as seedProjects } from '../content/projects.ts'
import { writingPosts as seedWriting } from '../content/writing.ts'
import { ensureSchema, withConnection } from './db.ts'
import {
  serializeLinks,
  serializeTags,
} from './project-mapper.ts'
import { serializeWriting } from './writing-mapper.ts'

let readyPromise: Promise<void> | null = null

async function seedIfEmpty(): Promise<void> {
  await withConnection(async (conn) => {
    const projectCount = await conn.query('SELECT count(*) AS n FROM projects')
    const projectRows = projectCount.toArray() as Array<{ n: number | bigint }>
    if (Number(projectRows[0]?.n ?? 0) === 0) {
      const stmt = await conn.prepare(`
        INSERT INTO projects
          (id, title, summary, description, status, tags, featured, year, links, problem, approach, outcome, highlights)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
          project.problem ?? '',
          project.approach ?? '',
          project.outcome ?? '',
          serializeTags(project.highlights ?? []),
        )
      }
      await stmt.close()
    }

    const writingCount = await conn.query('SELECT count(*) AS n FROM writing')
    const writingRows = writingCount.toArray() as Array<{ n: number | bigint }>
    if (Number(writingRows[0]?.n ?? 0) === 0) {
      const stmt = await conn.prepare(`
        INSERT INTO writing
          (id, title, summary, body, published_at, tags, published)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `)
      for (const post of seedWriting) {
        const row = serializeWriting(post)
        await stmt.query(
          row.id,
          row.title,
          row.summary,
          row.body,
          row.publishedAt,
          row.tags,
          row.published,
        )
      }
      await stmt.close()
    }
  })
}

export async function initContent(): Promise<void> {
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

export function resetContentReady(): void {
  readyPromise = null
}
