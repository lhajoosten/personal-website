import { siteConfig } from "../config/site.config.ts";
import { projects as seedProjects } from "../content/projects.ts";
import { writingPosts as seedWriting } from "../content/writing.ts";
import { ensureSchema, withConnection } from "./db.ts";
import { shouldReseed } from "./persist.ts";
import { serializeLinks, serializeTags } from "./project-mapper.ts";
import { serializeWriting } from "./writing-mapper.ts";

let readyPromise: Promise<void> | null = null;

type QueryConn = {
  query: (sql: string) => Promise<{ toArray: () => Array<Record<string, unknown>> }>;
  prepare: (sql: string) => Promise<{
    query: (...args: unknown[]) => Promise<unknown>;
    close: () => Promise<void>;
  }>;
};

async function countRows(conn: QueryConn, table: "projects" | "writing"): Promise<number> {
  const result = await conn.query(`SELECT count(*) AS n FROM ${table}`);
  const rows = result.toArray() as Array<{ n: number | bigint }>;
  return Number(rows[0]?.n ?? 0);
}

async function storedRevision(conn: QueryConn): Promise<number | null> {
  const result = await conn.query(`SELECT value FROM meta WHERE key = 'contentRevision'`);
  const rows = result.toArray() as Array<{ value: string }>;
  const raw = rows[0]?.value;
  if (raw === undefined) return null;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

async function writeRevision(conn: QueryConn, revision: number): Promise<void> {
  await conn.query(`DELETE FROM meta WHERE key = 'contentRevision'`);
  await conn.query(
    `INSERT INTO meta (key, value) VALUES ('contentRevision', '${String(revision)}')`,
  );
}

async function insertProjects(conn: QueryConn): Promise<void> {
  const stmt = await conn.prepare(`
        INSERT INTO projects
          (id, title, summary, description, status, tags, featured, year, links, problem, approach, outcome, highlights)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
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
      project.problem ?? "",
      project.approach ?? "",
      project.outcome ?? "",
      serializeTags(project.highlights ?? []),
    );
  }
  await stmt.close();
}

async function insertWriting(conn: QueryConn): Promise<void> {
  const stmt = await conn.prepare(`
        INSERT INTO writing
          (id, title, summary, body, published_at, tags, published)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
  for (const post of seedWriting) {
    const row = serializeWriting(post);
    await stmt.query(
      row.id,
      row.title,
      row.summary,
      row.body,
      row.publishedAt,
      row.tags,
      row.published,
    );
  }
  await stmt.close();
}

async function seedIfNeeded(): Promise<void> {
  await withConnection(async (conn) => {
    let projectCount = await countRows(conn, "projects");
    let writingCount = await countRows(conn, "writing");
    const stored = await storedRevision(conn);
    const reseed = shouldReseed({
      empty: projectCount === 0 && writingCount === 0,
      storedRevision: stored,
      contentRevision: siteConfig.contentRevision,
    });

    if (reseed && (projectCount > 0 || writingCount > 0)) {
      await conn.query("DELETE FROM projects");
      await conn.query("DELETE FROM writing");
      projectCount = 0;
      writingCount = 0;
    }

    if (projectCount === 0) await insertProjects(conn);
    if (writingCount === 0) await insertWriting(conn);
    if (reseed || stored === null) await writeRevision(conn, siteConfig.contentRevision);
  });
}

export async function initContent(): Promise<void> {
  if (!readyPromise) {
    readyPromise = (async () => {
      await ensureSchema();
      await seedIfNeeded();
    })().catch((error: unknown) => {
      readyPromise = null;
      throw error;
    });
  }
  return readyPromise;
}

export function resetContentReady(): void {
  readyPromise = null;
}
