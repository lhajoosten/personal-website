import { siteConfig } from './site.config.ts'

export function formatPageTitle(page?: string): string {
  if (!page) return siteConfig.title
  return `${page} — ${siteConfig.name}`
}
