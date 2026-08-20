import { Link } from 'react-router-dom'
import { ui } from '../../content/site.ts'
import type { WritingPost } from '../../content/types.ts'
import { useTheme } from '../theme/useTheme.ts'

export function WritingDetail({ post }: { post: WritingPost }) {
  const { theme } = useTheme()
  const isBuilder = theme === 'builder'

  return (
    <article className="max-w-[var(--theme-prose)]">
      <p className="mb-6">
        <Link
          to="/writing"
          className={
            isBuilder
              ? 'font-mono text-xs text-accent no-underline hover:underline'
              : 'text-sm text-muted no-underline hover:underline'
          }
        >
          ← {ui.backToWriting}
        </Link>
      </p>
      <p className={isBuilder ? 'mb-2 font-mono text-xs text-accent' : 'mb-3 text-sm text-muted'}>
        {post.publishedAt}
      </p>
      <h1
        className={
          isBuilder
            ? 'mb-4 text-3xl font-semibold tracking-tight'
            : 'mb-6 font-display text-5xl leading-[1.1]'
        }
      >
        {post.title}
      </h1>
      <p className="mb-8 text-lg text-muted">{post.summary}</p>
      {post.body.split(/\n\n+/).map((block) => (
        <p key={block.slice(0, 40)} className="mb-4 leading-relaxed text-muted">
          {block}
        </p>
      ))}
    </article>
  )
}
