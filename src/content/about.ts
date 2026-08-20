export type AboutContent = {
  heading: string;
  intro: string[];
  stackHeading: string;
  pathHeading: string;
  stack: { label: string; items: string[] }[];
  learningPath: { title: string; body: string }[];
};

export const about: AboutContent = {
  heading: "About",
  intro: [
    "I am a full-stack software engineer learning toward AI Engineer and DevOps / Cloud Engineer roles, focused on AI-powered applications that still meet a normal engineering bar.",
    "I build intelligent systems that bridge traditional software engineering with modern AI/ML workflows — agents, RAG, and cloud delivery included. Graduated in 2025 with a BSc in Information Technology.",
    "AI changes how we build. It does not change the need for clear architecture, observable systems, and honest trade-offs. That is the “engineered properly” part.",
  ],
  stackHeading: "Stack",
  pathHeading: "Learning path",
  stack: [
    {
      label: "Backend",
      items: ["Python", "FastAPI", "async/await", "Pydantic"],
    },
    {
      label: "AI / ML",
      items: ["LangChain", "LangGraph", "MCP", "RAG", "Anthropic Claude"],
    },
    {
      label: "Frontend",
      items: ["React 19", "TypeScript", "TanStack", "Tailwind CSS"],
    },
    {
      label: "Data",
      items: ["PostgreSQL", "pgvector", "DuckDB", "SQL Server"],
    },
    {
      label: "DevOps / Cloud",
      items: ["Docker", "GitHub Actions", "Azure", "Bicep", "CI/CD"],
    },
    {
      label: "Background",
      items: ["C# / .NET", "EF Core", "Angular", "Clean Architecture", "CQRS"],
    },
  ],
  learningPath: [
    {
      title: "Completed",
      body: "AZ-900 (Azure Fundamentals) and AI-900 (Azure AI Fundamentals).",
    },
    {
      title: "Next",
      body: "AI-102 (Azure AI Engineer Associate), AZ-104 (Azure Administrator Associate), and CKAD (Kubernetes).",
    },
    {
      title: "Focus",
      body: "Production AI systems, agent orchestration, MCP integration, and cloud-native deployments on Kubernetes.",
    },
  ],
};
