import { Link } from 'react-router-dom'
import type { Project } from '../../content/types.ts'
import { useTheme } from '../theme/useTheme.ts'
import { StatusBadge } from './StatusBadge.tsx'

export function ProjectCard({ project }: { project: Project }) {
  const { theme } = useTheme()
  const to = `/projects/${project.id}`

  if (theme === 'editorial') {
    return (
      <article className="grid gap-2 border-b border-line py-7 sm:grid-cols-[minmax(11rem,1fr)_minmax(0,2fr)_auto] sm:items-baseline sm:gap-10">
        <h3 className="font-display text-2xl font-semibold tracking-tight">
          <Link to={to} className="text-ink no-underline hover:underline">
            {project.title}
          </Link>
        </h3>
        <div>
          <p className="leading-relaxed text-muted">{project.summary}</p>
          <p className="mt-2">
            <StatusBadge status={project.status} />
          </p>
        </div>
        <p className="font-display text-lg tabular-nums text-muted">{project.year}</p>
      </article>
    )
  }

  return (
    <article className="flex h-full flex-col rounded-theme border border-line bg-panel p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <StatusBadge status={project.status} />
        <span className="font-mono text-xs text-muted">{project.year}</span>
      </div>
      <h3 className="mb-2 text-lg font-semibold tracking-tight">
        <Link to={to} className="text-ink no-underline hover:text-accent">
          {project.title}
        </Link>
      </h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
      <ul className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-theme border border-line px-2 py-0.5 font-mono text-[11px] text-muted"
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  )
}
