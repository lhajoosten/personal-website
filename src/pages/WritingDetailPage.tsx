import { useParams } from "react-router-dom";
import { PageMeta } from "../components/seo/PageMeta.tsx";
import { WritingDetail } from "../components/writing/WritingDetail.tsx";
import { ui } from "../content/site.ts";
import { useWritingPost } from "../hooks/useWriting.ts";
import { NotFoundPage } from "./NotFoundPage.tsx";

export function WritingDetailPage() {
  const { id = "" } = useParams();
  const state = useWritingPost(id);

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

  return (
    <>
      <PageMeta title={state.data.title} description={state.data.summary} />
      <WritingDetail post={state.data} />
    </>
  );
}
