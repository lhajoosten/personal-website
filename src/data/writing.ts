import type { WritingPost } from "../content/types.ts";
import { withConnection } from "./db.ts";
import { initContent } from "./init.ts";
import { mapWritingRow, type WritingRow } from "./writing-mapper.ts";

const SELECT_WRITING = `
  SELECT id, title, summary, body, published_at, tags, published
  FROM writing
`;

function rowsToPosts(table: { toArray: () => WritingRow[] }): WritingPost[] {
  return table.toArray().map(mapWritingRow);
}

export async function listWriting(
  options: { includeDrafts?: boolean } = {},
): Promise<WritingPost[]> {
  await initContent();
  return withConnection(async (conn) => {
    const sql = options.includeDrafts
      ? `${SELECT_WRITING} ORDER BY published_at DESC`
      : `${SELECT_WRITING} WHERE published = true ORDER BY published_at DESC`;
    const table = await conn.query(sql);
    return rowsToPosts(table as unknown as { toArray: () => WritingRow[] });
  });
}

export async function getWritingPost(id: string): Promise<WritingPost | null> {
  await initContent();
  return withConnection(async (conn) => {
    const stmt = await conn.prepare(`${SELECT_WRITING} WHERE id = ? AND published = true`);
    const table = await stmt.query(id);
    await stmt.close();
    const rows = rowsToPosts(table as unknown as { toArray: () => WritingRow[] });
    return rows[0] ?? null;
  });
}
