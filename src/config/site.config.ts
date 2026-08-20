export const THEMES = ["builder", "editorial"] as const;

export type ThemeId = (typeof THEMES)[number];

export type NavItem = {
  to: string;
  label: string;
};

export const siteConfig = {
  name: "Luc Joosten",
  shortName: "LJ",
  title: "Luc Joosten — Software Engineer",
  tagline: "AI-powered software, engineered properly",
  role: "Full-stack Software Engineer → AI Engineer + DevOps/Cloud Engineer",
  url: "https://lucjoosten.nl",
  defaultTheme: "builder" as ThemeId,
  themeStorageKey: "lj-theme",
  localEvents: false,
  persistDb: false,
  contentRevision: 1,
  links: {
    github: "https://github.com/lhajoosten",
    linkedin: "https://linkedin.com/in/lhajoosten",
    email: "hello@lucjoosten.nl",
    website: "https://lucjoosten.nl",
  },
  nav: [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/about", label: "About" },
    { to: "/writing", label: "Writing" },
    { to: "/contact", label: "Contact" },
  ] satisfies NavItem[],
};

export function isThemeId(value: string | null | undefined): value is ThemeId {
  return value === "builder" || value === "editorial";
}
