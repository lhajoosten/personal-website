import { useParams } from "react-router-dom";
import { RelatedLinks } from "../components/related/RelatedLinks.tsx";
import { JsonLdScript } from "../components/seo/JsonLd.tsx";
import { PageMeta } from "../components/seo/PageMeta.tsx";
import { WritingDetail } from "../components/writing/WritingDetail.tsx";
import { formatCanonicalUrl } from "../config/page-meta.ts";
import { siteConfig } from "../config/site.config.ts";
import { ui } from "../content/site.ts";
import { useRelatedWriting } from "../hooks/useRelated.ts";
import { useWritingPost } from "../hooks/useWriting.ts";
import { articleJsonLd } from "../seo/json-ld.ts";
import { NotFoundPage } from "./NotFoundPage.tsx";

export function WritingDetailPage() {
  const { id = "" } = useParams();
  const state = useWritingPost(id);
  const related = useRelatedWriting(state.status === "ready" ? state.data : null);

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

  const post = state.data;
  const relatedPosts = related.status === "ready" ? related.data.posts : [];
  const relatedProjects = related.status === "ready" ? related.data.projects : [];

  return (
    <>
      <PageMeta title={post.title} description={post.summary} />
      <JsonLdScript
        data={articleJsonLd({
          headline: post.title,
          description: post.summary,
          datePublished: post.publishedAt,
          url: formatCanonicalUrl(`/writing/${post.id}`),
          authorName: siteConfig.name,
        })}
      />
      <WritingDetail post={post} />
      <RelatedLinks
        heading={ui.relatedWriting}
        items={relatedPosts.map((item) => ({
          id: item.id,
          title: item.title,
          to: `/writing/${item.id}`,
        }))}
      />
      <RelatedLinks
        heading={ui.relatedProjects}
        items={relatedProjects.map((item) => ({
          id: item.id,
          title: item.title,
          to: `/projects/${item.id}`,
        }))}
      />
    </>
  );
}
