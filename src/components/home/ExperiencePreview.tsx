import { Link } from "react-router-dom";
import { experience, experienceIntro } from "../../content/experience.ts";
import { home } from "../../content/site.ts";
import { ExperienceTimeline } from "../about/ExperienceTimeline.tsx";
import { useTheme } from "../theme/useTheme.ts";
import { HomeSection } from "./HomeSection.tsx";

export function ExperiencePreview() {
  const { theme } = useTheme();
  const isBuilder = theme === "builder";
  const preview = experience.slice(0, 2);

  return (
    <HomeSection tone="experience" aria-labelledby="experience-preview-heading">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <h2
          id="experience-preview-heading"
          className={
            isBuilder
              ? "font-mono text-xs tracking-widest text-muted uppercase"
              : "font-display text-3xl"
          }
        >
          {home.experiencePreviewHeading}
        </h2>
        <Link
          to="/about#experience"
          className={
            isBuilder
              ? "font-mono text-xs text-accent no-underline hover:underline"
              : "text-sm text-accent no-underline hover:underline"
          }
        >
          {home.experiencePreviewLink}
        </Link>
      </div>
      <ExperienceTimeline entries={preview} intro={experienceIntro} compact />
    </HomeSection>
  );
}
