import { Link } from "react-router-dom";
import { home } from "../../content/site.ts";
import { siteConfig } from "../../config/site.config.ts";
import { useTheme } from "../theme/useTheme.ts";
import { HomeSection } from "./HomeSection.tsx";

export function Hero() {
  const { theme } = useTheme();
  const isBuilder = theme === "builder";

  return (
    <HomeSection
      tone="hero"
      aria-labelledby="hero-heading"
      surfaceClassName={isBuilder ? "sm:p-8" : ""}
    >
      <p
        className={
          isBuilder
            ? "mb-3 font-mono text-xs tracking-wide text-accent"
            : "mb-5 text-xs tracking-[0.22em] text-muted uppercase"
        }
      >
        {siteConfig.role}
      </p>
      <h1
        id="hero-heading"
        className={
          isBuilder
            ? "max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl sm:leading-[1.08]"
            : "font-display text-5xl leading-[1.08] font-semibold tracking-tight sm:text-6xl"
        }
      >
        {siteConfig.tagline}
      </h1>
      <p
        className={
          isBuilder
            ? "mt-4 max-w-2xl text-lg leading-relaxed text-muted"
            : "mt-7 text-xl leading-relaxed text-muted"
        }
      >
        {isBuilder ? home.leadBuilder : home.leadEditorial}
      </p>
      <nav
        aria-label="Primary actions"
        className={
          isBuilder ? "mt-7 flex flex-wrap gap-3" : "mt-10 flex flex-wrap gap-x-4 gap-y-2 text-base"
        }
      >
        <Link
          to="/projects"
          className={
            isBuilder
              ? "inline-flex min-h-11 items-center rounded-theme border border-accent bg-accent/10 px-4 py-2 font-mono text-xs text-accent no-underline transition-colors hover:bg-accent/20"
              : "min-h-11 text-accent no-underline hover:underline"
          }
        >
          {isBuilder ? home.ctaProjectsBuilder : home.ctaProjects}
        </Link>
        <Link
          to="/writing"
          className={
            isBuilder
              ? "inline-flex min-h-11 items-center rounded-theme border border-line px-4 py-2 font-mono text-xs text-muted no-underline transition-colors hover:border-accent/40 hover:text-ink"
              : "min-h-11 text-muted no-underline hover:text-ink hover:underline"
          }
        >
          {home.ctaWriting}
        </Link>
        <Link
          to="/about"
          className={
            isBuilder
              ? "inline-flex min-h-11 items-center rounded-theme border border-line px-4 py-2 font-mono text-xs text-muted no-underline transition-colors hover:border-accent/40 hover:text-ink"
              : "min-h-11 text-muted no-underline hover:text-ink hover:underline"
          }
        >
          About
        </Link>
        <Link
          to="/contact"
          className={
            isBuilder
              ? "inline-flex min-h-11 items-center rounded-theme border border-line px-4 py-2 font-mono text-xs text-muted no-underline transition-colors hover:border-accent/40 hover:text-ink"
              : "min-h-11 text-muted no-underline hover:text-ink hover:underline"
          }
        >
          {home.ctaContact}
        </Link>
      </nav>
    </HomeSection>
  );
}
