import { FOOD_TECH_INTERFACE_ANNOTATIONS } from "../data/foodTechInterfaceAnnotations";
import { foodTechProjectImages } from "../data/foodTechProjectPage";
import InterfaceSystemDiagram from "./InterfaceSystemDiagram";

function FoodTechInterfaceSystemDiagram({ className = "" }) {
  return (
    <InterfaceSystemDiagram
      className={className}
      svgSrc={foodTechProjectImages.interfaceSystem.src}
      svgAlt={foodTechProjectImages.interfaceSystem.alt}
      annotations={FOOD_TECH_INTERFACE_ANNOTATIONS}
    />
  );
}

export default FoodTechInterfaceSystemDiagram;
