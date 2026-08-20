import type { Project, WritingPost } from "../content/types.ts";
import { withConnection } from "./db.ts";
import { initContent } from "./init.ts";
import { mapProjectRow, type ProjectRow } from "./project-mapper.ts";
import {
  escapeLikeTerm,
  rankHits,
  scoreProject,
  scoreWriting,
  tokenizeQuery,
} from "./search-rank.ts";
import { mapWritingRow, type WritingRow } from "./writing-mapper.ts";

export type ContentSearchResult = {
  projects: Project[];
  writing: WritingPost[];
};

const PROJECT_SQL = `
  SELECT id, title, summary, description, status, tags, featured, year, links,
         problem, approach, outcome, highlights
  FROM projects
`;

const WRITING_SQL = `
  SELECT id, title, summary, body, published_at, tags, published
  FROM writing
  WHERE published = true
`;

function likeClauses(columnExpr: string, tokenCount: number): string {
  return Array.from({ length: tokenCount }, () => `lower(${columnExpr}) LIKE ? ESCAPE '\\'`).join(
    " AND ",
  );
}

function likeParams(tokens: string[]): string[] {
  return tokens.map((token) => `%${escapeLikeTerm(token).toLowerCase()}%`);
}

export async function searchContent(query: string): Promise<ContentSearchResult> {
  const tokens = tokenizeQuery(query);
  if (tokens.length === 0) {
    return { projects: [], writing: [] };
  }

  await initContent();

  const projectHaystack = "concat_ws(' ', title, summary, description, tags)";
  const writingHaystack = "concat_ws(' ', title, summary, body, tags)";
  const projectParams = likeParams(tokens);
  const writingParams = likeParams(tokens);

  return withConnection(async (conn) => {
    const projectStmt = await conn.prepare(
      `${PROJECT_SQL} WHERE ${likeClauses(projectHaystack, tokens.length)}`,
    );
    const projectTable = await projectStmt.query(...projectParams);
    await projectStmt.close();
    const projectRows = (projectTable.toArray() as ProjectRow[]).map(mapProjectRow);

    const writingStmt = await conn.prepare(
      `${WRITING_SQL} AND ${likeClauses(writingHaystack, tokens.length)}`,
    );
    const writingTable = await writingStmt.query(...writingParams);
    await writingStmt.close();
    const writingRows = (writingTable.toArray() as WritingRow[]).map(mapWritingRow);

    return {
      projects: rankHits(projectRows.map((item) => ({ item, score: scoreProject(item, tokens) }))),
      writing: rankHits(writingRows.map((item) => ({ item, score: scoreWriting(item, tokens) }))),
    };
  });
}
