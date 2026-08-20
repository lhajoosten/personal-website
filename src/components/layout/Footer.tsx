import { siteConfig } from "../../config/site.config.ts";
import { useTheme } from "../theme/useTheme.ts";

export function Footer() {
  const { theme } = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-[var(--theme-max)] flex-col gap-2 px-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {year} {siteConfig.name}
          {" · "}
          <a href="/rss.xml" className="text-muted no-underline hover:text-ink hover:underline">
            RSS
          </a>
        </p>
        <p className={theme === "builder" ? "font-mono text-xs" : "font-display italic"}>
          {siteConfig.tagline}
        </p>
      </div>
    </footer>
  );
}
