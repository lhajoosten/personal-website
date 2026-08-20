---
name: draft-writing
description: Drafts, edits, and publishes Luc Joosten portfolio writing as Markdown files with YAML frontmatter in src/content/posts. Use when the user asks to write a post, draft an article, edit writing, publish or unpublish a piece, or add Markdown under src/content/posts.
---

# Draft writing

Authoritative writing lives in `src/content/posts/*.md`. Git commit to `main` publishes. DuckDB is only a cache — bump `siteConfig.contentRevision` after content changes if `persistDb` is on.

## When this applies

User wants a new post, a rewrite, a draft, or a publish toggle. Do not invent a CMS, OPFS-only posts, or a public web editor.

## File template

Filename: `kebab-case-id.md` matching `id`.

```markdown
---
id: kebab-case-id
title: Concrete title, no clickbait
summary: One or two sentences. The list-page hook.
publishedAt: YYYY-MM-DD
tags: ["Tag One", "Tag Two"]
published: false
layout: essay
---

Opening paragraph. No heading for the title (frontmatter owns it).

## Section

Body. Use `##` / `###` only. Lists, links, and fenced code are fine to write; the renderer currently treats non-heading blocks as paragraphs, so keep sections as paragraphs until the markdown subset grows.
```

`layout` is `essay` | `brief` | `log` (stored now; `essay` is the default voice). `published: false` until Luc asks to ship it.

## Voice

Match existing posts (`agents-propose-not-assume`, `models-are-dependencies`, `two-themes-one-content`):

- First person, engineer talking to engineers
- Short paragraphs. Specific claims. No “delve”, “landscape”, “leverage”, or demo-hype
- Honest about trade-offs. Prefer “this is slower in the hour, faster in the week”
- Topics: AI-assisted engineering, DevOps/cloud, architecture, keeping software honest after the demo

After writing, re-read once and cut filler.

## Workflow

1. Read one existing post for tone.
2. Create or edit the `.md` file. Do not also keep a duplicate in `writing.ts`.
3. Leave `published: false` unless Luc says publish.
4. If `persistDb` is true, bump `contentRevision` in `src/config/site.config.ts`.
5. Do not commit unless asked.
