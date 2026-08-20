import { Link } from "react-router-dom";
import type { WritingPost } from "../../content/types.ts";
import { useTheme } from "../theme/useTheme.ts";

export function WritingList({ posts }: { posts: WritingPost[] }) {
  const { theme } = useTheme();

  if (theme === "editorial") {
    return (
      <div className="border-t border-line">
        {posts.map((post) => (
          <article key={post.id} className="border-b border-line py-8">
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

  return (
    <ul className="grid gap-3">
      {posts.map((post) => (
        <li key={post.id} className="rounded-theme border border-line bg-panel p-4">
          <p className="mb-1 font-mono text-[11px] text-accent">{post.publishedAt}</p>
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
