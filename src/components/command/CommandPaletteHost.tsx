import { lazy, Suspense, useEffect, useState } from "react";

const CommandPalette = lazy(async () => {
  const mod = await import("./CommandPalette.tsx");
  return { default: mod.CommandPalette };
});

export function CommandPaletteHost() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setReady(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!ready) return null;

  return (
    <Suspense fallback={null}>
      <CommandPalette startOpen />
    </Suspense>
  );
}
