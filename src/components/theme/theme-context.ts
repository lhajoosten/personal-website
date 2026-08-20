import { createContext } from 'react'
import type { ThemeId } from '../../config/site.config.ts'

export type ThemeContextValue = {
  theme: ThemeId
  setTheme: (theme: ThemeId) => void
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
