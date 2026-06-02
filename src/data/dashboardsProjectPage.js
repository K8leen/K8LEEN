import { typograph } from "../utils/typography";

const headlineRaw = {
  header: "Система дашбордов для B2B SaaS-продукта",
  subheader:
    "Масштабирование аналитических сценариев через модульную dashboard-систему",
};

const resultPlainLinesRaw = [
  "Спроектирована система аналитических дашбордов для enterprise SaaS-платформы",
  "Разработана концепция модульной аналитики",
  "Создана единая UX-система для работы с аналитикой, метриками и операционным мониторингом",
  "Сформированы принципы масштабирования dashboard-системы для разных ролей и уровней управления",
];

const contextPlainRaw =
  "Работа велась над B2B SaaS-продуктом со сложной структурой сущностей и высокой плотностью аналитических данных";

const contextListTitleRaw = "На момент старта";

const contextListItemsRaw = [
  "отсутствовала единая логика dashboard-системы",
  "аналитика была распределена по модулям",
  "отсутствовала зависимость между размером виджета и глубиной аналитики",
];

const contextDescriptionRaw = {
  title: "Моя роль: PRODUCT / UX/UI DESIGNER",
  description:
    "От проектирования аналитической архитектуры и сценариев до проработки dashboard-системы и передачи макетов в разработку",
};

const problemPlainRaw =
  "Существующая аналитика была построена вокруг отдельных экранов, а не вокруг системы работы с данными.";

const problemListTitleRaw = "Как результат:";

const problemListItemsRaw = [
  "перегрузка интерфейсов",
  "дублирование визуализаций",
  "высокая когнитивная нагрузка",
  "сложности масштабирования аналитики",
  "ограниченная кастомизация",
];

const taskListTitleRaw = "Спроектировать dashboard-систему, которая:";

const taskListItemsRaw = [
  "поддерживает разные уровни аналитики",
  "позволяет пользователям настраивать интерфейс",
  "масштабируется под разные модули продукта",
  "адаптирует визуализацию под объем данных",
  "сохраняет консистентность UX",
  "снижает когнитивную нагрузку при работе с аналитикой",
];

const approachListsRaw = [
  {
    title: "Исследование",
    listItems: [
      "анализ существующих аналитических сценариев",
      "декомпозиция пользовательских ролей",
      "исследование dashboard-patterns",
      "анализ плотности данных и когнитивной нагрузки",
      "выявление уровней принятия решений",
    ],
  },
  {
    title: "Структурирование",
    listItems: [
      "разделение аналитики по уровням управления",
      "выделение базовых типов визуализации",
      "формирование dashboard-grid системы",
      "проектирование semantic data groups",
      "определение adaptive behavior для виджетов",
    ],
  },
  {
    title: "Проектирование",
    listItems: [
      "создание модульной системы dashboard-виджетов",
      "проектирование resize-сценариев",
      "разработка adaptive data-depth logic",
      "унификация interaction patterns",
      "формирование единой UX-логики аналитики",
    ],
  },
];

const architecturePlainRaw =
  "Система выстраивалась как единая аналитическая среда, где глубина данных, визуализация и поведение интерфейса напрямую зависят от пользовательского контекста и размера аналитического блока.";

const principlesDescriptionsRaw = [
  {
    title: "Системность",
    description: "единые правила построения дашбордов и виджетов",
  },
  {
    title: "Гибкость",
    description: "пользователь адаптирует интерфейс под свои задачи",
  },
  {
    title: "Масштабируемость",
    description: "поддержка новых модулей, метрик и визуализаций",
  },
  {
    title: "Консистентность",
    description: "единые сценарии и паттерны во всех модулях",
  },
];

const integrationDescriptionsRaw = [
  {
    title: "Синхронизация с библиотекой",
    description: "использование Recharts как основы для кастомизации",
  },
  {
    title: "Использование дизайн-системы продукта",
    description:
      "цветовые палитры, учитывающие доступность (Accessibility) и семантику (Success, Warning, Danger)",
  },
  {
    title: "Адаптивная сетка",
    description:
      "спецификации для разработчиков по поведению графиков при изменении размера контейнера",
  },
];

const summaryPlainLinesRaw = [
  "Пользователи получили возможность создавать персональные рабочие пространства",
  "Продукт стал конкурентоспособным в сегменте Enterprise за счет гибкой аналитики",
  "Система успешно масштабирована на несколько различных модулей продукта без привлечения ресурсов на перепроектирование UI",
];

export const dashboardsProjectHeadline = {
  header: typograph(headlineRaw.header),
  subheader: typograph(headlineRaw.subheader),
};

export const dashboardsProjectResultLines = resultPlainLinesRaw;

export const dashboardsProjectContextPlain = contextPlainRaw;
export const dashboardsProjectContextListTitle = contextListTitleRaw;
export const dashboardsProjectContextListItems = contextListItemsRaw;
export const dashboardsProjectContextDescription = contextDescriptionRaw;

export const dashboardsProjectProblemPlain = problemPlainRaw;
export const dashboardsProjectProblemListTitle = problemListTitleRaw;
export const dashboardsProjectProblemListItems = problemListItemsRaw;

export const dashboardsProjectTaskListTitle = taskListTitleRaw;
export const dashboardsProjectTaskListItems = taskListItemsRaw;

export const dashboardsProjectApproachLists = approachListsRaw;

export const dashboardsProjectArchitecturePlain = architecturePlainRaw;

export const dashboardsProjectPrinciplesDescriptions = principlesDescriptionsRaw;
export const dashboardsProjectIntegrationDescriptions = integrationDescriptionsRaw;

export const dashboardsProjectSummaryLines = summaryPlainLinesRaw;

export const dashboardsProjectImages = {
  result: {
    src: "/img/04_01_01.svg",
    alt: "Изометрическая схема модульной dashboard-системы",
  },
  widgets: {
    src: "/img/04_01_02.svg",
    alt: "Типы dashboard-виджетов и их размеры в сетке",
  },
  flow: {
    src: "/img/04_01_03.svg",
    alt: "Схема логики dashboard-системы для администратора и пользователя",
  },
};

export const dashboardsProjectDetailPath = "/projects/dashboards";
