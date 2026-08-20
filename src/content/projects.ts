import type { Project } from './types.ts'

export const projects: Project[] = [
  {
    id: 'portfolio',
    title: 'Personal portfolio',
    summary:
      'A themeable React portfolio with client-side DuckDB as the content data layer.',
    description:
      'This site. Two programmatic themes (builder and editorial), content in TypeScript modules, and DuckDB-Wasm for querying projects in the browser. Built as a production-ready foundation rather than a one-off landing page.',
    status: 'active',
    tags: ['React', 'TypeScript', 'Vite', 'DuckDB', 'Tailwind'],
    featured: true,
    year: 2026,
    links: [
      { label: 'Live', href: 'https://lucjoosten.nl' },
      { label: 'GitHub', href: 'https://github.com/lhajoosten' },
    ],
  },
  {
    id: 'studdit',
    title: 'Studdit 2.0',
    summary:
      'A C# student community platform — forum-style collaboration for study groups.',
    description:
      'Archived student project exploring community features, content posting, and a structured backend in C#. Kept here as a marker of full-stack product work before the current AI/cloud focus.',
    status: 'archived',
    tags: ['C#', '.NET', 'Full-stack'],
    featured: true,
    year: 2026,
    links: [{ label: 'GitHub', href: 'https://github.com/lhajoosten/Studdit-2.0' }],
  },
  {
    id: 'kramse-data-engineering',
    title: 'Kramse Data Engineering',
    summary:
      'Python data-engineering coursework and pipeline experiments.',
    description:
      'Archived data-engineering work: ingest, transform, and reason about datasets in Python. Useful context for the move toward AI systems that need reliable data plumbing.',
    status: 'archived',
    tags: ['Python', 'Data engineering'],
    featured: false,
    year: 2026,
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/lhajoosten/Kramse-Data-Engineering',
      },
    ],
  },
  {
    id: 'agent-tooling',
    title: 'Agent-native engineering practice',
    summary:
      'Experimental notes and tooling around AI-assisted software delivery — with engineering discipline.',
    description:
      'A living experiment: how to use coding agents without giving up code quality, reviews, or operational ownership. Not a product yet — a practice lab for AI engineering plus DevOps.',
    status: 'experimental',
    tags: ['AI', 'DevOps', 'Tooling'],
    featured: true,
    year: 2026,
  },
]
