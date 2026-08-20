import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProjectFilters } from '../components/projects/ProjectFilters.tsx'
import { ProjectList } from '../components/projects/ProjectList.tsx'
import { QueryStatus } from '../components/projects/QueryStatus.tsx'
import { PageMeta } from '../components/seo/PageMeta.tsx'
import { useTheme } from '../components/theme/useTheme.ts'
import { listProjectTags } from '../data/projects.ts'
import {
  parseProjectListState,
  serializeProjectListState,
} from '../data/project-query.ts'
import type { ProjectSort, ProjectStatus } from '../content/types.ts'
import { projectsPage, ui } from '../content/site.ts'
import { useProjects } from '../hooks/useProjects.ts'

export function ProjectsPage() {
  const { theme } = useTheme()
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = useMemo(
    () => parseProjectListState(searchParams),
    [searchParams],
  )
  const [tags, setTags] = useState<string[]>([])

  const query = useMemo(
    () => ({
      status: filters.status === 'all' ? undefined : filters.status,
      tag: filters.tag === 'all' ? undefined : filters.tag,
      sort: filters.sort,
    }),
    [filters],
  )

  const state = useProjects(query)

  useEffect(() => {
    void listProjectTags()
      .then(setTags)
      .catch(() => setTags([]))
  }, [])

  function update(next: Partial<typeof filters>) {
    setSearchParams(serializeProjectListState({ ...filters, ...next }), {
      replace: true,
    })
  }

  return (
    <>
      <PageMeta title={projectsPage.heading} description={projectsPage.intro} />
      <h1
        className={
          theme === 'builder'
            ? 'mb-2 font-mono text-sm text-accent'
            : 'mb-4 font-display text-5xl'
        }
      >
        {projectsPage.heading}
      </h1>
      <p className="mb-8 max-w-[var(--theme-prose)] text-muted">{projectsPage.intro}</p>
      <ProjectFilters
        status={filters.status}
        tag={filters.tag}
        sort={filters.sort}
        tags={tags}
        resultCount={state.status === 'ready' ? state.data.length : undefined}
        onStatusChange={(status: ProjectStatus | 'all') => update({ status })}
        onTagChange={(tag) => update({ tag })}
        onSortChange={(sort: ProjectSort) => update({ sort })}
        onClear={() =>
          setSearchParams(new URLSearchParams(), { replace: true })
        }
      />
      <QueryStatus state={state} emptyMessage={ui.noMatches}>
        {(projects) => <ProjectList projects={projects} />}
      </QueryStatus>
    </>
  )
}
