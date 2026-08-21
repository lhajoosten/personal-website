---
id: two-themes-one-content
title: Two visual systems, one content model
summary: Builder and editorial on this site share facts, routes, and DuckDB. The failure mode is forking pages per theme. The working model is tokens plus a few layout variants.
publishedAt: 2026-08-12
tags: ["Frontend", "Architecture", "Portfolio"]
published: true
layout: essay
---

I wanted two looks that are actually different, not a dark-mode palette swap. Builder is dark, bordered, mono. Editorial is light, typographic, slower. Same person, same projects, same writing. If the themes had drifted into two codebases, I would have built a museum of my own indecision.

The constraint was petty and useful: content modules must not know which theme is active. If a sentence in `src/content` mentioned “builder,” the abstraction had already leaked.

## Tokens first, pages second

`html[data-theme]` is the switch. Colors, fonts, radii, and max widths live in one token file. A FOUC script in `index.html` reads localStorage before React boots so the first paint is not a lie.

That gets you 80% of a theme. The other 20% is structure. Cards versus rows. A fat hero panel versus a display heading and a text link. I let components branch on `theme === "builder"` in a handful of places. I do not let routes branch. There is one Home, one project detail, one writing detail.

When a layout difference wants a new component tree, I ask whether it is a variant or a fork. A variant is a className and a heading size. A fork is a second `EditorialHome.tsx`. I have deleted the second kind.

## The data layer is theme-blind on purpose

Projects and writing go through DuckDB-Wasm. That sounds like a joke on a static portfolio. It is a deliberate one: queries, filters, and search should look like a product data layer even though the source of truth is files in git.

The important part for theming is negative. SQL, seed, and search ranking do not mention themes. If they did, I would be encoding a visual system into a cache.

Markdown posts are the writing source. Frontmatter is data. The body is text. The database still sees strings and tags. Editorial can feel like a magazine without a magazine CMS.

## Filters and URLs are shared facts

Project status and tags live in the query string so a link is a view. That has to work in both themes. The control chrome can look different. The meaning of `?status=archived` cannot.

This is the same rule as content modules. Presentation may fork a little. Facts may not.

## What I would not do again

I would not introduce a theme-aware markdown dialect. I would not hide archived student work in one theme and show it in the other. Honesty is a content policy, not a skin.

I would also not chase a third theme until the first two are boring to maintain. Two is already a product. Three is a hobby that eats the content model.

## Why this belongs next to the AI writing

A lot of AI-assisted UI work produces seven slightly different buttons and no source of truth. Dual theme was a small exercise in the opposite: one model of the site, two renderings, tests that do not care which font loaded.

If I cannot keep a portfolio coherent across two skins, I do not get to lecture anyone about agents and contracts. This is the boring proof for myself.
