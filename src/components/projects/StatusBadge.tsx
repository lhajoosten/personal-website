import type { ProjectStatus } from '../../content/types.ts'

const STATUS_CLASS: Record<ProjectStatus, string> = {
  active:
    'border-status-active/40 bg-status-active/10 text-status-active',
  experimental:
    'border-status-experimental/40 bg-status-experimental/10 text-status-experimental',
  archived:
    'border-status-archived/40 bg-status-archived/10 text-status-archived',
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`inline-flex rounded-theme border px-2 py-0.5 font-mono text-[11px] tracking-wide uppercase ${STATUS_CLASS[status]}`}
    >
      {status}
    </span>
  )
}
