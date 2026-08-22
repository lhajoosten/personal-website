# Fabric Gateway Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Fabric abstraction gateway as active portfolio work and publish two honest technical essays about its design.

**Architecture:** Keep project metadata in `src/content/projects.ts` and writing in Markdown files loaded by the existing glob in `src/content/writing.ts`. This change describes the proposed gateway and its boundaries; it does not create or implement the separate Python repository.

**Tech Stack:** TypeScript content modules, Markdown with YAML frontmatter, Vite import glob, Vitest, oxlint, oxfmt, TypeScript.

## Global Constraints

- Use project id `fabric-gateway`, title `Fabric abstraction gateway`, status `active`, year `2026`, and `featured: true`.
- Do not invent a GitHub URL, production metrics, or shipped integrations.
- Publish exactly two posts with `published: true`; keep them first-person and engineer-to-engineer.
- Do not duplicate posts in `src/content/writing.ts`.
- `persistDb` is false, so do not change `contentRevision`.
- Do not create `~/development/fabric-gateway` or implement the service.

---

### Task 1: Add the active project entry

**Files:**

- Modify: `src/content/projects.ts`

**Produces:** A complete `Project` object describing the stable async gateway contract, its Fabric throttling and identity problem, the proposed architecture, honest current outcome, and concise highlights. Omit `links` until a repository URL exists.

- [ ] **Step 1: Insert the project object before the existing active projects.**
- [ ] **Step 2: Run `pnpm check` and confirm formatting, lint, and types pass.**
- [ ] **Step 3: Commit the project entry with message `Add Fabric Gateway as active portfolio work`.**

### Task 2: Publish the two Fabric Gateway essays

**Files:**

- Create: `src/content/posts/fabric-gateway-contract.md`
- Create: `src/content/posts/fabric-gateway-load-bearing-mechanics.md`

**Produces:** Two independent posts with unique kebab-case IDs, valid frontmatter, and no duplicated TypeScript content.

- [ ] **Step 1: Write `fabric-gateway-contract.md` about duplicated Fabric polling, leaked provider details, and the stable consumer-facing contract.**
- [ ] **Step 2: Write `fabric-gateway-load-bearing-mechanics.md` about coalesced polling, Redis budgets, capacity backoff, fair-share admission, idempotency, and push fan-out.**
- [ ] **Step 3: Re-read both posts and cut filler while preserving explicit design-versus-production honesty.**
- [ ] **Step 4: Run `pnpm test` and confirm the writing catalog and all existing tests pass.**
- [ ] **Step 5: Run `pnpm check` and confirm formatting, lint, and types pass.**
- [ ] **Step 6: Commit both posts with message `Publish Fabric Gateway design essays`.**

### Task 3: Verify the complete content change

**Files:**

- Test: `src/content/writing.test.ts`
- Verify: `src/content/projects.ts`, `src/content/posts/fabric-gateway-contract.md`, `src/content/posts/fabric-gateway-load-bearing-mechanics.md`

- [ ] **Step 1: Run `pnpm test` and confirm all test files and tests pass.**
- [ ] **Step 2: Run `pnpm check` and confirm lint, formatting, and TypeScript pass.**
- [ ] **Step 3: Run `rg -n 'fabric-gateway|Fabric abstraction gateway' src/content` and confirm the project entry and both post IDs are present.**
- [ ] **Step 4: Review `git diff origin/main...HEAD` and create the pull request from the content branch into `main`.**
