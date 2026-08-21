import { PageMeta } from "../components/seo/PageMeta.tsx";
import { siteConfig } from "../config/site.config.ts";
import { contactPage } from "../content/site.ts";
import { useTheme } from "../components/theme/useTheme.ts";

const contacts = [
  { label: "GitHub", href: siteConfig.links.github, detail: "lhajoosten" },
  { label: "LinkedIn", href: siteConfig.links.linkedin, detail: "lhajoosten" },
  { label: "Email", href: `mailto:${siteConfig.links.email}`, detail: siteConfig.links.email },
  { label: "Web", href: siteConfig.links.website, detail: "lucjoosten.nl" },
];

export function ContactPage() {
  const { theme } = useTheme();
  const isBuilder = theme === "builder";

  return (
    <section
      className={
        isBuilder
          ? "card-surface mx-auto max-w-[var(--theme-prose)] rounded-theme border border-line bg-panel p-6 sm:p-8"
          : "max-w-[var(--theme-prose)]"
      }
    >
      <PageMeta title={contactPage.heading} description={contactPage.intro} />
      {isBuilder ? (
        <p className="mb-3 font-mono text-[10px] tracking-widest text-muted uppercase">Channels</p>
      ) : null}
      <h1
        className={
          isBuilder ? "mb-3 text-3xl font-semibold tracking-tight" : "mb-6 font-display text-5xl"
        }
      >
        {contactPage.heading}
      </h1>
      <p className={isBuilder ? "mb-8 max-w-xl text-muted" : "mb-8 text-muted"}>
        {contactPage.intro}
      </p>
      <ul className="divide-y divide-line border-t border-line">
        {contacts.map((item) => (
          <li key={item.label} className={isBuilder ? "" : "py-5"}>
            <a
              href={item.href}
              className={
                isBuilder
                  ? "flex min-h-14 items-baseline justify-between gap-4 py-4 no-underline transition-colors hover:text-accent"
                  : "flex items-baseline justify-between gap-4 py-5 no-underline"
              }
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              target={item.href.startsWith("http") ? "_blank" : undefined}
            >
              <span
                className={isBuilder ? "font-mono text-sm text-accent" : "font-display text-2xl"}
              >
                {item.label}
              </span>
              <span className="text-sm text-muted">{item.detail}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
