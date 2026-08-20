---
id: agents-propose-not-assume
title: The agent should propose, not assume
summary: Permissionless agents look fast in a demo. In a real repo they spend your week on silent side effects. Proposal-first is slower in the hour and faster in the week.
publishedAt: 2026-08-20
tags: ["AI agents", "DevEx", "Engineering"]
published: true
layout: essay
---

Most coding-agent demos optimize for the same shot: the model opens files, rewrites them, runs a command, and announces that it is done. The human is a spectator with a veto they will use too late. That is a good demo. It is a bad default for a repository you still have to own on Monday.

I do not want an agent that “just does it.” I want one that shows the write set, waits for an acknowledgement, then applies. The extra confirmation is not ceremony. It is the difference between reviewing a diff and reconstructing one from git after something else moved.

## What permissionless actually costs

A wrong write is cheap in a toy repo. It is expensive in anything with generated files, lockfiles, local secrets, or two packages that share a name. Agents are good at looking locally coherent and globally rude: they “fix” a type error by weakening a contract, they “clean up” an import and drop a side effect, they format a file your formatter already owned and turn the PR into noise.

The cost is not one revert. It is trust. After two silent edits you stop reading the agent and start grepping the tree. That is slower than asking it to propose.

I have been using agents the way I use any sharp tool. They are in the loop for this site, for Azure/Bicep work, for the Codex-style DevEx experiments. The sessions that stay useful are the ones where I still know which files changed and why. The sessions that go bad share a pattern: the model wrote first and explained later, and the explanation was a story about intent rather than a list of paths.

## Proposal-first is a boring protocol

The protocol is small on purpose.

The agent reads. It names the files it wants to touch, and what kind of change each one is: add, edit, delete. It does not apply yet. I look at that list the way I look at a PR description. If the list is wrong, we stop. If the list is right, I acknowledge, and only then does the tool write.

That is double opt-in: once on the plan, once on the apply. It feels heavy until you have watched an agent “helpfully” rewrite a file you had open for a different reason.

I do not need a special UI for this. A short list in the chat is enough. What I need is the default to be propose-then-apply, not apply-then-apologize.

## Evidence belongs in the same loop

“Done” from a model is a claim. “Done” from a repo is a command that exited zero.

If the work is TypeScript, the bar is the check I already run: lint, format, types. If the work is infra, the bar is validate-and-plan, not “the Bicep looks right.” If the work is a test, the bar is the test run, not a paragraph about coverage.

I want that evidence in the same turn as the apply. An agent that patches code and then “would have run the tests” is doing theater. An agent that runs the entrypoint you already documented, and pastes the tail of the log, is doing engineering.

This is why I care about Taskfiles, `pnpm check`, and CI that is not optional. Agents are opportunistic. They will skip the slow path if the slow path is tribal knowledge. If the slow path is a named script, they can be made to use it.

## What I still do myself

Proposal-first does not mean I stop thinking. Architecture, naming, and “should this exist” stay human. The agent is strong at the mechanical middle: wiring a type through a mapper, repeating a pattern across three files, drafting a test that I will still edit.

I also do not let it own secrets, production config, or anything that looks like a credential even in a comment. That is not a vibe. That is a blast-radius rule.

The honest limit: a local agent on a portfolio is not the same as an agent in a company monorepo with compliance. The protocol still transfers. Show the writes. Wait. Apply. Prove.

## Why this is the article I keep rewriting

I keep seeing the same product pitch: agents that take your repo and return a PR while you get coffee. Sometimes that works. When it fails, it fails as a pile of unrelated diffs and a confident summary.

I would rather ship an hour slower and a week cleaner. The demo can keep the permissionless loop. My default is the other one.
