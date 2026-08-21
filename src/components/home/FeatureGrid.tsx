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
        <ul className="grid gap-3 sm:grid-cols-2">
          {home.highlights.map((item, index) => (
            <li
              key={item.title}
              className={
                index === 0
                  ? "card-surface rounded-theme border border-accent/35 bg-panel p-5 transition-colors hover:border-accent/50 hover:bg-[var(--theme-panel-hover)] sm:col-span-2 sm:p-6"
                  : "card-surface rounded-theme border border-line bg-panel p-5 transition-colors hover:border-accent/25 hover:bg-[var(--theme-panel-hover)]"
              }
            >
              <p className="mb-2 font-mono text-[10px] tracking-widest text-accent uppercase">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3
                className={
                  index === 0
                    ? "mb-2 text-base font-semibold text-accent sm:text-lg"
                    : "mb-2 text-sm font-semibold text-accent"
                }
              >
                {item.title}
              </h3>
              <p
                className={
                  index === 0
                    ? "max-w-2xl text-sm leading-relaxed text-muted sm:text-base"
                    : "text-sm leading-relaxed text-muted"
                }
              >
                {item.body}
              </p>
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
