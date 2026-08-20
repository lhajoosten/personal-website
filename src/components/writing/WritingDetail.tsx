import { Link } from "react-router-dom";
import { ui } from "../../content/site.ts";
import type { WritingPost } from "../../content/types.ts";
import { estimateReadMinutes, parseBodyBlocks, parseToc } from "../../data/writing-read.ts";
import { useTheme } from "../theme/useTheme.ts";
import { ReadingProgress } from "./ReadingProgress.tsx";
import { WritingToc } from "./WritingToc.tsx";

export function WritingDetail({ post }: { post: WritingPost }) {
  const { theme } = useTheme();
  const isBuilder = theme === "builder";
  const toc = parseToc(post.body);
  const blocks = parseBodyBlocks(post.body);
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
        <WritingToc items={toc} heading={ui.tocHeading} />
        {blocks.map((block) => {
          if (block.type === "heading") {
            const Heading = block.level === 2 ? "h2" : "h3";
            return (
              <Heading
                key={block.id}
                id={block.id}
                className={
                  isBuilder
                    ? "mt-10 mb-3 scroll-mt-8 text-xl font-semibold tracking-tight"
                    : "mt-12 mb-4 scroll-mt-8 font-display text-3xl"
                }
              >
                {block.text}
              </Heading>
            );
          }
          return (
            <p key={block.text.slice(0, 40)} className="mb-4 leading-relaxed text-muted">
              {block.text}
            </p>
          );
        })}
      </article>
    </>
  );
}
