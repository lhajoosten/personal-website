import { siteConfig } from "./site.config.ts";

export function formatPageTitle(page?: string): string {
  if (!page) return siteConfig.title;
  return `${page} — ${siteConfig.brand}`;
}

export function formatCanonicalUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return siteConfig.url;
  return `${siteConfig.url}${normalized}`;
}
