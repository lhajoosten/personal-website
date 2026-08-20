import { describe, expect, it } from "vitest";
import { mapProjectRow, parseLinks, parseStringList, tagLikePattern } from "./project-mapper.ts";

describe("parseStringList", () => {
  it("parses a JSON string array", () => {
    expect(parseStringList('["React","Vite"]')).toEqual(["React", "Vite"]);
  });

  it("returns empty on invalid JSON", () => {
    expect(parseStringList("not-json")).toEqual([]);
  });
});

describe("parseLinks", () => {
  it("parses valid link objects", () => {
    expect(parseLinks('[{"label":"GitHub","href":"https://github.com/lhajoosten"}]')).toEqual([
      { label: "GitHub", href: "https://github.com/lhajoosten" },
    ]);
  });

  it("drops empty arrays", () => {
    expect(parseLinks("[]")).toBeUndefined();
  });
});

describe("mapProjectRow", () => {
  it("maps a complete row", () => {
    const project = mapProjectRow({
      id: "portfolio",
      title: "Personal portfolio",
      summary: "A site",
      description: "Longer copy",
      status: "active",
      tags: '["React"]',
      featured: true,
      year: 2026,
      links: '[{"label":"Live","href":"https://lucjoosten.nl"}]',
    });

    expect(project.id).toBe("portfolio");
    expect(project.status).toBe("active");
    expect(project.tags).toEqual(["React"]);
    expect(project.featured).toBe(true);
    expect(project.links?.[0]?.href).toBe("https://lucjoosten.nl");
  });

  it("throws on invalid status", () => {
    expect(() =>
      mapProjectRow({
        id: "x",
        title: "x",
        summary: "x",
        description: "x",
        status: "done",
        tags: "[]",
        featured: false,
        year: 2026,
        links: "[]",
      }),
    ).toThrow(/Invalid project status/);
  });
});

describe("tagLikePattern", () => {
  it("wraps a tag for JSON LIKE matching", () => {
    expect(tagLikePattern("React")).toBe('%"React"%');
  });
});
