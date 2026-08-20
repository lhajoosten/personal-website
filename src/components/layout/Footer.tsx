import { siteConfig } from '../../config/site.config.ts'
import { useTheme } from '../theme/useTheme.ts'

export function Footer() {
  const { theme } = useTheme()
  const year = new Date().getFullYear()

  return (
    <footer
      className={
        theme === 'builder'
          ? 'mt-auto border-t border-line'
          : 'mt-auto border-t border-line/80'
      }
    >
      <div className="mx-auto flex max-w-[var(--theme-max)] flex-col gap-2 px-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {year} {siteConfig.name}
        </p>
        <p className={theme === 'builder' ? 'font-mono text-xs' : 'italic'}>
          {siteConfig.tagline}
        </p>
      </div>
    </footer>
  )
}
