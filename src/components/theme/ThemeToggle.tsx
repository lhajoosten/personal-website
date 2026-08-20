import { useTheme } from "./useTheme.ts";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="group"
      aria-label="Theme"
      className="inline-flex items-center gap-1 rounded-theme border border-line p-0.5"
    >
      <button
        type="button"
        aria-pressed={theme === "builder"}
        aria-label="Use builder theme"
        onClick={() => setTheme("builder")}
        className={
          theme === "builder"
            ? "inline-flex min-h-9 min-w-[4.5rem] items-center justify-center rounded-theme bg-accent/15 px-2 font-mono text-xs text-accent"
            : "inline-flex min-h-9 min-w-[4.5rem] items-center justify-center rounded-theme px-2 font-mono text-xs text-muted transition-colors hover:text-ink"
        }
      >
        builder
      </button>
      <button
        type="button"
        aria-pressed={theme === "editorial"}
        aria-label="Use editorial theme"
        onClick={() => setTheme("editorial")}
        className={
          theme === "editorial"
            ? "inline-flex min-h-9 min-w-[4.75rem] items-center justify-center rounded-theme bg-accent/15 px-2 font-mono text-xs text-accent"
            : "inline-flex min-h-9 min-w-[4.75rem] items-center justify-center rounded-theme px-2 font-mono text-xs text-muted transition-colors hover:text-ink"
        }
      >
        editorial
      </button>
    </div>
  );
}
