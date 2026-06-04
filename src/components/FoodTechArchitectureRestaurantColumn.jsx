import { useRef } from "react";
import LinkButton from "./LinkButton";
import TextBlock from "./TextBlock";
import FoodTechRestaurantArchitectureDiagram from "./FoodTechRestaurantArchitectureDiagram";
import FoodTechArchitectureScenarioModal from "./FoodTechArchitectureScenarioModal";
import {
  FOOD_TECH_ARCHITECTURE_RESTAURANT_SCENARIOS,
  getFoodTechArchitectureRestaurantScenario,
} from "../data/foodTechArchitectureRestaurantScenarios";

function FoodTechArchitectureRestaurantColumn({
  plainText,
  className = "",
  activeScenarioId,
  modalOpen,
  onScenarioSelect,
  onModalClose,
}) {
  const diagramRef = useRef(null);

  const activeScenario = getFoodTechArchitectureRestaurantScenario(activeScenarioId);

  return (
    <div className={`food-tech-architecture-col ${className}`.trim()}>
      <TextBlock className="food-tech-architecture-intro" variant="plain" text={plainText} />

      <nav
        className="food-tech-architecture-scenarios food-tech-architecture-scenarios--spread"
        aria-label="Сценарии ресторанной архитектуры"
      >
        {FOOD_TECH_ARCHITECTURE_RESTAURANT_SCENARIOS.map((scenario) => (
          <LinkButton
            key={scenario.id}
            type="button"
            variant="inline"
            active={activeScenarioId === scenario.id}
            onClick={() => onScenarioSelect(scenario.id)}
          >
            {scenario.label}
          </LinkButton>
        ))}
      </nav>

      <div ref={diagramRef} className="food-tech-architecture-diagram-anchor">
        <FoodTechRestaurantArchitectureDiagram scenarioId={activeScenarioId} />
      </div>

      <FoodTechArchitectureScenarioModal
        open={modalOpen}
        title={activeScenario?.modalTitle}
        text={activeScenario?.modalText}
        alignRef={diagramRef}
        onClose={onModalClose}
        placement="restaurant"
      />
    </div>
  );
}

export default FoodTechArchitectureRestaurantColumn;
