import { useEffect, useState } from 'react'
import {
  listProjects,
  type ProjectQuery,
} from '../data/projects.ts'
import type { Project } from '../content/types.ts'

export type LoadState<T> =
  | { status: 'loading' }
  | { status: 'ready'; data: T }
  | { status: 'error'; message: string }

type Snapshot = {
  key: string
  state: LoadState<Project[]>
}

export function useProjects(query: ProjectQuery = {}): LoadState<Project[]> {
  const queryKey = JSON.stringify(query)
  const [snapshot, setSnapshot] = useState<Snapshot>({
    key: queryKey,
    state: { status: 'loading' },
  })

  if (snapshot.key !== queryKey) {
    setSnapshot({ key: queryKey, state: { status: 'loading' } })
  }

  useEffect(() => {
    let cancelled = false
    const parsed = JSON.parse(queryKey) as ProjectQuery

    listProjects(parsed)
      .then((data) => {
        if (!cancelled) setSnapshot({ key: queryKey, state: { status: 'ready', data } })
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setSnapshot({
            key: queryKey,
            state: {
              status: 'error',
              message:
                error instanceof Error ? error.message : 'Failed to load projects',
            },
          })
        }
      })

    return () => {
      cancelled = true
    }
  }, [queryKey])

  return snapshot.key === queryKey ? snapshot.state : { status: 'loading' }
}

export function useFeaturedProjects(): LoadState<Project[]> {
  return useProjects({ featured: true })
}
