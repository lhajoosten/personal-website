import { useId, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { siteConfig } from "../../config/site.config.ts";
import { ui } from "../../content/site.ts";
import { ThemeToggle } from "../theme/ThemeToggle.tsx";
import { useTheme } from "../theme/useTheme.ts";

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

  const linkClass = (isActive: boolean) =>
    isBuilder
      ? `inline-flex min-h-11 items-center font-mono text-xs no-underline transition-colors ${isActive ? "text-accent" : "text-muted hover:text-ink"}`
      : `inline-flex min-h-11 items-center text-sm no-underline transition-colors ${isActive ? "text-ink underline decoration-line underline-offset-4" : "text-muted hover:text-ink"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[var(--theme-max)] items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <NavLink
          to="/"
          className={
            isBuilder
              ? "inline-flex min-h-11 items-center font-mono text-sm tracking-tight text-ink no-underline"
              : "inline-flex min-h-11 items-center font-display text-xl tracking-tight text-ink no-underline"
          }
          aria-label={`${siteConfig.name} home`}
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

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => linkClass(isActive)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className={
              isBuilder
                ? "inline-flex min-h-11 min-w-11 items-center justify-center rounded-theme border border-line px-2 font-mono text-xs text-muted md:hidden"
                : "inline-flex min-h-11 min-w-11 items-center justify-center border-0 bg-transparent px-2 text-sm text-muted md:hidden"
            }
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? ui.menuClose : ui.menuOpen}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id={menuId}
          aria-label="Primary mobile"
          className={
            isBuilder
              ? "border-t border-line px-4 py-3 md:hidden"
              : "border-t border-line px-4 py-4 md:hidden"
          }
        >
          <ul className="grid gap-1">
            {siteConfig.nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) => `block py-1 no-underline ${linkClass(isActive)}`}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
