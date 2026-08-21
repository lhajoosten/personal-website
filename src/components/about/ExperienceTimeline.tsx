import type { ExperienceEntry } from "../../content/experience.ts";
import { useTheme } from "../theme/useTheme.ts";

type Props = {
  entries: ExperienceEntry[];
  heading?: string;
  intro?: string;
  compact?: boolean;
};

function Period({ entry, builder }: { entry: ExperienceEntry; builder: boolean }) {
  const label = `${entry.start} — ${entry.end}`;

  return (
    <time
      dateTime={entry.start}
      className={
        builder
          ? "shrink-0 font-mono text-xs tabular-nums tracking-wide text-muted"
          : "shrink-0 text-sm tabular-nums tracking-wide text-muted"
      }
    >
      {label}
    </time>
  );
}

function CurrentMark({ builder }: { builder: boolean }) {
  if (builder) {
    return (
      <span className="inline-flex border border-line px-2 py-0.5 font-mono text-[10px] tracking-[0.14em] text-status-active uppercase">
        Current
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.14em] text-ink uppercase">
      <span aria-hidden="true" className="inline-block h-2.5 w-2.5 bg-status-active" />
      Current
    </span>
  );
}

function EntryBody({ entry, compact }: { entry: ExperienceEntry; compact?: boolean }) {
  const { theme } = useTheme();
  const isBuilder = theme === "builder";

  return (
    <>
      <p className="mt-1 text-sm text-muted">
        {entry.link ? (
          <a
            href={entry.link.href}
            className={
              isBuilder
                ? "text-accent no-underline hover:underline"
                : "text-ink no-underline hover:underline"
            }
            rel="noopener noreferrer"
            target="_blank"
          >
            {entry.organization}
          </a>
        ) : (
          entry.organization
        )}
        {entry.location ? <span>{` · ${entry.location}`}</span> : null}
      </p>
      <p className={`leading-relaxed text-muted ${compact ? "mt-2 text-sm" : "mt-3"}`}>
        {entry.summary}
      </p>
      {!compact ? (
        <ul className="mt-4 grid gap-2">
          {entry.highlights.map((item) => (
            <li key={item.slice(0, 32)} className="flex gap-2.5 text-sm leading-relaxed text-muted">
              <span
                aria-hidden="true"
                className={
                  isBuilder
                    ? "mt-2 size-1 shrink-0 bg-accent"
                    : "mt-[0.55em] h-1.5 w-1.5 shrink-0 bg-ink"
                }
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {entry.tags?.length ? (
        <ul
          className={`flex flex-wrap ${compact ? "mt-3" : "mt-4"} ${isBuilder ? "gap-1.5" : "gap-x-3 gap-y-1"}`}
          aria-label="Technologies"
        >
          {entry.tags.map((tag) => (
            <li
              key={tag}
              className={
                isBuilder
                  ? "border border-line px-2 py-0.5 font-mono text-[11px] text-muted"
                  : "text-[12px] text-muted"
              }
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

export function ExperienceTimeline({ entries, heading, intro, compact }: Props) {
  const { theme } = useTheme();
  const isBuilder = theme === "builder";

  return (
    <section aria-labelledby={heading ? "experience-heading" : undefined}>
      {heading ? (
        <h2
          id="experience-heading"
          className={
            isBuilder
              ? "mb-2 font-mono text-xs tracking-widest text-muted uppercase"
              : "mb-3 font-display text-3xl"
          }
        >
          {heading}
        </h2>
      ) : null}
      {intro ? (
        <p className={`max-w-2xl leading-relaxed text-muted ${heading ? "mb-8" : "mb-6"}`}>
          {intro}
        </p>
      ) : null}

      {isBuilder ? (
        <ol className="grid gap-3">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="border border-line bg-panel p-5 shadow-[inset_2px_0_0_0_var(--theme-accent)]"
            >
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-base font-semibold text-ink">{entry.role}</h3>
                  {entry.current ? <CurrentMark builder /> : null}
                </div>
                <Period entry={entry} builder />
              </div>
              <EntryBody entry={entry} compact={compact} />
            </li>
          ))}
        </ol>
      ) : (
        <ol className="max-w-3xl">
          {entries.map((entry, index) => (
            <li key={entry.id} className="grid grid-cols-[0.75rem_minmax(0,1fr)] gap-x-5">
              <div className="relative" aria-hidden="true">
                <span
                  className={`absolute left-1/2 w-px -translate-x-1/2 bg-ink ${
                    index === 0 ? "top-[0.7rem]" : "top-0"
                  } ${index === entries.length - 1 ? "h-[0.7rem]" : "bottom-0"}`}
                />
                <span className="absolute top-[0.55em] left-1/2 size-2.5 -translate-x-1/2 bg-accent ring-[3px] ring-canvas" />
              </div>
              <div className={index === entries.length - 1 ? "pb-0" : "pb-10"}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-2xl font-semibold">{entry.role}</h3>
                    {entry.current ? <CurrentMark builder={false} /> : null}
                  </div>
                  <Period entry={entry} builder={false} />
                </div>
                <EntryBody entry={entry} compact={compact} />
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
