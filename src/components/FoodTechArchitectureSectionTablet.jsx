import { useState } from "react";
import FoodTechArchitectureClientColumn from "./FoodTechArchitectureClientColumn";
import FoodTechArchitectureRestaurantColumn from "./FoodTechArchitectureRestaurantColumn";
import { FOOD_TECH_ARCHITECTURE_DEFAULT_SCENARIO_ID } from "../data/foodTechArchitectureScenarios";
import { FOOD_TECH_ARCHITECTURE_RESTAURANT_DEFAULT_SCENARIO_ID } from "../data/foodTechArchitectureRestaurantScenarios";

function FoodTechArchitectureSectionTablet({ clientPlain, restaurantPlain }) {
  const [clientScenarioId, setClientScenarioId] = useState(FOOD_TECH_ARCHITECTURE_DEFAULT_SCENARIO_ID);
  const [restaurantScenarioId, setRestaurantScenarioId] = useState(
    FOOD_TECH_ARCHITECTURE_RESTAURANT_DEFAULT_SCENARIO_ID,
  );
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [restaurantModalOpen, setRestaurantModalOpen] = useState(false);

  const handleClientScenarioSelect = (scenarioId) => {
    if (
      scenarioId === clientScenarioId &&
      scenarioId !== FOOD_TECH_ARCHITECTURE_DEFAULT_SCENARIO_ID
    ) {
      setClientModalOpen(true);
      return;
    }

    setClientScenarioId(scenarioId);
    const isAll = scenarioId === FOOD_TECH_ARCHITECTURE_DEFAULT_SCENARIO_ID;
    setClientModalOpen(!isAll);
    if (!isAll) {
      setRestaurantScenarioId(FOOD_TECH_ARCHITECTURE_RESTAURANT_DEFAULT_SCENARIO_ID);
      setRestaurantModalOpen(false);
    }
  };

  const handleRestaurantScenarioSelect = (scenarioId) => {
    if (
      scenarioId === restaurantScenarioId &&
      scenarioId !== FOOD_TECH_ARCHITECTURE_RESTAURANT_DEFAULT_SCENARIO_ID
    ) {
      setRestaurantModalOpen(true);
      return;
    }

    setRestaurantScenarioId(scenarioId);
    const isAll = scenarioId === FOOD_TECH_ARCHITECTURE_RESTAURANT_DEFAULT_SCENARIO_ID;
    setRestaurantModalOpen(!isAll);
    if (!isAll) {
      setClientScenarioId(FOOD_TECH_ARCHITECTURE_DEFAULT_SCENARIO_ID);
      setClientModalOpen(false);
    }
  };

  return (
    <div className="food-tech-architecture-tablet">
      <div className="food-tech-architecture-tablet__client">
        <FoodTechArchitectureClientColumn
          plainText={clientPlain}
          activeScenarioId={clientScenarioId}
          modalOpen={clientModalOpen}
          onScenarioSelect={handleClientScenarioSelect}
          onModalClose={() => setClientModalOpen(false)}
          modalPlacement="client-tablet"
        />
      </div>

      <div className="food-tech-architecture-tablet__restaurant">
        <FoodTechArchitectureRestaurantColumn
          plainText={restaurantPlain}
          activeScenarioId={restaurantScenarioId}
          modalOpen={restaurantModalOpen}
          onScenarioSelect={handleRestaurantScenarioSelect}
          onModalClose={() => setRestaurantModalOpen(false)}
          modalPlacement="restaurant-tablet"
        />
      </div>
    </div>
  );
}

export default FoodTechArchitectureSectionTablet;
