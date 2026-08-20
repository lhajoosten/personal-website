import { describe, expect, it } from "vitest";
import { parseMarkdownToc, renderWritingHtml } from "./render-writing.ts";

describe("parseMarkdownToc", () => {
  it("skips headings inside fenced code", () => {
    const toc = parseMarkdownToc("```\n## Not a heading\n```\n\n## Real heading\n");
    expect(toc).toEqual([{ id: "real-heading", text: "Real heading", level: 2 }]);
  });
});

describe("renderWritingHtml", () => {
  it("renders emphasis, links, lists, and heading ids that match the TOC", () => {
    const body = `## Why this

Use **bold** and a [link](https://example.com).

- one
- two
`;
    const html = renderWritingHtml(body);
    const toc = parseMarkdownToc(body);
    expect(toc[0]?.id).toBe("why-this");
    expect(html).toContain('id="why-this"');
    expect(html).toContain("<strong>bold</strong>");
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain("<li>one</li>");
  });
});
