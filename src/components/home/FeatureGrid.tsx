import { home } from "../../content/site.ts";
import { useTheme } from "../theme/useTheme.ts";
import { HomeSection } from "./HomeSection.tsx";

export function FeatureGrid() {
  const { theme } = useTheme();
  const isBuilder = theme === "builder";

  return (
    <HomeSection tone="focus" aria-labelledby={isBuilder ? "highlights-heading" : "focus-heading"}>
      <h2
        id={isBuilder ? "highlights-heading" : "focus-heading"}
        className={
          isBuilder
            ? "mb-4 font-mono text-xs tracking-widest text-muted uppercase"
            : "mb-10 font-display text-3xl"
        }
      >
        {isBuilder ? home.highlightsHeadingBuilder : home.highlightsHeadingEditorial}
      </h2>
      {isBuilder ? (
        <ul className="grid gap-3 sm:grid-cols-3">
          {home.highlights.map((item) => (
            <li
              key={item.title}
              className="rounded-theme border border-line/80 bg-[color-mix(in_srgb,var(--theme-panel)_88%,transparent)] p-4 backdrop-blur-sm transition-colors hover:border-accent/25 hover:bg-[var(--theme-panel-hover)]"
            >
              <h3 className="mb-2 text-sm font-semibold text-accent">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <ol className="grid gap-10 sm:grid-cols-3">
          {home.highlights.map((item, index) => (
            <li key={item.title} className="border-t border-line/80 pt-4">
              <p className="mb-3 font-display text-4xl text-muted" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
              <p className="leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      )}
    </HomeSection>
  );
}
