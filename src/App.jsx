import { Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ComponentShowcasePage from "./pages/ComponentShowcasePage";
import DashboardsProjectPage from "./pages/DashboardsProjectPage";
import DesignSystemProjectPage from "./pages/DesignSystemProjectPage";
import HomePage from "./pages/HomePage";
import PredictionsProjectPage from "./pages/PredictionsProjectPage";
import ProjectsPage from "./pages/ProjectsPage";
import LegalInformationPage from "./pages/LegalInformationPage";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/legal" element={<LegalInformationPage />} />
        <Route path="/consent" element={<Navigate to="/legal" replace />} />
        <Route path="/privacy" element={<Navigate to="/legal" replace />} />
        <Route path="/projects/dashboards" element={<DashboardsProjectPage />} />
        <Route path="/projects/design-system" element={<DesignSystemProjectPage />} />
        <Route path="/projects/predictions" element={<PredictionsProjectPage />} />
        <Route path="/design-system" element={<ComponentShowcasePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
