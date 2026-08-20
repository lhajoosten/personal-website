import { describe, expect, it } from "vitest";
import { shouldReseed } from "./persist.ts";

describe("shouldReseed", () => {
  it("seeds when the database is empty", () => {
    expect(shouldReseed({ empty: true, storedRevision: null, contentRevision: 1 })).toBe(true);
  });

  it("reseeds when the stored revision mismatches", () => {
    expect(shouldReseed({ empty: false, storedRevision: 1, contentRevision: 2 })).toBe(true);
  });

  it("keeps existing rows when revision matches and tables have data", () => {
    expect(shouldReseed({ empty: false, storedRevision: 3, contentRevision: 3 })).toBe(false);
  });

  it("treats a missing stored revision as a mismatch when not empty", () => {
    expect(shouldReseed({ empty: false, storedRevision: null, contentRevision: 1 })).toBe(true);
  });
});
