# Luc Joosten — portfolio

Personal site for [lucjoosten.nl](https://lucjoosten.nl): React 19, Vite, Tailwind CSS v4, React Router, DuckDB-Wasm. Two themes (`builder`, `editorial`) share one content model.

Positioning: Full-stack Software Engineer → AI Engineer + DevOps/Cloud. Tagline: _AI-powered software, engineered properly_.

## Scripts

```bash
pnpm install
pnpm dev            # local server (also writes rss/sitemap via Vite plugin)
pnpm test           # vitest
pnpm check          # oxlint + oxfmt --check + tsc -b
pnpm generate:site  # public/rss.xml + public/sitemap.xml
pnpm build          # tsc -b && vite build (includes feeds)
pnpm preview        # production dist, SPA fallback
```

Husky + lint-staged: oxfmt on staged files; `oxlint --fix` on `src/**/*.{ts,tsx}`.

## Routes

| Path                      | Source                       |
| ------------------------- | ---------------------------- |
| `/`                       | Home                         |
| `/projects`               | List + `?status=&tag=&sort=` |
| `/projects/:id`           | Project                      |
| `/writing`                | Published posts              |
| `/writing/:id`            | Post (Markdown body)         |
| `/about` `/contact`       | Static                       |
| `/rss.xml` `/sitemap.xml` | Generated on build/dev       |
| unknown                   | 404                          |

Command palette: `Ctrl/Cmd+K` (loaded on first use so DuckDB/wasm is not on the Home critical path). Empty query = pages. Typed query = DuckDB search over projects and writing.

## Themes

`html[data-theme]` (`builder` \| `editorial`). Tokens: `src/themes/tokens.css`. FOUC script in `index.html` + `localStorage` (`siteConfig.themeStorageKey`). Fonts are self-hosted (`@fontsource`, Latin weights actually used).

## Content workflow

Source of truth is files. DuckDB is a query cache.

| What                                      | Where                                         |
| ----------------------------------------- | --------------------------------------------- |
| Site meta, `persistDb`, `contentRevision` | `src/config/site.config.ts`                   |
| Projects                                  | `src/content/projects.ts`                     |
| Writing                                   | `src/content/posts/*.md` (frontmatter + body) |
| About                                     | `src/content/about.ts`                        |
| UI copy                                   | `src/content/site.ts`                         |

**Add a project:** append a `Project` in `projects.ts`. Featured items should include `summary`, `tags`, `status`, and `problem` / `approach` / `outcome`.

**Add a post:** create `src/content/posts/kebab-id.md`. Set `published: true` to ship. Cursor agents: `.cursor/skills/draft-writing/SKILL.md`. Then commit to `main`.

If `persistDb` is true, bump `contentRevision` after content changes.

`persistDb` defaults to **false** (in-memory). When true, DuckDB tries OPFS and falls back to memory. Content still lives in git.

## Search, RSS, sitemap, JSON-LD

- Search: `src/data/search.ts` (token AND + title-weighted rank). Palette falls back to the in-memory catalog if DuckDB fails.
- RSS: published writing only. Linked from Writing, footer, `index.html`.
- Sitemap: static routes + project ids + published writing ids. Base: `siteConfig.url`.
- JSON-LD: Person (Home/About), Article (writing), SoftwareApplication (project).
- `public/robots.txt` points at the sitemap.

## Performance notes

- **Intentional weight:** DuckDB-Wasm (~tens of MB of wasm, gzipped smaller) is loaded when a page queries content (Home featured list, project/writing lists) or when the command palette opens. Static chrome (About/Contact before palette) does not import the wasm graph from the layout.
- **Code splitting:** detail and secondary routes are `React.lazy`. Home stays eager.
- **Fonts:** self-hosted Latin files, `font-display` from Fontsource defaults. No Google Fonts round trip.
- **Theme boot:** inline `index.html` script sets `data-theme` before paint.
- Preview locally: `pnpm build && pnpm preview`. Aim for Lighthouse Performance ≥ 90; wasm download will dominate first visit on content pages.

## Deploy (primary: Vercel)

Closest path in-repo: `vercel.json` SPA rewrite.

1. Import `lhajoosten/personal-website` on Vercel. Framework: Vite. Build: `pnpm build`. Output: `dist`.
2. Vercel Git integration deploys `main`. This repo’s GitHub Actions **does not** deploy; it only gates quality (`pnpm check`, `pnpm test`, `pnpm build` on PR and `main`).
3. Domain: add `lucjoosten.nl` (and `www` if you use it) in Vercel → Domains. DNS: ALIAS/ANAME or A records as Vercel shows. Wait for HTTPS.
4. Confirm `siteConfig.url` stays `https://lucjoosten.nl`.

**Netlify fallback:** build `pnpm build`, publish `dist`. `public/_redirects` copies to `dist` (`/* /index.html 200`).

**GitHub Pages:** only if needed. Publish `dist` and copy `index.html` to `404.html` for SPA routes.

## Smoke checklist

After preview or production:

- [ ] `/` Home, theme toggle, featured projects, recent writing
- [ ] `/projects` filters + shareable URL
- [ ] `/projects/:id` case fields + related
- [ ] `/writing` RSS link
- [ ] `/writing/:id` TOC jumps, Markdown (headings, lists, links), read time
- [ ] Cmd/Ctrl+K search; Escape restores focus
- [ ] `/about` `/contact` (external links `noopener noreferrer`)
- [ ] Unknown path → 404 with Home + Projects
- [ ] `/rss.xml` `/sitemap.xml` `/robots.txt` are not a host 404
- [ ] Builder and editorial both readable (contrast, focus rings)
