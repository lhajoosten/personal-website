import type { Project } from '../../content/types.ts'
import { useTheme } from '../theme/useTheme.ts'

function StatusLabel({ status }: { status: Project['status'] }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-wide text-accent">
      {status}
    </span>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  const { theme } = useTheme()

  if (theme === 'editorial') {
    return (
      <article className="grid gap-2 border-b border-line py-6 sm:grid-cols-[minmax(0,1fr)_2fr_auto] sm:items-baseline sm:gap-8">
        <h3 className="font-display text-2xl font-semibold tracking-tight">
          {project.title}
        </h3>
        <div>
          <p className="text-muted">{project.summary}</p>
          {project.links && project.links.length > 0 ? (
            <p className="mt-2 text-sm">
              {project.links.map((link, index) => (
                <span key={link.href}>
                  {index > 0 ? <span className="text-muted"> · </span> : null}
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent no-underline hover:underline"
                  >
                    {link.label}
                  </a>
                </span>
              ))}
            </p>
          ) : null}
        </div>
        <p className="font-display text-lg text-muted">{project.year}</p>
      </article>
    )
  }

  return (
    <article className="flex h-full flex-col rounded-theme border border-line bg-panel p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <StatusLabel status={project.status} />
        <span className="font-mono text-xs text-muted">{project.year}</span>
      </div>
      <h3 className="mb-2 text-lg font-semibold tracking-tight">{project.title}</h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
      <ul className="mb-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-theme border border-line px-2 py-0.5 font-mono text-[11px] text-muted"
          >
            {tag}
          </li>
        ))}
      </ul>
      {project.links && project.links.length > 0 ? (
        <ul className="flex flex-wrap gap-3">
          {project.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-accent no-underline hover:underline"
              >
                {link.label} ↗
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}
