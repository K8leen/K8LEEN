import { typograph } from "../utils/typography";

const headlineRaw = {
  header: "Дизайн-система B2B SaaS-продукта",
  subheader: "Унификация интерфейсов и ускорение разработки",
};

const headlineTabletRaw = {
  header: "Дизайн-система B2B SaaS",
  subheader: "Унификация интерфейсов и ускорение разработки",
};

const resultPlainLinesRaw = [
  "Создана кроссплатформенная библиотека из 80+ атомарных компонентов",
  "Разработана семантическая система дизайн-токенов",
  "Сформирована интерактивная документация для группы разработки",
  "Внедрена поддержка светлой и темной тем на уровне архитектуры",
];

const contextPlainRaw =
  "Работа велась над B2B SaaS-продуктом со сложной структурой интерфейсов и большим количеством сценариев.";

const contextListTitleRaw = "На момент старта";

const contextListItemsRaw = [
  "интерфейсы развивались фрагментарно",
  "отсутствовала единая система компонентов",
  "дизайн и разработка расходились",
];

const contextDescriptionRaw = {
  title: "Моя роль: UX/UI дизайнер",
  description: "От анализа и проектирования до внедрения и поддержки системы",
};

const problemListItemsRaw = [
  "дублирование элементов интерфейса",
  "несогласованность визуальных и UX-решений",
  "замедление разработки из-за отсутствия стандартов",
  "усложнение поддержки продукта",
];

const taskListTitleRaw = "Создать дизайн-систему, которая:";

const taskListItemsRaw = [
  "унифицирует интерфейсы",
  "обеспечит масштабируемость",
  "ускорит работу команды",
  "снизит количество ошибок",
];

const approachListsRaw = [
  {
    title: "Аудит",
    listItems: [
      "анализ существующих интерфейсов",
      "выявление дублирующихся компонентов",
      "фиксация несоответствий",
    ],
  },
  {
    title: "Структурирование",
    listItems: [
      "разделение на уровни системы",
      "определение базовых сущностей",
      "формирование принципов построения компонентов",
    ],
  },
  {
    title: "Приоритизация",
    listItems: [
      "выделение ключевых компонентов",
      "постепенное внедрение системы в продукт",
    ],
  },
];

const architecturePlainRaw =
  "Система построена по принципу масштабируемой структуры, что позволило переиспользовать элементы, поддерживать консистентность и упростить развитие продукта. Библиотека компонентов разработана с учетом различных состояний, вариативности, масштабируемости.";

const applicationPlainRaw =
  "Дизайн-система применялась при проектировании пользовательских сценариев с учетом ролей и логики продукта. Компоненты объединяются в паттерны и используются во всей системе — от управления задачами до настройки конфигурации.";

const integrationPlainLinesRaw = [
  "Система синхронизирована с Material UI",
  "Подготовлены компоненты для передачи в разработку",
  "Обеспечена единая логика между дизайном и кодом",
];

const summaryPlainLinesRaw = [
  "Время на проектирование новых экранов сократилось на 40% за счет использования готовых модулей",
  "Создан единый язык общения между дизайном и фронтендом, что исключило ошибки при передаче макетов",
  "Система готова к масштабированию на новые модули продукта без привлечения дополнительных ресурсов на отрисовку UI",
];

export const designSystemProjectHeadline = {
  header: typograph(headlineRaw.header),
  subheader: typograph(headlineRaw.subheader),
};

export const designSystemProjectHeadlineTablet = {
  header: typograph(headlineTabletRaw.header),
  subheader: typograph(headlineTabletRaw.subheader),
};

export const designSystemProjectResultLines = resultPlainLinesRaw;

export const designSystemProjectContextPlain = contextPlainRaw;
export const designSystemProjectContextListTitle = contextListTitleRaw;
export const designSystemProjectContextListItems = contextListItemsRaw;
export const designSystemProjectContextDescription = contextDescriptionRaw;

export const designSystemProjectProblemListItems = problemListItemsRaw;

export const designSystemProjectTaskListTitle = taskListTitleRaw;
export const designSystemProjectTaskListItems = taskListItemsRaw;

export const designSystemProjectApproachLists = approachListsRaw;

export const designSystemProjectArchitecturePlain = architecturePlainRaw;
export const designSystemProjectApplicationPlain = applicationPlainRaw;

export const designSystemProjectIntegrationLines = integrationPlainLinesRaw;
export const designSystemProjectSummaryLines = summaryPlainLinesRaw;

export const designSystemProjectImages = {
  result: {
    src: new URL("../../public/img/ds_L.svg", import.meta.url).href,
    alt: "Иллюстрация архитектуры дизайн-системы",
  },
  architecture: {
    src: new URL("../../public/img/04_03_2.png", import.meta.url).href,
    alt: "Витрина компонентов дизайн-системы",
  },
  application: {
    src: "/img/04_03_03.svg",
    alt: "Схема применения дизайн-системы в продукте",
  },
};

export const designSystemProjectDetailPath = "/projects/design-system";
