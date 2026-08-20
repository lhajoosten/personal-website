export type AboutContent = {
  heading: string;
  intro: string[];
  visionHeading: string;
  vision: { title: string; body: string }[];
  croweHeading: string;
  crowe: string[];
  stackHeading: string;
  pathHeading: string;
  stack: { label: string; items: string[] }[];
  learningPath: { title: string; body: string }[];
};

export const about: AboutContent = {
  heading: "About",
  intro: [
    "I'm Luc — a full-stack software engineer at Crowe Netherlands, growing deliberately into AI engineering and DevOps/cloud. I care about software that stays coherent when models, compliance pressure, and product deadlines all show up in the same sprint.",
    "My work sits at the intersection of traditional engineering discipline and modern AI-assisted delivery. Agents, RAG, and cloud platforms are part of the toolbox — not a substitute for clear interfaces, observable systems, and honest trade-offs.",
    "Outside client delivery I ship personal projects (this site, agent tooling, Azure-native DevOps experiments) to keep my learning loop tight and my standards high.",
  ],
  visionHeading: "What I strive for",
  vision: [
    {
      title: "Engineering bar, not demo magic",
      body: "AI features should ship with evaluation, rollback paths, and ownership — the same bar I'd expect from any other dependency in production.",
    },
    {
      title: "Breadth with depth",
      body: "I'm expanding from full-stack into AI engineering and cloud/DevOps without treating either as a separate career. The interesting problems live where UI, API, data, and infra meet.",
    },
    {
      title: "Continuous, evidence-based learning",
      body: "Certifications and side projects are checkpoints, not trophies. I learn by building, measuring, and writing down what broke — then fixing it properly.",
    },
  ],
  croweHeading: "At Crowe Netherlands",
  crowe: [
    "Crowe is a global professional services firm; in the Netherlands I work on an AI-powered platform for accountancy and business intelligence automation — helping teams move faster without sacrificing the rigour their clients expect.",
    "Day to day that means designing and shipping full-stack features: FastAPI services, React interfaces, data pipelines, and the Azure/cloud plumbing that keeps it all running. AI is woven in where it genuinely reduces toil — never as a veneer over unclear requirements.",
    "It's the kind of environment that rewards people who can translate between product intent, engineering constraints, and operational reality — exactly the seam I want to keep working on.",
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
