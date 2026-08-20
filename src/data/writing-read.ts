export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type BodyBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string; id: string };

const HEADING_RE = /^(#{2,3})\s+(.+)$/;

export function slugHeading(text: string): string {
  const slug = text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
  return slug.length > 0 ? slug : "section";
}

export function uniqueSlug(text: string, used: Map<string, number>): string {
  const base = slugHeading(text);
  const count = used.get(base) ?? 0;
  used.set(base, count + 1);
  return count === 0 ? base : `${base}-${count + 1}`;
}

export function parseToc(body: string): TocItem[] {
  const used = new Map<string, number>();
  const items: TocItem[] = [];
  for (const line of body.split(/\n/)) {
    const match = line.trim().match(HEADING_RE);
    if (!match) continue;
    const marks = match[1] ?? "";
    const text = (match[2] ?? "").trim();
    if (marks.length !== 2 && marks.length !== 3) continue;
    const level = marks.length as 2 | 3;
    items.push({ id: uniqueSlug(text, used), text, level });
  }
  return items;
}

export function parseBodyBlocks(body: string): BodyBlock[] {
  const used = new Map<string, number>();
  const chunks = body.split(/\n\n+/);
  const blocks: BodyBlock[] = [];

  for (const chunk of chunks) {
    const trimmed = chunk.trim();
    if (!trimmed) continue;
    const lines = trimmed.split(/\n/);
    const headingMatch = lines[0]?.trim().match(HEADING_RE);
    if (headingMatch && lines.length === 1) {
      const marks = headingMatch[1] ?? "";
      const text = (headingMatch[2] ?? "").trim();
      if (marks.length === 2 || marks.length === 3) {
        blocks.push({
          type: "heading",
          level: marks.length as 2 | 3,
          text,
          id: uniqueSlug(text, used),
        });
        continue;
      }
    }
    blocks.push({ type: "paragraph", text: trimmed });
  }

  return blocks;
}

export function estimateReadMinutes(text: string, wordsPerMinute = 220): number {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return 0;
  return Math.max(1, Math.ceil(words.length / wordsPerMinute));
}
