import { describe, expect, it } from "vitest";
import { loadWritingPosts, parseWritingMarkdown } from "./parse-writing.ts";

const sample = `---
id: sample-post
title: Sample title
summary: A short summary
publishedAt: 2026-08-20
tags: ["Frontend", "Architecture"]
published: true
---

Hello body

## Section

More text
`;

describe("parseWritingMarkdown", () => {
  it("reads frontmatter and body", () => {
    const post = parseWritingMarkdown(sample, "sample-post.md");
    expect(post.id).toBe("sample-post");
    expect(post.title).toBe("Sample title");
    expect(post.summary).toBe("A short summary");
    expect(post.publishedAt).toBe("2026-08-20");
    expect(post.tags).toEqual(["Frontend", "Architecture"]);
    expect(post.published).toBe(true);
    expect(post.body).toContain("## Section");
    expect(post.body.startsWith("Hello body")).toBe(true);
  });

  it("uses the filename stem when id is omitted", () => {
    const raw = `---
title: No id
summary: x
publishedAt: 2026-01-01
tags: Career
published: false
---

Draft body
`;
    const post = parseWritingMarkdown(raw, "/content/posts/filename-stem.md");
    expect(post.id).toBe("filename-stem");
    expect(post.published).toBe(false);
  });

  it("rejects missing title", () => {
    expect(() =>
      parseWritingMarkdown(
        `---
summary: x
publishedAt: 2026-01-01
published: true
---

Body
`,
        "x.md",
      ),
    ).toThrow(/title/i);
  });
});

describe("loadWritingPosts", () => {
  it("sorts by publishedAt descending and rejects duplicate ids", () => {
    const files = {
      "./posts/sample-post.md": sample,
      "./posts/older.md": sample
        .replace("id: sample-post", "id: older")
        .replace("2026-08-20", "2026-01-01"),
    };
    const loaded = loadWritingPosts(files);
    expect(loaded.map((post) => post.id)).toEqual(["sample-post", "older"]);
  });

  it("throws on duplicate ids", () => {
    expect(() =>
      loadWritingPosts({
        "./a.md": sample,
        "./b.md": sample,
      }),
    ).toThrow(/duplicate/i);
  });
});
