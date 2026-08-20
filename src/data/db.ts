import * as duckdb from "@duckdb/duckdb-wasm";
import duckdbWasmEh from "@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url";
import ehWorker from "@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url";
import duckdbWasmMvp from "@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url";
import mvpWorker from "@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url";
import { siteConfig } from "../config/site.config.ts";

type DuckDBInstance = duckdb.AsyncDuckDB;

let initPromise: Promise<DuckDBInstance> | null = null;

async function instantiate(): Promise<DuckDBInstance> {
  const bundles: duckdb.DuckDBBundles = {
    mvp: { mainModule: duckdbWasmMvp, mainWorker: mvpWorker },
    eh: { mainModule: duckdbWasmEh, mainWorker: ehWorker },
  };

  const bundle = await duckdb.selectBundle(bundles);
  if (!bundle.mainWorker) {
    throw new Error("DuckDB worker bundle is missing");
  }

  const worker = new Worker(bundle.mainWorker, { type: "module" });
  const logger = new duckdb.ConsoleLogger(duckdb.LogLevel.WARNING);
  const db = new duckdb.AsyncDuckDB(logger, worker);
  await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
  return db;
}

export async function getDb(): Promise<DuckDBInstance> {
  if (!initPromise) {
    initPromise = instantiate().catch((error: unknown) => {
      initPromise = null;
      throw error;
    });
  }
  return initPromise;
}

export async function withConnection<T>(
  fn: (conn: duckdb.AsyncDuckDBConnection) => Promise<T>,
): Promise<T> {
  const db = await getDb();
  const conn = await db.connect();
  try {
    return await fn(conn);
  } finally {
    await conn.close();
  }
}

export async function ensureSchema(): Promise<void> {
  await withConnection(async (conn) => {
    await conn.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR PRIMARY KEY,
        title VARCHAR NOT NULL,
        summary VARCHAR NOT NULL,
        description VARCHAR NOT NULL,
        status VARCHAR NOT NULL,
        tags VARCHAR NOT NULL,
        featured BOOLEAN NOT NULL,
        year INTEGER NOT NULL,
        links VARCHAR NOT NULL,
        problem VARCHAR NOT NULL,
        approach VARCHAR NOT NULL,
        outcome VARCHAR NOT NULL,
        highlights VARCHAR NOT NULL
      )
    `);
    await conn.query(`
      CREATE TABLE IF NOT EXISTS writing (
        id VARCHAR PRIMARY KEY,
        title VARCHAR NOT NULL,
        summary VARCHAR NOT NULL,
        body VARCHAR NOT NULL,
        published_at VARCHAR NOT NULL,
        tags VARCHAR NOT NULL,
        published BOOLEAN NOT NULL
      )
    `);
    await conn.query(`
      CREATE TABLE IF NOT EXISTS events (
        page_path VARCHAR NOT NULL,
        ts VARCHAR NOT NULL
      )
    `);
  });
}

export function localEventsEnabled(): boolean {
  return siteConfig.localEvents;
}

export function resetDbForTests(): void {
  initPromise = null;
}
