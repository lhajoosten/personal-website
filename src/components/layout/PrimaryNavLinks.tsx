import { NavLink } from "react-router-dom";
import { siteConfig } from "../../config/site.config.ts";
import { useTheme } from "../theme/useTheme.ts";

type Variant = "header" | "footer" | "mobile";

function linkClass(isActive: boolean, variant: Variant, isBuilder: boolean) {
  if (variant === "footer") {
    return isBuilder
      ? `inline-flex min-h-10 items-center font-mono text-xs no-underline transition-colors ${isActive ? "text-accent" : "text-muted hover:text-ink"}`
      : `inline-flex min-h-10 items-center text-sm no-underline transition-colors ${isActive ? "text-accent" : "text-muted hover:text-ink hover:underline"}`;
  }

  if (variant === "mobile") {
    return isBuilder
      ? `flex min-h-11 items-center rounded-theme px-3 font-mono text-sm no-underline transition-colors ${isActive ? "bg-accent/10 text-accent" : "text-muted hover:bg-panel hover:text-ink"}`
      : `flex min-h-11 items-center px-1 text-base no-underline transition-colors ${isActive ? "text-ink underline decoration-line underline-offset-4" : "text-muted hover:text-ink"}`;
  }

  return isBuilder
    ? `inline-flex min-h-10 items-center rounded-theme px-3 py-1.5 font-mono text-xs tracking-wide no-underline transition-colors ${isActive ? "border border-accent/35 bg-accent/10 text-accent" : "border border-transparent text-muted hover:border-line hover:bg-panel hover:text-ink"}`
    : `inline-flex min-h-10 items-center px-2 py-1 text-sm no-underline transition-colors ${isActive ? "text-ink underline decoration-line underline-offset-[6px]" : "text-muted hover:text-ink"}`;
}

type Props = {
  variant: Variant;
  className?: string;
  onNavigate?: () => void;
};

export function PrimaryNavLinks({ variant, className = "", onNavigate }: Props) {
  const { theme } = useTheme();
  const isBuilder = theme === "builder";

  const listClass =
    variant === "header"
      ? "flex flex-wrap items-center justify-center gap-1 sm:gap-2"
      : variant === "footer"
        ? "grid gap-1"
        : "grid gap-1";

  return (
    <ul className={`${listClass} ${className}`.trim()}>
      {siteConfig.nav.map((item) => (
        <li key={item.to}>
          <NavLink
            to={item.to}
            end={item.to === "/"}
            onClick={onNavigate}
            className={({ isActive }) => linkClass(isActive, variant, isBuilder)}
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
