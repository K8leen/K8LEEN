import { Navigate, Route, Routes } from "react-router-dom";
import ConsentPage from "./pages/ConsentPage";
import DesignSystemPage from "./pages/DesignSystemPage";
import HomePage from "./pages/HomePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/consent" element={<ConsentPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/design-system" element={<DesignSystemPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
