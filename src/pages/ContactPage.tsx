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

  return (
    <section className="max-w-[var(--theme-prose)]">
      <PageMeta title={contactPage.heading} description={contactPage.intro} />
      <h1
        className={
          theme === "builder" ? "mb-2 font-mono text-sm text-accent" : "mb-6 font-display text-5xl"
        }
      >
        {contactPage.heading}
      </h1>
      <p className="mb-8 text-muted">{contactPage.intro}</p>
      <ul
        className={theme === "builder" ? "grid gap-3" : "divide-y divide-line border-t border-line"}
      >
        {contacts.map((item) => (
          <li
            key={item.label}
            className={
              theme === "builder" ? "rounded-theme border border-line bg-panel px-4 py-3" : "py-5"
            }
          >
            <a
              href={item.href}
              className="flex items-baseline justify-between gap-4 no-underline"
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              target={item.href.startsWith("http") ? "_blank" : undefined}
            >
              <span className={theme === "builder" ? "font-mono text-sm" : "font-display text-2xl"}>
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
