import { home } from '../../content/site.ts'
import { useTheme } from '../theme/useTheme.ts'

export function FeatureGrid() {
  const { theme } = useTheme()

  if (theme === 'editorial') {
    return (
      <section className="mb-16">
        <h2 className="mb-8 font-display text-3xl">Focus</h2>
        <ol className="grid gap-8 sm:grid-cols-3">
          {home.highlights.map((item, index) => (
            <li key={item.title}>
              <p className="mb-2 font-display text-4xl text-muted">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
              <p className="text-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>
    )
  }

  return (
    <section className="mb-12">
      <h2 className="mb-4 font-mono text-xs tracking-widest text-muted uppercase">
        Highlights
      </h2>
      <ul className="grid gap-3 sm:grid-cols-3">
        {home.highlights.map((item) => (
          <li
            key={item.title}
            className="rounded-theme border border-line bg-panel p-4"
          >
            <h3 className="mb-2 text-sm font-semibold text-accent">{item.title}</h3>
            <p className="text-sm text-muted">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
