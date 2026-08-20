import { useEffect, useMemo, useState } from 'react'
import { ProjectFilters } from '../components/projects/ProjectFilters.tsx'
import { ProjectList } from '../components/projects/ProjectList.tsx'
import { QueryStatus } from '../components/projects/QueryStatus.tsx'
import { PageMeta } from '../components/seo/PageMeta.tsx'
import { useTheme } from '../components/theme/useTheme.ts'
import { listProjectTags } from '../data/projects.ts'
import type { ProjectStatus } from '../content/types.ts'
import { projectsPage, ui } from '../content/site.ts'
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
    void listProjectTags()
      .then(setTags)
      .catch(() => setTags([]))
  }, [])

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
        status={status}
        tag={tag}
        tags={tags}
        onStatusChange={setStatus}
        onTagChange={setTag}
      />
      <QueryStatus state={state} emptyMessage={ui.noMatches}>
        {(projects) => <ProjectList projects={projects} />}
      </QueryStatus>
    </>
  )
}
