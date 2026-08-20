import { home } from "../../content/site.ts";
import { useTheme } from "../theme/useTheme.ts";

export function FeatureGrid() {
  const { theme } = useTheme();

  if (theme === "editorial") {
    return (
      <section aria-labelledby="focus-heading" className="mb-20">
        <h2 id="focus-heading" className="mb-10 font-display text-3xl">
          {home.highlightsHeadingEditorial}
        </h2>
        <ol className="grid gap-10 sm:grid-cols-3">
          {home.highlights.map((item, index) => (
            <li key={item.title} className="border-t border-line pt-4">
              <p className="mb-3 font-display text-4xl text-muted" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
              <p className="leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section aria-labelledby="highlights-heading" className="mb-12">
      <h2
        id="highlights-heading"
        className="mb-4 font-mono text-xs tracking-widest text-muted uppercase"
      >
        {home.highlightsHeadingBuilder}
      </h2>
      <ul className="grid gap-3 sm:grid-cols-3">
        {home.highlights.map((item) => (
          <li
            key={item.title}
            className="rounded-theme border border-line bg-panel p-4 transition-colors hover:border-accent/25 hover:bg-[var(--theme-panel-hover)]"
          >
            <h3 className="mb-2 text-sm font-semibold text-accent">{item.title}</h3>
            <p className="text-sm leading-relaxed text-muted">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
