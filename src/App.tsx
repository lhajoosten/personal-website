import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SiteLayout } from "./components/layout/SiteLayout.tsx";
import { ThemeProvider } from "./components/theme/ThemeProvider.tsx";
import { AboutPage } from "./pages/AboutPage.tsx";
import { ContactPage } from "./pages/ContactPage.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { NotFoundPage } from "./pages/NotFoundPage.tsx";
import { ProjectDetailPage } from "./pages/ProjectDetailPage.tsx";
import { ProjectsPage } from "./pages/ProjectsPage.tsx";
import { WritingDetailPage } from "./pages/WritingDetailPage.tsx";
import { WritingPage } from "./pages/WritingPage.tsx";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </ThemeProvider>
  );
}
