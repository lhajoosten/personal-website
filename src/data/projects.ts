import type { Project, ProjectSort, ProjectStatus } from "../content/types.ts";
import { initContent } from "./init.ts";
import { mapProjectRow, tagLikePattern, type ProjectRow } from "./project-mapper.ts";
import { withConnection } from "./db.ts";

export type ProjectQuery = {
  status?: ProjectStatus;
  tag?: string;
  featured?: boolean;
  sort?: ProjectSort;
};

const SELECT_PROJECTS = `
  SELECT id, title, summary, description, status, tags, featured, year, links,
         problem, approach, outcome, highlights
  FROM projects
`;

function orderSql(sort: ProjectSort = "year"): string {
  if (sort === "title") return "ORDER BY title ASC";
  if (sort === "status") return "ORDER BY status ASC, year DESC";
  return "ORDER BY year DESC, title ASC";
}

function rowsToProjects(table: { toArray: () => ProjectRow[] }): Project[] {
  return table.toArray().map(mapProjectRow);
}

export async function listProjects(query: ProjectQuery = {}): Promise<Project[]> {
  await initContent();

  return withConnection(async (conn) => {
    const clauses: string[] = [];
    const params: Array<string | boolean> = [];

    if (query.status) {
      clauses.push("status = ?");
      params.push(query.status);
    }
    if (query.tag) {
      clauses.push("tags LIKE ?");
      params.push(tagLikePattern(query.tag));
    }
    if (query.featured !== undefined) {
      clauses.push("featured = ?");
      params.push(query.featured);
    }

    const where = clauses.length > 0 ? `WHERE ${clauses.join(" AND ")}` : "";
    const sql = `${SELECT_PROJECTS} ${where} ${orderSql(query.sort)}`;

    if (params.length === 0) {
      const table = await conn.query(sql);
      return rowsToProjects(table as unknown as { toArray: () => ProjectRow[] });
    }

    const stmt = await conn.prepare(sql);
    const table = await stmt.query(...params);
    await stmt.close();
    return rowsToProjects(table as unknown as { toArray: () => ProjectRow[] });
  });
}

export async function getProject(id: string): Promise<Project | null> {
  await initContent();
  return withConnection(async (conn) => {
    const stmt = await conn.prepare(`${SELECT_PROJECTS} WHERE id = ?`);
    const table = await stmt.query(id);
    await stmt.close();
    const rows = rowsToProjects(table as unknown as { toArray: () => ProjectRow[] });
    return rows[0] ?? null;
  });
}

export async function listFeaturedProjects(): Promise<Project[]> {
  return listProjects({ featured: true });
}

export async function listProjectTags(): Promise<string[]> {
  const all = await listProjects();
  return [...new Set(all.flatMap((project) => project.tags))].sort();
}
