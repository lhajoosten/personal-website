import { FeaturedProjects } from "../components/home/FeaturedProjects.tsx";
import { FeatureGrid } from "../components/home/FeatureGrid.tsx";
import { Hero } from "../components/home/Hero.tsx";
import { RecentWriting } from "../components/home/RecentWriting.tsx";
import { JsonLdScript } from "../components/seo/JsonLd.tsx";
import { PageMeta } from "../components/seo/PageMeta.tsx";
import { siteConfig } from "../config/site.config.ts";
import { personJsonLd } from "../seo/json-ld.ts";

export function HomePage() {
  return (
    <>
      <PageMeta description={`${siteConfig.tagline}. ${siteConfig.role}.`} />
      <JsonLdScript
        data={personJsonLd({
          name: siteConfig.name,
          url: siteConfig.url,
          jobTitle: siteConfig.role,
          sameAs: [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.website],
        })}
      />
      <Hero />
      <FeatureGrid />
      <FeaturedProjects />
      <RecentWriting />
    </>
  );
}
