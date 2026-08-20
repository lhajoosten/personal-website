# Luc Joosten — portfolio

Personal portfolio site: React 19, Vite, Tailwind CSS v4, React Router, and DuckDB-Wasm as an in-browser content data layer. Two programmatic themes (`builder` and `editorial`) share the same content.

## Scripts

```bash
pnpm install
pnpm dev      # local dev server
pnpm test     # vitest (content/theme helpers)
pnpm lint     # oxlint
pnpm build    # tsc -b && production bundle
pnpm preview  # serve dist/
```

## Themes

`html[data-theme]` is the single visual switch:

- `builder` — dark terminal / maker: bordered cards, mono labels, electric accent
- `editorial` — light typography: row layouts, display serif, sparse chrome

Tokens live in `src/themes/tokens.css` and are mapped into Tailwind in `src/index.css`. Layout variants are chosen in components from `useTheme()`, not by swapping colors only.

Default theme and storage key: `src/config/site.config.ts` (`defaultTheme`, `themeStorageKey`). The toggle writes localStorage; a small inline script in `index.html` applies the stored theme before paint to avoid a flash.

## Config vs content

| What | Where |
| --- | --- |
| Name, tagline, nav, links, default theme | `src/config/site.config.ts` |
| Project records | `src/content/projects.ts` |
| About copy | `src/content/about.ts` |
| Home/writing copy | `src/content/site.ts` |

Do not put visitor-facing copy in components when it belongs in those modules.

## DuckDB seed and query flow

1. `src/data/db.ts` lazily instantiates DuckDB-Wasm (MVP/EH bundles + workers) and creates the `projects` table.
2. `src/data/projects.ts` calls `initProjects()` on first query: if the table is empty, it inserts rows from `src/content/projects.ts`.
3. Tags and links are stored as JSON strings; `src/data/project-mapper.ts` serializes/parses them.
4. Queries: all projects, featured, filter by `status` and `tag` (`LIKE` on the JSON tags column).
5. React pages use `src/hooks/useProjects.ts`. Theme preference stays in localStorage — DuckDB is for content only.

The database is in-memory for v1. A refresh re-instantiates DuckDB and re-seeds from content. To add a project, edit `src/content/projects.ts`.

## Stack

- React 19 + TypeScript (strict)
- Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite`)
- React Router 7
- DuckDB-Wasm
- pnpm
