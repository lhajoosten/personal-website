import { describe, expect, it } from "vitest";
import { articleJsonLd, personJsonLd, projectJsonLd } from "./json-ld.ts";

describe("json-ld builders", () => {
  it("builds a Person graph from site fields", () => {
    const data = personJsonLd({
      name: "Luc Joosten",
      url: "https://lucjoosten.nl",
      jobTitle: "Engineer",
      sameAs: ["https://github.com/lhajoosten"],
    });
    expect(data["@type"]).toBe("Person");
    expect(data.name).toBe("Luc Joosten");
    expect(data.sameAs).toEqual(["https://github.com/lhajoosten"]);
  });

  it("builds an Article for a writing post", () => {
    const data = articleJsonLd({
      headline: "Hello",
      description: "Summary",
      datePublished: "2026-08-20",
      url: "https://lucjoosten.nl/writing/hello",
      authorName: "Luc Joosten",
    });
    expect(data["@type"]).toBe("Article");
    expect(data.headline).toBe("Hello");
  });

  it("builds a SoftwareApplication for a project", () => {
    const data = projectJsonLd({
      name: "Pipeline-Pro",
      description: "Coursework",
      url: "https://lucjoosten.nl/projects/pipeline-pro",
    });
    expect(data["@type"]).toBe("SoftwareApplication");
    expect(data.name).toBe("Pipeline-Pro");
  });
});
