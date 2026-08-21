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
      {isBuilder ? (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(13rem,0.7fr)] lg:items-end lg:gap-10">
          <div>
            <p className="mb-3 font-mono text-xs tracking-wide text-muted">{siteConfig.role}</p>
            <h1
              id="hero-heading"
              className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl sm:leading-[1.08]"
            >
              {siteConfig.tagline}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{home.leadBuilder}</p>
          </div>
          <div className="border-t border-line pt-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <p className="mb-3 font-mono text-[10px] tracking-widest text-muted uppercase">
              Nav / 00
            </p>
            <nav aria-label="Primary actions" className="flex flex-col gap-2">
              <Link
                to="/projects"
                className="inline-flex min-h-11 items-center rounded-theme border border-accent bg-accent/10 px-4 py-2 font-mono text-xs text-accent no-underline transition-colors hover:bg-accent/20"
              >
                {home.ctaProjectsBuilder}
              </Link>
              <Link
                to="/writing"
                className="inline-flex min-h-11 items-center rounded-theme border border-line px-4 py-2 font-mono text-xs text-muted no-underline transition-colors hover:border-accent/40 hover:text-ink"
              >
                {home.ctaWriting}
              </Link>
              <Link
                to="/about"
                className="inline-flex min-h-11 items-center rounded-theme border border-line px-4 py-2 font-mono text-xs text-muted no-underline transition-colors hover:border-accent/40 hover:text-ink"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="inline-flex min-h-11 items-center rounded-theme border border-line px-4 py-2 font-mono text-xs text-muted no-underline transition-colors hover:border-accent/40 hover:text-ink"
              >
                {home.ctaContact}
              </Link>
            </nav>
          </div>
        </div>
      ) : (
        <>
          <p className="mb-5 text-xs tracking-[0.22em] text-muted uppercase">{siteConfig.role}</p>
          <h1
            id="hero-heading"
            className="font-display text-5xl leading-[1.08] font-semibold tracking-tight sm:text-6xl"
          >
            {siteConfig.tagline}
          </h1>
          <p className="mt-7 text-xl leading-relaxed text-muted">{home.leadEditorial}</p>
          <nav
            aria-label="Primary actions"
            className="mt-10 flex flex-wrap gap-x-4 gap-y-2 text-base"
          >
            <Link to="/projects" className="min-h-11 text-accent no-underline hover:underline">
              {home.ctaProjects}
            </Link>
            <Link
              to="/writing"
              className="min-h-11 text-muted no-underline hover:text-ink hover:underline"
            >
              {home.ctaWriting}
            </Link>
            <Link
              to="/about"
              className="min-h-11 text-muted no-underline hover:text-ink hover:underline"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="min-h-11 text-muted no-underline hover:text-ink hover:underline"
            >
              {home.ctaContact}
            </Link>
          </nav>
        </>
      )}
    </HomeSection>
  );
}
