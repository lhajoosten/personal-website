export const home = {
  leadBuilder:
    'Full-stack software engineer moving into AI engineering and DevOps/Cloud — same delivery standard, wider surface area.',
  leadEditorial:
    'I build software that stays coherent when models, clouds, and product pressure all show up at once.',
  ctaProjects: 'Selected work',
  ctaProjectsBuilder: 'View projects',
  ctaContact: 'Contact',
  highlightsHeadingBuilder: 'Highlights',
  highlightsHeadingEditorial: 'Focus',
  featuredHeading: 'Featured work',
  allProjects: 'All projects',
  highlights: [
    {
      title: 'AI with an engineering bar',
      body: 'Models as dependencies, not magic. Interfaces, evaluation, and failure modes first.',
    },
    {
      title: 'Full-stack product sense',
      body: 'From UI to API to data. The interesting work is usually at the seams.',
    },
    {
      title: 'Ops as part of the craft',
      body: 'If it is not deployable, observable, and owned, it is not finished.',
    },
  ],
}

export const writing = {
  heading: 'Writing',
  intro:
    'Notes on AI-assisted engineering, DevOps, and keeping software honest after the demo.',
  empty: 'No published posts yet.',
}

export const projectsPage = {
  heading: 'Projects',
  intro:
    'Selected work across products, data, and AI-assisted engineering. Status labels are honest: active, experimental, or archived student/coursework.',
}

export const contactPage = {
  heading: 'Contact',
  intro: 'GitHub and LinkedIn are the best channels. Email works for longer notes.',
}

export const notFound = {
  heading: 'Not found',
  body: 'That page is not in this site. Try the command palette (Ctrl/Cmd+K) or go home.',
  home: 'Back home',
}

export const ui = {
  skipToContent: 'Skip to content',
  menuOpen: 'Open menu',
  menuClose: 'Close menu',
  loadingProjects: 'Loading…',
  dbError: 'Could not load from the local database.',
  noFeatured: 'No featured projects yet.',
  noMatches: 'No projects match this filter yet.',
  filterStatus: 'Status',
  filterTag: 'Tag',
  filterSort: 'Sort',
  filterAll: 'All',
  clearFilters: 'Clear filters',
  resultCount: (n: number) => (n === 1 ? '1 project' : `${n} projects`),
  backToProjects: 'All projects',
  backToWriting: 'All writing',
  caseProblem: 'Problem',
  caseApproach: 'Approach',
  caseOutcome: 'Outcome',
  caseHighlights: 'Highlights',
  commandPlaceholder: 'Search pages, projects, writing…',
  commandEmpty: 'No matches.',
  commandHint: 'Ctrl/Cmd+K',
  sortYear: 'Year',
  sortTitle: 'Title',
  sortStatus: 'Status',
}
