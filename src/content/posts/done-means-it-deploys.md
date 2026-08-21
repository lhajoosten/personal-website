---
id: done-means-it-deploys
title: If it is not deployable, it is not done
summary: Demos and local happy paths are not delivery. I count work finished when someone else can run it, see it fail, and know who owns the failure.
publishedAt: 2026-08-08
tags: ["DevOps", "Azure", "Engineering"]
published: true
layout: essay
---

I have a folder of school projects that “worked on my machine” and a smaller set I would still clone. The difference is rarely the language. It is whether there is a way to run, a way to check, and a way to put it somewhere that is not a laptop.

AZ-900 and AI-900 named things I already suspected: identity, regions, what “managed” actually means, why a notebook is not a production surface. The work I care about next (AI-102, AZ-104, CKAD) is the same idea with less multiple choice and more “this box is on fire.”

## Local run is a contract

Docker Compose is not sophistication. It is a contract you can hand a teammate at 17:00. Environment variables listed. Ports listed. A command that is not a paragraph of folklore.

I still write Compose files that are slightly embarrassing. That is fine. What I will not do is call a system done when the README says “install these six globals and pray the Python version matches mine.”

The same rule applies to agents. If the only way to verify the change is the agent’s memory of having run a command, it did not run. Put the command in a Taskfile or `package.json` and make the agent use that name.

## Infra as text, not as a click trail

I like Bicep because it is reviewable. A portal screenshot is not a PR. Pullfrog-style Azure work taught me the obvious lesson the hard way: if the module is not parameterized, you do not have reuse, you have copy-paste with a resource group name changed.

CI is how you stop lying to yourself. GitHub Actions that validate Bicep or run `pnpm check` on this site are not “enterprise.” They are a second machine that does not share your node_modules.

I am not going to pretend I run multi-region failover for a personal site. I am going to pretend even less that a green local build is the same as a deploy. Vercel, Netlify, Pages: pick one, attach lucjoosten.nl, confirm the ugly URLs work. `/writing/some-id` must not 404 because the host does not know about SPAs. That check is part of done.

## Observability at the size you actually are

On a portfolio, observability is mostly: did the deploy happen, does the feed exist, does the app boot. On an API, it is request logs, status codes, and a timeout you can find.

I do not start with a vendor APM. I start with “what will I grep at 23:00.” If the answer is nothing, I am flying without instruments. Add the smallest log that tells me which dependency failed. Then stop.

AI systems need one extra line: which model and prompt version. Without that, you cannot tell a code regression from a provider regression. That is not MLOps branding. That is basic incident hygiene.

## Ownership is the part school skips

Archived coursework is honest about being coursework. I keep those repos public and labeled archived so I do not launder them into “production systems I ran.” The production standard I want to be judged on is the stuff I will still change: this site, the Azure modules, the agent workflow experiments.

Done means I know who gets the alert. For a personal project, that person is me. If I cannot explain how it ships and how I would know it broke, I am not finished. I am demoing.

## The through-line

Agents, models, RAG, themes: all of them fail the same way when you skip the last mile. The demo looks alive. The repo is not runnable. The cloud is a screenshot.

I would rather ship a smaller surface that deploys, checks, and fails out loud. That is the “engineered properly” line. It is not a slogan. It is a definition of done I can actually use.
