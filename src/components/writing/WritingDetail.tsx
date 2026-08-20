import { Link, useLocation } from "react-router-dom";
import { ui } from "../../content/site.ts";
import type { WritingPost } from "../../content/types.ts";
import { parseMarkdownToc, renderWritingHtml } from "../../data/render-writing.ts";
import { estimateReadMinutes } from "../../data/writing-read.ts";
import { useTheme } from "../theme/useTheme.ts";
import { ReadingProgress } from "./ReadingProgress.tsx";
import { WritingToc } from "./WritingToc.tsx";

export function WritingDetail({ post }: { post: WritingPost }) {
  const { theme } = useTheme();
  const location = useLocation();
  const isBuilder = theme === "builder";
  const toc = parseMarkdownToc(post.body);
  const html = renderWritingHtml(post.body);
  const minutes = estimateReadMinutes(`${post.title} ${post.summary} ${post.body}`);

  return (
    <>
      <ReadingProgress targetId="writing-article" />
      <article id="writing-article" className="max-w-[var(--theme-prose)]">
        <p className="mb-6">
          <Link
            to="/writing"
            className={
              isBuilder
                ? "font-mono text-xs text-accent no-underline hover:underline"
                : "text-sm text-muted no-underline hover:underline"
            }
          >
            ← {ui.backToWriting}
          </Link>
        </p>
        <p className={isBuilder ? "mb-2 font-mono text-xs text-accent" : "mb-3 text-sm text-muted"}>
          {post.publishedAt}
          {minutes > 0 ? ` · ${ui.minutesToRead(minutes)}` : null}
        </p>
        <h1
          className={
            isBuilder
              ? "mb-4 text-3xl font-semibold tracking-tight"
              : "mb-6 font-display text-5xl leading-[1.1]"
          }
        >
          {post.title}
        </h1>
        <p className="mb-8 text-lg text-muted">{post.summary}</p>
        <WritingToc items={toc} heading={ui.tocHeading} pathname={location.pathname} />
        <div
          className={
            isBuilder
              ? "writing-prose writing-prose-builder leading-relaxed text-muted"
              : "writing-prose writing-prose-editorial leading-relaxed text-muted"
          }
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </>
  );
}
