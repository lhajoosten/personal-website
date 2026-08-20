import { Link } from "react-router-dom";
import { home, ui, writing } from "../../content/site.ts";
import { useWriting } from "../../hooks/useWriting.ts";
import { QueryStatus } from "../projects/QueryStatus.tsx";
import { useTheme } from "../theme/useTheme.ts";
import { WritingList } from "../writing/WritingList.tsx";
import { HomeSection } from "./HomeSection.tsx";

export function RecentWriting() {
  const { theme } = useTheme();
  const state = useWriting();
  const recent = state.status === "ready" ? { ...state, data: state.data.slice(0, 3) } : state;
  const isBuilder = theme === "builder";

  return (
    <HomeSection tone="writing" aria-labelledby="recent-writing-heading" className="mb-0">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2
          id="recent-writing-heading"
          className={
            isBuilder
              ? "font-mono text-xs tracking-widest text-muted uppercase"
              : "font-display text-3xl"
          }
        >
          {home.recentWritingHeading}
        </h2>
        <Link
          to="/writing"
          className={
            isBuilder
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
            isBuilder
              ? "font-mono text-xs text-muted no-underline hover:text-accent"
              : "text-sm text-muted no-underline hover:underline"
          }
        >
          {ui.crossLinkProjects}
        </Link>
      </p>
    </HomeSection>
  );
}
