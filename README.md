# Luc Joosten — portfolio

Personal portfolio site: React 19, Vite, Tailwind CSS v4, React Router, and DuckDB-Wasm as an in-browser content data layer. Two programmatic themes (`builder` and `editorial`) share the same content.

Live: [lucjoosten.nl](https://lucjoosten.nl)

## Scripts

```bash
pnpm install
pnpm dev            # local dev server
pnpm test           # vitest
pnpm lint           # oxlint
pnpm check          # oxlint + oxfmt --check + tsc -b
pnpm generate:site  # write public/rss.xml and public/sitemap.xml
pnpm build          # generate site files, tsc -b, production bundle
pnpm preview        # serve dist/ (SPA fallback)
```

`pnpm build` also writes `public/rss.xml` and `public/sitemap.xml` via a Vite plugin (same helpers as `pnpm generate:site`).

Pre-commit (Husky + lint-staged): staged files are formatted with oxfmt; `src/**/*.{ts,tsx}` also run through `oxlint --fix`. Hooks install via `pnpm install` (`prepare`: `husky`).

## Routes

| Path                | Source                                 |
| ------------------- | -------------------------------------- |
| `/`                 | Home                                   |
| `/projects`         | List + filters (`?status=&tag=&sort=`) |
| `/projects/:id`     | Project case                           |
| `/writing`          | Published posts                        |
| `/writing/:id`      | Post                                   |
| `/about` `/contact` | Static content                         |
| `/rss.xml`          | Writing RSS (after generate/build)     |
| `/sitemap.xml`      | Sitemap (after generate/build)         |
| unknown             | 404                                    |

Command palette: `Ctrl/Cmd+K`. Empty query lists pages. Typed queries search **DuckDB** over project title/summary/description/tags and writing title/summary/body/tags (token AND + title-weighted ranking). If DuckDB fails, the palette falls back to filtering the in-memory catalog.

## Themes

`html[data-theme]` is the visual switch (`builder` | `editorial`). Tokens: `src/themes/tokens.css`. FOUC-prevention script stays in `index.html`. Preference: localStorage (`siteConfig.themeStorageKey`).

## Content and DuckDB

| What                                       | Where                       |
| ------------------------------------------ | --------------------------- |
| Site meta, nav, `localEvents`, `persistDb` | `src/config/site.config.ts` |
| Projects                                   | `src/content/projects.ts`   |
| Writing                                    | `src/content/writing.ts`    |
| UI copy                                    | `src/content/site.ts`       |

Flow:

1. `src/data/db.ts` instantiates DuckDB-Wasm and creates `projects`, `writing`, `events`, and `meta`.
2. `src/data/init.ts` seeds from content modules when tables are empty, or **reseeds** when `siteConfig.contentRevision` does not match the stored revision.
3. Queries live in `src/data/projects.ts`, `src/data/writing.ts`, and `src/data/search.ts`.
4. **Source of truth is always `src/content/*`.** DuckDB is a query cache.
5. `persistDb` defaults to `false` (in-memory). Set `persistDb: true` to try OPFS (`opfs://luc-joosten-portfolio.db`). If OPFS is missing or `open` fails, the app stays in-memory. After editing content modules, bump `contentRevision` so persisted browsers reseed.
6. `events` inserts (`page_path`, `ts`) only if `siteConfig.localEvents` is `true` (off by default).

Shareable project filters: `/projects?status=active&tag=Python&sort=title`. Defaults (`all` / `year`) are omitted from the URL.

## SEO

- Per-route titles, description, and canonical URL: `PageMeta` + `src/config/page-meta.ts`.
- JSON-LD: Person on Home/About, Article on writing detail, SoftwareApplication on project detail (`src/seo/json-ld.ts`).
- RSS: `public/rss.xml` — published writing only (title, link, description, pubDate). Linked from the Writing page, footer, and `index.html` alternate feed.
- Sitemap: `public/sitemap.xml` — static routes plus project and published writing ids. Base URL is `siteConfig.url`.

## Deploy (lucjoosten.nl)

Static SPA. Point the domain at the host, set the production URL to `https://lucjoosten.nl` (already in `siteConfig.url` and `index.html`).

**Vercel:** import the GitHub repo. Framework preset Vite. Output `dist`. `vercel.json` rewrites unknown paths to `index.html`. Attach `lucjoosten.nl` (and `www` if used) in the project domains.

**Netlify:** publish `dist`, build command `pnpm build`. `public/_redirects` is copied into `dist` (`/* /index.html 200`).

**GitHub Pages:** build `dist`, publish it, and copy `index.html` to `404.html` so client routes resolve. Set the site URL in Pages settings to the custom domain.

After deploy, confirm `/rss.xml`, `/sitemap.xml`, `/projects/<id>`, and `/writing/<id>` all serve the app or the generated XML — not a host 404.
