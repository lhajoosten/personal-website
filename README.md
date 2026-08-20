# Luc Joosten — portfolio

Personal portfolio site: React 19, Vite, Tailwind CSS v4, React Router, and DuckDB-Wasm as an in-browser content data layer. Two programmatic themes (`builder` and `editorial`) share the same content.

## Scripts

```bash
pnpm install
pnpm dev      # local dev server
pnpm test     # vitest
pnpm lint     # oxlint
pnpm check    # oxlint + tsc --noEmit
pnpm build    # tsc -b && production bundle
pnpm preview  # serve dist/ (SPA fallback)
```

Static hosting: `public/_redirects` (Netlify) and `vercel.json` send unknown paths to `index.html`. GitHub Pages needs the same SPA fallback (or a `404.html` copy of `index.html`).

## Routes

| Path | Source |
| --- | --- |
| `/` | Home |
| `/projects` | List + filters (`?status=&tag=&sort=`) |
| `/projects/:id` | Project case |
| `/writing` | Published posts |
| `/writing/:id` | Post |
| `/about` `/contact` | Static content |
| unknown | 404 |

Command palette: `Ctrl/Cmd+K` searches pages, projects, and writing.

## Themes

`html[data-theme]` is the visual switch (`builder` | `editorial`). Tokens: `src/themes/tokens.css`. FOUC-prevention script stays in `index.html`. Preference: localStorage (`siteConfig.themeStorageKey`).

## Content and DuckDB

| What | Where |
| --- | --- |
| Site meta, nav, `localEvents` flag | `src/config/site.config.ts` |
| Projects | `src/content/projects.ts` |
| Writing | `src/content/writing.ts` |
| UI copy | `src/content/site.ts` |

Flow:

1. `src/data/db.ts` instantiates DuckDB-Wasm and creates `projects`, `writing`, and `events`.
2. `src/data/init.ts` seeds empty tables from content modules.
3. Queries live in `src/data/projects.ts` and `src/data/writing.ts`.
4. The DB is **in-memory**. Refresh re-seeds. No OPFS persistence.
5. `events` inserts (`page_path`, `ts`) only if `siteConfig.localEvents` is `true` (off by default).

Shareable project filters: `/projects?status=active&tag=Python&sort=title`. Defaults (`all` / `year`) are omitted from the URL.

Per-route titles, description, and canonical URL: `PageMeta` + `src/config/page-meta.ts`.
