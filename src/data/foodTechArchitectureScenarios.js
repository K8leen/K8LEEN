import {
  formatModalText,
  formatTextBlockListTitle,
  typograph,
} from "../utils/typography";

/** id сценария → id слоя в SVG (Figma export). */
const FOOD_TECH_ARCHITECTURE_SCENARIOS_RAW = [
  {
    id: "all",
    label: "Все",
    layerId: "00_all",
  },
  {
    id: "acquaintance",
    label: "Знакомство",
    layerId: "01_acquaintance",
    modalTitle: "Знакомство",
    modalText:
      "Сценарий первого знакомства с сервисом.\nПользователь изучает ассортимент, сравнивает предложения и формирует представление о ресторане до принятия решения о заказе.",
  },
  {
    id: "dish-search",
    label: "Поиск блюда",
    layerId: "02_search",
    modalTitle: "Поиск блюда",
    modalText:
      "Сценарий для пользователей с уже сформированным запросом.\nАрхитектура позволяет перейти от поиска блюда к оформлению заказа без необходимости просматривать весь каталог.",
  },
  {
    id: "order",
    label: "Заказ",
    layerId: "03_order",
    modalTitle: "Заказ",
    modalText:
      "Основной бизнес-сценарий платформы.\nПоток спроектирован таким образом, чтобы пользователь мог пройти путь от выбора блюда до оформления заказа без возвратов между экранами.",
  },
  {
    id: "repeat-order",
    label: "Повторный заказ",
    layerId: "04_reorder",
    modalTitle: "Повторный заказ",
    modalText:
      "Сценарий ориентирован на постоянных пользователей.\nПовторное оформление заказа требует минимального количества действий и позволяет быстро вернуться к ранее выбранным позициям.",
  },
  {
    id: "post-order",
    label: "После заказа",
    layerId: "05_after",
    modalTitle: "После заказа",
    modalText:
      "Пользователь сохраняет доступ к информации о заказе после завершения покупки.\nИстория заказов становится основой для повторных взаимодействий и дальнейшего использования сервиса.",
  },
  {
    id: "feedback",
    label: "Обратная связь",
    layerId: "06_feedback",
    modalTitle: "Обратная связь",
    modalText:
      "После завершения заказа пользователь может оставить обратную связь.\nОтзывы формируют дополнительный слой доверия и помогают принимать решения другим пользователям.",
  },
  {
    id: "lifecycle",
    label: "Жизненный цикл",
    layerId: "07_life",
    modalTitle: "Жизненный цикл",
    modalText:
      "Центральный цикл платформы.\nАрхитектура построена вокруг заказа как ключевой сущности системы.\nБольшинство пользовательских действий либо приводят к созданию заказа, либо поддерживают повторное взаимодействие с ним.",
  },
];

function formatArchitectureScenario(scenario) {
  return {
    ...scenario,
    label: typograph(scenario.label),
    ...(scenario.modalTitle
      ? {
          modalTitle: formatTextBlockListTitle(scenario.modalTitle),
          modalText: formatModalText(scenario.modalText),
        }
      : {}),
  };
}

export const FOOD_TECH_ARCHITECTURE_SCENARIOS =
  FOOD_TECH_ARCHITECTURE_SCENARIOS_RAW.map(formatArchitectureScenario);

export const FOOD_TECH_ARCHITECTURE_DEFAULT_SCENARIO_ID = "all";

export const FOOD_TECH_ARCHITECTURE_LAYER_ID_PATTERN = /^0\d_/;

export function getFoodTechArchitectureScenario(scenarioId) {
  return FOOD_TECH_ARCHITECTURE_SCENARIOS.find((item) => item.id === scenarioId);
}
