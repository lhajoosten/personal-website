import type { Project } from "./types.ts";

export const projects: Project[] = [
  {
    id: "fabric-gateway",
    title: "Fabric abstraction gateway",
    summary:
      "A stable async gateway between consumer apps and Microsoft Fabric, absorbing identity, throttling, capacity, and provider-specific failure modes.",
    description:
      "I am designing fabric-gateway as the boundary between consumer apps and any Microsoft Fabric environment. Consumers submit logical operations and receive a stable async contract; they never need Fabric workspace IDs, tokens, or raw 429 semantics.\n\nThe gateway owns the awkward middle: Entra authentication, per-identity and per-item throttling, capacity-aware backoff, one poller per Fabric job, and fan-out through webhooks or SSE. The intended v1 is a FastAPI API plus a worker, with Postgres for durable state and Redis for coordination and rate limiting.\n\nThis is active architecture work, not a shipped service. The claim I am testing is that a gateway can make Fabric integrations predictable without pretending the underlying limits do not exist.",
    status: "active",
    tags: ["Python", "FastAPI", "Microsoft Fabric", "Azure", "AI agents"],
    featured: true,
    year: 2026,
    problem:
      "Direct Fabric integrations multiply status polling across consumer apps and leak provider-specific identities, limits, and error semantics into every caller.",
    approach:
      "Expose logical operations and canonical run states while centralizing outbound auth, coalesced polling, Redis-backed throttling, capacity backoff, fair-share admission, and push fan-out.",
    outcome:
      "A concrete v1 design for a plug-and-play Fabric boundary, with the hard production claims still to be proven through implementation and load testing.",
    highlights: [
      "Stable async contract over Fabric jobs and queries",
      "Exactly one reconciler per Fabric job instance",
      "Consumer isolation from Fabric IDs, tokens, and 429 taxonomy",
    ],
  },
  {
    id: "codex-senior-devex",
    title: "codex-senior-devex",
    summary: "Proposal-first Codex plugin for safe, evidence-driven full-stack repo setup.",
    description:
      "A local Codex plugin that equips product repositories for iterative, provable full-stack delivery with TypeScript/React, Python/FastAPI, Docker, Kubernetes and Bicep.\n\nInstead of dumping generic best practices on an agent, the plugin organizes work so knowledge is applied consistently: every change is small and testable, feedback runs through a single Taskfile entrypoint, and “done” is tied to executed evidence — not intentions. Setup is proposal-first with double opt-in before any write.",
    status: "active",
    tags: ["Python", "AI agents", "DevEx", "Codex", "Taskfile"],
    featured: true,
    year: 2026,
    problem:
      "Coding agents dump generic advice and write before anyone agrees on the change set. “Done” becomes a claim, not a command that ran.",
    approach:
      "A local Codex plugin that structures full-stack setup as small, testable steps: TypeScript/React, Python/FastAPI, Docker, Kubernetes, and Bicep, with a single Taskfile entrypoint and proposal-first double opt-in before writes.",
    outcome:
      "Repos get a consistent DevEx loop: proposed write sets, executed checks, and evidence in the same session — not a pile of undocumented agent edits.",
    highlights: [
      "Proposal-first apply with double opt-in",
      "Taskfile as the only “done” entrypoint",
      "Typed stacks instead of generic agent lore",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/lhajoosten/codex-senior-devex",
      },
    ],
  },
  {
    id: "pullfrog-azure",
    title: "Pullfrog Azure",
    summary: "Azure-first open-source AI coding agent for Azure DevOps pull requests.",
    description:
      "An Azure-native pull request agent aimed at real DevOps workflows: control plane, admin UI, runtime configuration, and contract foundations first — then Azure DevOps and model integrations.\n\nBuilt as a monorepo with Python/FastAPI, TypeScript UI, Task-driven quality gates, and Docker Compose for local development. Designed for evidence-minded PR automation rather than drive-by bot comments.",
    status: "experimental",
    tags: ["Python", "TypeScript", "Azure", "AI agents", "DevOps"],
    featured: true,
    year: 2026,
    problem:
      "PR bots that comment without a control plane, contracts, or Azure-native workflow. Automation that cannot be configured or evidenced is just noise in a pull request.",
    approach:
      "An Azure-first monorepo: Python/FastAPI control plane, TypeScript admin UI, Docker Compose for local run, and Task-driven quality gates before Azure DevOps and model integrations.",
    outcome:
      "A foundation for evidence-minded PR automation — runtime config and contracts first — rather than a drive-by comment bot.",
    highlights: [
      "Control plane and admin UI before the bot personality",
      "Compose + Taskfile local loop",
      "Azure DevOps as the target workflow, not a bolt-on",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/lhajoosten/pullfrog-azure",
      },
    ],
  },
  {
    id: "personal-website",
    title: "Personal portfolio",
    summary:
      "This site: dual themes, content modules, and DuckDB-Wasm as a client-side query layer.",
    description:
      "Two programmatic themes (builder and editorial), TypeScript content modules, and DuckDB-Wasm for querying projects in the browser.\n\nBuilt as a production-minded foundation: strict TypeScript, config-driven themes, and a clear split between content, data access, and UI — not a one-off landing page.",
    status: "active",
    tags: ["React", "TypeScript", "Vite", "DuckDB", "Tailwind"],
    featured: true,
    year: 2026,
    problem:
      "A personal site that needed two distinct visual systems without forking content or inventing a CMS.",
    approach:
      "Config-driven themes, TypeScript content modules, and DuckDB-Wasm as an in-browser query layer.",
    outcome:
      "Home, projects, writing, and contact share one data model; builder and editorial only change presentation.",
    highlights: [
      "Dual themes from one content model",
      "Client-side DuckDB seed and queries",
      "Static Vite build, no backend",
    ],
    links: [
      { label: "Live", href: "https://lucjoosten.nl" },
      {
        label: "GitHub",
        href: "https://github.com/lhajoosten/personal-website",
      },
    ],
  },
  {
    id: "studdit",
    title: "Studdit 2.0",
    summary: "Student project: a C# community platform for study-group style collaboration.",
    description:
      "Archived coursework exploring forum-style posting and a structured .NET backend. Kept as a marker of full-stack product work before the current AI/cloud focus — not a production product.",
    status: "archived",
    tags: ["C#", ".NET", "Full-stack", "coursework"],
    featured: false,
    year: 2025,
    links: [{ label: "GitHub", href: "https://github.com/lhajoosten/Studdit-2.0" }],
  },
  {
    id: "kramse-data-engineering",
    title: "Kramse Data Engineering",
    summary: "Coursework: Python ingest/transform experiments for data pipelines.",
    description:
      "Archived data-engineering exercises: ingest, transform, and reason about datasets in Python. Useful context for AI systems that need reliable data plumbing — labeled as coursework, not client work.",
    status: "archived",
    tags: ["Python", "Data engineering", "coursework"],
    featured: false,
    year: 2025,
    links: [
      {
        label: "GitHub",
        href: "https://github.com/lhajoosten/Kramse-Data-Engineering",
      },
    ],
  },
  {
    id: "meetme",
    title: "MeetMe 2.0",
    summary: "Archived rewrite of a school meetup app: events, attendance, and a .NET API.",
    description:
      "A C# / .NET 9 rewrite of an older school project: create and join meetups with capacity and attendance status.\n\nThe interesting part was structure — Clean Architecture layers, CQRS, and tests — not a live product. Kept as archived full-stack/.NET work.",
    status: "archived",
    tags: ["C#", ".NET", "API", "coursework"],
    featured: false,
    year: 2025,
    links: [{ label: "GitHub", href: "https://github.com/lhajoosten/MeetMe-2.0" }],
  },
  {
    id: "task-manager",
    title: "Task Manager v2",
    summary: "Archived full-stack task app: Angular UI with a C# / .NET API.",
    description:
      "A personal/school-style rewrite: tasks in an Angular frontend, API and domain logic in .NET (Clean Architecture layers), plus Docker Compose for local run.\n\nNot a production product. Kept as archived full-stack work across TypeScript UI and C# backend.",
    status: "archived",
    tags: ["C#", ".NET", "Angular", "Full-stack", "coursework"],
    featured: false,
    year: 2025,
    links: [{ label: "GitHub", href: "https://github.com/lhajoosten/Task-Manager-v2" }],
  },
  {
    id: "pipeline-pro",
    title: "Pipeline-Pro",
    summary: "Archived Avans assignment: design patterns modeled in TypeScript.",
    description:
      "Software Design & Architecture (SOA3) coursework with Erdem Pekguzel: Adapter, Factory, Observer, State, Template, and Visitor in TypeScript, with Jest coverage.\n\nNot a product. Kept as archived design-pattern / DevOps-course work from 2023.",
    status: "archived",
    tags: ["TypeScript", "Design patterns", "Jest", "coursework"],
    featured: false,
    year: 2023,
    links: [{ label: "GitHub", href: "https://github.com/lhajoosten/Pipeline-Pro" }],
  },
  {
    id: "client-side-programming",
    title: "Client-side programming",
    summary: "Archived 2019 Vue SPA: async task manager with a Node API.",
    description:
      "Second-year individual assignment: a Vue SPA (Vue Router, Vuex) for an asynchronous task manager, with Express and MongoDB behind it, plus an Azure Pipeline.\n\nEarly full-stack coursework. Kept as archived client-side work from 2019.",
    status: "archived",
    tags: ["Vue", "Node.js", "MongoDB", "SPA", "coursework"],
    featured: false,
    year: 2019,
    links: [{ label: "GitHub", href: "https://github.com/lhajoosten/Client-side-programming" }],
  },
  {
    id: "server-side-programming",
    title: "Server-side programming",
    summary: "Archived 2019 ASP.NET app: chef/customer GUIs and a REST API.",
    description:
      "Second-year individual assignment (EasyMeal): CRUD UI for a chef, a customer UI to order meals from weekly plans, and Level 2/3 REST APIs in ASP.NET Core, with Azure CI.\n\nEarly server-side coursework. Kept as archived .NET work from 2019.",
    status: "archived",
    tags: ["C#", "ASP.NET", "REST", "coursework"],
    featured: false,
    year: 2019,
    links: [{ label: "GitHub", href: "https://github.com/lhajoosten/Server-side-programming" }],
  },
];
