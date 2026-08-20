import type { WritingPost } from '../content/types.ts'
import { parseStringList, serializeTags } from './project-mapper.ts'

export type WritingRow = {
  id: unknown
  title: unknown
  summary: unknown
  body: unknown
  published_at: unknown
  tags: unknown
  published: unknown
}

export function mapWritingRow(row: WritingRow): WritingPost {
  return {
    id: String(row.id),
    title: String(row.title),
    summary: String(row.summary),
    body: String(row.body),
    publishedAt: String(row.published_at),
    tags: parseStringList(row.tags),
    published: Boolean(row.published),
  }
}

export function serializeWriting(post: Omit<WritingPost, 'published'> & { published?: boolean; draft?: boolean }) {
  const published = post.published ?? post.draft !== true
  return {
    id: post.id,
    title: post.title,
    summary: post.summary,
    body: post.body,
    publishedAt: post.publishedAt,
    tags: serializeTags(post.tags),
    published,
  }
}
