import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { siteConfig } from "../src/config/site.config.ts";
import { projects } from "../src/content/projects.ts";
import { writing } from "../src/content/site.ts";
import { writingPosts } from "../src/content/writing.ts";
import { buildRssXml, buildSitemapXml, sitemapPaths } from "../src/seo/feeds.ts";

export function writeSiteFiles(publicDir?: string): { rss: string; sitemap: string } {
  const root = dirname(fileURLToPath(import.meta.url));
  const outDir = publicDir ?? join(root, "..", "public");
  mkdirSync(outDir, { recursive: true });

  const published = writingPosts.filter((post) => post.published);
  const rss = buildRssXml({
    siteUrl: siteConfig.url,
    siteTitle: `${siteConfig.name} — Writing`,
    siteDescription: writing.intro,
    posts: published,
  });
  const sitemap = buildSitemapXml({
    siteUrl: siteConfig.url,
    paths: sitemapPaths({
      projectIds: projects.map((project) => project.id),
      writingIds: published.map((post) => post.id),
    }),
  });

  const rssPath = join(outDir, "rss.xml");
  const sitemapPath = join(outDir, "sitemap.xml");
  writeFileSync(rssPath, rss);
  writeFileSync(sitemapPath, sitemap);
  return { rss: rssPath, sitemap: sitemapPath };
}

const invokedDirectly = process.argv[1]
  ? resolve(process.argv[1]) === fileURLToPath(import.meta.url)
  : false;
if (invokedDirectly) {
  writeSiteFiles();
}
