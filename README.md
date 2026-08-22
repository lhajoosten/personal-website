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

## Deploy (Vercel)

Static Vite SPA. Use the project `*.vercel.app` URL for now. Attach `lucjoosten.nl` later — no DNS in this pass.

### Import checklist

Copy these on first import (also set in `vercel.json`):

1. [ ] Vercel → Add New → Project → import GitHub `lhajoosten/personal-website`
2. [ ] Framework Preset: **Vite**
3. [ ] Build Command: `pnpm build`
4. [ ] Output Directory: `dist`
5. [ ] Install Command: `pnpm install` (`package.json` has `"packageManager": "pnpm@11.18.0"`)
6. [ ] Production Branch: `main` (auto-deploy on push)
7. [ ] Deploy and copy the `*.vercel.app` URL. Do not add a custom domain yet.

GitHub Actions still only gates quality (`pnpm check`, `pnpm test`, `pnpm build` on PR and `main`). It does not deploy.

Contact form posts to `/api/contact` (Vercel Function). Set `RESEND_API_KEY` (and optionally `CONTACT_TO_EMAIL`, default Outlook from `siteConfig`) in the Vercel project. SPA rewrites skip `/api/`.

Client routes rewrite to `/index.html`. Vercel serves real files in `dist` first; the rewrite also skips `/rss.xml`, `/sitemap.xml`, `/robots.txt`, `/favicon.svg`, `/og.svg`, and `/assets/*` (hashed JS/CSS, DuckDB wasm/workers).

### Canonical URL

Keep `siteConfig.url` as `https://lucjoosten.nl`. Canonical tags, Open Graph, RSS, sitemap, and `robots.txt` stay on that host on purpose so SEO is not baked to the preview hostname. Until the domain is connected, those URLs will not match the live `*.vercel.app` origin.

**Netlify fallback:** build `pnpm build`, publish `dist`. `public/_redirects` copies to `dist` (`/* /index.html 200`).

**GitHub Pages:** only if needed. Publish `dist` and copy `index.html` to `404.html` for SPA routes.

## Smoke checklist

Against the `*.vercel.app` URL (or `pnpm preview` locally):

- [ ] `/` Home, theme toggle (builder + editorial), featured projects, recent writing
- [ ] Refresh `/projects/:id` — same project, not a host 404
- [ ] `/writing` and `/writing/:id`
- [ ] Cmd/Ctrl+K search; Escape restores focus
- [ ] `/projects` filters + shareable URL
- [ ] `/about` `/contact` — form + GitHub/LinkedIn/email; after `RESEND_API_KEY` is set, a test submit arrives in Outlook
- [ ] Unknown path → in-app 404 with Home + Projects
- [ ] `/rss.xml` `/sitemap.xml` `/robots.txt` `/favicon.svg` `/og.svg` are files, not `index.html`
- [ ] Both themes readable (contrast, focus rings)
