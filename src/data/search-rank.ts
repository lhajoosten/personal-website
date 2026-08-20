export type SearchableProject = {
  id: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
};

export type SearchableWriting = {
  id: string;
  title: string;
  summary: string;
  body: string;
  tags: string[];
  published: boolean;
};

export type SearchHit<T> = {
  item: T;
  score: number;
};

export function tokenizeQuery(query: string): string[] {
  return query
    .toLowerCase()
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 0);
}

export function escapeLikeTerm(term: string): string {
  return term.replaceAll("\\", "\\\\").replaceAll("%", "\\%").replaceAll("_", "\\_");
}

function fieldScore(haystack: string, tokens: string[], weight: number): number {
  const lower = haystack.toLowerCase();
  let score = 0;
  for (const token of tokens) {
    if (lower.includes(token)) score += weight;
  }
  return score;
}

export function scoreProject(project: SearchableProject, tokens: string[]): number {
  if (tokens.length === 0) return 0;
  const tags = project.tags.join(" ");
  return (
    fieldScore(project.title, tokens, 100) +
    fieldScore(project.summary, tokens, 40) +
    fieldScore(tags, tokens, 40) +
    fieldScore(project.description, tokens, 10)
  );
}

export function scoreWriting(post: SearchableWriting, tokens: string[]): number {
  if (tokens.length === 0) return 0;
  const tags = post.tags.join(" ");
  return (
    fieldScore(post.title, tokens, 100) +
    fieldScore(post.summary, tokens, 40) +
    fieldScore(tags, tokens, 40) +
    fieldScore(post.body, tokens, 10)
  );
}

export function rankHits<T>(hits: SearchHit<T>[]): T[] {
  return [...hits]
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((hit) => hit.item);
}

export function matchesAllTokens(haystack: string, tokens: string[]): boolean {
  const lower = haystack.toLowerCase();
  return tokens.every((token) => lower.includes(token));
}

export function projectHaystack(project: SearchableProject): string {
  return `${project.title} ${project.summary} ${project.description} ${project.tags.join(" ")}`;
}

export function writingHaystack(post: SearchableWriting): string {
  return `${post.title} ${post.summary} ${post.body} ${post.tags.join(" ")}`;
}
