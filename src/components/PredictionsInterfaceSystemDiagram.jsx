import { PREDICTIONS_INTERFACE_ANNOTATIONS } from "../data/predictionsInterfaceAnnotations";
import { predictionsProjectImages } from "../data/predictionsProjectPage";
import InterfaceSystemDiagram from "./InterfaceSystemDiagram";

function PredictionsInterfaceSystemDiagram({ className = "" }) {
  return (
    <InterfaceSystemDiagram
      className={className}
      svgSrc={predictionsProjectImages.interfaceSystem.src}
      svgAlt={predictionsProjectImages.interfaceSystem.alt}
      annotations={PREDICTIONS_INTERFACE_ANNOTATIONS}
    />
  );
}

export default PredictionsInterfaceSystemDiagram;
