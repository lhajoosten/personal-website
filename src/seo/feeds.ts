export type RssPost = {
  id: string;
  title: string;
  summary: string;
  publishedAt: string;
  published: boolean;
};

export type RssInput = {
  siteUrl: string;
  siteTitle: string;
  siteDescription: string;
  posts: RssPost[];
};

export type SitemapInput = {
  siteUrl: string;
  paths: string[];
};

function xmlEscape(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function siteOrigin(url: string): string {
  return url.replace(/\/$/, "");
}

function toRfc822(isoDate: string): string {
  const parsed = new Date(`${isoDate}T00:00:00.000Z`);
  if (Number.isNaN(parsed.getTime())) return isoDate;
  return parsed.toUTCString();
}

export function buildRssXml(input: RssInput): string {
  const origin = siteOrigin(input.siteUrl);
  const posts = input.posts
    .filter((post) => post.published)
    .slice()
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  const items = posts
    .map((post) => {
      const link = `${origin}/writing/${post.id}`;
      return `    <item>
      <title>${xmlEscape(post.title)}</title>
      <link>${xmlEscape(link)}</link>
      <guid>${xmlEscape(link)}</guid>
      <pubDate>${toRfc822(post.publishedAt)}</pubDate>
      <description>${xmlEscape(post.summary)}</description>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${xmlEscape(input.siteTitle)}</title>
    <link>${xmlEscape(`${origin}/writing`)}</link>
    <description>${xmlEscape(input.siteDescription)}</description>
${items}
  </channel>
</rss>
`;
}

export function buildSitemapXml(input: SitemapInput): string {
  const origin = siteOrigin(input.siteUrl);
  const urls = input.paths
    .map((path) => {
      const loc =
        path === "/" ? `${origin}/` : `${origin}${path.startsWith("/") ? path : `/${path}`}`;
      return `  <url>
    <loc>${xmlEscape(loc)}</loc>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function sitemapPaths(input: { projectIds: string[]; writingIds: string[] }): string[] {
  return [
    "/",
    "/projects",
    "/writing",
    "/about",
    "/contact",
    ...input.projectIds.map((id) => `/projects/${id}`),
    ...input.writingIds.map((id) => `/writing/${id}`),
  ];
}
