import { typograph } from "../utils/typography";

const headlineRaw = {
  header: "Мобильное приложение для управления умным домом",
  subheader:
    "управление через структурирование интерфейса и снижение когнитивной нагрузки",
};

const headlineTabletRaw = {
  header: "Управление умным домом",
  subheader: "Снижение когнитивной нагрузки через структуру",
};

const resultPlainLinesRaw = [
  "Реализована сквозная структура приложения как единой экосистемы",
  "Разработан полный реестр состояний устройств и интерактивных виджетов, обеспечивающих мгновенную обратную связь",
  "Спроектирована схема автоматизации для перевода «If-This-Then-That» в простые пользовательские сценарии",
  "Сформирована логика масштабируемого интерфейса для разных типов устройств",
];

const contextAppListTitleRaw =
  "Приложение предназначено для управления системой умного дома";

const contextAppListItemsRaw = [
  "освещение",
  "климат",
  "устройства",
  "сценарии автоматизации",
];

const contextFeaturesListTitleRaw = "Особенности:";

const contextFeaturesListItemsRaw = [
  "большое количество устройств",
  "разные типы взаимодействий",
  "необходимость быстрого доступа к управлению",
];

const contextRoleDescriptionRaw = {
  title: "Моя роль: PRODUCT / UX/UI дизайнер",
  description:
    "От исследования и проектирования до проработки взаимодействия и визуальной реализации",
};

const problemListItemsRaw = [
  "сложные и перегруженные сценарии управления",
  "неочевидные состояния устройств (включено / выключено / ошибка)",
  "разрозненные интерфейсы для разных типов устройств",
  "высокая когнитивная нагрузка при управлении",
];

const taskListTitleRaw = "Спроектировать мобильное приложение, которое:";

const taskListItemsRaw = [
  "упрощает управление устройствами",
  "делает состояния системы прозрачными",
  "обеспечивает быстрый доступ к ключевым сценариям",
  "масштабируется под разные типы устройств",
];

const approachListsRaw = [
  {
    title: "Исследование",
    listItems: [
      "анализ существующих решений (smart home apps)",
      "выявление проблем в сценариях управления",
      "определение ключевых пользовательских задач",
    ],
  },
  {
    title: "Структурирование",
    listItems: ["выделение основных сущностей", "определение иерархии"],
  },
  {
    title: "Проектирование сценариев",
    listItems: [
      "быстрые действия (включить/выключить)",
      "управление группами устройств",
      "настройка сценариев",
    ],
  },
  {
    title: "Итерации",
    listItems: [
      "упрощение навигации",
      "сокращение шагов",
      "оптимизация взаимодействий",
    ],
  },
];

const architecturePlainRaw =
  "Интерфейс спроектирован по принципу многоуровневого управления:";

const interfaceSystemPlainRaw = "Построена на повторяемых паттернах";

const principlesListTitleRaw = "Интерфейс построен с акцентом на";

const principlesListItemsRaw = [
  "быстрое понимание состояния устройств",
  "скорость выполнения типовых действий",
  "визуальную приоритизацию информации",
  "минимизацию когнитивной нагрузки",
];

const integrationPlainRaw =
  "Проектирование велось в тесной связке с Product Owner. Для передачи в разработку были подготовлены интерактивный прототип и детализированные спецификации, позволившие реализовать решение без дополнительных циклов проектирования.";

const summaryLinesRaw = [
  "Сформирована единая система взаимодействия с устройствами умного дома, обеспечивающая масштабирование экосистемы без усложнения пользовательского опыта.",
];

export const smartHomeProjectHeadline = {
  header: typograph(headlineRaw.header),
  subheader: typograph(headlineRaw.subheader),
};

export const smartHomeProjectHeadlineTablet = {
  header: typograph(headlineTabletRaw.header),
  subheader: typograph(headlineTabletRaw.subheader),
};

export const smartHomeProjectResultLines = resultPlainLinesRaw;
export const smartHomeProjectContextAppListTitle = contextAppListTitleRaw;
export const smartHomeProjectContextAppListItems = contextAppListItemsRaw;
export const smartHomeProjectContextFeaturesListTitle = contextFeaturesListTitleRaw;
export const smartHomeProjectContextFeaturesListItems = contextFeaturesListItemsRaw;
export const smartHomeProjectContextRoleDescription = contextRoleDescriptionRaw;
export const smartHomeProjectProblemListItems = problemListItemsRaw;
export const smartHomeProjectTaskListTitle = taskListTitleRaw;
export const smartHomeProjectTaskListItems = taskListItemsRaw;
export const smartHomeProjectApproachLists = approachListsRaw;
export const smartHomeProjectArchitecturePlain = architecturePlainRaw;
export const smartHomeProjectInterfaceSystemPlain = interfaceSystemPlainRaw;
export const smartHomeProjectPrinciplesListTitle = principlesListTitleRaw;
export const smartHomeProjectPrinciplesListItems = principlesListItemsRaw;
export const smartHomeProjectIntegrationPlain = integrationPlainRaw;
export const smartHomeProjectSummaryLines = summaryLinesRaw;

export const smartHomeProjectImages = {
  result: {
    src: "/img/04_05_01.svg",
    alt: "Слои структуры мобильного приложения умного дома",
  },
  architecture: {
    src: "/img/04_05_02.png",
    alt: "Схема многоуровневой архитектуры управления умным домом",
  },
  interfaceSystem: {
    src: "/img/04_05_03.svg",
    alt: "Повторяемые паттерны интерфейса мобильного приложения",
  },
};

export const smartHomeProjectDetailPath = "/projects/smart-home";
