---
id: fabric-gateway-load-bearing-mechanics
title: The useful part of a Fabric gateway is coordination
summary: An API wrapper does not solve Fabric throttling. The hard value is shared polling, capacity-aware backoff, fair admission, and reliable fan-out across consumers.
publishedAt: 2026-08-22
tags: ["Microsoft Fabric", "Distributed systems", "DevOps", "Azure"]
published: true
layout: essay
---

The easy version of a Fabric gateway has an API, a worker, and a database. The hard version has to decide who is allowed to ask Fabric what, when, and how many times. That coordination is the part I am designing first because another HTTP wrapper would only move the same retry loops to a different repository.

The central rule is simple: one Fabric job instance gets one reconciler. If five consumers care about the same run, they should not create five status pollers. The gateway stores the run state, leases reconciliation to one worker, and fans the state change out to the interested consumers. Subscribers multiply notifications, not Fabric traffic.

## Budgets need a shared owner

The rate limiter is keyed by the things Fabric actually constrains: identity, item, and operation class. Submit and status checks get separate budgets. A noisy status loop should not be able to starve new work, and a `Retry-After` response should change the budget rather than disappear into one caller's retry helper.

Redis is a useful coordination layer for that job. The intended implementation uses Lua-backed token buckets so checking and consuming a budget is one operation. The key is not Redis itself. The key is that every worker and every request path consults the same budget before creating pressure outside the gateway.

Not every 429 means the same thing. `RequestBlocked` is a rate signal and should honor the provider's delay. `CapacityLimitExceeded` says the capacity is exhausted; sending the same request again a moment later is not a recovery strategy. In that case runs stay queued behind a capacity circuit breaker, with an honest retry hint for the consumer.

## Fairness belongs before submission

Retries are not fairness. If one consumer fills the queue, a later consumer should not have to wait for that app's backlog to drain just because both are technically valid callers. The dispatcher needs fair-share admission across consumers, per-operation concurrency caps, and enough priority handling to make the queue behavior explainable.

Idempotency closes the other side of the problem. A client retrying after a network timeout must not create a second Fabric job simply because it did not receive the first `202`. An idempotency key belongs in durable state, with a fast path in Redis, so the gateway can return the existing run record instead of asking Fabric to do duplicate work.

## Push is downstream of truth

Webhooks and SSE are useful only after the gateway has a trustworthy run state. The worker persists the transition, publishes an event for connected SSE clients, and places webhook delivery in a transactional outbox. Delivery is at-least-once, signed, retryable, and replayable from a dead-letter queue. Consumers still need idempotent handlers; “push” does not remove distributed-systems rules.

Fabric job events can accelerate reconciliation when an Eventstream route is available. They are an input to the same state machine, not a second source of truth with a different status vocabulary. Polling remains the safety net until event latency and delivery behavior have been measured in a real environment.

## What still needs proof

The design claims fewer provider calls under fan-out, cleaner isolation between consumers, and less useless retrying during capacity pressure. None of those claims is proven by a diagram. I need a fake Fabric with per-item budgets and both 429 classes, then a sandbox workspace to measure polls per run, queue wait, throttle rate, and terminal-state latency.

That is why I care more about the reconciler lease and the token-bucket key than about the API's route names. The route names are easy to change. If every consumer still polls independently, the gateway has added a hop and kept the problem.
