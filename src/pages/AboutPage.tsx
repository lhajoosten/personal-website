import { about } from "../content/about.ts";
import { ExperienceTimeline } from "../components/about/ExperienceTimeline.tsx";
import { JsonLdScript } from "../components/seo/JsonLd.tsx";
import { PageMeta } from "../components/seo/PageMeta.tsx";
import { siteConfig } from "../config/site.config.ts";
import { experience, experienceHeading, experienceIntro } from "../content/experience.ts";
import { useTheme } from "../components/theme/useTheme.ts";
import { personJsonLd } from "../seo/json-ld.ts";

export function AboutPage() {
  const { theme } = useTheme();
  const isBuilder = theme === "builder";

  return (
    <article className="max-w-[var(--theme-max)]">
      <PageMeta title={about.heading} description={about.intro[0] ?? about.heading} />
      <JsonLdScript
        data={personJsonLd({
          name: siteConfig.name,
          url: siteConfig.url,
          jobTitle: siteConfig.role,
          sameAs: [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.website],
        })}
      />
      <header
        className={
          isBuilder ? "mb-8 max-w-[var(--theme-prose)]" : "mb-12 max-w-[var(--theme-prose)]"
        }
      >
        <h1
          className={
            isBuilder
              ? "mb-6 font-mono text-sm text-accent"
              : "mb-8 font-display text-5xl tracking-tight"
          }
        >
          {about.heading}
        </h1>
        {about.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="mb-4 text-lg leading-relaxed text-muted">
            {paragraph}
          </p>
        ))}
      </header>

      <section
        aria-labelledby="crowe-heading"
        className={
          isBuilder
            ? "mb-12 rounded-theme border border-line bg-panel p-6 sm:p-8"
            : "mb-16 max-w-[var(--theme-prose)] border-t border-line pt-10"
        }
      >
        <h2
          id="crowe-heading"
          className={
            isBuilder
              ? "mb-4 font-mono text-xs tracking-widest text-muted uppercase"
              : "mb-6 font-display text-3xl"
          }
        >
          {about.croweHeading}
        </h2>
        {about.crowe.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="mb-4 leading-relaxed text-muted last:mb-0">
            {paragraph}
          </p>
        ))}
      </section>

      <section aria-labelledby="vision-heading" className={isBuilder ? "mb-12" : "mb-16"}>
        <h2
          id="vision-heading"
          className={
            isBuilder
              ? "mb-6 font-mono text-xs tracking-widest text-muted uppercase"
              : "mb-8 font-display text-3xl"
          }
        >
          {about.visionHeading}
        </h2>
        <ul className={`grid gap-4 ${isBuilder ? "sm:grid-cols-3" : "gap-8 sm:grid-cols-3"}`}>
          {about.vision.map((item, index) => (
            <li
              key={item.title}
              className={
                isBuilder
                  ? "rounded-theme border border-line bg-panel p-5"
                  : "border-t border-line pt-4"
              }
            >
              <p
                className={
                  isBuilder
                    ? "mb-2 font-mono text-[11px] tracking-widest text-accent uppercase"
                    : "mb-3 font-display text-4xl text-muted"
                }
              >
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mb-2 font-semibold">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <div id="experience" className={isBuilder ? "mb-12 scroll-mt-8" : "mb-16 scroll-mt-10"}>
        <ExperienceTimeline
          entries={experience}
          heading={experienceHeading}
          intro={experienceIntro}
        />
      </div>

      <section aria-labelledby="stack-heading" className={isBuilder ? "mb-12" : "mb-16"}>
        <h2
          id="stack-heading"
          className={
            isBuilder
              ? "mb-4 font-mono text-xs tracking-widest text-muted uppercase"
              : "mb-6 font-display text-3xl"
          }
        >
          {about.stackHeading}
        </h2>
        <ul
          className={
            isBuilder ? "grid gap-3 sm:grid-cols-3" : "grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          }
        >
          {about.stack.map((group) => (
            <li
              key={group.label}
              className={
                isBuilder
                  ? "rounded-theme border border-line bg-panel p-4"
                  : "border-t border-line pt-4"
              }
            >
              <h3 className="mb-2 font-semibold">{group.label}</h3>
              <p className="text-sm text-muted">{group.items.join(" · ")}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="path-heading">
        <h2
          id="path-heading"
          className={
            isBuilder
              ? "mb-4 font-mono text-xs tracking-widest text-muted uppercase"
              : "mb-6 font-display text-3xl"
          }
        >
          {about.pathHeading}
        </h2>
        <ol className="grid gap-6">
          {about.learningPath.map((item) => (
            <li
              key={item.title}
              className={
                isBuilder
                  ? "rounded-theme border border-line bg-panel p-5"
                  : "border-t border-line pt-4"
              }
            >
              <h3
                className={
                  isBuilder ? "mb-1 font-mono text-sm text-accent" : "mb-1 font-display text-2xl"
                }
              >
                {item.title}
              </h3>
              <p className="text-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
