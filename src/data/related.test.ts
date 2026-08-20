import { describe, expect, it } from "vitest";
import { selectRelatedByTags } from "./related.ts";

describe("selectRelatedByTags", () => {
  const current = { id: "a", title: "A", tags: ["React", "DuckDB"] };
  const others = [
    { id: "b", title: "B", tags: ["React"] },
    { id: "c", title: "C", tags: ["Python"] },
    { id: "d", title: "D", tags: ["React", "DuckDB"] },
    { id: "a", title: "self", tags: ["React", "DuckDB"] },
  ];

  it("excludes self and zero-overlap items, preferring more shared tags", () => {
    const related = selectRelatedByTags(current, others, 3);
    expect(related.map((item) => item.id)).toEqual(["d", "b"]);
  });

  it("caps the result count", () => {
    const related = selectRelatedByTags(current, others, 1);
    expect(related).toHaveLength(1);
    expect(related[0]?.id).toBe("d");
  });
});
