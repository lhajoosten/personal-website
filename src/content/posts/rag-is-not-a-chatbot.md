---
id: rag-is-not-a-chatbot
title: RAG is a retrieval problem wearing a chatbot costume
summary: The chat UI is the easy part. The hard part is what you retrieve, what you refuse to retrieve, and how you prove the answer came from somewhere.
publishedAt: 2026-08-14
tags: ["RAG", "Data", "AI"]
published: true
layout: essay
---

People say RAG when they mean “a chat box on my PDFs.” That product can be a weekend. An honest retrieval system is not. The model will answer from its prior if you let it. Your job is to make “I don’t know” cheaper than a fluent guess.

The happy path — chunk, embed, top-k, stuff into a prompt, ship — demos well on a handbook written in one voice. It falls over on real corpora: tables, overlapping policies, outdated pages, and questions that are really two questions.

## Start from the question, not the vector

Before pgvector, write down the questions you actually need to answer. Support questions have a different shape than “summarize this repo.” Some questions are lookup. Some are comparison. Some are “is this allowed.” If you cannot classify the question, you will retrieve the same ten chunks for everything and then blame the model.

I also write down what a good miss looks like. Empty result, low score, conflicting chunks. Those are first-class outcomes. They should change the prompt: quote nothing, say you cannot answer, ask a clarifying question. If your UI cannot show that state, you do not have a retrieval product. You have a slot machine.

## Chunking is product design

Chunk size is not a hyperparameter you copy from a blog. It is a bet about what a user considers “a passage.” Too small and you lose the sentence that contained the exception. Too large and you retrieve a chapter because one keyword matched.

Headings matter. The heading is often the only structure the document had. If you strip it, you are embedding mush. I keep the heading path in the chunk metadata even when the embedding is just the body. At query time, that metadata is how you filter: this tenant, this version, this product.

I am not precious about one embedding model. I am precious about being able to rebuild the index from source files without folklore. If the source of truth is Markdown in git, the index is a build artifact. If the source of truth is a wiki nobody owns, you do not have RAG. You have a rumor mill with cosine similarity.

## Citations or it did not happen

If the answer cannot point at a chunk id, a path, and a quote the user can open, I do not show it as a fact. I might show it as a guess, labeled as such. Most internal tools should not show guesses at all.

This is slower to build than a chat bubble. It is the only way I would use the tool myself. I have been on the other side of “the bot said the policy changed” when the policy had not. That is not an AI failure. That is a UI that hid the retrieval.

LangChain and friends are fine as long as they do not become the architecture. The architecture is: retrieve, bound, generate, validate, cite. The library is a way to not rewrite HTTP clients.

## What I am still learning

I have not operated a retrieval system at the scale of a search company. I have operated the failure modes that show up at small scale: stale embeddings after a content change, questions that need SQL not vectors, multilingual docs, and eval sets that I was too lazy to refresh.

The learning path I care about is not “more frameworks.” It is being able to explain, for a given wrong answer, whether retrieval failed, the prompt overrode the evidence, or the corpus was wrong. If I cannot tell those three apart, I am not debugging. I am vibing.

## The chatbot is optional

Some of the best retrieval UIs are a search box and a list of passages. Generation can sit on top later. Starting with chat trains everyone, including you, to hide the retrieval. I would rather ship a slightly ugly cited search than a handsome liar.
