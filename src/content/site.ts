export const home = {
  leadBuilder:
    "Full-stack engineer at Crowe Netherlands, building AI-powered accountancy and BI platforms — growing into AI engineering and cloud/DevOps with the same delivery standard.",
  leadEditorial:
    "I build software that stays coherent when models, clouds, and product pressure all show up at once — currently at Crowe Netherlands, shipping AI-assisted platforms for accountancy and business intelligence.",
  aboutPreviewHeading: "Who I am",
  aboutPreviewLink: "Full story →",
  experiencePreviewHeading: "Experience",
  experiencePreviewLink: "See full timeline →",
  ctaProjects: "Selected work",
  ctaProjectsBuilder: "View projects",
  ctaWriting: "Writing",
  ctaContact: "Contact",
  highlightsHeadingBuilder: "Highlights",
  highlightsHeadingEditorial: "Focus",
  featuredHeading: "Featured work",
  recentWritingHeading: "Recent writing",
  allProjects: "All projects",
  allWriting: "All writing",
  highlights: [
    {
      title: "AI with an engineering bar",
      body: "Models as dependencies, not magic. Interfaces, evaluation, and failure modes first.",
    },
    {
      title: "Full-stack product sense",
      body: "From UI to API to data. The interesting work is usually at the seams.",
    },
    {
      title: "Ops as part of the craft",
      body: "If it is not deployable, observable, and owned, it is not finished.",
    },
  ],
};

export const writing = {
  heading: "Writing",
  intro: "Notes on AI-assisted engineering, DevOps, and keeping software honest after the demo.",
  empty: "No published posts yet.",
};

export const projectsPage = {
  heading: "Projects",
  intro:
    "Selected work across products, data, and AI-assisted engineering. Status labels are honest: active, experimental, or archived student/coursework.",
};

export const contactPage = {
  heading: "Contact",
  intro:
    "Use the form for a direct note — it lands in my inbox. LinkedIn and GitHub if you already live there.",
  formHeading: "Send a note",
  channelsHeading: "Or elsewhere",
  nameLabel: "Name",
  emailLabel: "Your email",
  topicLabel: "About",
  messageLabel: "Message",
  submit: "Send message",
  sending: "Sending…",
  success: "Sent. I’ll reply to the address you used.",
  error: "Could not send just now. Copy the address below.",
  notConfigured:
    "Mail isn’t hooked up in this environment yet. Copy the address and send from your client.",
  responseNote: "I read everything. A reply can take a few days.",
  emailHint: "Best for longer notes.",
  linkedinHint: "Work and intros.",
  githubHint: "Code and issues.",
  topics: {
    work: "Work",
    writing: "Writing",
    other: "Other",
  },
};

export const notFound = {
  heading: "Not found",
  body: "That page is not in this site. Try the command palette (Ctrl/Cmd+K) or go home.",
  home: "Back home",
  projects: "Projects",
};

export const ui = {
  skipToContent: "Skip to content",
  menuOpen: "Open menu",
  menuClose: "Close menu",
  loadingProjects: "Loading…",
  dbError: "Could not load from the local database.",
  noFeatured: "No featured projects yet.",
  noMatches: "No projects match this filter yet.",
  filterStatus: "Status",
  filterTag: "Tag",
  filterSort: "Sort",
  filterAll: "All",
  clearFilters: "Clear filters",
  resultCount: (n: number) => (n === 1 ? "1 project" : `${n} projects`),
  backToProjects: "All projects",
  backToWriting: "All writing",
  caseProblem: "Problem",
  caseApproach: "Approach",
  caseOutcome: "Outcome",
  caseHighlights: "Highlights",
  commandPlaceholder: "Search pages, projects, writing…",
  commandEmpty: "No matches.",
  commandHint: "Ctrl/Cmd+K",
  sortYear: "Year",
  sortTitle: "Title",
  sortStatus: "Status",
  relatedProjects: "Related projects",
  relatedWriting: "Related writing",
  tocHeading: "Contents",
  minutesToRead: (n: number) => (n === 1 ? "1 min read" : `${n} min read`),
  rssFeed: "RSS",
  crossLinkProjects: "See selected projects →",
  footerExplore: "Explore",
  footerConnect: "Connect",
  footerContactCta: "Get in touch",
};
