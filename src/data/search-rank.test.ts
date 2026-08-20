import { describe, expect, it } from "vitest";
import {
  escapeLikeTerm,
  matchesAllTokens,
  rankHits,
  scoreProject,
  scoreWriting,
  tokenizeQuery,
} from "./search-rank.ts";

describe("tokenizeQuery", () => {
  it("splits and lowercases terms", () => {
    expect(tokenizeQuery("  DuckDB Search ")).toEqual(["duckdb", "search"]);
  });

  it("returns empty for whitespace", () => {
    expect(tokenizeQuery("   ")).toEqual([]);
  });
});

describe("escapeLikeTerm", () => {
  it("escapes LIKE wildcards", () => {
    expect(escapeLikeTerm("100%_done")).toBe("100\\%\\_done");
  });
});

describe("search ranking", () => {
  const azure = {
    id: "pullfrog-azure",
    title: "Pullfrog Azure",
    summary: "Bicep modules",
    description: "Cloud deploy notes",
    tags: ["Azure", "Bicep"],
  };
  const duck = {
    id: "personal-website",
    title: "Personal website",
    summary: "Portfolio",
    description: "DuckDB-Wasm in the browser",
    tags: ["React"],
  };

  it("ranks title matches above body matches", () => {
    const tokens = tokenizeQuery("azure");
    expect(scoreProject(azure, tokens)).toBeGreaterThan(scoreProject(duck, tokens));
  });

  it("requires every token to appear in the haystack", () => {
    expect(matchesAllTokens("proposal first agents", ["proposal", "agents"])).toBe(true);
    expect(matchesAllTokens("proposal first agents", ["proposal", "kubernetes"])).toBe(false);
  });

  it("drops zero-score hits and sorts remaining by score", () => {
    const ranked = rankHits([
      { item: "low", score: 10 },
      { item: "none", score: 0 },
      { item: "high", score: 100 },
    ]);
    expect(ranked).toEqual(["high", "low"]);
  });

  it("scores writing title higher than body", () => {
    const tokens = tokenizeQuery("agents");
    const titled = {
      id: "a",
      title: "Agents",
      summary: "x",
      body: "other",
      tags: [],
      published: true,
    };
    const bodied = {
      id: "b",
      title: "Other",
      summary: "x",
      body: "agents in the loop",
      tags: [],
      published: true,
    };
    expect(scoreWriting(titled, tokens)).toBeGreaterThan(scoreWriting(bodied, tokens));
  });
});
