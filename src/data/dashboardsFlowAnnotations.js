/** Подписи на схеме SEC-05 — `id` группы в /public/img/04_01_03.svg */

function patternSections({ list, problem, solution, why, role }) {
  const sections = [];

  if (list?.length) {
    sections.push({ heading: "Связи", list });
  }

  sections.push(
    { heading: "Проблема", body: problem },
    { heading: "Решение", body: solution },
    { heading: "Почему так", body: why },
    { heading: "Роль в системе", body: role },
  );

  return sections;
}

function patternAnnotation(id, fields) {
  const list = fields.list?.filter((item) => item !== id);

  return {
    id,
    label: id,
    modal: { sections: patternSections({ ...fields, list }) },
  };
}

export const DASHBOARDS_FLOW_ANNOTATIONS = [
  patternAnnotation("responsive_widget_grid", {
    list: ["modular_dashboard_architecture", "adaptive_data_depth"],
    problem:
      "Фиксированные аналитические экраны плохо работают при изменении состава данных, размеров виджетов и сценариев использования.",
    solution:
      "Использована адаптивная сетка, позволяющая компонентам менять размер и положение в зависимости от контекста отображения.",
    why: "Аналитика развивается вместе с продуктом, поэтому структура интерфейса не должна ограничивать рост количества метрик и виджетов.",
    role: "Базовый слой размещения аналитических компонентов внутри дашборда.",
  }),
  patternAnnotation("modular_dashboard_architecture", {
    list: [
      "reusable_dashboard_modules",
      "dashboard_template_management",
      "widget_constraint_logic",
    ],
    problem:
      "Добавление новых аналитических сценариев приводило к созданию отдельных интерфейсов и дублированию решений.",
    solution:
      "Dashboard-система построена из независимых модулей с едиными правилами отображения и поведения.",
    why: "Модульный подход позволяет расширять систему без пересборки существующих экранов.",
    role: "Архитектурный каркас всей аналитической платформы.",
  }),
  patternAnnotation("reusable_dashboard_modules", {
    list: [
      "modular_dashboard_architecture",
      "dashboard_template_management",
      "drag_and_drop_layout",
    ],
    problem:
      "Разработка новых дашбордов требовала постоянного создания уникальных аналитических блоков.",
    solution:
      "Создан набор переиспользуемых модулей для визуализации различных типов данных.",
    why: "Один и тот же компонент может применяться в десятках сценариев без дополнительной разработки.",
    role: "Библиотека строительных блоков для аналитических интерфейсов.",
  }),
  patternAnnotation("dashboard_template_management", {
    list: [
      "reusable_dashboard_modules",
      "drag_and_drop_layout",
      "widget_constraint_logic",
    ],
    problem: "Создание новых аналитических страниц зависело от участия разработчиков.",
    solution:
      "Введена система шаблонов, позволяющая собирать дашборды из готовых компонентов.",
    why: "Большая часть изменений должна выполняться на уровне конфигурации, а не кода.",
    role: "Точка управления структурой аналитических экранов.",
  }),
  patternAnnotation("widget_constraint_logic", {
    list: [
      "dashboard_template_management",
      "adaptive_data_depth",
      "persistent_state_update",
    ],
    problem:
      "Одни и те же виджеты используются в разных сценариях и требуют различного поведения.",
    solution:
      "Поведение компонентов определяется системой ограничений и конфигурационных правил.",
    why: "Логика отображения отделяется от реализации интерфейса и становится управляемой.",
    role: "Механизм адаптации универсальных компонентов под конкретный сценарий аналитики.",
  }),
  patternAnnotation("drag_and_drop_layout", {
    list: [
      "reusable_dashboard_modules",
      "dashboard_template_management",
      "personalized_dashboard_layout",
    ],
    problem:
      "Пользователи работают с различными наборами данных и нуждаются в собственных рабочих пространствах.",
    solution:
      "Добавлен механизм свободной сборки и перестановки аналитических блоков.",
    why: "Пользователь должен адаптировать систему под свои задачи, а не подстраиваться под заранее заданную структуру.",
    role: "Инструмент персонализации дашбордов.",
  }),
  patternAnnotation("adaptive_data_depth", {
    list: [
      "responsive_widget_grid",
      "widget_constraint_logic",
      "personalized_dashboard_layout",
    ],
    problem: "Разным ролям требуется разная глубина аналитической детализации.",
    solution:
      "Система меняет объем и уровень детализации данных в зависимости от контекста использования.",
    why: "Руководителю необходимы агрегированные показатели, а специалисту — детальный анализ.",
    role: "Механизм управления сложностью аналитической информации.",
  }),
  patternAnnotation("live_dashboard_sync", {
    list: ["persistent_state_update", "personalized_dashboard_layout"],
    problem:
      "Изменения конфигурации могли приводить к рассинхронизации пользовательских рабочих пространств.",
    solution:
      "Обновления распространяются автоматически между системными и пользовательскими представлениями данных.",
    why: "Все пользователи работают с актуальной версией аналитической среды.",
    role: "Механизм обеспечения согласованности системы.",
  }),
  patternAnnotation("personalized_dashboard_layout", {
    list: ["drag_and_drop_layout", "adaptive_data_depth", "live_dashboard_sync"],
    problem:
      "Единая структура аналитики не подходит всем ролям и сценариям использования.",
    solution:
      "Каждый пользователь может формировать собственную конфигурацию рабочего пространства.",
    why: "Аналитическая система должна адаптироваться под задачи пользователя.",
    role: "Финальный пользовательский слой dashboard-платформы.",
  }),
  patternAnnotation("persistent_state_update", {
    list: [
      "widget_constraint_logic",
      "live_dashboard_sync",
      "personalized_dashboard_layout",
    ],
    problem:
      "Изменения конфигурации интерфейса и данных могли теряться между сессиями.",
    solution:
      "Состояние дашбордов сохраняется и автоматически восстанавливается при последующей работе.",
    why: "Пользователь должен возвращаться к привычному рабочему пространству без повторной настройки.",
    role: "Обеспечивает непрерывность пользовательского опыта и сохранность конфигурации аналитической среды.",
  }),
];

export function getDashboardsFlowAnnotation(id) {
  return DASHBOARDS_FLOW_ANNOTATIONS.find((item) => item.id === id);
}
