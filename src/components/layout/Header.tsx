import { NavLink } from 'react-router-dom'
import { siteConfig } from '../../config/site.config.ts'
import { ThemeToggle } from '../theme/ThemeToggle.tsx'
import { useTheme } from '../theme/useTheme.ts'

export function Header() {
  const { theme } = useTheme()
  const isBuilder = theme === 'builder'

  return (
    <header
      className={
        isBuilder
          ? 'border-b border-line'
          : 'border-b border-transparent'
      }
    >
      <div className="mx-auto flex max-w-[var(--theme-max)] items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <NavLink
          to="/"
          className={
            isBuilder
              ? 'font-mono text-sm tracking-tight text-ink no-underline'
              : 'font-display text-xl tracking-tight text-ink no-underline'
          }
        >
          {isBuilder ? (
            <span>
              <span className="text-accent">{siteConfig.shortName}</span>
              <span className="text-muted"> / {siteConfig.name}</span>
            </span>
          ) : (
            siteConfig.name
          )}
        </NavLink>

        <nav aria-label="Primary" className="hidden items-center gap-4 sm:flex">
          {siteConfig.nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                isBuilder
                  ? `font-mono text-xs no-underline ${isActive ? 'text-accent' : 'text-muted hover:text-ink'}`
                  : `text-sm no-underline ${isActive ? 'text-ink' : 'text-muted hover:text-ink'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <ThemeToggle />
      </div>

      <nav
        aria-label="Primary mobile"
        className="flex gap-3 overflow-x-auto border-t border-line px-4 py-2 sm:hidden"
      >
        {siteConfig.nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `whitespace-nowrap font-mono text-xs no-underline ${
                isActive ? 'text-accent' : 'text-muted'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
