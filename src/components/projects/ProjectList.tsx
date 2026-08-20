import type { Project } from '../../content/types.ts'
import { ProjectCard } from './ProjectCard.tsx'
import { useTheme } from '../theme/useTheme.ts'

export function ProjectList({ projects }: { projects: Project[] }) {
  const { theme } = useTheme()

  if (projects.length === 0) {
    return <p className="text-muted">No projects match this filter yet.</p>
  }

  if (theme === 'editorial') {
    return (
      <div>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
