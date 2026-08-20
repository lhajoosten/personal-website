import { useEffect, useId, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { siteConfig } from "../../config/site.config.ts";
import { ui } from "../../content/site.ts";
import { listProjects } from "../../data/projects.ts";
import { searchContent } from "../../data/search.ts";
import { listWriting } from "../../data/writing.ts";
import { useTheme } from "../theme/useTheme.ts";
import { filterCommandItems, type CommandItem } from "./search.ts";

function navItems(): CommandItem[] {
  return siteConfig.nav.map((item) => ({
    id: `page-${item.to}`,
    label: item.label,
    hint: "Page",
    to: item.to,
    group: "page" as const,
  }));
}

function catalogItems(
  projects: Awaited<ReturnType<typeof listProjects>>,
  posts: Awaited<ReturnType<typeof listWriting>>,
): CommandItem[] {
  return [
    ...navItems(),
    ...projects.map((project) => ({
      id: `project-${project.id}`,
      label: project.title,
      hint: "Project",
      to: `/projects/${project.id}`,
      group: "project" as const,
    })),
    ...posts.map((post) => ({
      id: `writing-${post.id}`,
      label: post.title,
      hint: "Writing",
      to: `/writing/${post.id}`,
      group: "writing" as const,
    })),
  ];
}

export function CommandPalette({ startOpen = false }: { startOpen?: boolean }) {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(startOpen);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [catalog, setCatalog] = useState<CommandItem[]>(navItems);
  const [searchResults, setSearchResults] = useState<CommandItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const listId = useId();

  function close() {
    setOpen(false);
    setQuery("");
    setActive(0);
    setSearchResults([]);
    lastFocusRef.current?.focus();
  }

  function openPalette() {
    lastFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOpen(true);
    setQuery("");
    setActive(0);
    setSearchResults([]);
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) close();
        else openPalette();
      }
      if (event.key === "Escape" && open) close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onTab(event: KeyboardEvent) {
      if (event.key !== "Tab") return;
      const root = panelRef.current;
      if (!root) return;
      const nodes = [
        ...root.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ].filter((node) => !node.hasAttribute("disabled"));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    window.addEventListener("keydown", onTab);
    return () => window.removeEventListener("keydown", onTab);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    let cancelled = false;
    void Promise.all([listProjects(), listWriting()]).then(([projects, posts]) => {
      if (cancelled) return;
      setCatalog(catalogItems(projects, posts));
    });
    return () => {
      cancelled = true;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const needle = query.trim();
    if (needle.length === 0) return;

    const handle = window.setTimeout(() => {
      void searchContent(needle)
        .then((found) => {
          setSearchResults([
            ...filterCommandItems(navItems(), needle),
            ...found.projects.map((project) => ({
              id: `project-${project.id}`,
              label: project.title,
              hint: "Project",
              to: `/projects/${project.id}`,
              group: "project" as const,
            })),
            ...found.writing.map((post) => ({
              id: `writing-${post.id}`,
              label: post.title,
              hint: "Writing",
              to: `/writing/${post.id}`,
              group: "writing" as const,
            })),
          ]);
          setActive(0);
        })
        .catch(() => {
          setSearchResults(filterCommandItems(catalog, needle));
          setActive(0);
        });
    }, 180);

    return () => window.clearTimeout(handle);
  }, [catalog, open, query]);

  const results = query.trim().length === 0 ? navItems() : searchResults;

  const activeIndex = results.length === 0 ? 0 : Math.min(active, results.length - 1);

  if (!open) return null;

  const panelClass =
    theme === "builder"
      ? "w-full max-w-lg rounded-theme border border-line bg-panel p-3 shadow-xl"
      : "w-full max-w-lg border border-line bg-canvas p-4 shadow-xl";

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-[15vh]"
      role="presentation"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className={panelClass}
        ref={panelRef}
        onClick={(event) => event.stopPropagation()}
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setActive((index) => Math.min(index + 1, Math.max(results.length - 1, 0)));
            }
            if (event.key === "ArrowUp") {
              event.preventDefault();
              setActive((index) => Math.max(index - 1, 0));
            }
            if (event.key === "Enter") {
              const item = results[activeIndex];
              if (item) {
                navigate(item.to);
                close();
              }
            }
          }}
          placeholder={ui.commandPlaceholder}
          className={
            theme === "builder"
              ? "mb-2 w-full rounded-theme border border-line bg-canvas px-3 py-2 font-mono text-sm text-ink"
              : "mb-3 w-full border-0 border-b border-line bg-transparent py-2 text-lg text-ink"
          }
          aria-controls={listId}
          aria-autocomplete="list"
        />
        <ul id={listId} role="listbox" className="max-h-72 overflow-auto">
          {results.length === 0 ? (
            <li className="px-2 py-3 text-sm text-muted">{ui.commandEmpty}</li>
          ) : (
            results.map((item, index) => (
              <li key={item.id} role="option" aria-selected={index === activeIndex}>
                <button
                  type="button"
                  className={
                    index === activeIndex
                      ? "flex w-full items-baseline justify-between gap-3 bg-accent/15 px-2 py-2 text-left"
                      : "flex w-full items-baseline justify-between gap-3 px-2 py-2 text-left text-muted hover:text-ink"
                  }
                  onMouseEnter={() => setActive(index)}
                  onClick={() => {
                    navigate(item.to);
                    close();
                  }}
                >
                  <span className={theme === "builder" ? "font-mono text-sm" : "text-base"}>
                    {item.label}
                  </span>
                  <span className="font-mono text-[11px] text-muted">{item.hint}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
