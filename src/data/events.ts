import { localEventsEnabled, withConnection } from "./db.ts";
import { initContent } from "./init.ts";

export async function logPageView(pagePath: string): Promise<void> {
  if (!localEventsEnabled()) return;
  await initContent();
  await withConnection(async (conn) => {
    const stmt = await conn.prepare("INSERT INTO events (page_path, ts) VALUES (?, ?)");
    await stmt.query(pagePath, new Date().toISOString());
    await stmt.close();
  });
}
