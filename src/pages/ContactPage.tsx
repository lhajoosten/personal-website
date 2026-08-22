import { PageMeta } from "../components/seo/PageMeta.tsx";
import { siteConfig } from "../config/site.config.ts";
import { contactPage } from "../content/site.ts";
import { PageHeading } from "../components/layout/PageHeading.tsx";
import { ContactForm } from "../components/contact/ContactForm.tsx";
import { GitHubIcon, LinkedInIcon, MailIcon } from "../components/icons/BrandIcons.tsx";
import { useTheme } from "../components/theme/useTheme.ts";

const channels = [
  {
    label: "Email",
    href: `mailto:${siteConfig.links.email}`,
    detail: siteConfig.links.email,
    hint: contactPage.emailHint,
    icon: MailIcon,
  },
  {
    label: "LinkedIn",
    href: siteConfig.links.linkedin,
    detail: "lhajoosten",
    hint: contactPage.linkedinHint,
    icon: LinkedInIcon,
  },
  {
    label: "GitHub",
    href: siteConfig.links.github,
    detail: "lhajoosten",
    hint: contactPage.githubHint,
    icon: GitHubIcon,
  },
];

export function ContactPage() {
  const { theme } = useTheme();
  const isBuilder = theme === "builder";

  return (
    <section>
      <PageMeta title={contactPage.heading} description={contactPage.intro} />
      <PageHeading kicker={isBuilder ? "Channels" : undefined}>{contactPage.heading}</PageHeading>
      <p className="mb-10 max-w-[var(--theme-prose)] text-muted">{contactPage.intro}</p>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.8fr)] lg:gap-16">
        <div>
          <h2
            className={
              isBuilder
                ? "mb-5 font-mono text-xs tracking-widest text-muted uppercase"
                : "mb-6 font-display text-3xl"
            }
          >
            {contactPage.formHeading}
          </h2>
          <ContactForm />
        </div>

        <aside>
          <h2
            className={
              isBuilder
                ? "mb-5 font-mono text-xs tracking-widest text-muted uppercase"
                : "mb-6 font-display text-3xl"
            }
          >
            {contactPage.channelsHeading}
          </h2>
          <ul className="grid gap-0 divide-y divide-line border-t border-line">
            {channels.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={
                    isBuilder
                      ? "flex gap-3 py-4 no-underline transition-colors hover:text-accent"
                      : "flex gap-3 py-5 no-underline"
                  }
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                >
                  <span className="mt-1">
                    <item.icon className="size-5 text-muted" />
                  </span>
                  <span className="min-w-0">
                    <span
                      className={
                        isBuilder ? "font-mono text-sm text-ink" : "font-display text-2xl text-ink"
                      }
                    >
                      {item.label}
                    </span>
                    <span className="mt-1 block text-sm text-muted">{item.detail}</span>
                    <span className="mt-1 block text-sm text-muted">{item.hint}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
