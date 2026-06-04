import { useRef } from "react";
import LinkButton from "./LinkButton";
import TextBlock from "./TextBlock";
import FoodTechClientArchitectureDiagram from "./FoodTechClientArchitectureDiagram";
import FoodTechArchitectureScenarioModal from "./FoodTechArchitectureScenarioModal";
import {
  FOOD_TECH_ARCHITECTURE_SCENARIOS,
  getFoodTechArchitectureScenario,
} from "../data/foodTechArchitectureScenarios";

function FoodTechArchitectureClientColumn({
  plainText,
  className = "",
  activeScenarioId,
  modalOpen,
  onScenarioSelect,
  onModalClose,
}) {
  const diagramRef = useRef(null);

  const activeScenario = getFoodTechArchitectureScenario(activeScenarioId);

  return (
    <div className={`food-tech-architecture-col ${className}`.trim()}>
      <TextBlock className="project-case-plain--440 food-tech-architecture-intro" variant="plain" text={plainText} />

      <nav className="food-tech-architecture-scenarios" aria-label="Сценарии клиентской архитектуры">
        {FOOD_TECH_ARCHITECTURE_SCENARIOS.map((scenario) => (
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
        <FoodTechClientArchitectureDiagram scenarioId={activeScenarioId} />
      </div>

      <FoodTechArchitectureScenarioModal
        open={modalOpen}
        title={activeScenario?.modalTitle}
        text={activeScenario?.modalText}
        alignRef={diagramRef}
        onClose={onModalClose}
        placement="client"
      />
    </div>
  );
}

export default FoodTechArchitectureClientColumn;
