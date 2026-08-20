export type JsonLd = Record<string, unknown>;

export function personJsonLd(input: {
  name: string;
  url: string;
  jobTitle: string;
  sameAs: string[];
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: input.name,
    url: input.url,
    jobTitle: input.jobTitle,
    sameAs: input.sameAs,
  };
}

export function articleJsonLd(input: {
  headline: string;
  description: string;
  datePublished: string;
  url: string;
  authorName: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    url: input.url,
    author: {
      "@type": "Person",
      name: input.authorName,
    },
  };
}

export function projectJsonLd(input: { name: string; description: string; url: string }): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: input.name,
    description: input.description,
    url: input.url,
    applicationCategory: "DeveloperApplication",
  };
}
