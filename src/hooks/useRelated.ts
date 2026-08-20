import { useCallback } from "react";
import type { Project, WritingPost } from "../content/types.ts";
import { listProjects } from "../data/projects.ts";
import { selectRelatedByTags } from "../data/related.ts";
import { listWriting } from "../data/writing.ts";
import { useAsync, type LoadState } from "./useAsync.ts";

export function useRelatedProjects(current: Project | null): LoadState<Project[]> {
  const id = current?.id ?? "";
  const tagKey = (current?.tags ?? []).join("\0");
  const loader = useCallback(async () => {
    if (!id) return [];
    const tags = tagKey.length === 0 ? [] : tagKey.split("\0");
    const all = await listProjects();
    return selectRelatedByTags({ id, tags }, all, 3);
  }, [id, tagKey]);
  return useAsync(`related-projects:${id}`, loader);
}

export function useRelatedWriting(current: WritingPost | null): LoadState<{
  posts: WritingPost[];
  projects: Project[];
}> {
  const id = current?.id ?? "";
  const tagKey = (current?.tags ?? []).join("\0");
  const loader = useCallback(async () => {
    if (!id) return { posts: [], projects: [] };
    const tags = tagKey.length === 0 ? [] : tagKey.split("\0");
    const [posts, projects] = await Promise.all([listWriting(), listProjects()]);
    const tagged = { id, tags };
    return {
      posts: selectRelatedByTags(tagged, posts, 3),
      projects: selectRelatedByTags(tagged, projects, 2),
    };
  }, [id, tagKey]);
  return useAsync(`related-writing:${id}`, loader);
}
