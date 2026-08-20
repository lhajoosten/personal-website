import { describe, expect, it } from 'vitest'
import { siteConfig } from './site.config.ts'
import { formatCanonicalUrl, formatPageTitle } from './page-meta.ts'

describe('formatPageTitle', () => {
  it('uses the site title on the home page', () => {
    expect(formatPageTitle()).toBe(siteConfig.title)
  })

  it('prefixes inner pages with the page name', () => {
    expect(formatPageTitle('Projects')).toBe(`Projects — ${siteConfig.name}`)
  })
})

describe('formatCanonicalUrl', () => {
  it('joins the site url with a path', () => {
    expect(formatCanonicalUrl('/projects/studdit')).toBe(
      `${siteConfig.url}/projects/studdit`,
    )
  })
})
