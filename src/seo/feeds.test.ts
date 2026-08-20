import { describe, expect, it } from "vitest";
import { buildRssXml, buildSitemapXml, sitemapPaths } from "./feeds.ts";

describe("buildRssXml", () => {
  it("includes published posts only, newest first", () => {
    const xml = buildRssXml({
      siteUrl: "https://lucjoosten.nl",
      siteTitle: "Luc Joosten",
      siteDescription: "Notes",
      posts: [
        {
          id: "old",
          title: "Old",
          summary: "Earlier",
          publishedAt: "2026-01-01",
          published: true,
        },
        {
          id: "draft",
          title: "Draft",
          summary: "Hidden",
          publishedAt: "2026-08-01",
          published: false,
        },
        {
          id: "new",
          title: "New & noted",
          summary: "Later <post>",
          publishedAt: "2026-08-20",
          published: true,
        },
      ],
    });

    expect(xml).toContain("<title>New &amp; noted</title>");
    expect(xml).toContain("<link>https://lucjoosten.nl/writing/new</link>");
    expect(xml).toContain("Later &lt;post&gt;");
    expect(xml).not.toContain("Draft");
    expect(xml.indexOf("/writing/new")).toBeLessThan(xml.indexOf("/writing/old"));
  });
});

describe("buildSitemapXml", () => {
  it("lists static routes plus content ids", () => {
    const xml = buildSitemapXml({
      siteUrl: "https://lucjoosten.nl",
      paths: ["/", "/projects", "/projects/alpha", "/writing/beta"],
    });
    expect(xml).toContain("<loc>https://lucjoosten.nl/</loc>");
    expect(xml).toContain("<loc>https://lucjoosten.nl/projects/alpha</loc>");
    expect(xml).toContain("<loc>https://lucjoosten.nl/writing/beta</loc>");
  });

  it("builds paths from project and writing ids", () => {
    expect(sitemapPaths({ projectIds: ["a"], writingIds: ["b"] })).toEqual([
      "/",
      "/projects",
      "/writing",
      "/about",
      "/contact",
      "/projects/a",
      "/writing/b",
    ]);
  });
});
