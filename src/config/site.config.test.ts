import { describe, expect, it } from "vitest";
import { isThemeId, siteConfig } from "./site.config.ts";

describe("isThemeId", () => {
  it("accepts builder and editorial", () => {
    expect(isThemeId("builder")).toBe(true);
    expect(isThemeId("editorial")).toBe(true);
  });

  it("keeps DuckDB OPFS persistence off by default", () => {
    expect(siteConfig.persistDb).toBe(false);
    expect(siteConfig.contentRevision).toBe(4);
  });

  it("rejects unknown values", () => {
    expect(isThemeId("dark")).toBe(false);
    expect(isThemeId(null)).toBe(false);
    expect(isThemeId(undefined)).toBe(false);
  });
});
