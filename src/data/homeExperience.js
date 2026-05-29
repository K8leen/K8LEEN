import { typograph } from "../utils/typography";

const homeExperienceItemsRaw = [
  {
    year: "2026",
    company: "FREELANCE",
    role: "UX/UI дизайнер",
    description: "Работа с продуктами от концепции до внедрения",
  },
  {
    year: "2025",
    company: "PROGREDIS",
    role: "дизайнер интерфейсов",
    description:
      "Сформировала дизайн-систему продукта на базе MATERIAL\u00A0UI, разработав библиотеку переиспользуемых компонентов",
  },
  {
    year: "2021-2025",
    company: "FREELANCE",
    role: "UX/UI дизайнер",
    description:
      "Оптимизация продукта на основе исследований позволила увеличить уровень удовлетворенности пользователей на 25%",
  },
  {
    year: "2012-2021",
    company: "Правительство Москвы",
    role: "начальник отдела",
    description:
      "Выстроила систему бесперебойной работы 24/7, внедрила информационную систему обеспечения деятельности и систему электронного документооборота",
  },
];

function typographExperienceItem(item) {
  return {
    // Год/диапазон — как в макете (дефис-minus), без замены на «–»
    year: item.year,
    company: typograph(item.company),
    role: item.role,
    description: typograph(item.description),
  };
}

/** Контент Experience block в SEC-03_Опыт (главная) */
export const homeExperienceItems = homeExperienceItemsRaw.map(typographExperienceItem);
