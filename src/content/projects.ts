import type { Project } from './types.ts'

export const projects: Project[] = [
  {
    id: 'codex-senior-devex',
    title: 'codex-senior-devex',
    summary:
      'Proposal-first Codex plugin for safe, evidence-driven full-stack repo setup.',
    description:
      'A local Codex plugin that equips product repositories for iterative, provable full-stack delivery with TypeScript/React, Python/FastAPI, Docker, Kubernetes and Bicep.\n\nInstead of dumping generic best practices on an agent, the plugin organizes work so knowledge is applied consistently: every change is small and testable, feedback runs through a single Taskfile entrypoint, and “done” is tied to executed evidence — not intentions. Setup is proposal-first with double opt-in before any write.',
    status: 'active',
    tags: ['Python', 'AI agents', 'DevEx', 'Codex', 'Taskfile'],
    featured: true,
    year: 2026,
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/lhajoosten/codex-senior-devex',
      },
    ],
  },
  {
    id: 'pullfrog-azure',
    title: 'Pullfrog Azure',
    summary:
      'Azure-first open-source AI coding agent for Azure DevOps pull requests.',
    description:
      'An Azure-native pull request agent aimed at real DevOps workflows: control plane, admin UI, runtime configuration, and contract foundations first — then Azure DevOps and model integrations.\n\nBuilt as a monorepo with Python/FastAPI, TypeScript UI, Task-driven quality gates, and Docker Compose for local development. Designed for evidence-minded PR automation rather than drive-by bot comments.',
    status: 'experimental',
    tags: ['Python', 'TypeScript', 'Azure', 'AI agents', 'DevOps'],
    featured: true,
    year: 2026,
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/lhajoosten/pullfrog-azure',
      },
    ],
  },
  {
    id: 'personal-website',
    title: 'Personal portfolio',
    summary:
      'This site: dual themes, content modules, and DuckDB-Wasm as a client-side query layer.',
    description:
      'Two programmatic themes (builder and editorial), TypeScript content modules, and DuckDB-Wasm for querying projects in the browser.\n\nBuilt as a production-minded foundation: strict TypeScript, config-driven themes, and a clear split between content, data access, and UI — not a one-off landing page.',
    status: 'active',
    tags: ['React', 'TypeScript', 'Vite', 'DuckDB', 'Tailwind'],
    featured: true,
    year: 2026,
    problem:
      'A personal site that needed two distinct visual systems without forking content or inventing a CMS.',
    approach:
      'Config-driven themes, TypeScript content modules, and DuckDB-Wasm as an in-browser query layer.',
    outcome:
      'Home, projects, writing, and contact share one data model; builder and editorial only change presentation.',
    highlights: [
      'Dual themes from one content model',
      'Client-side DuckDB seed and queries',
      'Static Vite build, no backend',
    ],
    links: [
      { label: 'Live', href: 'https://lucjoosten.nl' },
      {
        label: 'GitHub',
        href: 'https://github.com/lhajoosten/personal-website',
      },
    ],
  },
  {
    id: 'studdit',
    title: 'Studdit 2.0',
    summary:
      'Student project: a C# community platform for study-group style collaboration.',
    description:
      'Archived coursework exploring forum-style posting and a structured .NET backend. Kept as a marker of full-stack product work before the current AI/cloud focus — not a production product.',
    status: 'archived',
    tags: ['C#', '.NET', 'Full-stack', 'coursework'],
    featured: false,
    year: 2025,
    links: [
      { label: 'GitHub', href: 'https://github.com/lhajoosten/Studdit-2.0' },
    ],
  },
  {
    id: 'kramse-data-engineering',
    title: 'Kramse Data Engineering',
    summary: 'Coursework: Python ingest/transform experiments for data pipelines.',
    description:
      'Archived data-engineering exercises: ingest, transform, and reason about datasets in Python. Useful context for AI systems that need reliable data plumbing — labeled as coursework, not client work.',
    status: 'archived',
    tags: ['Python', 'Data engineering', 'coursework'],
    featured: false,
    year: 2025,
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/lhajoosten/Kramse-Data-Engineering',
      },
    ],
  },
  {
    id: 'meetme',
    title: 'MeetMe 2.0',
    summary:
      'Archived rewrite of a school meetup app: events, attendance, and a .NET API.',
    description:
      'A C# / .NET 9 rewrite of an older school project: create and join meetups with capacity and attendance status.\n\nThe interesting part was structure — Clean Architecture layers, CQRS, and tests — not a live product. Kept as archived full-stack/.NET work.',
    status: 'archived',
    tags: ['C#', '.NET', 'API', 'coursework'],
    featured: false,
    year: 2025,
    links: [
      { label: 'GitHub', href: 'https://github.com/lhajoosten/MeetMe-2.0' },
    ],
  },
  {
    id: 'task-manager',
    title: 'Task Manager v2',
    summary:
      'Archived full-stack task app: Angular UI with a C# / .NET API.',
    description:
      'A personal/school-style rewrite: tasks in an Angular frontend, API and domain logic in .NET (Clean Architecture layers), plus Docker Compose for local run.\n\nNot a production product. Kept as archived full-stack work across TypeScript UI and C# backend.',
    status: 'archived',
    tags: ['C#', '.NET', 'Angular', 'Full-stack', 'coursework'],
    featured: false,
    year: 2025,
    links: [
      { label: 'GitHub', href: 'https://github.com/lhajoosten/Task-Manager-v2' },
    ],
  },
]
