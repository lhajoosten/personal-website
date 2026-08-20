import { PageMeta } from '../components/seo/PageMeta.tsx'
import { FeatureGrid } from '../components/home/FeatureGrid.tsx'
import { FeaturedProjects } from '../components/home/FeaturedProjects.tsx'
import { Hero } from '../components/home/Hero.tsx'
import { siteConfig } from '../config/site.config.ts'

export function HomePage() {
  return (
    <>
      <PageMeta description={`${siteConfig.tagline}. ${siteConfig.role}.`} />
      <Hero />
      <FeatureGrid />
      <FeaturedProjects />
    </>
  )
}
