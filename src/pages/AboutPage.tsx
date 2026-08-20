import { about } from '../content/about.ts'
import { useTheme } from '../components/theme/useTheme.ts'

export function AboutPage() {
  const { theme } = useTheme()

  return (
    <article className="max-w-3xl">
      <h1
        className={
          theme === 'builder'
            ? 'mb-6 font-mono text-sm text-accent'
            : 'mb-8 font-display text-5xl'
        }
      >
        {about.heading}
      </h1>
      {about.intro.map((paragraph) => (
        <p key={paragraph.slice(0, 24)} className="mb-4 leading-relaxed text-muted">
          {paragraph}
        </p>
      ))}

      <h2
        className={
          theme === 'builder'
            ? 'mt-10 mb-4 font-mono text-xs tracking-widest text-muted uppercase'
            : 'mt-12 mb-6 font-display text-3xl'
        }
      >
        Stack
      </h2>
      <ul className={theme === 'builder' ? 'grid gap-3 sm:grid-cols-3' : 'grid gap-8'}>
        {about.stack.map((group) => (
          <li
            key={group.label}
            className={
              theme === 'builder'
                ? 'rounded-theme border border-line bg-panel p-4'
                : 'border-t border-line pt-4'
            }
          >
            <h3 className="mb-2 font-semibold">{group.label}</h3>
            <p className="text-sm text-muted">{group.items.join(' · ')}</p>
          </li>
        ))}
      </ul>

      <h2
        className={
          theme === 'builder'
            ? 'mt-10 mb-4 font-mono text-xs tracking-widest text-muted uppercase'
            : 'mt-12 mb-6 font-display text-3xl'
        }
      >
        Learning path
      </h2>
      <ol className="grid gap-6">
        {about.learningPath.map((item) => (
          <li key={item.title}>
            <h3
              className={
                theme === 'builder'
                  ? 'mb-1 font-mono text-sm text-accent'
                  : 'mb-1 font-display text-2xl'
              }
            >
              {item.title}
            </h3>
            <p className="text-muted">{item.body}</p>
          </li>
        ))}
      </ol>
    </article>
  )
}
