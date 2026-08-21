import { Link } from "react-router-dom";
import { siteConfig } from "../../config/site.config.ts";
import { ui } from "../../content/site.ts";
import { useTheme } from "../theme/useTheme.ts";
import { BrandMark } from "./BrandMark.tsx";
import { PrimaryNavLinks } from "./PrimaryNavLinks.tsx";
import { GitHubIcon, LinkedInIcon, MailIcon } from "../icons/BrandIcons.tsx";

const connectLinks = [
  { label: "GitHub", href: siteConfig.links.github, detail: "lhajoosten", icon: GitHubIcon },
  { label: "LinkedIn", href: siteConfig.links.linkedin, detail: "lhajoosten", icon: LinkedInIcon },
  {
    label: "Email",
    href: `mailto:${siteConfig.links.email}`,
    detail: siteConfig.links.email,
    icon: MailIcon,
  },
];

export function Footer() {
  const { theme } = useTheme();
  const isBuilder = theme === "builder";
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line">
      <div
        className={
          isBuilder
            ? "border-b border-line bg-panel/50"
            : "border-b border-line bg-[color-mix(in_srgb,var(--theme-panel)_55%,transparent)]"
        }
      >
        <div className="mx-auto grid max-w-[var(--theme-max)] gap-10 px-4 py-10 sm:px-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,1fr)] md:gap-12">
          <div className="max-w-md">
            <BrandMark size="lg" />
            <p className="mt-3 text-sm leading-relaxed text-muted">{siteConfig.tagline}</p>
            <p className="mt-2 text-sm text-muted">{siteConfig.name}</p>
          </div>

          <div>
            <h2
              className={
                isBuilder
                  ? "mb-3 font-mono text-[10px] tracking-[0.18em] text-muted uppercase"
                  : "mb-4 font-display text-xl"
              }
            >
              {ui.footerExplore}
            </h2>
            <nav aria-label="Footer">
              <PrimaryNavLinks variant="footer" />
            </nav>
          </div>

          <div>
            <h2
              className={
                isBuilder
                  ? "mb-3 font-mono text-[10px] tracking-[0.18em] text-muted uppercase"
                  : "mb-4 font-display text-xl"
              }
            >
              {ui.footerConnect}
            </h2>
            <ul className="grid gap-2">
              {connectLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={
                      isBuilder
                        ? "group flex items-center justify-between gap-3 rounded-theme border border-transparent px-2 py-1.5 no-underline transition-colors hover:border-line hover:bg-panel"
                        : "group flex items-center justify-between gap-3 py-1 no-underline"
                    }
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                  >
                    <span
                      className={
                        isBuilder
                          ? "inline-flex items-center gap-2 font-mono text-xs text-ink group-hover:text-accent"
                          : "inline-flex items-center gap-2 text-sm text-ink group-hover:text-accent group-hover:underline"
                      }
                    >
                      <item.icon className="size-4 text-muted" />
                      {item.label}
                    </span>
                    <span className="truncate text-xs text-muted">{item.detail}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[var(--theme-max)] flex-col gap-3 px-4 py-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {year} {siteConfig.name}
          {" · "}
          <a href="/rss.xml" className="text-muted no-underline hover:text-ink hover:underline">
            {ui.rssFeed}
          </a>
        </p>
        <p className={isBuilder ? "font-mono text-xs" : "text-sm"}>
          <span className="text-muted">{ui.commandHint}</span>
          <span className="text-muted"> · </span>
          <Link to="/contact" className="text-muted no-underline hover:text-ink hover:underline">
            {ui.footerContactCta}
          </Link>
        </p>
      </div>
    </footer>
  );
}
