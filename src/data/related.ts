type Tagged = {
  id: string;
  tags: string[];
};

function overlapCount(a: string[], b: string[]): number {
  const other = new Set(b.map((tag) => tag.toLowerCase()));
  return a.filter((tag) => other.has(tag.toLowerCase())).length;
}

export function selectRelatedByTags<T extends Tagged>(
  current: Tagged,
  candidates: T[],
  limit = 3,
): T[] {
  return candidates
    .filter((item) => item.id !== current.id)
    .map((item) => ({ item, score: overlapCount(current.tags, item.tags) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.item.id.localeCompare(b.item.id);
    })
    .slice(0, limit)
    .map((entry) => entry.item);
}
