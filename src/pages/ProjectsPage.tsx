import { useEffect, useMemo, useState } from 'react'
import { ProjectFilters } from '../components/projects/ProjectFilters.tsx'
import { ProjectList } from '../components/projects/ProjectList.tsx'
import { useTheme } from '../components/theme/useTheme.ts'
import { listProjectTags } from '../data/projects.ts'
import type { ProjectStatus } from '../content/types.ts'
import { useProjects } from '../hooks/useProjects.ts'

export function ProjectsPage() {
  const { theme } = useTheme()
  const [status, setStatus] = useState<ProjectStatus | 'all'>('all')
  const [tag, setTag] = useState<string | 'all'>('all')
  const [tags, setTags] = useState<string[]>([])

  const query = useMemo(
    () => ({
      status: status === 'all' ? undefined : status,
      tag: tag === 'all' ? undefined : tag,
    }),
    [status, tag],
  )

  const state = useProjects(query)

  useEffect(() => {
    void listProjectTags().then(setTags).catch(() => setTags([]))
  }, [])

  return (
    <>
      <h1
        className={
          theme === 'builder'
            ? 'mb-2 font-mono text-sm text-accent'
            : 'mb-3 font-display text-5xl'
        }
      >
        Projects
      </h1>
      <p className="mb-8 max-w-2xl text-muted">
        Selected work across products, data, and AI-assisted engineering.
      </p>
      <ProjectFilters
        status={status}
        tag={tag}
        tags={tags}
        onStatusChange={setStatus}
        onTagChange={setTag}
      />
      {state.status === 'loading' ? (
        <p className="text-muted">Loading…</p>
      ) : null}
      {state.status === 'error' ? (
        <p role="alert" className="text-accent">
          {state.message}
        </p>
      ) : null}
      {state.status === 'ready' ? <ProjectList projects={state.data} /> : null}
    </>
  )
}
