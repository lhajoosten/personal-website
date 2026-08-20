import { isProjectStatus, type Project } from '../content/types.ts'

export type ProjectRow = {
  id: unknown
  title: unknown
  summary: unknown
  description: unknown
  status: unknown
  tags: unknown
  featured: unknown
  year: unknown
  links: unknown
  problem?: unknown
  approach?: unknown
  outcome?: unknown
  highlights?: unknown
}

export function serializeTags(tags: string[]): string {
  return JSON.stringify(tags)
}

export function serializeLinks(links: Project['links']): string {
  return JSON.stringify(links ?? [])
}

export function parseStringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string')
  }
  if (typeof value !== 'string' || value.length === 0) return []
  try {
    const parsed: unknown = JSON.parse(value)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((item): item is string => typeof item === 'string')
  } catch {
    return []
  }
}

export function parseLinks(value: unknown): Project['links'] {
  if (typeof value !== 'string' || value.length === 0) return undefined
  try {
    const parsed: unknown = JSON.parse(value)
    if (!Array.isArray(parsed)) return undefined
    const links = parsed.filter(
      (item): item is { label: string; href: string } =>
        typeof item === 'object' &&
        item !== null &&
        'label' in item &&
        'href' in item &&
        typeof item.label === 'string' &&
        typeof item.href === 'string',
    )
    return links.length > 0 ? links : undefined
  } catch {
    return undefined
  }
}

function optionalText(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined
  const text = String(value).trim()
  return text.length > 0 ? text : undefined
}

export function mapProjectRow(row: ProjectRow): Project {
  const status = String(row.status)
  if (!isProjectStatus(status)) {
    throw new Error(`Invalid project status: ${status}`)
  }

  const highlights = parseStringList(row.highlights)

  return {
    id: String(row.id),
    title: String(row.title),
    summary: String(row.summary),
    description: String(row.description),
    status,
    tags: parseStringList(row.tags),
    featured: Boolean(row.featured),
    year: Number(row.year),
    links: parseLinks(row.links),
    problem: optionalText(row.problem),
    approach: optionalText(row.approach),
    outcome: optionalText(row.outcome),
    highlights: highlights.length > 0 ? highlights : undefined,
  }
}

/** Tag filter that does not depend on DuckDB JSON helpers — used by SQL LIKE. */
export function tagLikePattern(tag: string): string {
  return `%"${tag}"%`
}
