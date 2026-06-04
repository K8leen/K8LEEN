import { typograph } from "../utils/typography";

const headlineRaw = {
  header: "Локальный food-tech продукт",
  subheader:
    "от хаотичных заказов к структурированному сервису через системный UX",
};

const resultPlainLinesRaw = [
  "Спроектирована концепция локального food-tech сервиса для малого города",
  "Разработана единая UX-логика для перехода от хаотичного общения в мессенджерах к структурированному сценарию заказа",
  "Создана клиентская часть мобильного приложения",
  "Сформирована базовая архитектура взаимодействия для ресторанной части",
];

const contextPlainRaw =
  "Проект вырос из локальной проблемы малого города Казахстана, где доставка еды не была представлена крупными сервисами.";

const contextListTitleRaw = "На момент старта пользователи";

const contextListItemsRaw = [
  "искали меню через соцсети",
  "оформляли заказы в личных сообщениях",
  "не имели прозрачности статусов",
  "сталкивались с неактуальными ценами и позициями",
  "теряли коммуникацию с заведениями",
];

const contextIdeaDescriptionRaw = {
  title: "Основная идея продукта:",
  description:
    "создать локальный агрегатор доставки еды по модели крупных food-tech сервисов, адаптированный под масштаб и ограничения небольшого города",
};

const contextRoleDescriptionRaw = {
  title: "Моя роль: PRODUCT / UX/UI дизайнер",
  description:
    "От проектирования пользовательских сценариев и архитектуры взаимодействия до визуальной системы и адаптации интерфейсов под разные роли",
};

const problemPlainRaw =
  "Существующий процесс заказа еды был построен вокруг неструктурированной коммуникации.";

const taskListTitleRaw = "Спроектировать MVP-концепцию food-tech сервиса, которая:";

const taskListItemsRaw = [
  "переводит заказ еды в структурированный цифровой сценарий",
  "упрощает оформление заказов",
  "делает статусы прозрачными",
  "снижает зависимость от ручной коммуникации",
  "формирует основу для дальнейшего развития платформы",
];

const approachListsRaw = [
  {
    title: "Исследование",
    listItems: [
      "анализ локального поведения пользователей",
      "изучение существующего процесса заказа",
      "исследование food-tech паттернов",
      "анализ UX популярных сервисов доставки",
    ],
  },
  {
    title: "Структурирование",
    listItems: [
      "декомпозиция пользовательского сценария",
      "формирование базовой архитектуры заказа",
      "разделение клиентского и ресторанного контуров",
    ],
  },
  {
    title: "Проектирование",
    listItems: [
      "упрощение flow оформления заказа",
      "проектирование системы статусов",
      "создание повторяемых UI-паттернов",
      "адаптация интерфейса под мобильный usage context",
    ],
  },
  {
    title: "Концептуальная проработка restaurant-side",
    listItems: [
      "поступление и обработка заказов",
      "базовая операционная структура",
      "работа с обращениями",
      "базовая аналитика работы",
    ],
  },
];

const architectureClientPlainRaw =
  "Клиентская часть спроектирована как сценарная система взаимодействия, построенная вокруг основного пользовательского потока";

const architectureRestaurantPlainRaw =
  "Ресторанная часть спроектирована как упрощенная операционная панель для малого бизнеса";

const interfaceSystemPlainRaw =
  "Проектировалась для перехода пользователей от неструктурированного общения в мессенджерах к понятному и прозрачному digital-сценарию заказа";

const principlesListTitleRaw = "Интерфейс построен с акцентом на";

const principlesListItemsRaw = [
  "простоту взаимодействия",
  "прозрачность сценариев",
  "быстрое считывание информации",
  "мобильный контекст использования",
];

const integrationLinesRaw = [
  "Проектирование велось в тесной связке с разработкой.",
  "Ключевые ограничения и технические детали учитывались на ранних этапах, благодаря чему реализация интерфейсов проходила без необходимости переработки проектных решений.",
];

const summaryLinesRaw = [
  "Создана единая модель взаимодействия между пользователями, заказами и контентом сервиса, заменившая разрозненные сценарии работы через социальные сети и мессенджеры.",
  "Сформирована продуктовая основа для дальнейшего развития сервиса, внедрения новых функций и масштабирования пользовательских сценариев.",
];

export const foodTechProjectHeadline = {
  header: typograph(headlineRaw.header),
  subheader: typograph(headlineRaw.subheader),
};

export const foodTechProjectResultLines = resultPlainLinesRaw;
export const foodTechProjectContextPlain = contextPlainRaw;
export const foodTechProjectContextListTitle = contextListTitleRaw;
export const foodTechProjectContextListItems = contextListItemsRaw;
export const foodTechProjectContextIdeaDescription = contextIdeaDescriptionRaw;
export const foodTechProjectContextRoleDescription = contextRoleDescriptionRaw;
export const foodTechProjectProblemPlain = problemPlainRaw;
export const foodTechProjectTaskListTitle = taskListTitleRaw;
export const foodTechProjectTaskListItems = taskListItemsRaw;
export const foodTechProjectApproachLists = approachListsRaw;
export const foodTechProjectArchitectureClientPlain = architectureClientPlainRaw;
export const foodTechProjectArchitectureRestaurantPlain = architectureRestaurantPlainRaw;
export const foodTechProjectInterfaceSystemPlain = interfaceSystemPlainRaw;
export const foodTechProjectPrinciplesListTitle = principlesListTitleRaw;
export const foodTechProjectPrinciplesListItems = principlesListItemsRaw;
export const foodTechProjectIntegrationLines = integrationLinesRaw;
export const foodTechProjectSummaryLines = summaryLinesRaw;

export const foodTechProjectImages = {
  result: {
    src: "/img/04_01_01_02.svg",
    alt: "Концепция локального food-tech сервиса и структура заказа",
  },
  architectureClient: {
    src: "/img/04_04_02_01.svg",
    alt: typograph("Схема клиентского пользовательского потока"),
  },
  architectureRestaurant: {
    src: "/img/04_04_02_02.svg",
    alt: typograph("Схема ресторанной операционной панели"),
  },
  interfaceSystem: {
    src: "/img/04_04_03.svg",
    alt: "Система интерфейса мобильного приложения",
  },
};

export const foodTechProjectDetailPath = "/projects/food-tech";
