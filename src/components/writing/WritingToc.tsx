import type { TocItem } from "../../data/writing-read.ts";
import { useTheme } from "../theme/useTheme.ts";

export function WritingToc({ items, heading }: { items: TocItem[]; heading: string }) {
  const { theme } = useTheme();
  if (items.length === 0) return null;

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
              href={`#${item.id}`}
              className={
                theme === "builder"
                  ? "font-mono text-xs text-muted no-underline hover:text-accent"
                  : "text-sm text-muted no-underline hover:text-ink hover:underline"
              }
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
