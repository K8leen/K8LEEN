import { useState } from "react";
import FoodTechArchitectureClientColumn from "./FoodTechArchitectureClientColumn";
import FoodTechArchitectureRestaurantColumn from "./FoodTechArchitectureRestaurantColumn";
import { FOOD_TECH_ARCHITECTURE_DEFAULT_SCENARIO_ID } from "../data/foodTechArchitectureScenarios";
import { FOOD_TECH_ARCHITECTURE_RESTAURANT_DEFAULT_SCENARIO_ID } from "../data/foodTechArchitectureRestaurantScenarios";

function FoodTechArchitectureSection({ clientPlain, restaurantPlain }) {
  const [clientScenarioId, setClientScenarioId] = useState(FOOD_TECH_ARCHITECTURE_DEFAULT_SCENARIO_ID);
  const [restaurantScenarioId, setRestaurantScenarioId] = useState(
    FOOD_TECH_ARCHITECTURE_RESTAURANT_DEFAULT_SCENARIO_ID,
  );
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [restaurantModalOpen, setRestaurantModalOpen] = useState(false);

  const handleClientScenarioSelect = (scenarioId) => {
    setClientScenarioId(scenarioId);
    const isAll = scenarioId === FOOD_TECH_ARCHITECTURE_DEFAULT_SCENARIO_ID;
    setClientModalOpen(!isAll);
    if (!isAll) {
      setRestaurantScenarioId(FOOD_TECH_ARCHITECTURE_RESTAURANT_DEFAULT_SCENARIO_ID);
      setRestaurantModalOpen(false);
    }
  };

  const handleRestaurantScenarioSelect = (scenarioId) => {
    setRestaurantScenarioId(scenarioId);
    const isAll = scenarioId === FOOD_TECH_ARCHITECTURE_RESTAURANT_DEFAULT_SCENARIO_ID;
    setRestaurantModalOpen(!isAll);
    if (!isAll) {
      setClientScenarioId(FOOD_TECH_ARCHITECTURE_DEFAULT_SCENARIO_ID);
      setClientModalOpen(false);
    }
  };

  return (
    <div className="project-case-architecture-row project-case-architecture-row--760-380">
      <div className="project-case-architecture-slot-main project-case-architecture-slot-main--760">
        <FoodTechArchitectureClientColumn
          plainText={clientPlain}
          activeScenarioId={clientScenarioId}
          modalOpen={clientModalOpen}
          onScenarioSelect={handleClientScenarioSelect}
          onModalClose={() => setClientModalOpen(false)}
        />
      </div>

      <div className="project-case-architecture-slot-side project-case-architecture-slot-side--380">
        <FoodTechArchitectureRestaurantColumn
          plainText={restaurantPlain}
          activeScenarioId={restaurantScenarioId}
          modalOpen={restaurantModalOpen}
          onScenarioSelect={handleRestaurantScenarioSelect}
          onModalClose={() => setRestaurantModalOpen(false)}
        />
      </div>
    </div>
  );
}

export default FoodTechArchitectureSection;
