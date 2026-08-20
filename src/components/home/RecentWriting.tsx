import { Link } from "react-router-dom";
import { home, ui, writing } from "../../content/site.ts";
import { useWriting } from "../../hooks/useWriting.ts";
import { QueryStatus } from "../projects/QueryStatus.tsx";
import { useTheme } from "../theme/useTheme.ts";
import { WritingList } from "../writing/WritingList.tsx";

export function RecentWriting() {
  const { theme } = useTheme();
  const state = useWriting();
  const recent = state.status === "ready" ? { ...state, data: state.data.slice(0, 3) } : state;

  return (
    <section className="mt-16">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2
          className={
            theme === "builder"
              ? "font-mono text-xs tracking-widest text-muted uppercase"
              : "font-display text-3xl"
          }
        >
          {home.recentWritingHeading}
        </h2>
        <Link
          to="/writing"
          className={
            theme === "builder"
              ? "font-mono text-xs text-accent no-underline hover:underline"
              : "text-sm text-accent no-underline hover:underline"
          }
        >
          {home.allWriting}
        </Link>
      </div>
      <QueryStatus state={recent} emptyMessage={writing.empty}>
        {(posts) => <WritingList posts={posts} />}
      </QueryStatus>
      <p className="mt-6">
        <Link
          to="/projects"
          className={
            theme === "builder"
              ? "font-mono text-xs text-muted no-underline hover:text-accent"
              : "text-sm text-muted no-underline hover:underline"
          }
        >
          {ui.crossLinkProjects}
        </Link>
      </p>
    </section>
  );
}
