---
id: models-are-dependencies
title: Treat the model like a flaky HTTP dependency
summary: An LLM is not a personality in your app. It is a nondeterministic service with a worse SLO than Postgres. Design the boundary that way.
publishedAt: 2026-08-18
tags: ["AI", "Architecture", "Backend"]
published: true
layout: essay
---

The fastest way to make AI software look unserious is to put the model in the middle of a request and hope. Hope is not an interface. If the provider blips, if the JSON is almost valid, if the answer is fluent and wrong, the user still sees a spinner and then a mess.

Full-stack work taught me APIs, validation, databases, UIs that have to explain failure. Moving toward AI engineering did not replace that. It made the dependency list worse. A model is another network call with a larger output space and a weaker contract.

## Draw the box

Before I pick a framework, I want the box on a napkin. What goes in: a typed request, a timeout, a budget (tokens, euros, or both). What comes out: a typed response or a typed error. What we never do: stream raw model text into a database column and call it a document.

Pydantic (or Zod, or a C# DTO) is not bureaucracy. It is how you keep the rest of the system from learning the model’s moods. If the model returns a missing field, that is a parse error at the boundary, not a NullReference three layers down.

I like FastAPI for this because the HTTP shape and the Python shape can stay close. The model client lives behind a port. Tests can swap it. The rest of the app never imports the vendor SDK.

## Timeouts and fallbacks are product decisions

A 45-second generation is not “the model thinking.” It is an open request eating a worker. You choose a timeout the way you choose one for a payment provider: short enough that the UI can recover, long enough that a real answer can finish.

When it fails, the product still has to say something true. Cached last-good. A smaller local extract. “I cannot complete this; here is the partial.” What you should not do is retry forever with the same prompt. That is how you turn a blip into a bill.

Streaming is useful for UX. It is not a substitute for a final validated object. Stream for the human. Persist only after the schema checks.

## Evaluation is the test suite you are avoiding

Unit tests still matter for the deterministic parts: retrieval filters, prompt assembly, tool routing, auth. They do not tell you if the model is lying.

For that you need a small, ugly eval set. Real inputs from you, not a leaderboard. Ten to fifty cases with an expected property: the answer cites a source, the answer refuses when the corpus is empty, the JSON matches the schema, the summary does not invent a date.

I do not start with a platform. I start with a folder of fixtures and a script that prints pass/fail. When the prompt changes, I run it. If I cannot run it, I do not get to say the change was an improvement.

This is the part people skip because it is not a demo. It is also the part that makes “AI engineer” mean engineer.

## Observability without a surveillance product

I want three things in logs I actually read: which prompt version ran, how long it took, whether parse succeeded. I do not need to store every completion forever. I do need to know, after a bad week, whether failures clustered on one tool or one model revision.

Treat the vendor like you treat Stripe. You do not log card numbers. You also do not log secrets that leaked into a prompt. Redact first. Then keep the metrics.

## What this is not

This is not an argument against using Claude or whoever is good this quarter. Use the strong model. Pay for it when it earns it.

It is an argument against building a cathedral around a completion. The interesting software is still the path from UI to API to data to deploy. The model is a dependency on that path. Give it a contract, a timeout, and a way to fail that a human can understand.
