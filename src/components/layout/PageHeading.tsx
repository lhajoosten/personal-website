import type { ReactNode } from "react";
import { useTheme } from "../theme/useTheme.ts";

export function PageHeading({ kicker, children }: { kicker?: string; children: ReactNode }) {
  const { theme } = useTheme();

  if (theme === "builder") {
    return (
      <header className="mb-4">
        {kicker ? (
          <p className="mb-2 font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
            {kicker}
          </p>
        ) : null}
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{children}</h1>
      </header>
    );
  }

  return (
    <header className="mb-6">
      {kicker ? (
        <p className="mb-3 text-xs tracking-[0.2em] text-muted uppercase">{kicker}</p>
      ) : null}
      <h1 className="flex items-start gap-3 font-display text-5xl tracking-tight text-ink">
        <span
          aria-hidden="true"
          className="mt-[0.85rem] inline-block h-3 w-3 shrink-0 bg-[var(--theme-accent-secondary)]"
        />
        {children}
      </h1>
    </header>
  );
}
