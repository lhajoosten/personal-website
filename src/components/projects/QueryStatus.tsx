import type { ReactNode } from 'react'
import { ui } from '../../content/site.ts'
import type { Project } from '../../content/types.ts'
import type { LoadState } from '../../hooks/useProjects.ts'

type Props = {
  state: LoadState<Project[]>
  emptyMessage: string
  children: (projects: Project[]) => ReactNode
}

export function QueryStatus({ state, emptyMessage, children }: Props) {
  if (state.status === 'loading') {
    return (
      <p className="text-muted" aria-live="polite">
        {ui.loadingProjects}
      </p>
    )
  }

  if (state.status === 'error') {
    return (
      <p role="alert" className="text-accent">
        {ui.dbError} {state.message}
      </p>
    )
  }

  if (state.data.length === 0) {
    return <p className="text-muted">{emptyMessage}</p>
  }

  return children(state.data)
}
