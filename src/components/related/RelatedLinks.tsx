import { Link } from "react-router-dom";
import { useTheme } from "../theme/useTheme.ts";

export type RelatedLinkItem = {
  id: string;
  title: string;
  to: string;
};

export function RelatedLinks({ heading, items }: { heading: string; items: RelatedLinkItem[] }) {
  const { theme } = useTheme();
  if (items.length === 0) return null;

  return (
    <section className="mt-12 border-t border-line pt-8">
      <h2
        className={
          theme === "builder"
            ? "mb-3 font-mono text-xs tracking-widest text-muted uppercase"
            : "mb-4 font-display text-2xl"
        }
      >
        {heading}
      </h2>
      <ul className={theme === "builder" ? "grid gap-2" : "grid gap-3"}>
        {items.map((item) => (
          <li key={item.id}>
            <Link
              to={item.to}
              className={
                theme === "builder"
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
  );
}
