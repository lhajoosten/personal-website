import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CommandPaletteHost } from "../command/CommandPaletteHost.tsx";
import { siteConfig } from "../../config/site.config.ts";
import { ui } from "../../content/site.ts";
import { Footer } from "./Footer.tsx";
import { Header } from "./Header.tsx";

export function SiteLayout() {
  const location = useLocation();

  useEffect(() => {
    if (!siteConfig.localEvents) return;
    void import("../../data/events.ts").then((mod) => mod.logPageView(location.pathname));
  }, [location.pathname]);

  return (
    <div className="site-shell flex min-h-svh flex-col text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-accent focus:bg-panel focus:px-3 focus:py-2 focus:text-ink"
      >
        {ui.skipToContent}
      </a>
      <Header />
      <main
        id="main"
        className="mx-auto w-full max-w-[var(--theme-max)] flex-1 px-4 py-[var(--theme-page-y)] sm:px-6"
      >
        <Outlet />
      </main>
      <Footer />
      <CommandPaletteHost />
    </div>
  );
}
