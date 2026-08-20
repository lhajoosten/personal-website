import { useParams } from "react-router-dom";
import { ProjectDetail } from "../components/projects/ProjectDetail.tsx";
import { JsonLdScript } from "../components/seo/JsonLd.tsx";
import { PageMeta } from "../components/seo/PageMeta.tsx";
import { formatCanonicalUrl } from "../config/page-meta.ts";
import { ui } from "../content/site.ts";
import { useProject } from "../hooks/useProjects.ts";
import { useRelatedProjects } from "../hooks/useRelated.ts";
import { projectJsonLd } from "../seo/json-ld.ts";
import { NotFoundPage } from "./NotFoundPage.tsx";

export function ProjectDetailPage() {
  const { id = "" } = useParams();
  const state = useProject(id);
  const related = useRelatedProjects(state.status === "ready" ? state.data : null);

  if (state.status === "loading") {
    return <p className="text-muted">{ui.loadingProjects}</p>;
  }

  if (state.status === "error") {
    return (
      <p role="alert" className="text-accent">
        {ui.dbError} {state.message}
      </p>
    );
  }

  if (!state.data) {
    return <NotFoundPage />;
  }

  const project = state.data;
  const relatedProjects = related.status === "ready" ? related.data : [];

  return (
    <>
      <PageMeta title={project.title} description={project.summary} />
      <JsonLdScript
        data={projectJsonLd({
          name: project.title,
          description: project.summary,
          url: formatCanonicalUrl(`/projects/${project.id}`),
        })}
      />
      <ProjectDetail project={project} related={relatedProjects} />
    </>
  );
}
