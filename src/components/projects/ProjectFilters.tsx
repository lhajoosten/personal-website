import {
  PROJECT_SORTS,
  PROJECT_STATUSES,
  type ProjectSort,
  type ProjectStatus,
} from "../../content/types.ts";
import { ui } from "../../content/site.ts";
import { useTheme } from "../theme/useTheme.ts";
import { FilterSelect } from "../ui/FilterSelect.tsx";

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
  const dirty = status !== "all" || tag !== "all" || sort !== "year";

  return (
    <div className="mb-10 flex flex-wrap items-end gap-5">
      <FilterSelect
        label={ui.filterStatus}
        value={status}
        onChange={(value) => onStatusChange(value as ProjectStatus | "all")}
        options={[
          { value: "all", label: ui.filterAll },
          ...PROJECT_STATUSES.map((item) => ({ value: item, label: item })),
        ]}
      />
      <FilterSelect
        label={ui.filterTag}
        value={tag}
        onChange={onTagChange}
        options={[
          { value: "all", label: ui.filterAll },
          ...tags.map((item) => ({ value: item, label: item })),
        ]}
      />
      <FilterSelect
        label={ui.filterSort}
        value={sort}
        onChange={(value) => onSortChange(value as ProjectSort)}
        options={PROJECT_SORTS.map((item) => ({
          value: item,
          label: item === "year" ? ui.sortYear : item === "title" ? ui.sortTitle : ui.sortStatus,
        }))}
      />
      {typeof resultCount === "number" ? (
        <p className="pb-2 text-xs text-muted">{ui.resultCount(resultCount)}</p>
      ) : null}
      {dirty ? (
        <button
          type="button"
          onClick={onClear}
          className={
            theme === "builder"
              ? "pb-2 font-mono text-xs text-accent hover:underline"
              : "pb-2 text-sm text-accent hover:underline"
          }
        >
          {ui.clearFilters}
        </button>
      ) : null}
    </div>
  );
}
