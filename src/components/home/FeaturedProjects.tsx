import { Link } from "react-router-dom";
import { home, ui } from "../../content/site.ts";
import { useFeaturedProjects } from "../../hooks/useProjects.ts";
import { ProjectList } from "../projects/ProjectList.tsx";
import { QueryStatus } from "../projects/QueryStatus.tsx";
import { useTheme } from "../theme/useTheme.ts";
import { HomeSection } from "./HomeSection.tsx";

export function FeaturedProjects() {
  const { theme } = useTheme();
  const state = useFeaturedProjects();
  const isBuilder = theme === "builder";

  return (
    <HomeSection tone="projects" aria-labelledby="featured-heading">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2
          id="featured-heading"
          className={
            isBuilder
              ? "font-mono text-xs tracking-widest text-muted uppercase"
              : "font-display text-3xl"
          }
        >
          {home.featuredHeading}
        </h2>
        <div className="flex flex-wrap items-baseline gap-3">
          <Link
            to="/writing"
            className={
              isBuilder
                ? "font-mono text-xs text-muted no-underline hover:text-accent"
                : "text-sm text-muted no-underline hover:underline"
            }
          >
            {home.allWriting}
          </Link>
          <Link
            to="/projects"
            className={
              isBuilder
                ? "font-mono text-xs text-accent no-underline hover:underline"
                : "text-sm text-accent no-underline hover:underline"
            }
          >
            {home.allProjects}
          </Link>
        </div>
      </div>

      <QueryStatus state={state} emptyMessage={ui.noFeatured}>
        {(projects) => <ProjectList projects={projects} />}
      </QueryStatus>
    </HomeSection>
  );
}
