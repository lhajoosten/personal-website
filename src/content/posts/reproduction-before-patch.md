---
id: reproduction-before-patch
title: A failing test is the incident, not the afterthought
summary: Autofix demos start with a generated patch. I want the opposite gate: reconstruct the crash as a test that fails on current code, then you may propose a fix.
publishedAt: 2026-08-21
tags: ["Incidents", "Testing", "AI agents"]
published: true
layout: essay
---

Autofix products sell the last mile: a stack trace in, a pull request out. The middle is usually a model that guesses at a patch and a test in the same breath, then waits for CI to argue. That is a reasonable product bet. It is a bad scientific one. You never know whether the model understood the bug or whether CI happened to turn green.

I am building Tracey around a smaller claim. The hard step is not writing the fix. The hard step is proving the production crash exists as a failing test in a sandbox, on the code as it is. Until that test fails for the right reason, generating a patch is theater.

## Why parallel generation cheats

If you generate the test and the patch together, they can agree with each other and still miss the incident. The test might assert the new behavior. The patch might implement that behavior. CI is happy. Production still dies on the old path.

A reproduction that must fail _before_ the patch is a different oracle. Pre-patch fail, post-patch pass. If you cannot get the first half, you do not get to claim the second.

That gate is slower. It also survives throwing the patch away. A failing repro is a document you can hand a human. A discarded model diff is not.

## What “reproduction-first” actually means

Capture enough context to reconstruct: runtime, inputs that are safe to keep, the stack, the version. Scrub the rest. Fingerprint so you do not spawn ten pipelines for one crash. Then spend the budget on a sandbox run that is supposed to fail.

I do not need a dashboard for that idea to be true. I need a state I can name — something like `REPRO_CONFIRMED` — that the rest of the pipeline is not allowed to skip. Patch generation, guardrails, verification, draft PR: all of that is downstream of a red test.

Tracey is still phase 0: design and directories, no SDK, no worker. Putting it on this site as experimental is the honest status. The article is the gate. The repo is the bet that the gate is worth building.

## Agents already taught me this shape

Proposal-first agents and reproduction-first incidents are the same protocol with different objects. Show the write set before you apply. Show the failing test before you generate a fix. Evidence in the same loop, or you are narrating.

I would rather ship a pipeline that sometimes stops at “we reproduced it” than one that always opens a PR. The demo can keep the magic patch. My default is the boring confirmation.
