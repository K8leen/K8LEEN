import { useEffect, useRef, useState } from "react";
import { foodTechProjectImages } from "../data/foodTechProjectPage";
import {
  FOOD_TECH_ARCHITECTURE_RESTAURANT_LAYER_ID_PATTERN,
  getFoodTechArchitectureRestaurantScenario,
} from "../data/foodTechArchitectureRestaurantScenarios";

function getScenarioLayerId(scenarioId) {
  return getFoodTechArchitectureRestaurantScenario(scenarioId)?.layerId ?? null;
}

function getScenarioLayerGroups(svgRoot) {
  const firstLayer =
    svgRoot.getElementById("00_all") ?? svgRoot.getElementById("01_connection");
  const container = firstLayer?.parentElement;
  if (!container) return [];

  return Array.from(container.children).filter(
    (child) => child.id && FOOD_TECH_ARCHITECTURE_RESTAURANT_LAYER_ID_PATTERN.test(child.id),
  );
}

function applyLayerVisibility(svgRoot, scenarioId) {
  if (!svgRoot) return;

  const layers = getScenarioLayerGroups(svgRoot);
  if (!layers.length) return;

  const layerId = getScenarioLayerId(scenarioId);
  if (!layerId || !svgRoot.getElementById(layerId)) {
    layers.forEach((layer) => layer.style.removeProperty("display"));
    return;
  }

  layers.forEach((layer) => {
    layer.style.display = layer.id === layerId ? "" : "none";
  });
}

function FoodTechRestaurantArchitectureDiagram({ scenarioId = "all", className = "" }) {
  const hostRef = useRef(null);
  const [svgMarkup, setSvgMarkup] = useState("");
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(foodTechProjectImages.architectureRestaurant.src, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("architecture restaurant svg fetch failed");
        return response.text();
      })
      .then((markup) => {
        if (!cancelled) {
          setSvgMarkup(markup);
          setLoadError(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const svgRoot = hostRef.current?.querySelector("svg");
    applyLayerVisibility(svgRoot, scenarioId);
  }, [scenarioId, svgMarkup]);

  return (
    <div
      className={`food-tech-architecture-diagram ${className}`.trim()}
      aria-busy={!svgMarkup && !loadError}
    >
      {loadError ? (
        <img
          src={foodTechProjectImages.architectureRestaurant.src}
          alt={foodTechProjectImages.architectureRestaurant.alt}
          className="block h-auto w-full"
        />
      ) : (
        <div
          ref={hostRef}
          className="food-tech-architecture-diagram__svg-host"
          dangerouslySetInnerHTML={svgMarkup ? { __html: svgMarkup } : undefined}
          role="img"
          aria-label={foodTechProjectImages.architectureRestaurant.alt}
        />
      )}
    </div>
  );
}

export default FoodTechRestaurantArchitectureDiagram;
