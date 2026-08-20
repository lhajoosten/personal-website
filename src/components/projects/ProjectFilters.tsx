import {
  PROJECT_SORTS,
  PROJECT_STATUSES,
  type ProjectSort,
  type ProjectStatus,
} from "../../content/types.ts";
import { ui } from "../../content/site.ts";
import { useTheme } from "../theme/useTheme.ts";

type Props = {
  status: ProjectStatus | "all";
  tag: string | "all";
  sort: ProjectSort;
  tags: string[];
  resultCount?: number;
  onStatusChange: (status: ProjectStatus | "all") => void;
  onTagChange: (tag: string | "all") => void;
  onSortChange: (sort: ProjectSort) => void;
  onClear: () => void;
};

export function ProjectFilters({
  status,
  tag,
  sort,
  tags,
  resultCount,
  onStatusChange,
  onTagChange,
  onSortChange,
  onClear,
}: Props) {
  const { theme } = useTheme();
  const controlClass =
    theme === "builder"
      ? "rounded-theme border border-line bg-canvas px-2 py-1 font-mono text-xs text-ink"
      : "border-0 border-b border-line bg-transparent px-1 py-1 text-sm text-ink";
  const dirty = status !== "all" || tag !== "all" || sort !== "year";

  return (
    <div className="mb-8 flex flex-wrap items-end gap-4">
      <label className="flex flex-col gap-1 text-xs text-muted">
        {ui.filterStatus}
        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value as ProjectStatus | "all")}
          className={controlClass}
        >
          <option value="all">{ui.filterAll}</option>
          {PROJECT_STATUSES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-xs text-muted">
        {ui.filterTag}
        <select
          value={tag}
          onChange={(event) => onTagChange(event.target.value)}
          className={controlClass}
        >
          <option value="all">{ui.filterAll}</option>
          {tags.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-xs text-muted">
        {ui.filterSort}
        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value as ProjectSort)}
          className={controlClass}
        >
          {PROJECT_SORTS.map((item) => (
            <option key={item} value={item}>
              {item === "year" ? ui.sortYear : item === "title" ? ui.sortTitle : ui.sortStatus}
            </option>
          ))}
        </select>
      </label>
      {typeof resultCount === "number" ? (
        <p className="text-xs text-muted">{ui.resultCount(resultCount)}</p>
      ) : null}
      {dirty ? (
        <button
          type="button"
          onClick={onClear}
          className={
            theme === "builder"
              ? "font-mono text-xs text-accent hover:underline"
              : "text-sm text-accent hover:underline"
          }
        >
          {ui.clearFilters}
        </button>
      ) : null}
    </div>
  );
}
