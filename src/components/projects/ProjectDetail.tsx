import { Link } from "react-router-dom";
import { ui } from "../../content/site.ts";
import type { Project } from "../../content/types.ts";
import { useTheme } from "../theme/useTheme.ts";
import { StatusBadge } from "./StatusBadge.tsx";

function Paragraphs({ text }: { text: string }) {
  return text.split(/\n\n+/).map((block) => (
    <p key={block.slice(0, 48)} className="mb-4 leading-relaxed text-muted">
      {block}
    </p>
  ));
}

export function ProjectDetail({
  project,
  related = [],
}: {
  project: Project;
  related?: Project[];
}) {
  const { theme } = useTheme();
  const isBuilder = theme === "builder";
  const hasCase = Boolean(project.problem || project.approach || project.outcome);

  return (
    <article className="max-w-[var(--theme-prose)]">
      <p className="mb-6">
        <Link
          to="/projects"
          className={
            isBuilder
              ? "font-mono text-xs text-accent no-underline hover:underline"
              : "text-sm text-muted no-underline hover:text-ink hover:underline"
          }
        >
          ← {ui.backToProjects}
        </Link>
      </p>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <StatusBadge status={project.status} />
        <span className={isBuilder ? "font-mono text-xs text-muted" : "text-sm text-muted"}>
          {project.year}
        </span>
      </div>

      <h1
        className={
          isBuilder
            ? "mb-4 text-3xl font-semibold tracking-tight sm:text-4xl"
            : "mb-6 font-display text-5xl leading-[1.1]"
        }
      >
        {project.title}
      </h1>
      <p className="mb-8 text-lg text-muted">{project.summary}</p>

      {project.tags.length > 0 ? (
        <ul className="mb-8 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className={
                isBuilder
                  ? "rounded-theme border border-line px-2 py-0.5 font-mono text-[11px] text-muted"
                  : "text-sm text-muted"
              }
            >
              {isBuilder ? tag : `· ${tag}`}
            </li>
          ))}
        </ul>
      ) : null}

      {hasCase ? (
        <dl className={isBuilder ? "mb-10 grid gap-4" : "mb-10 grid gap-8"}>
          {project.problem ? (
            <div
              className={
                isBuilder
                  ? "rounded-theme border border-line bg-panel p-4"
                  : "border-t border-line pt-4"
              }
            >
              <dt
                className={
                  isBuilder ? "mb-1 font-mono text-xs text-accent" : "mb-2 font-display text-2xl"
                }
              >
                {ui.caseProblem}
              </dt>
              <dd className="text-muted">{project.problem}</dd>
            </div>
          ) : null}
          {project.approach ? (
            <div
              className={
                isBuilder
                  ? "rounded-theme border border-line bg-panel p-4"
                  : "border-t border-line pt-4"
              }
            >
              <dt
                className={
                  isBuilder ? "mb-1 font-mono text-xs text-accent" : "mb-2 font-display text-2xl"
                }
              >
                {ui.caseApproach}
              </dt>
              <dd className="text-muted">{project.approach}</dd>
            </div>
          ) : null}
          {project.outcome ? (
            <div
              className={
                isBuilder
                  ? "rounded-theme border border-line bg-panel p-4"
                  : "border-t border-line pt-4"
              }
            >
              <dt
                className={
                  isBuilder ? "mb-1 font-mono text-xs text-accent" : "mb-2 font-display text-2xl"
                }
              >
                {ui.caseOutcome}
              </dt>
              <dd className="text-muted">{project.outcome}</dd>
            </div>
          ) : null}
        </dl>
      ) : (
        <Paragraphs text={project.description} />
      )}

      {!hasCase ? null : <Paragraphs text={project.description} />}

      {project.highlights && project.highlights.length > 0 ? (
        <section className="mt-10">
          <h2
            className={
              isBuilder
                ? "mb-3 font-mono text-xs tracking-widest text-muted uppercase"
                : "mb-4 font-display text-2xl"
            }
          >
            {ui.caseHighlights}
          </h2>
          <ul className={isBuilder ? "grid gap-2" : "grid gap-2"}>
            {project.highlights.map((item) => (
              <li key={item} className="text-muted">
                {isBuilder ? `▸ ${item}` : item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {project.links && project.links.length > 0 ? (
        <ul className="mt-10 flex flex-wrap gap-4">
          {project.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  isBuilder
                    ? "font-mono text-xs text-accent no-underline hover:underline"
                    : "text-accent no-underline hover:underline"
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}

      {related && related.length > 0 ? (
        <section className="mt-12 border-t border-line pt-8">
          <h2
            className={
              isBuilder
                ? "mb-3 font-mono text-xs tracking-widest text-muted uppercase"
                : "mb-4 font-display text-2xl"
            }
          >
            {ui.relatedProjects}
          </h2>
          <ul className="grid gap-2">
            {related.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/projects/${item.id}`}
                  className={
                    isBuilder
                      ? "font-mono text-sm text-accent no-underline hover:underline"
                      : "text-ink no-underline hover:underline"
                  }
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
