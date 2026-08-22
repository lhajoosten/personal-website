import { useEffect, useId, useRef, useState } from "react";
import { useTheme } from "../theme/useTheme.ts";

export type FilterOption = {
  value: string;
  label: string;
};

type Props = {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
};

export function FilterSelect({ label, value, options, onChange }: Props) {
  const { theme } = useTheme();
  const isBuilder = theme === "builder";
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const labelId = useId();
  const listId = useId();
  const selected = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    function onPointer(event: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function choose(next: string) {
    onChange(next);
    setOpen(false);
  }

  const triggerClass = isBuilder
    ? "flex min-h-9 min-w-[9.5rem] items-center justify-between gap-3 rounded-theme border border-line bg-canvas px-2.5 font-mono text-xs text-ink"
    : "flex min-h-9 min-w-[9.5rem] items-center justify-between gap-3 border-0 border-b-2 border-line bg-transparent px-0 text-sm text-ink";

  const menuClass = isBuilder
    ? "absolute z-30 mt-1 min-w-full border border-line bg-panel py-1 shadow-[0_8px_24px_color-mix(in_srgb,black_35%,transparent)]"
    : "absolute z-30 mt-1 min-w-full border-2 border-line bg-panel py-1";

  return (
    <div ref={wrapRef} className="relative flex flex-col gap-1">
      <span id={labelId} className="text-[11px] tracking-wide text-muted uppercase">
        {label}
      </span>
      <button
        type="button"
        className={triggerClass}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={labelId}
        aria-controls={listId}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{selected?.label ?? value}</span>
        <span aria-hidden="true" className="text-muted">
          {open ? "▴" : "▾"}
        </span>
      </button>
      {open ? (
        <ul id={listId} role="listbox" className={menuClass}>
          {options.map((option) => {
            const active = option.value === value;
            return (
              <li key={option.value} role="option" aria-selected={active}>
                <button
                  type="button"
                  className={
                    isBuilder
                      ? `flex w-full px-2.5 py-1.5 text-left font-mono text-xs ${active ? "bg-accent/10 text-accent" : "text-ink hover:bg-canvas"}`
                      : `flex w-full px-2.5 py-1.5 text-left text-sm ${active ? "bg-accent/10 text-accent" : "text-ink hover:bg-canvas"}`
                  }
                  onClick={() => choose(option.value)}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
