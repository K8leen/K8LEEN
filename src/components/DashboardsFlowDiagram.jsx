import { DASHBOARDS_FLOW_ANNOTATIONS } from "../data/dashboardsFlowAnnotations";
import { dashboardsProjectImages } from "../data/dashboardsProjectPage";
import InterfaceSystemDiagram from "./InterfaceSystemDiagram";

function DashboardsFlowDiagram({ className = "" }) {
  return (
    <InterfaceSystemDiagram
      className={className}
      svgSrc={dashboardsProjectImages.flow.src}
      svgAlt={dashboardsProjectImages.flow.alt}
      annotations={DASHBOARDS_FLOW_ANNOTATIONS}
    />
  );
}

export default DashboardsFlowDiagram;
