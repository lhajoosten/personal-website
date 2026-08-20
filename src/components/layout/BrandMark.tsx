import { siteConfig } from "../../config/site.config.ts";
import { useTheme } from "../theme/useTheme.ts";

type BrandMarkProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: {
    builder: "font-mono text-xs tracking-tight",
    editorial: "font-display text-lg tracking-tight",
  },
  md: {
    builder: "font-mono text-sm tracking-tight",
    editorial: "font-display text-xl tracking-tight",
  },
  lg: {
    builder: "font-mono text-sm tracking-tight",
    editorial: "font-display text-2xl tracking-tight",
  },
} as const;

export function BrandMark({ className = "", size = "md" }: BrandMarkProps) {
  const { theme } = useTheme();
  const isBuilder = theme === "builder";
  const sizeClass = sizeClasses[size][isBuilder ? "builder" : "editorial"];

  return (
    <span className={`${sizeClass} ${className}`.trim()}>
      <span className="text-accent">{siteConfig.brandHost}</span>
      <span className={isBuilder ? "text-muted" : "text-muted/90"}>{siteConfig.brandTld}</span>
    </span>
  );
}
