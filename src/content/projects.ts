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
      'Themeable React portfolio with DuckDB-Wasm as the in-browser content layer.',
    description:
      'This site. Two programmatic themes (builder and editorial), content in TypeScript modules, and DuckDB-Wasm for querying projects and writing in the browser.\n\nBuilt as a production-minded foundation: strict TypeScript, config-driven themes, and a clear split between content, data access, and UI — not a one-off landing page.',
    status: 'active',
    tags: ['React', 'TypeScript', 'Vite', 'DuckDB', 'Tailwind'],
    featured: true,
    year: 2026,
    links: [
      { label: 'Live', href: 'https://lucjoosten.nl' },
      {
        label: 'GitHub',
        href: 'https://github.com/lhajoosten/personal-website',
      },
    ],
  },
  {
    id: 'ragvise-ai',
    title: 'Ragvise AI',
    summary:
      'Retrieval-augmented platform experiments for Microsoft certification mastery.',
    description:
      'A RAG-oriented learning platform exploring knowledge graphs, MCP, and structured retrieval for certification prep.\n\nFocus areas: grounding answers in official material, evaluation loops, and keeping the “AI layer” accountable to sources rather than free-form hallucination.',
    status: 'experimental',
    tags: ['TypeScript', 'RAG', 'MCP', 'LLM'],
    featured: false,
    year: 2026,
    links: [
      { label: 'GitHub', href: 'https://github.com/lhajoosten/ragvise-ai' },
    ],
  },
  {
    id: 'scrumio',
    title: 'Scrumio',
    summary:
      'Agentic spec-interview app that turns conversation into structured PBIs.',
    description:
      'FastAPI + React application that uses an agentic interview flow to produce structured product backlog items from natural conversation.\n\nAn early exploration of how LLMs fit into real delivery artifacts — not chat for its own sake, but conversation that becomes backlog-ready output.',
    status: 'experimental',
    tags: ['TypeScript', 'Python', 'FastAPI', 'React', 'AI'],
    featured: false,
    year: 2026,
    links: [
      { label: 'GitHub', href: 'https://github.com/lhajoosten/scrumio' },
    ],
  },
  {
    id: 'studdit',
    title: 'Studdit 2.0',
    summary:
      'C# student community platform — forum-style collaboration for study groups.',
    description:
      'Archived student project exploring community features, content posting, and a structured backend in C#/.NET.\n\nKept as a marker of full-stack product work before the current AI and cloud focus.',
    status: 'archived',
    tags: ['C#', '.NET', 'Full-stack'],
    featured: false,
    year: 2025,
    links: [
      { label: 'GitHub', href: 'https://github.com/lhajoosten/Studdit-2.0' },
    ],
  },
]
