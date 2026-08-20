import { useCallback } from "react";
import { getProject, listProjects, type ProjectQuery } from "../data/projects.ts";
import type { Project } from "../content/types.ts";
import { useAsync, type LoadState } from "./useAsync.ts";

export type { LoadState };

export function useProjects(query: ProjectQuery = {}): LoadState<Project[]> {
  const queryKey = JSON.stringify(query);
  const loader = useCallback(() => {
    return listProjects(JSON.parse(queryKey) as ProjectQuery);
  }, [queryKey]);
  return useAsync(queryKey, loader);
}

export function useFeaturedProjects(): LoadState<Project[]> {
  return useProjects({ featured: true });
}

export function useProject(id: string): LoadState<Project | null> {
  const loader = useCallback(() => getProject(id), [id]);
  return useAsync(`project:${id}`, loader);
}
