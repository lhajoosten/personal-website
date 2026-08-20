import { PageMeta } from "../components/seo/PageMeta.tsx";
import { QueryStatus } from "../components/projects/QueryStatus.tsx";
import { WritingList } from "../components/writing/WritingList.tsx";
import { writing } from "../content/site.ts";
import { useWriting } from "../hooks/useWriting.ts";
import { useTheme } from "../components/theme/useTheme.ts";

export function WritingPage() {
  const { theme } = useTheme();
  const state = useWriting();

  return (
    <section className="max-w-[var(--theme-prose)]">
      <PageMeta title={writing.heading} description={writing.intro} />
      <h1
        className={
          theme === "builder" ? "mb-2 font-mono text-sm text-accent" : "mb-4 font-display text-5xl"
        }
      >
        {writing.heading}
      </h1>
      <p className="mb-8 text-muted">{writing.intro}</p>
      <QueryStatus state={state} emptyMessage={writing.empty}>
        {(posts) => <WritingList posts={posts} />}
      </QueryStatus>
    </section>
  );
}
