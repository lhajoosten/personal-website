import { useTheme } from './useTheme.ts'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div
      role="group"
      aria-label="Theme"
      className="inline-flex items-center gap-1"
    >
      <button
        type="button"
        aria-pressed={theme === 'builder'}
        onClick={() => setTheme('builder')}
        className={
          theme === 'builder'
            ? 'rounded-theme border border-accent px-2 py-1 font-mono text-xs text-accent'
            : 'rounded-theme border border-transparent px-2 py-1 font-mono text-xs text-muted hover:text-ink'
        }
      >
        builder
      </button>
      <button
        type="button"
        aria-pressed={theme === 'editorial'}
        onClick={() => setTheme('editorial')}
        className={
          theme === 'editorial'
            ? 'rounded-theme border border-accent px-2 py-1 font-mono text-xs text-accent'
            : 'rounded-theme border border-transparent px-2 py-1 font-mono text-xs text-muted hover:text-ink'
        }
      >
        editorial
      </button>
    </div>
  )
}
