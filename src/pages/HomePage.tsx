import { FeatureGrid } from '../components/home/FeatureGrid.tsx'
import { FeaturedProjects } from '../components/home/FeaturedProjects.tsx'
import { Hero } from '../components/home/Hero.tsx'

export function HomePage() {
  return (
    <>
      <Hero />
      <FeatureGrid />
      <FeaturedProjects />
    </>
  )
}
