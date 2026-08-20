import { Link } from "react-router-dom";
import { PageMeta } from "../components/seo/PageMeta.tsx";
import { notFound } from "../content/site.ts";
import { useTheme } from "../components/theme/useTheme.ts";

export function NotFoundPage() {
  const { theme } = useTheme();

  return (
    <section className="max-w-[var(--theme-prose)]">
      <PageMeta title={notFound.heading} description={notFound.body} />
      <h1
        className={
          theme === "builder" ? "mb-3 font-mono text-sm text-accent" : "mb-4 font-display text-5xl"
        }
      >
        {notFound.heading}
      </h1>
      <p className="mb-6 text-muted">{notFound.body}</p>
      <p className="flex flex-wrap gap-4">
        <Link
          to="/"
          className={
            theme === "builder"
              ? "font-mono text-xs text-accent no-underline hover:underline"
              : "text-accent no-underline hover:underline"
          }
        >
          {notFound.home}
        </Link>
        <Link
          to="/projects"
          className={
            theme === "builder"
              ? "font-mono text-xs text-muted no-underline hover:text-accent"
              : "text-muted no-underline hover:underline"
          }
        >
          {notFound.projects}
        </Link>
      </p>
    </section>
  );
}
