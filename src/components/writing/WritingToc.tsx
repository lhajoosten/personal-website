import type { MouseEvent } from "react";
import type { TocItem } from "../../data/writing-read.ts";
import { useTheme } from "../theme/useTheme.ts";

export function WritingToc({
  items,
  heading,
  pathname,
}: {
  items: TocItem[];
  heading: string;
  pathname: string;
}) {
  const { theme } = useTheme();
  if (items.length === 0) return null;

  function goTo(id: string, event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const node = document.getElementById(id);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", `${pathname}#${id}`);
  }

  return (
    <nav aria-label={heading} className={theme === "editorial" ? "mb-10" : "mb-8"}>
      <p
        className={
          theme === "builder"
            ? "mb-2 font-mono text-xs tracking-widest text-muted uppercase"
            : "mb-3 font-display text-xl"
        }
      >
        {heading}
      </p>
      <ol className="grid gap-1.5">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-3" : undefined}>
            <a
              href={`${pathname}#${item.id}`}
              className={
                theme === "builder"
                  ? "font-mono text-xs text-muted no-underline hover:text-accent"
                  : "text-sm text-muted no-underline hover:text-ink hover:underline"
              }
              onClick={(event) => goTo(item.id, event)}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
