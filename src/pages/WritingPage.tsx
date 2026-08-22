import { PageMeta } from "../components/seo/PageMeta.tsx";
import { QueryStatus } from "../components/projects/QueryStatus.tsx";
import { WritingList } from "../components/writing/WritingList.tsx";
import { writing, ui } from "../content/site.ts";
import { useWriting } from "../hooks/useWriting.ts";
import { useTheme } from "../components/theme/useTheme.ts";
import { PageHeading } from "../components/layout/PageHeading.tsx";

export function WritingPage() {
  const { theme } = useTheme();
  const isBuilder = theme === "builder";

  const state = useWriting();

  return (
    <section>
      <PageMeta title={writing.heading} description={writing.intro} />
      <PageHeading kicker={isBuilder ? "Index" : undefined}>{writing.heading}</PageHeading>
      <p className="mb-4 max-w-[var(--theme-prose)] text-muted">{writing.intro}</p>
      <p className="mb-8">
        <a
          href="/rss.xml"
          className={
            isBuilder
              ? "font-mono text-xs text-accent no-underline hover:underline"
              : "text-sm text-accent no-underline hover:underline"
          }
        >
          {ui.rssFeed}
        </a>
      </p>
      <QueryStatus state={state} emptyMessage={writing.empty}>
        {(posts) => <WritingList posts={posts} layout={isBuilder ? "index" : "cards"} />}
      </QueryStatus>
    </section>
  );
}
