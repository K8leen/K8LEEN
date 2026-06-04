/** Подписи на схеме SEC-06 — `id` группы в /public/img/04_04_03.svg */

/** Клиентская часть схемы — в «Связи» не показываем паттерн сам на себя */
const FOOD_TECH_CLIENT_INTERFACE_PATTERN_IDS = new Set([
  "continuous_feed_structure",
  "content_category_navigation",
  "contextual_entity_header",
  "product_card_pattern",
  "cross_sell_pattern",
  "incremental_order_builder",
  "unified_search_entry",
  "promotional_content_block",
  "quick_quantity_control",
  "checkout_decision_flow",
  "persistent_navigation",
  "order_status_tracking",
  "order_history_memory",
  "repeat_order_pattern",
  "post_order_feedback_loop",
]);

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
  let list = fields.list;

  if (list && FOOD_TECH_CLIENT_INTERFACE_PATTERN_IDS.has(id)) {
    list = list.filter((item) => item !== id);
  }

  return {
    id,
    label: id,
    modal: { sections: patternSections({ ...fields, list }) },
  };
}

export const FOOD_TECH_INTERFACE_ANNOTATIONS = [
  patternAnnotation("continuous_feed_structure", {
    list: [
      "continuous_feed_structure",
      "content_category_navigation",
      "unified_search_entry",
    ],
    problem:
      "Пользователь не знает ассортимент ресторана и не понимает, с чего начать выбор.",
    solution:
      "Контент организован как непрерывная лента с быстрым просмотром большого количества позиций без переходов между экранами.",
    why: "Пользователь начинает знакомство с сервисом через просмотр контента, а не через поиск конкретного блюда.",
    role: "Точка входа в сценарий заказа.",
  }),
  patternAnnotation("content_category_navigation", {
    list: [
      "content_category_navigation",
      "continuous_feed_structure",
      "product_card_pattern",
    ],
    problem: "Большой каталог сложно просматривать последовательно.",
    solution:
      "Категории позволяют быстро сузить область выбора без потери контекста.",
    why: "Пользователь переключается между типами блюд, не покидая текущий экран.",
    role: "Ускорение навигации внутри каталога.",
  }),
  patternAnnotation("contextual_entity_header", {
    list: [
      "contextual_entity_header",
      "product_card_pattern",
      "incremental_order_builder",
    ],
    problem:
      "Пользователь должен понимать, где находится, какой ресторан просматривает и какие условия заказа действуют.",
    solution:
      "Верхняя часть экрана содержит ключевую информацию о ресторане и сохраняет контекст сценария.",
    why: "Снижает вероятность ошибочного выбора и повышает доверие к сервису.",
    role: "Фиксация контекста взаимодействия.",
  }),
  patternAnnotation("product_card_pattern", {
    list: [
      "product_card_pattern",
      "cross_sell_pattern",
      "incremental_order_builder",
    ],
    problem:
      "Для принятия решения пользователю приходится открывать множество отдельных страниц.",
    solution:
      "Карточка содержит достаточный объём информации для выбора непосредственно в каталоге.",
    why: "Большая часть решений принимается без переходов внутрь карточки блюда.",
    role: "Базовая единица взаимодействия.",
  }),
  patternAnnotation("product_card_pattern_rest", {
    list: ["dense_grid_layout", "bulk_management_entry", "dashboard_summary_pattern"],
    problem:
      "Каждое блюдо содержит множество характеристик: изображение, цену, описание, доступность и действия управления.",
    solution: "Унифицированная карточка продукта.",
    why: "Повторяющаяся структура ускоряет сканирование интерфейса.",
    role: "Базовый строительный блок управления меню.",
  }),
  patternAnnotation("cross_sell_pattern", {
    list: [
      "cross_sell_pattern",
      "incremental_order_builder",
      "checkout_decision_flow",
    ],
    problem: "Пользователь редко исследует дополнительные позиции самостоятельно.",
    solution:
      "Сопутствующие товары предлагаются непосредственно в процессе формирования заказа.",
    why: "Дополнительный выбор становится частью основного сценария.",
    role: "Расширение заказа без усложнения интерфейса.",
  }),
  patternAnnotation("incremental_order_builder", {
    list: [
      "product_card_pattern",
      "cross_sell_pattern",
      "incremental_order_builder",
      "checkout_decision_flow",
    ],
    problem:
      "Корзина воспринимается как отдельный этап и разрывает сценарий выбора.",
    solution: "Заказ собирается постепенно по мере взаимодействия с контентом.",
    why: "Пользователь не переключается между режимом просмотра и режимом покупки.",
    role: "Центральный механизм формирования заказа.",
  }),
  patternAnnotation("unified_search_entry", {
    list: [
      "continuous_feed_structure",
      "content_category_navigation",
      "unified_search_entry",
    ],
    problem:
      "Часть пользователей приходит за конкретным блюдом, а не для изучения каталога.",
    solution: "Поиск доступен как альтернативный сценарий входа.",
    why: "Поддерживает разные модели поведения пользователей.",
    role: "Быстрый доступ к нужному контенту.",
  }),
  patternAnnotation("promotional_content_block", {
    list: [
      "promotional_content_block",
      "cross_sell_pattern",
      "incremental_order_builder",
    ],
    problem: "Акционные предложения теряются среди основного каталога.",
    solution: "Промо-контент встроен в пользовательский поток просмотра.",
    why: "Акции становятся частью естественного сценария выбора.",
    role: "Механизм продвижения специальных предложений.",
  }),
  patternAnnotation("quick_quantity_control", {
    list: [
      "quick_quantity_control",
      "incremental_order_builder",
      "checkout_decision_flow",
    ],
    problem: "Изменение количества товаров требует лишних действий.",
    solution:
      "Управление количеством доступно непосредственно в точке принятия решения.",
    why: "Снижает стоимость корректировки заказа.",
    role: "Оптимизация процесса формирования корзины.",
  }),
  patternAnnotation("checkout_decision_flow", {
    list: [
      "incremental_order_builder",
      "quick_quantity_control",
      "checkout_decision_flow",
      "order_status_tracking",
    ],
    problem:
      "На этапе оформления пользователь сталкивается с большим количеством решений одновременно.",
    solution: "Оформление разбито на последовательность небольших выборов.",
    why: "Каждое решение принимается отдельно и не перегружает пользователя.",
    role: "Преобразование корзины в заказ.",
  }),
  patternAnnotation("persistent_navigation", {
    list: [
      "continuous_feed_structure",
      "persistent_navigation",
      "order_history_memory",
    ],
    problem: "Пользователь должен быстро переключаться между разделами.",
    solution: "Основные точки входа постоянно доступны.",
    why: "Устраняет необходимость возвращаться назад через цепочку экранов.",
    role: "Глобальная навигационная основа продукта.",
  }),
  patternAnnotation("order_status_tracking", {
    list: [
      "checkout_decision_flow",
      "order_status_tracking",
      "post_order_feedback_loop",
    ],
    problem:
      "После оформления заказа пользователь теряет понимание происходящего.",
    solution: "Статус заказа отображается как продолжение сценария.",
    why: "Ожидание становится прозрачным и предсказуемым.",
    role: "Поддержка пользователя после покупки.",
  }),
  patternAnnotation("order_history_memory", {
    list: [
      "order_status_tracking",
      "order_history_memory",
      "repeat_order_pattern",
    ],
    problem: "Повторные покупки требуют заново проходить весь путь выбора.",
    solution: "История заказов сохраняет контекст предыдущих решений.",
    why: "Система использует уже совершенные действия как основу следующего заказа.",
    role: "Основа повторного использования сервиса.",
  }),
  patternAnnotation("repeat_order_pattern", {
    list: [
      "order_history_memory",
      "repeat_order_pattern",
      "post_order_feedback_loop",
    ],
    problem: "Лояльные пользователи вынуждены повторять одинаковые действия.",
    solution: "Заказ можно воспроизвести одним действием.",
    why: "Сокращается путь к повторной покупке.",
    role: "Механизм удержания пользователей.",
  }),
  patternAnnotation("post_order_feedback_loop", {
    list: [
      "order_status_tracking",
      "post_order_feedback_loop",
      "repeat_order_pattern",
    ],
    problem: "После завершения заказа взаимодействие с пользователем заканчивается.",
    solution: "Обратная связь встроена в завершение сценария.",
    why: "Каждый завершённый заказ становится источником данных для дальнейшего улучшения сервиса.",
    role: "Замыкание полного пользовательского цикла.",
  }),
  patternAnnotation("navigation_shell", {
    list: [
      "dense_grid_layout",
      "dashboard_summary_pattern",
      "order_queue_pattern",
      "feedback_integration",
    ],
    problem:
      "Операторы ресторана работают одновременно с заказами, меню, аналитикой и отзывами. Переключение между разделами не должно требовать дополнительного поиска и переориентации.",
    solution:
      "Постоянная боковая навигация с быстрым доступом ко всем основным областям системы.",
    why: "Система используется ежедневно и многократно в течение смены. Скорость переходов важнее экономии пространства.",
    role: "Является каркасом всей административной платформы.",
  }),
  patternAnnotation("global_search", {
    list: ["category_filter_system", "order_queue_pattern", "product_card_pattern"],
    problem:
      "Поиск заказов, блюд и клиентов через навигацию занимает слишком много времени при большом объеме данных.",
    solution: "Единая точка поиска, доступная из любого раздела системы.",
    why: "Поиск является более быстрым сценарием, чем последовательная навигация по разделам.",
    role: "Ускоряет доступ к конкретным сущностям независимо от текущего контекста.",
  }),
  patternAnnotation("category_filter_system", {
    list: ["product_card_pattern", "dense_grid_layout"],
    problem: "Большое меню быстро превращается в длинный труднообозримый список.",
    solution: "Категории используются как первый уровень структурирования каталога.",
    why: "Большинство сотрудников мыслит не отдельными блюдами, а категориями меню.",
    role: "Снижает визуальную сложность каталога.",
  }),
  patternAnnotation("dense_grid_layout", {
    list: ["category_filter_system", "product_card_pattern", "bulk_management_entry"],
    problem:
      "Необходимо одновременно отображать большое количество товарных позиций без перегрузки интерфейса.",
    solution: "Компактная карточная сетка с высокой плотностью информации.",
    why: "Для операционных интерфейсов важнее скорость просмотра и сравнения, чем визуальная выразительность.",
    role: "Позволяет эффективно работать с большим ассортиментом.",
  }),
  patternAnnotation("bulk_management_entry", {
    list: ["product_card_pattern", "category_filter_system"],
    problem:
      "Изменение большого количества позиций по одной приводит к высоким операционным затратам.",
    solution: "Точка входа в массовые действия над объектами.",
    why: "Массовое редактирование является обязательным сценарием для живого меню ресторана.",
    role: "Повышает эффективность административной работы.",
  }),
  patternAnnotation("dashboard_summary_pattern", {
    list: [
      "visual_data_grouping",
      "time_filter_pattern",
      "feedback_integration",
      "order_queue_pattern",
    ],
    problem:
      "Для принятия решений менеджеру приходится собирать информацию из нескольких разделов.",
    solution: "Единый аналитический экран с ключевыми метриками бизнеса.",
    why: "Руководителю важны не отдельные данные, а общая картина состояния ресторана.",
    role: "Точка обзора всей операционной деятельности.",
  }),
  patternAnnotation("visual_data_grouping", {
    list: ["dashboard_summary_pattern", "time_filter_pattern"],
    problem: "Сырые числовые данные сложно сравнивать и анализировать.",
    solution: "Метрики объединяются в визуальные группы и графики.",
    why: "Закономерности легче воспринимаются визуально, чем через таблицы.",
    role: "Преобразует данные в управленческую информацию.",
  }),
  patternAnnotation("time_filter_pattern", {
    list: [
      "dashboard_summary_pattern",
      "visual_data_grouping",
      "priority_visualization",
    ],
    problem: "Показатели ресторана сильно зависят от периода анализа.",
    solution: "Глобальный временной фильтр для всех аналитических данных.",
    why: "Сравнение периодов является базовым сценарием управления бизнесом.",
    role: "Формирует аналитический контекст.",
  }),
  patternAnnotation("feedback_integration", {
    list: ["dashboard_summary_pattern", "priority_visualization"],
    problem: "Отзывы клиентов часто существуют отдельно от операционных данных.",
    solution: "Отзывы встроены непосредственно в административную систему.",
    why: "Качество сервиса должно анализироваться вместе с показателями бизнеса.",
    role: "Замыкает цикл обратной связи.",
  }),
  patternAnnotation("status_management_system", {
    list: ["order_queue_pattern", "priority_visualization"],
    problem: "Каждый заказ проходит несколько состояний, требующих контроля.",
    solution:
      "Статусы становятся основным механизмом управления жизненным циклом заказа.",
    why: "Сотрудникам важно понимать текущее состояние без открытия карточки заказа.",
    role: "Основа операционного управления заказами.",
  }),
  patternAnnotation("order_queue_pattern", {
    list: ["status_management_system", "priority_visualization", "global_search"],
    problem: "Во время высокой нагрузки одновременно обрабатываются десятки заказов.",
    solution: "Очередь заказов с быстрым принятием решений прямо из списка.",
    why: "Работа должна происходить без переходов между экранами.",
    role: "Главный рабочий инструмент оператора.",
  }),
  patternAnnotation("priority_visualization", {
    list: ["order_queue_pattern", "status_management_system", "feedback_integration"],
    problem: "Не все заказы требуют одинакового внимания.",
    solution: "Использование визуальных маркеров приоритета и состояния.",
    why: "Критические объекты должны выделяться мгновенно.",
    role: "Помогает распределять внимание сотрудников.",
  }),
];

export function getFoodTechInterfaceAnnotation(id) {
  return FOOD_TECH_INTERFACE_ANNOTATIONS.find((item) => item.id === id);
}
