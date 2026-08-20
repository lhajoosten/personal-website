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
}

export const PROJECT_STATUSES: ProjectStatus[] = [
  'active',
  'experimental',
  'archived',
]

export function isProjectStatus(value: string): value is ProjectStatus {
  return PROJECT_STATUSES.includes(value as ProjectStatus)
}
