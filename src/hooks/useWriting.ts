import { useCallback } from 'react'
import { getWritingPost, listWriting } from '../data/writing.ts'
import type { WritingPost } from '../content/types.ts'
import { useAsync, type LoadState } from './useAsync.ts'

export function useWriting(): LoadState<WritingPost[]> {
  const loader = useCallback(() => listWriting(), [])
  return useAsync('writing', loader)
}

export function useWritingPost(id: string): LoadState<WritingPost | null> {
  const loader = useCallback(() => getWritingPost(id), [id])
  return useAsync(`writing:${id}`, loader)
}
