import type { ExperienceEntry } from "../../content/experience.ts";
import { useTheme } from "../theme/useTheme.ts";

type Props = {
  entries: ExperienceEntry[];
  heading?: string;
  intro?: string;
  compact?: boolean;
};

function Period({ entry }: { entry: ExperienceEntry }) {
  const label = entry.current ? `${entry.start} — ${entry.end}` : `${entry.start} — ${entry.end}`;

  return (
    <time
      dateTime={entry.start}
      className="block shrink-0 font-mono text-xs tabular-nums tracking-wide text-muted"
    >
      {label}
    </time>
  );
}

function EntryBody({ entry, compact }: { entry: ExperienceEntry; compact?: boolean }) {
  const { theme } = useTheme();
  const isBuilder = theme === "builder";

  return (
    <>
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <h3
          className={
            isBuilder ? "text-base font-semibold text-ink" : "font-display text-2xl font-semibold"
          }
        >
          {entry.role}
        </h3>
        {entry.current ? (
          <span className="rounded-theme border border-status-active/40 bg-status-active/10 px-2 py-0.5 font-mono text-[10px] tracking-widest text-status-active uppercase">
            Current
          </span>
        ) : null}
      </div>
      <p className="mt-1 text-sm text-muted">
        {entry.link ? (
          <a
            href={entry.link.href}
            className="text-accent no-underline hover:underline"
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
            <li key={item.slice(0, 32)} className="flex gap-2 text-sm leading-relaxed text-muted">
              <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {entry.tags?.length ? (
        <ul
          className={`flex flex-wrap gap-1.5 ${compact ? "mt-3" : "mt-4"}`}
          aria-label="Technologies"
        >
          {entry.tags.map((tag) => (
            <li
              key={tag}
              className={
                isBuilder
                  ? "rounded-theme border border-line px-2 py-0.5 font-mono text-[11px] text-muted"
                  : "border border-line px-2 py-0.5 text-xs text-muted"
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
        <ol className="grid gap-4">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="relative rounded-theme border border-line bg-panel p-5 pl-6 shadow-[inset_3px_0_0_0_var(--theme-accent)] transition-[border-color,box-shadow] hover:border-accent/30"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <Period entry={entry} />
              </div>
              <EntryBody entry={entry} compact={compact} />
            </li>
          ))}
        </ol>
      ) : (
        <ol className="relative grid gap-0 border-l border-line pl-8">
          {entries.map((entry, index) => (
            <li
              key={entry.id}
              className={`relative pb-10 ${index === entries.length - 1 ? "pb-0" : ""}`}
            >
              <span
                aria-hidden="true"
                className="absolute top-1.5 -left-[calc(2rem+0.5px)] size-2.5 rounded-full border-2 border-canvas bg-accent"
              />
              <div className="mb-4">
                <Period entry={entry} />
              </div>
              <EntryBody entry={entry} compact={compact} />
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
