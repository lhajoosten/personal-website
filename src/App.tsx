import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SiteLayout } from "./components/layout/SiteLayout.tsx";
import { ThemeProvider } from "./components/theme/ThemeProvider.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { ui } from "./content/site.ts";

const AboutPage = lazy(async () => {
  const mod = await import("./pages/AboutPage.tsx");
  return { default: mod.AboutPage };
});
const ContactPage = lazy(async () => {
  const mod = await import("./pages/ContactPage.tsx");
  return { default: mod.ContactPage };
});
const NotFoundPage = lazy(async () => {
  const mod = await import("./pages/NotFoundPage.tsx");
  return { default: mod.NotFoundPage };
});
const ProjectDetailPage = lazy(async () => {
  const mod = await import("./pages/ProjectDetailPage.tsx");
  return { default: mod.ProjectDetailPage };
});
const ProjectsPage = lazy(async () => {
  const mod = await import("./pages/ProjectsPage.tsx");
  return { default: mod.ProjectsPage };
});
const WritingDetailPage = lazy(async () => {
  const mod = await import("./pages/WritingDetailPage.tsx");
  return { default: mod.WritingDetailPage };
});
const WritingPage = lazy(async () => {
  const mod = await import("./pages/WritingPage.tsx");
  return { default: mod.WritingPage };
});

function RouteFallback() {
  return (
    <p className="text-muted" aria-live="polite">
      {ui.loadingProjects}
    </p>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/writing" element={<WritingPage />} />
              <Route path="/writing/:id" element={<WritingDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}
