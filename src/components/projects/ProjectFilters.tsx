import type { ProjectStatus } from '../../content/types.ts'
import { PROJECT_STATUSES } from '../../content/types.ts'
import { useTheme } from '../theme/useTheme.ts'

type Props = {
  status: ProjectStatus | 'all'
  tag: string | 'all'
  tags: string[]
  onStatusChange: (status: ProjectStatus | 'all') => void
  onTagChange: (tag: string | 'all') => void
}

export function ProjectFilters({
  status,
  tag,
  tags,
  onStatusChange,
  onTagChange,
}: Props) {
  const { theme } = useTheme()
  const controlClass =
    theme === 'builder'
      ? 'rounded-theme border border-line bg-canvas px-2 py-1 font-mono text-xs text-ink'
      : 'border-0 border-b border-line bg-transparent px-1 py-1 text-sm text-ink'

  return (
    <div className="mb-8 flex flex-wrap gap-4">
      <label className="flex flex-col gap-1 text-xs text-muted">
        Status
        <select
          value={status}
          onChange={(event) =>
            onStatusChange(event.target.value as ProjectStatus | 'all')
          }
          className={controlClass}
        >
          <option value="all">All</option>
          {PROJECT_STATUSES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-xs text-muted">
        Tag
        <select
          value={tag}
          onChange={(event) => onTagChange(event.target.value)}
          className={controlClass}
        >
          <option value="all">All</option>
          {tags.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
