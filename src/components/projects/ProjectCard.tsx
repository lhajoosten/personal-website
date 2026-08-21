import { Link } from "react-router-dom";
import type { Project } from "../../content/types.ts";
import { useTheme } from "../theme/useTheme.ts";
import { StatusBadge } from "./StatusBadge.tsx";

export function ProjectCard({ project }: { project: Project }) {
  const { theme } = useTheme();
  const to = `/projects/${project.id}`;

  if (theme === "editorial") {
    return (
      <article className="grid gap-3 border-b-2 border-line py-8 sm:grid-cols-[minmax(12rem,1.1fr)_minmax(0,2fr)_auto] sm:items-start sm:gap-10">
        <h3 className="font-display text-2xl font-semibold tracking-tight">
          <Link to={to} className="text-ink no-underline hover:underline">
            {project.title}
          </Link>
        </h3>
        <div>
          <p className="leading-relaxed text-muted">{project.summary}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <StatusBadge status={project.status} />
            <ul className="flex flex-wrap gap-x-3 text-[12px] text-muted">
              {project.tags.slice(0, 4).map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="font-display text-lg tabular-nums text-muted">{project.year}</p>
      </article>
    );
  }

  return (
    <article className="flex h-full flex-col rounded-theme border border-line bg-panel p-5 transition-colors hover:bg-[var(--theme-panel-hover)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <StatusBadge status={project.status} />
        <span className="font-mono text-[11px] tabular-nums text-muted">{project.year}</span>
      </div>
      <h3 className="mb-2 text-lg font-semibold tracking-tight">
        <Link to={to} className="text-ink no-underline hover:underline">
          {project.title}
        </Link>
      </h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
      <ul className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <li key={tag} className="border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
