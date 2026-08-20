export type AboutContent = {
  heading: string
  intro: string[]
  stack: { label: string; items: string[] }[]
  learningPath: { title: string; body: string }[]
}

export const about: AboutContent = {
  heading: 'About',
  intro: [
    'I am a full-stack software engineer moving toward AI engineering and DevOps/Cloud. The through-line is the same: ship software that is useful, observable, and owned.',
    'AI changes how we build. It does not change the need for clear architecture, boring reliability, and honest trade-offs. That is the “engineered properly” part.',
  ],
  stack: [
    {
      label: 'Application',
      items: ['TypeScript', 'React', 'C# / .NET', 'Python', 'Node'],
    },
    {
      label: 'AI & data',
      items: ['LLM-assisted workflows', 'DuckDB', 'Python data pipelines'],
    },
    {
      label: 'Delivery',
      items: ['Git', 'CI-minded workflows', 'Cloud fundamentals', 'Linux'],
    },
  ],
  learningPath: [
    {
      title: 'Now',
      body: 'Deepening AI engineering: agents, evaluation, and integrating models into real products without hiding the complexity in a demo.',
    },
    {
      title: 'Next',
      body: 'More DevOps and cloud: environments, observability, and shipping AI-backed services with the same bar as any other production system.',
    },
    {
      title: 'Always',
      body: 'Full-stack product sense. Interfaces, APIs, and data still have to fit together when the model is just another dependency.',
    },
  ],
}
