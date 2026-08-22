---
id: fabric-gateway-contract
title: Fabric integrations need a boundary
summary: Direct consumer-to-Fabric integrations make every app understand provider-specific limits, identities, and job semantics. I am designing a gateway so consumers can depend on one async contract instead.
publishedAt: 2026-08-22
tags: ["Microsoft Fabric", "Architecture", "AI agents", "Azure"]
published: true
layout: essay
---

Most Fabric integrations start as a small function: submit a job, keep the identifier, and poll until it finishes. That shape is fine for one app and one workspace. It becomes a shared systems problem when several consumer apps do the same thing against the same items.

Each consumer brings its own credentials, its own retry policy, and its own idea of how often status should be checked. The work is duplicated, but the pressure is not. Fabric sees many identities asking about the same item, and a provider limit that looked generous in isolation becomes a queue nobody owns.

I am designing fabric-gateway around that boundary. Consumers call a logical operation such as `sales.daily_refresh`. They do not receive a Fabric workspace ID, carry a Fabric token through their code, or learn which raw 429 variant means “wait” and which means “the capacity is full.”

## The contract is the product

The gateway's public surface is deliberately boring: submit an asynchronous run, read its canonical status, cancel it, discover allowed operations, and subscribe to changes. The response is a gateway record backed by Postgres or Redis, not a live call to Fabric made during every `GET`.

That distinction matters. A consumer should be able to retry a status read without multiplying load on the provider. It should see `Queued`, `Submitted`, `Running`, `Succeeded`, `Failed`, `Cancelled`, or `TimedOut`, even if Fabric's job vocabulary changes underneath. The gateway translates provider behavior once, at the edge where it has enough context to do so consistently.

The operation catalog is the authorization unit as well as the naming layer. An entry maps a consumer-friendly name to an environment, workspace, item, job type, and parameter schema. Grants decide which consumers may call it. Fabric identifiers stay in that catalog and never become part of every downstream app's configuration.

## Authentication has two directions

Inbound authentication identifies the consumer app and its grants. Outbound authentication identifies the gateway to Fabric. Those are different trust decisions, and combining them into “the API has a token” hides the part that tends to become operationally expensive.

The intended default is a managed identity for the gateway, with a Key Vault-backed service principal certificate for environments that need a different tenant boundary. Token caches and scopes are gateway concerns. A consumer gets a stable permission model instead of a credential plumbing exercise for every Fabric surface.

This also gives the gateway somewhere honest to enforce quotas. A consumer can have a rate limit, a concurrency limit, and a set of allowed operations without knowing how those limits map to Fabric's per-identity and per-item budgets.

## The honest status

This is active architecture work, not a running service I can hand you a URL for. The v1 design still needs an implementation, a fake Fabric that reproduces the failure modes, and a real workspace test to prove that coalescing reduces pressure without hiding useful state.

That gap is part of the design. A gateway is not valuable because it adds another HTTP hop. It is valuable only if it owns the contract, the credentials, and the coordination that direct integrations keep rediscovering in each consumer. The first thing to build is therefore not another adapter. It is evidence that the boundary changes the load shape.
