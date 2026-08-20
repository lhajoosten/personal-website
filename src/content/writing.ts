import type { WritingPost } from './types.ts'

export const writingPosts: WritingPost[] = [
  {
    id: 'proposal-first-agents',
    title: 'Proposal-first agents beat permissionless agents',
    summary:
      'Why double opt-in and evidence beats letting coding agents write first and explain later.',
    body: `Most agent demos optimize for speed: the model changes files, runs commands, and hopes the human notices the blast radius in time.\n\nIn real repositories the cost of a wrong write is higher than the cost of one extra confirmation. Proposal-first workflows invert the default: the agent shows the exact write set, the human acknowledges, then the tool applies.\n\nThat pattern is not slower in practice. It is faster over a week because you spend less time reverting silent side effects and more time reviewing intentional diffs.\n\nEvidence belongs in the same loop. “Done” should mean checks ran, not that the agent claimed they would. Contracts, Taskfile entrypoints, and audit logs are how AI-assisted engineering stays engineering.`,
    publishedAt: '2026-08-18',
    tags: ['AI agents', 'DevEx', 'Engineering'],
  },
  {
    id: 'themes-as-configuration',
    title: 'Themes as configuration, not as forks',
    summary:
      'How builder and editorial can share one content model without becoming a theme-soup codebase.',
    body: `A portfolio with two visual systems is a small product problem: same facts, different presentation.\n\nThe failure mode is forking pages per theme. The better model is tokens for color and type, plus a few layout variants (cards vs rows, buttons vs text links). Content stays theme-agnostic in modules; components read the active theme and choose structure.\n\nDuckDB (or any query layer) should not care which theme is active. If your data access knows about “builder”, the abstraction leaked.`,
    publishedAt: '2026-08-20',
    tags: ['Frontend', 'Architecture', 'Portfolio'],
  },
  {
    id: 'ai-engineer-path',
    title: 'From full-stack to AI engineer without dropping the bar',
    summary:
      'AI engineering is still software engineering: interfaces, evaluation, ownership, and boring reliability.',
    body: `Moving toward AI Engineer and DevOps/Cloud is not a rebrand. It is the same craft with harder dependencies.\n\nModels are nondeterministic services. Treat them like any other integration: contracts, timeouts, evaluation, observability, and a plan for failure. The demo that only works in a notebook is not production.\n\nFull-stack experience helps. Someone has to own the path from UI to API to data to deploy. Agents change how code is produced; they do not remove the need for architecture and operational judgment.`,
    publishedAt: '2026-08-12',
    tags: ['Career', 'AI', 'DevOps'],
  },
]
