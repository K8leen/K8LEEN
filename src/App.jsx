import { Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ComponentShowcasePage from "./pages/ComponentShowcasePage";
import DashboardsProjectPage from "./pages/DashboardsProjectPage";
import DesignSystemProjectPage from "./pages/DesignSystemProjectPage";
import HomePage from "./pages/HomePage";
import FoodTechProjectPage from "./pages/FoodTechProjectPage";
import PredictionsProjectPage from "./pages/PredictionsProjectPage";
import SmartHomeProjectPage from "./pages/SmartHomeProjectPage";
import ProjectsPage from "./pages/ProjectsPage";
import LegalInformationPage from "./pages/LegalInformationPage";
import NotFoundPage from "./pages/NotFoundPage";

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
        <Route path="/projects/food-tech" element={<FoodTechProjectPage />} />
        <Route path="/projects/smart-home" element={<SmartHomeProjectPage />} />
        <Route path="/design-system" element={<ComponentShowcasePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
