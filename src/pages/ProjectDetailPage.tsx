import { useParams } from 'react-router-dom'
import { PageMeta } from '../components/seo/PageMeta.tsx'
import { ProjectDetail } from '../components/projects/ProjectDetail.tsx'
import { ui } from '../content/site.ts'
import { useProject } from '../hooks/useProjects.ts'
import { NotFoundPage } from './NotFoundPage.tsx'

export function ProjectDetailPage() {
  const { id = '' } = useParams()
  const state = useProject(id)

  if (state.status === 'loading') {
    return <p className="text-muted">{ui.loadingProjects}</p>
  }

  if (state.status === 'error') {
    return (
      <p role="alert" className="text-accent">
        {ui.dbError} {state.message}
      </p>
    )
  }

  if (!state.data) {
    return <NotFoundPage />
  }

  return (
    <>
      <PageMeta title={state.data.title} description={state.data.summary} />
      <ProjectDetail project={state.data} />
    </>
  )
}
