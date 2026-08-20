import type { WritingPost } from "./types.ts";

const WRITING_LAYOUTS = ["essay", "brief", "log"] as const;
export type WritingLayout = (typeof WRITING_LAYOUTS)[number];

function isWritingLayout(value: string): value is WritingLayout {
  return (WRITING_LAYOUTS as readonly string[]).includes(value);
}

function stemFromPath(sourcePath: string): string {
  const base = sourcePath.replaceAll("\\", "/").split("/").pop() ?? sourcePath;
  return base.replace(/\.md$/i, "");
}

function unquote(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseTags(value: string): string[] {
  const trimmed = value.trim();
  if (trimmed.startsWith("[")) {
    const parsed: unknown = JSON.parse(trimmed.replaceAll("'", '"'));
    if (!Array.isArray(parsed)) throw new Error("tags must be an array");
    return parsed.map((item) => String(item));
  }
  if (trimmed.length === 0) return [];
  return trimmed
    .split(",")
    .map((item) => unquote(item))
    .filter(Boolean);
}

function parseFrontmatter(block: string): Record<string, string> {
  const fields: Record<string, string> = {};
  for (const line of block.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;
    const colon = trimmed.indexOf(":");
    if (colon <= 0) continue;
    const key = trimmed.slice(0, colon).trim();
    const value = trimmed.slice(colon + 1).trim();
    fields[key] = value;
  }
  return fields;
}

export function parseWritingMarkdown(raw: string, sourcePath: string): WritingPost {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    throw new Error(`Writing markdown must start with YAML frontmatter: ${sourcePath}`);
  }
  const fields = parseFrontmatter(match[1] ?? "");
  const body = (match[2] ?? "").trim();
  const title = fields.title ? unquote(fields.title) : "";
  if (!title) throw new Error(`Writing post is missing title (${sourcePath})`);
  const summary = fields.summary ? unquote(fields.summary) : "";
  if (!summary) throw new Error(`Writing post is missing summary (${sourcePath})`);
  const publishedAt = fields.publishedAt ? unquote(fields.publishedAt) : "";
  if (!publishedAt) throw new Error(`Writing post is missing publishedAt (${sourcePath})`);

  const publishedRaw = fields.published ? unquote(fields.published).toLowerCase() : "true";
  const published = publishedRaw !== "false";
  const id = fields.id ? unquote(fields.id) : stemFromPath(sourcePath);
  const layoutRaw = fields.layout ? unquote(fields.layout) : undefined;
  const layout = layoutRaw && isWritingLayout(layoutRaw) ? layoutRaw : undefined;

  return {
    id,
    title,
    summary,
    body,
    publishedAt,
    tags: parseTags(fields.tags ?? ""),
    published,
    ...(layout ? { layout } : {}),
  };
}

export function loadWritingPosts(files: Record<string, string>): WritingPost[] {
  const posts = Object.entries(files).map(([path, raw]) => parseWritingMarkdown(raw, path));
  const ids = new Set<string>();
  for (const post of posts) {
    if (ids.has(post.id)) throw new Error(`Duplicate writing id: ${post.id}`);
    ids.add(post.id);
  }
  return posts.sort(
    (a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.id.localeCompare(b.id),
  );
}
