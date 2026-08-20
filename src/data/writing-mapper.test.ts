import { describe, expect, it } from 'vitest'
import { mapWritingRow } from './writing-mapper.ts'

describe('mapWritingRow', () => {
  it('maps a published post', () => {
    const post = mapWritingRow({
      id: 'themes-as-configuration',
      title: 'Themes as configuration',
      summary: 'Same content',
      body: 'Longer',
      published_at: '2026-08-20',
      tags: '["Frontend"]',
      published: true,
    })

    expect(post.id).toBe('themes-as-configuration')
    expect(post.publishedAt).toBe('2026-08-20')
    expect(post.published).toBe(true)
    expect(post.tags).toEqual(['Frontend'])
  })
})
