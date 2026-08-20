import { ui } from "../../content/site.ts";
import type { Project } from "../../content/types.ts";
import { ProjectCard } from "./ProjectCard.tsx";
import { useTheme } from "../theme/useTheme.ts";

export function ProjectList({ projects }: { projects: Project[] }) {
  const { theme } = useTheme();

  if (projects.length === 0) {
    return <p className="text-muted">{ui.noMatches}</p>;
  }

  if (theme === "editorial") {
    return (
      <div className="border-t border-line">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
