import {
  formatModalText,
  formatTextBlockListTitle,
  typograph,
} from "../utils/typography";

/** id сценария → id слоя в SVG (Figma export). */
const FOOD_TECH_ARCHITECTURE_RESTAURANT_SCENARIOS_RAW = [
  { id: "all", label: "Все", layerId: "00_all" },
  {
    id: "connection",
    label: "Подключение",
    layerId: "01_connection",
    modalTitle: "Подключение ресторана к сервису",
    modalText:
      "Сценарий первоначального наполнения системы после подключения ресторана. Пользователь создает профиль заведения и формирует базовую структуру меню для начала работы с заказами.",
  },
  {
    id: "menu-management",
    label: "Управление меню",
    layerId: "02_menu",
    modalTitle: "Управление меню",
    modalText:
      "Управление ассортиментом ресторана. Сценарий используется для добавления новых блюд, редактирования существующих позиций и актуализации информации для пользователей сервиса.",
  },
  {
    id: "orders",
    label: "Заказы",
    layerId: "03_orders",
    modalTitle: "Заказы",
    modalText:
      "Основной операционный сценарий платформы. Сотрудник получает информацию о новых заказах и контролирует их прохождение через все этапы выполнения.\nОтражение текущего состояния приготовления и доставки обеспечивает прозрачность процесса для клиента.",
  },
  {
    id: "promotion",
    label: "Продвижение",
    layerId: "04_promo",
    modalTitle: "Продвижение",
    modalText:
      "Цикл развития присутствия ресторана в сервисе. Управление ассортиментом, продвижением и обратной связью формирует устойчивый поток повторных заказов.",
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

export const FOOD_TECH_ARCHITECTURE_RESTAURANT_SCENARIOS =
  FOOD_TECH_ARCHITECTURE_RESTAURANT_SCENARIOS_RAW.map(formatArchitectureScenario);

export const FOOD_TECH_ARCHITECTURE_RESTAURANT_DEFAULT_SCENARIO_ID = "all";

export const FOOD_TECH_ARCHITECTURE_RESTAURANT_LAYER_ID_PATTERN = /^0\d_/;

export function getFoodTechArchitectureRestaurantScenario(scenarioId) {
  return FOOD_TECH_ARCHITECTURE_RESTAURANT_SCENARIOS.find((item) => item.id === scenarioId);
}
