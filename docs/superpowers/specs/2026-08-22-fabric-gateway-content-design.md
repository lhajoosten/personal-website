# Fabric Gateway content design

## Goal

Present Fabric abstraction gateway as active work on the portfolio without
claiming that the service already exists in production. The portfolio change is
content-only: it does not scaffold or implement the separate
`fabric-gateway` repository.

## Project entry

Add one `Project` entry to `src/content/projects.ts`:

- id: `fabric-gateway`
- title: `Fabric abstraction gateway`
- status: `active`
- year: 2026
- featured: true
- tags covering Python, FastAPI, Microsoft Fabric, Azure, and AI/cloud
- summary and description that frame the gateway as a stable async contract
  between consumer apps and Fabric
- problem, approach, outcome, and highlights derived from the supplied
  architecture

The copy must distinguish the design and intended repository from shipped
capabilities. No GitHub link is added until a repository URL is confirmed.

## Writing

Add two published Markdown posts under `src/content/posts`, loaded through the
existing `import.meta.glob` path:

1. An essay about why direct consumer-to-Fabric integrations break down:
   identity/item throttling, duplicated status polling, leaking Fabric IDs and
   tokens, and why a gateway owns the contract.
2. An essay about the gateway's load-bearing mechanics: one poller per Fabric
   job, Redis token buckets, capacity-aware backoff, fair-share admission,
   idempotency, and push fan-out.

Both pieces use first-person, engineer-to-engineer prose. They describe the
architecture as an active build and explicitly separate the v1 design from
verified production behavior.

## Data and verification

Posts remain authoritative Markdown files and are not duplicated in
`src/content/writing.ts`. `persistDb` is currently false, so
`contentRevision` does not change. Verify the change with the repository test
suite, `pnpm check`, and a focused search that confirms the new project and
both post IDs are present.

## Out of scope

- Creating `~/development/fabric-gateway`
- Implementing FastAPI, Fabric adapters, auth, workers, infrastructure, or
  migrations
- Inventing a repository URL, production metrics, or shipped integrations
