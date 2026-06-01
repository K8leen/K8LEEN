import { designSystemProjectDetailPath } from "./designSystemProjectPage";
import { homeProjects, typographProject } from "./homeProjects";
import { typograph } from "../utils/typography";

const designSystemProjectRaw = {
  imageSrc: "/img/ds_s.svg",
  imageAlt: "Иллюстрация: дизайн-система",
  tags: [
    { label: "NDA", tone: "nda" },
    { label: "UX/UI design", tone: "uxUi" },
  ],
  title: "Дизайн-система для B2B SaaS-продукта",
  roleLabel: "Роль",
  roleValue: "UX/UI дизайнер",
  resultLabel: "Ключевой результат",
  resultValue: "Сформирована единая дизайн-система продукта",
  detailTo: designSystemProjectDetailPath,
};

const foodTechProjectRaw = {
  imageSrc: "/img/combi_s.svg",
  imageAlt: "Иллюстрация: локальный food-tech продукт",
  tags: [
    { label: "web+mobile", tone: "webMobile" },
    { label: "UX/UI design", tone: "uxUi" },
  ],
  title: "Локальный food-tech продукт",
  roleLabel: "Роль",
  roleValue: "PRODUCT / UX/UI дизайнер",
  resultLabel: "Ключевой результат",
  resultValue: "Сформирована структура цифрового сервиса для локального рынка",
};

const smartHomeProjectRaw = {
  imageSrc: "/img/iot.svg",
  imageAlt: "Иллюстрация: мобильное приложение для умного дома",
  tags: [
    { label: "mobile", tone: "mobile" },
    { label: "UX/UI design", tone: "uxUi" },
  ],
  title: "Мобильное приложение для управления умным домом",
  roleLabel: "Роль",
  roleValue: "PRODUCT / UX/UI дизайнер",
  resultLabel: "Ключевой результат",
  resultValue: "Сформирована единая система управления устройствами и сценариями",
};

const typicalTasksListItemsRaw = [
  "запуск новых продуктов и MVP",
  "развитие существующих платформ",
  "унификация разрозненных интерфейсов",
  "проектирование административных систем",
  "масштабирование продуктовых решений",
  "создание дизайн-систем и компонентных библиотек",
];

export const projectsPageTypicalTasksListItems = typicalTasksListItemsRaw;

const afterProjectIntroRaw = "Результатом работы становятся не только интерфейсы.";

const afterProjectListTitleRaw = "После завершения проекта команда получает:";

const afterProjectListItemsRaw = [
  "согласованную структуру решений",
  "понятные правила развития продукта",
  "основу для дальнейшего масштабирования",
];

export const projectsPageAfterProjectIntro = afterProjectIntroRaw;
export const projectsPageAfterProjectListTitle = afterProjectListTitleRaw;
export const projectsPageAfterProjectListItems = afterProjectListItemsRaw;

/** Карточки SEC-05_Проекты: две с главной + три только на странице проектов */
export const projectsPageProjects = [
  ...homeProjects,
  typographProject(designSystemProjectRaw),
  typographProject(foodTechProjectRaw),
  typographProject(smartHomeProjectRaw),
];

const principlesParagraphsRaw = [
  "В большинстве продуктов сложность возникает не на уровне отдельных экранов, а на уровне связей между данными, ролями, процессами и бизнес-ограничениями.",
  "Поэтому в центре проектирования для меня находится не интерфейс сам по себе, а система, частью которой он является.",
  "Независимо от масштаба проекта — от нового сервиса до корпоративной платформы — задача заключается в том, чтобы создать решение, которое останется понятным пользователям и управляемым для команды по мере развития продукта.",
];

const scopeListTitleRaw =
  "Проекты могут отличаться предметной областью, аудиторией и масштабом, но обычно работа затрагивает несколько уровней системы одновременно:";

const scopeListItemsRaw = [
  "пользовательские сценарии и процессы",
  "информационную архитектуру",
  "аналитические интерфейсы и дашборды",
  "дизайн-системы и библиотеки компонентов",
  "конфигурационные и административные интерфейсы",
  "продуктовые паттерны и правила взаимодействия",
];

const scopeClosingRaw =
  "Каждый из этих уровней влияет на остальные, поэтому решения рассматриваются не изолированно, а в контексте всей системы.";

export const projectsPagePrinciples = principlesParagraphsRaw;
export const projectsPageScopeListTitle = scopeListTitleRaw;
export const projectsPageScopeListItems = scopeListItemsRaw;
export const projectsPageScopeClosing = scopeClosingRaw;

export const projectsPageHeadline = {
  header: typograph("ОТ ЗАДАЧИ К СИСТЕМЕ"),
  subheader: typograph("упорядочивание сложных продуктов через системный дизайн"),
};
