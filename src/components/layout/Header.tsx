import { useId, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { siteConfig } from "../../config/site.config.ts";
import { ui } from "../../content/site.ts";
import { ThemeToggle } from "../theme/ThemeToggle.tsx";
import { useTheme } from "../theme/useTheme.ts";
import { BrandMark } from "./BrandMark.tsx";
import { PrimaryNavLinks } from "./PrimaryNavLinks.tsx";

export function Header() {
  const { theme } = useTheme();
  const isBuilder = theme === "builder";
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(location.pathname);
  const menuId = useId();

  if (menuPath !== location.pathname) {
    setMenuPath(location.pathname);
    setMenuOpen(false);
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/95 backdrop-blur-md">
      <div className="mx-auto max-w-[var(--theme-max)] px-4 sm:px-6">
        <div className="grid min-h-[4.25rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <NavLink
            to="/"
            className="inline-flex min-h-11 min-w-0 items-center no-underline"
            aria-label={`${siteConfig.brand} — ${siteConfig.name}`}
          >
            <BrandMark size="md" />
          </NavLink>

          <nav aria-label="Primary" className="hidden justify-self-center md:block">
            <PrimaryNavLinks variant="header" />
          </nav>

          <div className="flex items-center justify-end gap-2 justify-self-end">
            <p
              className={
                isBuilder
                  ? "mr-1 hidden font-mono text-[10px] tracking-wide text-muted lg:inline"
                  : "mr-1 hidden text-xs text-muted lg:inline"
              }
            >
              {ui.commandHint}
            </p>
            <ThemeToggle />
            <button
              type="button"
              className={
                isBuilder
                  ? "inline-flex min-h-11 min-w-11 items-center justify-center rounded-theme border border-line px-2 font-mono text-xs text-muted md:hidden"
                  : "inline-flex min-h-11 min-w-11 items-center justify-center rounded-theme border border-line px-2 text-sm text-muted md:hidden"
              }
              aria-expanded={menuOpen}
              aria-controls={menuId}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? ui.menuClose : ui.menuOpen}
            </button>
          </div>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id={menuId}
          aria-label="Primary mobile"
          className={
            isBuilder
              ? "border-t border-line bg-panel/60 px-4 py-4 md:hidden"
              : "border-t border-line px-4 py-4 md:hidden"
          }
        >
          <PrimaryNavLinks variant="mobile" onNavigate={closeMenu} />
        </nav>
      ) : null}
    </header>
  );
}
