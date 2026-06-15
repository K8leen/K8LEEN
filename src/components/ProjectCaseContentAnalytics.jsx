import { useLocation } from "react-router-dom";
import ContentAnalyticsSchema from "./ContentAnalyticsSchema";
import { projectContentAnalyticsByPath } from "../data/projectContentAnalytics";

function ProjectCaseContentAnalytics() {
  const { pathname } = useLocation();
  const schema = projectContentAnalyticsByPath[pathname];

  if (!schema) return null;

  return <ContentAnalyticsSchema {...schema} />;
}

export default ProjectCaseContentAnalytics;
