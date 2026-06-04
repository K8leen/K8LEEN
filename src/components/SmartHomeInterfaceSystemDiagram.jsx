import { SMART_HOME_INTERFACE_ANNOTATIONS } from "../data/smartHomeInterfaceAnnotations";
import { smartHomeProjectImages } from "../data/smartHomeProjectPage";
import InterfaceSystemDiagram from "./InterfaceSystemDiagram";

function SmartHomeInterfaceSystemDiagram({ className = "" }) {
  return (
    <InterfaceSystemDiagram
      className={className}
      svgSrc={smartHomeProjectImages.interfaceSystem.src}
      svgAlt={smartHomeProjectImages.interfaceSystem.alt}
      annotations={SMART_HOME_INTERFACE_ANNOTATIONS}
    />
  );
}

export default SmartHomeInterfaceSystemDiagram;
