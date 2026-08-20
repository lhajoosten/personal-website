import { describe, expect, it } from "vitest";
import { parseProjectListState, serializeProjectListState } from "./project-query.ts";

describe("project list query params", () => {
  it("reads status, tag, and sort from the URL", () => {
    const state = parseProjectListState(new URLSearchParams("status=active&tag=Python&sort=title"));
    expect(state).toEqual({
      status: "active",
      tag: "Python",
      sort: "title",
    });
  });

  it("falls back to defaults for junk values", () => {
    const state = parseProjectListState(new URLSearchParams("status=nope&sort=hot"));
    expect(state.status).toBe("all");
    expect(state.sort).toBe("year");
    expect(state.tag).toBe("all");
  });

  it("omits default values from the serialized URL", () => {
    const params = serializeProjectListState({
      status: "all",
      tag: "all",
      sort: "year",
    });
    expect(params.toString()).toBe("");
  });
});
