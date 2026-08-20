import { describe, expect, it } from "vitest";
import { isThemeId } from "./site.config.ts";

describe("isThemeId", () => {
  it("accepts builder and editorial", () => {
    expect(isThemeId("builder")).toBe(true);
    expect(isThemeId("editorial")).toBe(true);
  });

  it("rejects unknown values", () => {
    expect(isThemeId("dark")).toBe(false);
    expect(isThemeId(null)).toBe(false);
    expect(isThemeId(undefined)).toBe(false);
  });
});
