import { PageMeta } from '../components/seo/PageMeta.tsx'
import { writing } from '../content/site.ts'
import { useTheme } from '../components/theme/useTheme.ts'

export function WritingPage() {
  const { theme } = useTheme()

  return (
    <section className="max-w-[var(--theme-prose)]">
      <PageMeta title={writing.heading} description={writing.body} />
      <h1
        className={
          theme === 'builder'
            ? 'mb-2 font-mono text-sm text-accent'
            : 'mb-4 font-display text-5xl'
        }
      >
        {writing.heading}
      </h1>
      <p
        className={
          theme === 'builder'
            ? 'mb-6 inline-block rounded-theme border border-line px-2 py-1 font-mono text-xs text-muted'
            : 'mb-6 font-display text-xl italic text-muted'
        }
      >
        {writing.status}
      </p>
      <p className="leading-relaxed text-muted">{writing.body}</p>
    </section>
  )
}
