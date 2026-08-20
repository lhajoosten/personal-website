import { Link } from "react-router-dom";
import { about } from "../../content/about.ts";
import { home } from "../../content/site.ts";
import { useTheme } from "../theme/useTheme.ts";

export function AboutPreview() {
  const { theme } = useTheme();
  const isBuilder = theme === "builder";

  return (
    <section aria-labelledby="about-preview-heading" className={isBuilder ? "mb-12" : "mb-20"}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <h2
          id="about-preview-heading"
          className={
            isBuilder
              ? "font-mono text-xs tracking-widest text-muted uppercase"
              : "font-display text-3xl"
          }
        >
          {home.aboutPreviewHeading}
        </h2>
        <Link
          to="/about"
          className={
            isBuilder
              ? "font-mono text-xs text-accent no-underline hover:underline"
              : "text-sm text-accent no-underline hover:underline"
          }
        >
          {home.aboutPreviewLink}
        </Link>
      </div>

      <div
        className={
          isBuilder
            ? "rounded-theme border border-line bg-panel p-6 sm:p-8"
            : "max-w-[var(--theme-prose)] border-t border-line pt-8"
        }
      >
        <p className="text-lg leading-relaxed text-muted">{about.intro[0]}</p>
        <ul
          className={`mt-6 grid gap-4 ${isBuilder ? "sm:grid-cols-3" : "sm:grid-cols-3 sm:gap-8"}`}
        >
          {about.vision.map((item, index) => (
            <li key={item.title}>
              <p
                className={
                  isBuilder
                    ? "mb-2 font-mono text-[11px] tracking-widest text-accent uppercase"
                    : "mb-3 font-display text-3xl text-muted"
                }
              >
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mb-2 font-semibold">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
