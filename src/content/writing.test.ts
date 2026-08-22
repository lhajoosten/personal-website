import { describe, expect, it } from "vitest";
import { writingPosts } from "./writing.ts";

describe("writing markdown catalog", () => {
  it("loads published posts from src/content/posts", () => {
    expect(writingPosts.map((post) => post.id).sort()).toEqual([
      "agents-propose-not-assume",
      "done-means-it-deploys",
      "experimental-is-a-status",
      "fabric-gateway-contract",
      "fabric-gateway-load-bearing-mechanics",
      "models-are-dependencies",
      "rag-is-not-a-chatbot",
      "reproduction-before-patch",
      "two-themes-one-content",
    ]);
    expect(writingPosts.every((post) => post.published)).toBe(true);
    const newest = writingPosts[0]?.publishedAt ?? "";
    const next = writingPosts[1]?.publishedAt ?? "";
    expect(newest >= next).toBe(true);
  });
});
