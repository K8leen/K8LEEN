import {
  FOOD_TECH_INTERFACE_ANNOTATIONS,
  FOOD_TECH_INTERFACE_SYSTEM_PARTS,
} from "../data/foodTechInterfaceAnnotations";
import { foodTechProjectImages } from "../data/foodTechProjectPage";
import InterfaceSystemDiagram from "./InterfaceSystemDiagram";

function FoodTechInterfaceSystemDiagram({ className = "" }) {
  return (
    <InterfaceSystemDiagram
      className={className}
      svgAlt={foodTechProjectImages.interfaceSystem.alt}
      annotations={FOOD_TECH_INTERFACE_ANNOTATIONS}
      parts={FOOD_TECH_INTERFACE_SYSTEM_PARTS}
    />
  );
}

export default FoodTechInterfaceSystemDiagram;
