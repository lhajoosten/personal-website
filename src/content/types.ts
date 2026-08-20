export type ProjectStatus = 'active' | 'experimental' | 'archived'

export type ProjectLink = {
  label: string
  href: string
}

export type Project = {
  id: string
  title: string
  summary: string
  description: string
  status: ProjectStatus
  tags: string[]
  featured: boolean
  year: number
  links?: ProjectLink[]
  problem?: string
  approach?: string
  outcome?: string
  highlights?: string[]
}

export type WritingPost = {
  id: string
  title: string
  summary: string
  body: string
  publishedAt: string
  tags: string[]
  published: boolean
  draft?: boolean
}

export const PROJECT_STATUSES: ProjectStatus[] = [
  'active',
  'experimental',
  'archived',
]

export const PROJECT_SORTS = ['year', 'title', 'status'] as const

export type ProjectSort = (typeof PROJECT_SORTS)[number]

export function isProjectStatus(value: string): value is ProjectStatus {
  return PROJECT_STATUSES.includes(value as ProjectStatus)
}

export function isProjectSort(value: string): value is ProjectSort {
  return PROJECT_SORTS.includes(value as ProjectSort)
}
