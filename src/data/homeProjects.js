import { dashboardsProjectDetailPath } from "./dashboardsProjectPage";
import { predictionsProjectDetailPath } from "./predictionsProjectPage";
import { typograph } from "../utils/typography";

const homeProjectsRaw = [
  {
    imageSrc: "/img/db_s.svg",
    imageAlt: "Иллюстрация: система дашбордов",
    tags: [
      { label: "NDA", tone: "nda" },
      { label: "web", tone: "web" },
      { label: "UX/UI design", tone: "uxUi" },
    ],
    title: "Система дашбордов для B2B-SaaS продукта",
    roleLabel: "Роль",
    roleValue: "product / UX/UI дизайнер",
    resultLabel: "Ключевой результат",
    resultValue: "Спроектирована конфигурируемая система аналитических дашбордов",
    detailTo: dashboardsProjectDetailPath,
  },
  {
    imageSrc: "/img/pred_s.svg",
    imageAlt: "Иллюстрация: геймифицированный сервис прогнозов",
    tags: [
      { label: "web+mobile", tone: "webMobile" },
      { label: "UX/UI design", tone: "uxUi" },
    ],
    title: "Геймифицированный сервис прогнозов",
    roleLabel: "Роль",
    roleValue: "UX/UI дизайнер",
    resultLabel: "Ключевой результат",
    resultValue:
      "Сформирована UX-архитектура платформы с циклом постоянного вовлечения",
    detailTo: predictionsProjectDetailPath,
  },
];

export function typographProject(project) {
  return {
    ...project,
    title: typograph(project.title),
    roleLabel: typograph(project.roleLabel),
    roleValue: project.roleValue,
    resultLabel: typograph(project.resultLabel),
    resultValue: typograph(project.resultValue),
    tags: project.tags.map((tag) => ({
      ...tag,
      label: typograph(tag.label),
    })),
  };
}

/** Карточки проектов SEC-04_Проекты (главная) */
export const homeProjects = homeProjectsRaw.map(typographProject);
