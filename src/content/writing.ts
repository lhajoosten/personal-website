import { loadWritingPosts } from "./parse-writing.ts";

const files = import.meta.glob("./posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export const writingPosts = loadWritingPosts(files);
