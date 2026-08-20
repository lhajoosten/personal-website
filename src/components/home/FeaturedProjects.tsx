import { Link } from 'react-router-dom'
import { useFeaturedProjects } from '../../hooks/useProjects.ts'
import { ProjectList } from '../projects/ProjectList.tsx'
import { useTheme } from '../theme/useTheme.ts'

export function FeaturedProjects() {
  const { theme } = useTheme()
  const state = useFeaturedProjects()

  return (
    <section>
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2
          className={
            theme === 'builder'
              ? 'font-mono text-xs tracking-widest text-muted uppercase'
              : 'font-display text-3xl'
          }
        >
          Featured work
        </h2>
        <Link
          to="/projects"
          className={
            theme === 'builder'
              ? 'font-mono text-xs text-accent no-underline hover:underline'
              : 'text-sm text-accent no-underline hover:underline'
          }
        >
          All projects
        </Link>
      </div>

      {state.status === 'loading' ? (
        <p className="text-muted">Loading projects from DuckDB…</p>
      ) : null}
      {state.status === 'error' ? (
        <p role="alert" className="text-accent">
          Could not initialize the local database. {state.message}
        </p>
      ) : null}
      {state.status === 'ready' && state.data.length === 0 ? (
        <p className="text-muted">No featured projects yet.</p>
      ) : null}
      {state.status === 'ready' && state.data.length > 0 ? (
        <ProjectList projects={state.data} />
      ) : null}
    </section>
  )
}
