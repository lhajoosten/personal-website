import { describe, expect, it } from "vitest";
import { estimateReadMinutes, parseBodyBlocks, parseToc, slugHeading } from "./writing-read.ts";

describe("parseToc", () => {
  it("collects ## and ### headings with stable ids", () => {
    const body = "Intro\n\n## Why this\n\nText\n\n### Nested detail\n\nMore";
    expect(parseToc(body)).toEqual([
      { id: "why-this", text: "Why this", level: 2 },
      { id: "nested-detail", text: "Nested detail", level: 3 },
    ]);
  });

  it("ignores # and #### headings", () => {
    expect(parseToc("# Title\n\n#### Too deep")).toEqual([]);
  });

  it("disambiguates duplicate heading slugs", () => {
    const toc = parseToc("## Same\n\n## Same");
    expect(toc.map((item) => item.id)).toEqual(["same", "same-2"]);
  });
});

describe("estimateReadMinutes", () => {
  it("rounds up at 220 wpm, minimum 1 for non-empty text", () => {
    expect(estimateReadMinutes("word ".repeat(50))).toBe(1);
    expect(estimateReadMinutes("word ".repeat(221))).toBe(2);
  });

  it("returns 0 for empty text", () => {
    expect(estimateReadMinutes("   ")).toBe(0);
  });
});

describe("parseBodyBlocks", () => {
  it("splits headings from paragraphs", () => {
    const blocks = parseBodyBlocks("Hello\n\n## Section\n\nWorld");
    expect(blocks).toEqual([
      { type: "paragraph", text: "Hello" },
      { type: "heading", level: 2, text: "Section", id: "section" },
      { type: "paragraph", text: "World" },
    ]);
  });
});

describe("slugHeading", () => {
  it("lowercases and hyphenates", () => {
    expect(slugHeading("Themes as configuration")).toBe("themes-as-configuration");
  });
});
