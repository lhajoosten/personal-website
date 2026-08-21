import { Link } from "react-router-dom";
import type { WritingPost } from "../../content/types.ts";
import { useTheme } from "../theme/useTheme.ts";

type WritingListLayout = "cards" | "index";

export function WritingList({
  posts,
  layout = "cards",
}: {
  posts: WritingPost[];
  layout?: WritingListLayout;
}) {
  const { theme } = useTheme();

  if (theme === "editorial") {
    return (
      <div className="border-t-2 border-line">
        {posts.map((post) => (
          <article key={post.id} className="border-b-2 border-line py-8">
            <p className="mb-2 text-sm text-muted">{post.publishedAt}</p>
            <h2 className="font-display text-3xl">
              <Link to={`/writing/${post.id}`} className="text-ink no-underline hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="mt-3 text-muted">{post.summary}</p>
          </article>
        ))}
      </div>
    );
  }

  if (layout === "index") {
    return (
      <ul className="divide-y divide-line border-t border-line">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              to={`/writing/${post.id}`}
              className="grid gap-1 py-5 no-underline transition-colors hover:text-accent sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-6"
            >
              <p className="font-mono text-[11px] text-muted">{post.publishedAt}</p>
              <div>
                <h2 className="text-lg font-semibold text-ink">{post.title}</h2>
                <p className="mt-1 text-sm text-muted">{post.summary}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="grid gap-3">
      {posts.map((post) => (
        <li key={post.id} className="rounded-theme border border-line bg-panel p-4">
          <p className="mb-1 font-mono text-[11px] text-muted">{post.publishedAt}</p>
          <h2 className="text-lg font-semibold">
            <Link to={`/writing/${post.id}`} className="text-ink no-underline hover:text-accent">
              {post.title}
            </Link>
          </h2>
          <p className="mt-2 text-sm text-muted">{post.summary}</p>
        </li>
      ))}
    </ul>
  );
}
