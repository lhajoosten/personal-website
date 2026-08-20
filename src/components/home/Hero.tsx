import { Link } from 'react-router-dom'
import { home } from '../../content/site.ts'
import { siteConfig } from '../../config/site.config.ts'
import { useTheme } from '../theme/useTheme.ts'

export function Hero() {
  const { theme } = useTheme()

  if (theme === 'editorial') {
    return (
      <section className="mb-16 max-w-3xl">
        <p className="mb-4 text-sm tracking-[0.2em] text-muted uppercase">
          {siteConfig.role}
        </p>
        <h1 className="font-display text-5xl leading-[1.1] font-semibold tracking-tight sm:text-6xl">
          {siteConfig.tagline}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          {home.leadEditorial}
        </p>
        <p className="mt-8 text-sm">
          <Link to="/projects" className="text-accent no-underline hover:underline">
            Selected work
          </Link>
          <span className="text-muted"> · </span>
          <Link to="/contact" className="text-muted no-underline hover:text-ink hover:underline">
            Contact
          </Link>
        </p>
      </section>
    )
  }

  return (
    <section className="mb-12 rounded-theme border border-line bg-panel p-6 sm:p-8">
      <p className="mb-3 font-mono text-xs text-accent">{siteConfig.role}</p>
      <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
        {siteConfig.tagline}
      </h1>
      <p className="mt-4 max-w-2xl text-muted">{home.leadBuilder}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/projects"
          className="rounded-theme border border-accent bg-transparent px-3 py-2 font-mono text-xs text-accent no-underline"
        >
          View projects
        </Link>
        <Link
          to="/contact"
          className="rounded-theme border border-line px-3 py-2 font-mono text-xs text-muted no-underline hover:text-ink"
        >
          Contact
        </Link>
      </div>
    </section>
  )
}
