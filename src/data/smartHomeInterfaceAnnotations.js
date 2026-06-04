/** Подписи на схеме SEC-06 — `id` группы в /public/img/04_05_03.svg */

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

export const SMART_HOME_INTERFACE_ANNOTATIONS = [
  patternAnnotation("navigation_system", {
    list: ["system_overview", "filter_pattern", "scenario_builder"],
    problem:
      "При большом количестве устройств пользователю сложно быстро переключаться между основными сценариями управления.",
    solution: "Основные разделы вынесены в постоянную нижнюю навигацию.",
    why: "Управление умным домом относится к высокочастотным сценариям использования.",
    role: "Обеспечивает быстрый доступ к ключевым областям управления.",
  }),
  patternAnnotation("data_visualization", {
    list: ["system_overview", "control_panel"],
    problem: "Состояние дома невозможно оценить по спискам устройств.",
    solution: "Ключевые показатели агрегируются в визуальные блоки состояния.",
    why: "Пользователь должен сначала понять ситуацию, а потом принимать решение.",
    role: "Создает обзорный уровень восприятия системы.",
  }),
  patternAnnotation("system_overview", {
    list: ["data_visualization", "filter_pattern", "device_grid"],
    problem: "Информация о доме распределена между десятками устройств.",
    solution: "Создан единый экран состояния экосистемы.",
    why: "Большинство пользователей мыслят категориями помещений и дома целиком, а не отдельными устройствами.",
    role: "Главная точка входа в систему управления.",
  }),
  patternAnnotation("filter_pattern", {
    list: ["system_overview", "device_grid", "list_pattern"],
    problem: "По мере роста количества устройств поиск нужного объекта становится медленным.",
    solution: "Добавлены быстрые фильтры по типам устройств и категориям.",
    why: "Количество действий должно зависеть от задачи, а не от масштаба системы.",
    role: "Сокращает путь до нужного устройства.",
  }),
  patternAnnotation("list_pattern", {
    list: ["filter_pattern", "device_grid"],
    problem: "Часть сценариев требует просмотра большого количества объектов одновременно.",
    solution: "Используется компактное списочное представление.",
    why: "Список позволяет отображать больше сущностей без потери читаемости.",
    role: "Инструмент быстрого обзора устройств.",
  }),
  patternAnnotation("device_grid", {
    list: ["list_pattern", "control_panel", "device_setup_pattern"],
    problem: "Пользователю необходимо быстро находить конкретные устройства.",
    solution: "Устройства представлены в виде карточек с состоянием и быстрыми действиями.",
    why: "Карточный формат облегчает визуальное сканирование.",
    role: "Основной слой управления объектами дома.",
  }),
  patternAnnotation("device_setup_pattern", {
    list: ["device_grid", "control_panel"],
    problem: "Процесс добавления устройств часто оказывается сложным и техническим.",
    solution: "Настройка разбита на последовательные шаги.",
    why: "Уменьшение сложности повышает вероятность успешного подключения.",
    role: "Точка расширения экосистемы устройств.",
  }),
  patternAnnotation("control_panel", {
    list: ["device_grid", "scenario_card", "data_visualization"],
    problem: "Для управления устройством пользователю приходится переходить между экранами.",
    solution: "Основные параметры собраны на одном экране управления.",
    why: "Управление должно происходить максимально близко к объекту действия.",
    role: "Центр взаимодействия с отдельным устройством.",
  }),
  patternAnnotation("bottom_sheet_pattern", {
    list: ["control_panel", "scenario_builder"],
    problem: "Дополнительные настройки перегружают основной интерфейс.",
    solution: "Второстепенные действия раскрываются поверх текущего контекста.",
    why: "Пользователь не теряет текущее положение в сценарии.",
    role: "Контекстный уровень взаимодействия.",
  }),
  patternAnnotation("scenario_card", {
    list: ["scenario_builder", "control_panel"],
    problem: "Автоматизации сложно воспринимать как единый объект управления.",
    solution:
      "Каждый сценарий представлен отдельной сущностью со своим состоянием и действиями.",
    why: "Сценарии становятся понятными и управляемыми.",
    role: "Базовый объект автоматизации.",
  }),
  patternAnnotation("scenario_builder", {
    list: ["scenario_card", "bottom_sheet_pattern", "device_grid"],
    problem:
      "Создание автоматизаций требует сложной логики и большого количества параметров.",
    solution: "Настройка сценариев разбита на последовательный конструктор.",
    why: "Пользователь концентрируется на одной задаче за раз.",
    role: "Инструмент создания автоматизации дома.",
  }),
];
