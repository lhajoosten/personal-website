import { useEffect, useState } from "react";

export function ReadingProgress({ targetId }: { targetId: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = document.getElementById(targetId);
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = window.scrollY - el.offsetTop;
      const pct = total <= 0 ? 100 : Math.min(100, Math.max(0, (scrolled / total) * 100));
      setProgress(pct);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId]);

  return (
    <div className="pointer-events-none fixed top-0 right-0 left-0 z-40 h-0.5 bg-line" aria-hidden>
      <div
        className="h-full bg-accent transition-[width] duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
