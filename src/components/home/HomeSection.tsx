import type { ReactNode } from "react";

type HomeSectionTone = "hero" | "focus" | "about" | "experience" | "projects" | "writing";

type HomeSectionProps = {
  tone: HomeSectionTone;
  children: ReactNode;
  className?: string;
  surfaceClassName?: string;
  id?: string;
  "aria-labelledby"?: string;
};

export function HomeSection({
  tone,
  children,
  className = "",
  surfaceClassName = "",
  id,
  "aria-labelledby": ariaLabelledby,
}: HomeSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      data-home-tone={tone}
      className={`home-section ${className}`.trim()}
    >
      <div aria-hidden="true" className="home-section-glow" />
      <div className={`home-section-surface ${surfaceClassName}`.trim()}>{children}</div>
    </section>
  );
}
