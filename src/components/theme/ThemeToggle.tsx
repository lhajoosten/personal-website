import { useTheme } from "./useTheme.ts";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="group"
      aria-label="Theme"
      className={
        theme === "builder"
          ? "inline-flex items-center border border-line"
          : "inline-flex items-center border-b-2 border-line"
      }
    >
      <button
        type="button"
        aria-pressed={theme === "builder"}
        aria-label="Use builder theme"
        onClick={() => setTheme("builder")}
        className={
          theme === "builder"
            ? "inline-flex min-h-9 min-w-[4.5rem] items-center justify-center bg-panel px-2 font-mono text-xs text-ink"
            : "inline-flex min-h-9 min-w-[4.5rem] items-center justify-center px-2 text-xs text-muted transition-colors hover:text-ink"
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
            ? "inline-flex min-h-9 min-w-[4.75rem] items-center justify-center px-2 text-xs text-ink"
            : "inline-flex min-h-9 min-w-[4.75rem] items-center justify-center px-2 font-mono text-xs text-muted transition-colors hover:text-ink"
        }
      >
        editorial
      </button>
    </div>
  );
}
