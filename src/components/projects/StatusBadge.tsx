import type { ProjectStatus } from "../../content/types.ts";
import { useTheme } from "../theme/useTheme.ts";

const TONE: Record<ProjectStatus, string> = {
  active: "text-status-active",
  experimental: "text-status-experimental",
  archived: "text-status-archived",
};

const SWATCH: Record<ProjectStatus, string> = {
  active: "bg-status-active",
  experimental: "bg-status-experimental",
  archived: "bg-status-archived",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const { theme } = useTheme();

  if (theme === "editorial") {
    return (
      <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.14em] text-ink uppercase">
        <span aria-hidden="true" className={`inline-block h-2.5 w-2.5 ${SWATCH[status]}`} />
        {status}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex border border-line px-2 py-0.5 font-mono text-[10px] tracking-[0.14em] uppercase ${TONE[status]}`}
    >
      {status}
    </span>
  );
}
