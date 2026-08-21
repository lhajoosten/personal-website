export type ExperienceEntry = {
  id: string;
  role: string;
  organization: string;
  location?: string;
  start: string;
  end: string;
  summary: string;
  highlights: string[];
  tags?: string[];
  link?: { label: string; href: string };
  current?: boolean;
};

export const experienceHeading = "Experience";
export const experienceIntro =
  "Professional work and education that shaped how I build — from shipped product at Crowe to the engineering foundations I keep sharpening.";

export const experience: ExperienceEntry[] = [
  {
    id: "crowe",
    role: "AI Software Engineer",
    organization: "Crowe Netherlands",
    location: "Eindhoven, NL",
    start: "2025",
    end: "Present",
    current: true,
    summary:
      "Building an AI-powered platform for accountancy and business intelligence automation — where audit-grade expectations meet modern agent and ML workflows.",
    highlights: [
      "Full-stack delivery across Python/FastAPI services and TypeScript/React product surfaces.",
      "Treat models, prompts, and retrieval as versioned dependencies with evaluation and failure modes.",
      "Bridge product, data, and cloud delivery so features stay deployable and observable.",
    ],
    tags: ["Python", "FastAPI", "TypeScript", "React", "Azure", "AI agents"],
    link: { label: "Crowe Netherlands", href: "https://www.crowe.nl" },
  },
  {
    id: "bsc-it",
    role: "BSc Information Technology",
    organization: "Information Technology (BSc)",
    location: "Netherlands",
    start: "2021",
    end: "2025",
    summary:
      "Graduated with a software engineering foundation — architecture, cloud fundamentals, and applied AI — that I now extend in production at Crowe.",
    highlights: [
      "Capstone and coursework spanning full-stack apps, data engineering, and cloud-native patterns.",
      "Built the habit of evidence-driven delivery: tests, reviews, and clear ownership boundaries.",
    ],
    tags: ["Software engineering", "Cloud", "Data", "AI fundamentals"],
  },
];
