import { Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ConsentPage from "./pages/ConsentPage";
import ComponentShowcasePage from "./pages/ComponentShowcasePage";
import DesignSystemProjectPage from "./pages/DesignSystemProjectPage";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/consent" element={<ConsentPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/projects/design-system" element={<DesignSystemProjectPage />} />
        <Route path="/design-system" element={<ComponentShowcasePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
