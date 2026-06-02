import { typograph } from "../utils/typography";
import predictionsResultImageUrl from "../../public/img/04_02_01.svg?url";

const headlineRaw = {
  header: "Геймифицированный сервис прогнозов",
  subheader:
    "Вовлечение пользователей через игровые механики и структурирование событийных сценариев",
};

const resultPlainLinesRaw = [
  "Спроектирован интерфейс MVP для web-платформы прогнозов с desktop и mobile версиями",
  "Разработана структура пользовательских сценариев вокруг прогнозирования событий и рейтинговой системы",
  "Собрана визуальная система на базе готового UI kit для ускорения проектирования и передачи в разработку",
  "Подготовлены интерфейсы ключевых пользовательских ролей",
];

const contextPlainRaw =
  "Ко мне обратилась команда с запросом на разработку интерфейса сервиса прогнозов, вдохновленного механиками prediction market платформ";

const contextListTitleRaw =
  "Основная задача проекта — быстро проверить гипотезу вовлечения пользователей через";

const contextListItemsRaw = [
  "игровые механики",
  "рейтинговую систему",
  "соревновательные сценарии",
];

const contextDescriptionRaw = {
  title: "Моя роль: UX/UI DESIGNER",
  description:
    "От структуры сценариев и взаимодействия до адаптации визуальной системы и подготовки экранов для разработки",
};

const problemListPrimaryTitleRaw =
  "Сервисы прогнозирования и discussion-based платформы сталкиваются с несколькими типичными проблемами:";
const problemListPrimaryItemsRaw = [
  "высокая когнитивная нагрузка при работе с данными и событиями",
  "слабая вовлеченность пользователей без игровых стимулов",
  "сложность навигации между событиями, прогнозами и рейтингами",
  "перегруженные интерфейсы с низкой читаемостью",
  "отсутствие прозрачной системы мотивации пользователей",
];

const problemListSecondaryTitleRaw = "Для MVP особенно критично было";
const problemListSecondaryItemsRaw = [
  "быстро объяснить механику продукта новым пользователям",
  "сократить порог входа",
  "удерживать внимание внутри сценария прогнозирования",
];

const taskListTitleRaw = "Спроектировать интерфейс MVP-платформы, который:";
const taskListItemsRaw = [
  "упрощает взаимодействие со сценариями прогнозов",
  "структурирует поток событий и пользовательской активности",
  "поддерживает игровые механики вовлечения",
  "масштабируется под desktop и mobile",
  "позволяет быстро запускать новые события и сценарии",
];

const taskDescriptionRaw = {
  title: "Дополнительно:",
  description:
    "Адаптировать решение под ограничения готового UI kit без потери целостности интерфейса",
};

const approachResearchRaw = {
  title: "Исследование",
  description: "Анализ интерфейсов prediction market и event-driven платформ",
};

const approachStructuringRaw = {
  title: "Структурирование",
  listItems: [
    "выделены основные сущности системы",
    "сформирована базовая архитектура взаимодействия",
    "определены ключевые пользовательские сценарии",
  ],
};

const approachDesignRaw = {
  title: "Проектирование",
  listItems: [
    "интерфейс проектировался как система коротких и быстрых interaction flows",
    "для ускорения производства использовался готовый UI kit, который был адаптирован под задачи продукта",
  ],
};

const architecturePlainRaw =
  "Система взаимодействия построена вокруг событий и прогнозов. Каждый элемент архитектуры усиливает вовлеченность и возвращает пользователя в активный цикл";

const architecturePrinciplesTitleRaw = "Архитектурные принципы";
const architecturePrinciplesDescriptionsRaw = [
  {
    title: "Быстрый цикл прогноза",
    description:
      "Минимальное количество шагов между знакомством с событием и действием пользователя",
  },
  {
    title: "Постоянная обратная связь",
    description:
      "Пользователь получает реакцию системы на каждом этапе, от прогноза до результата",
  },
  {
    title: "Игровая мотивация",
    description:
      "Рейтинги, очки, бейджи и челленджи поддерживают вовлеченность и возвращаемость",
  },
  {
    title: "Социальное подтверждение",
    description:
      "Комментарии, мнения и рейтинги усиливают доверие к событиям и прогнозам",
  },
  {
    title: "Адаптивный опыт",
    description:
      "Единая логика взаимодействия для desktop и mobile с учетом контекста пользователя",
  },
  {
    title: "Низкий порог входа",
    description:
      "Понятный интерфейс, простые действия и короткие сценарии для новых пользователей",
  },
];

const interfaceSystemPlainRaw = "Основной цикл взаимодействия с сервисом";

const visualSystemLinesRaw = [
  "Визуальная система построена на сочетании ярких акцентных цветов и компактных data blocks",
  "Интерфейс спроектирован с учетом высокой плотности контента и постоянного обновления событий",
];

const integrationLinesRaw = [
  "Подготовленные материалы и макеты были переданы стороннему frontend-разработчику для реализации MVP",
  "Дополнительных итераций по структуре интерфейса после передачи не потребовалось",
];

const summaryListTitleRaw = "Проект позволил";
const summaryListItemsRaw = [
  "быстро визуализировать MVP-гипотезу",
  "сформировать базовую архитектуру продукта",
  "собрать консистентную систему интерфейсов",
  "структурировать игровые сценарии взаимодействия",
];

export const predictionsProjectHeadline = {
  header: typograph(headlineRaw.header),
  subheader: typograph(headlineRaw.subheader),
};

export const predictionsProjectResultLines = resultPlainLinesRaw;
export const predictionsProjectContextPlain = contextPlainRaw;
export const predictionsProjectContextListTitle = contextListTitleRaw;
export const predictionsProjectContextListItems = contextListItemsRaw;
export const predictionsProjectContextDescription = contextDescriptionRaw;

export const predictionsProjectProblemListPrimaryTitle = problemListPrimaryTitleRaw;
export const predictionsProjectProblemListPrimaryItems = problemListPrimaryItemsRaw;
export const predictionsProjectProblemListSecondaryTitle = problemListSecondaryTitleRaw;
export const predictionsProjectProblemListSecondaryItems = problemListSecondaryItemsRaw;

export const predictionsProjectTaskListTitle = taskListTitleRaw;
export const predictionsProjectTaskListItems = taskListItemsRaw;
export const predictionsProjectTaskDescription = taskDescriptionRaw;

export const predictionsProjectApproachResearch = approachResearchRaw;
export const predictionsProjectApproachStructuring = approachStructuringRaw;
export const predictionsProjectApproachDesign = approachDesignRaw;

export const predictionsProjectArchitecturePlain = architecturePlainRaw;
export const predictionsProjectArchitecturePrinciplesTitle = architecturePrinciplesTitleRaw;
export const predictionsProjectArchitecturePrinciplesDescriptions =
  architecturePrinciplesDescriptionsRaw;

export const predictionsProjectInterfaceSystemPlain = interfaceSystemPlainRaw;
export const predictionsProjectVisualSystemLines = visualSystemLinesRaw;
export const predictionsProjectIntegrationLines = integrationLinesRaw;
export const predictionsProjectSummaryListTitle = summaryListTitleRaw;
export const predictionsProjectSummaryListItems = summaryListItemsRaw;

export const predictionsProjectImages = {
  result: {
    src: predictionsResultImageUrl,
    alt: "Схема структуры интерфейса MVP-сервиса прогнозов",
  },
  architecture: {
    src: new URL("../../public/img/04_02_02.svg", import.meta.url).href,
    alt: "Диаграмма архитектуры сценариев взаимодействия",
  },
  interfaceSystem: {
    src: "/img/04_02_03.svg",
    alt: "Система интерфейса и пользовательские потоки",
  },
};

export const predictionsProjectDetailPath = "/projects/predictions";
