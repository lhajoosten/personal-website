import { PageMeta } from "../components/seo/PageMeta.tsx";
import { QueryStatus } from "../components/projects/QueryStatus.tsx";
import { WritingList } from "../components/writing/WritingList.tsx";
import { writing, ui } from "../content/site.ts";
import { useWriting } from "../hooks/useWriting.ts";
import { useTheme } from "../components/theme/useTheme.ts";

export function WritingPage() {
  const { theme } = useTheme();
  const state = useWriting();
  const isBuilder = theme === "builder";

  return (
    <section
      className={
        isBuilder
          ? "card-surface mx-auto max-w-[var(--theme-prose)] rounded-theme border border-line bg-panel p-6 sm:p-8"
          : "max-w-[var(--theme-prose)]"
      }
    >
      <PageMeta title={writing.heading} description={writing.intro} />
      {isBuilder ? (
        <p className="mb-3 font-mono text-[10px] tracking-widest text-muted uppercase">Index</p>
      ) : null}
      <div className={isBuilder ? "mb-8 flex flex-wrap items-end justify-between gap-4" : ""}>
        <h1
          className={
            isBuilder ? "text-3xl font-semibold tracking-tight" : "mb-4 font-display text-5xl"
          }
        >
          {writing.heading}
        </h1>
        {isBuilder ? (
          <a href="/rss.xml" className="font-mono text-xs text-accent no-underline hover:underline">
            {ui.rssFeed}
          </a>
        ) : null}
      </div>
      <p className={isBuilder ? "mb-8 max-w-xl text-muted" : "mb-8 text-muted"}>{writing.intro}</p>
      {isBuilder ? null : (
        <p className="mb-8">
          <a href="/rss.xml" className="text-sm text-accent no-underline hover:underline">
            {ui.rssFeed}
          </a>
        </p>
      )}
      <QueryStatus state={state} emptyMessage={writing.empty}>
        {(posts) => <WritingList posts={posts} layout={isBuilder ? "index" : "cards"} />}
      </QueryStatus>
    </section>
  );
}
