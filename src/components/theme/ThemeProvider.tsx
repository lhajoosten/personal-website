import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { isThemeId, siteConfig, type ThemeId } from '../../config/site.config.ts'
import { ThemeContext } from './theme-context.ts'

function readStoredTheme(): ThemeId {
  try {
    const stored = localStorage.getItem(siteConfig.themeStorageKey)
    if (isThemeId(stored)) return stored
  } catch {
    // localStorage can throw in private mode
  }
  return siteConfig.defaultTheme
}

function applyTheme(theme: ThemeId) {
  document.documentElement.dataset.theme = theme
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(readStoredTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const setTheme = useCallback((next: ThemeId) => {
    setThemeState(next)
    applyTheme(next)
    try {
      localStorage.setItem(siteConfig.themeStorageKey, next)
    } catch {
      // ignore persistence failures
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'builder' ? 'editorial' : 'builder')
  }, [setTheme, theme])

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
