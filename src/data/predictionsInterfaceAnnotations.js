/** Подписи на схеме SEC-06 — `id` группы в /public/img/04_02_03.svg */

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

export const PREDICTIONS_INTERFACE_ANNOTATIONS = [
  patternAnnotation("repeated_card_structure", {
    list: [
      "content_scannability",
      "card_priority_logic",
      "visual_density_control",
      "semantic_information_layers",
      "probability_focus",
      "low_friction_interaction",
    ],
    problem:
      "Лента прогнозов содержит большое количество однотипных объектов.\nЕсли каждое событие отображается по-разному, пользователю приходится заново изучать интерфейс — возрастает время поиска информации, ухудшается сравнение событий между собой, увеличивается когнитивная нагрузка.",
    solution:
      "Для всех событий используется единый шаблон карточки.\nНезависимо от типа события пользователь видит одинаковую модель взаимодействия.",
    why:
      "Повторяемая структура позволяет не тратить ресурсы на распознавание интерфейса и сосредоточиться на содержании прогноза.",
    role: "Паттерн выступает фундаментом всей событийной модели продукта.",
  }),
  patternAnnotation("content_scannability", {
    list: ["card_priority_logic", "visual_density_control", "first_action_priority"],
    problem:
      "Пользователь сталкивается с большим количеством событий и должен быстро понять, какие из них заслуживают внимания.",
    solution:
      "Информация структурирована в виде компактных карточек с единым шаблоном отображения.",
    why: "В прогнозном сервисе решение о входе в сценарий принимается за несколько секунд.",
    role: "Обеспечивает быстрое первичное сканирование потока событий.",
  }),
  patternAnnotation("card_priority_logic", {
    list: ["content_scannability", "first_action_priority", "probability_focus"],
    problem: "Все события визуально равнозначны.",
    solution: "Карточки получают разные уровни визуального акцента.",
    why: "Внимание пользователя должно направляться к наиболее значимым событиям.",
    role: "Управляет распределением внимания внутри ленты.",
  }),
  patternAnnotation("visual_density_control", {
    list: ["content_scannability", "semantic_information_layers"],
    problem: "Избыточное количество данных усложняет восприятие событий.",
    solution: "Информация раскрывается постепенно по мере продвижения пользователя.",
    why: "Пользователь получает только тот объем данных, который необходим на текущем этапе.",
    role: "Снижает когнитивную нагрузку.",
  }),
  patternAnnotation("first_action_priority", {
    list: ["content_scannability", "card_priority_logic", "cross_device_auth_flow"],
    problem: "После знакомства с событием пользователь не понимает следующий шаг.",
    solution: "Основное действие визуально доминирует над второстепенными.",
    why: "Каждое дополнительное решение снижает вероятность вовлечения.",
    role: "Переводит пользователя из просмотра в действие.",
  }),
  patternAnnotation("cross_device_auth_flow", {
    list: ["progressive_onboarding", "first_action_priority"],
    problem: "Часть аудитории приходит с разных устройств и платформ.",
    solution: "Авторизация встроена в основной пользовательский поток.",
    why: "Регистрация не должна разрушать мотивацию участия.",
    role: "Сохраняет непрерывность сценария вовлечения",
  }),
  patternAnnotation("progressive_onboarding", {
    list: ["cross_device_auth_flow", "probability_focus"],
    problem: "Новый пользователь не понимает правила сервиса.",
    solution: "Сложность раскрывается постепенно через использование продукта.",
    why: "Изучение происходит быстрее через действие, чем через инструкции.",
    role: "Снижает порог входа.",
  }),
  patternAnnotation("probability_focus", {
    list: [
      "semantic_information_layers",
      "low_friction_interaction",
      "card_priority_logic",
    ],
    problem: "Пользователь теряется между описанием события и самим прогнозом.",
    solution: "Вероятностная оценка становится главным объектом внимания.",
    why: "Именно вероятность является ядром принятия решения.",
    role: "Формирует основу механики прогнозирования.",
  }),
  patternAnnotation("semantic_information_layers", {
    list: ["probability_focus", "visual_density_control"],
    problem: "Разным пользователям требуется разная глубина информации.",
    solution: "Контент разбит на уровни детализации.",
    why: "Новичкам нужен контекст, опытным пользователям — детали.",
    role: "Обеспечивает масштабируемость информационной модели.",
  }),
  patternAnnotation("low_friction_interaction", {
    list: ["probability_focus", "commitment_confirmation"],
    problem: "Процесс создания прогноза содержит лишние шаги.",
    solution: "Ключевое действие выполняется за минимальное количество взаимодействий.",
    why: "Чем быстрее совершается прогноз, тем выше вовлеченность.",
    role: "Ускоряет переход к основной ценности продукта.",
  }),
  patternAnnotation("commitment_confirmation", {
    list: ["low_friction_interaction", "reward_feedback_loop"],
    problem:
      "После совершения прогноза пользователь не получает подтверждения результата действия.",
    solution: "Система явно фиксирует факт участия.",
    why: "Подтверждение усиливает чувство вовлеченности и завершенности.",
    role: "Закрепляет принятое пользователем решение.",
  }),
  patternAnnotation("user_generated_content", {
    list: ["community_layer", "behavioral_motivation"],
    problem: "Сервис превращается в набор изолированных прогнозов.",
    solution: "Пользователи получают возможность обсуждать события.",
    why: "Контент сообщества увеличивает частоту возвратов.",
    role: "Формирует социальный слой продукта.",
  }),
  patternAnnotation("community_layer", {
    list: ["user_generated_content", "reward_feedback_loop"],
    problem: "Отсутствует социальное подтверждение прогнозов.",
    solution: "Взаимодействие между участниками встроено в сценарий использования.",
    why: "Публичная активность усиливает вовлеченность.",
    role: "Создает сетевой эффект внутри платформы.",
  }),
  patternAnnotation("reward_feedback_loop", {
    list: ["commitment_confirmation", "performance_visibility", "community_layer"],
    problem: "Пользователь не видит результата своих действий.",
    solution:
      "Система регулярно возвращает обратную связь через рейтинги и достижения.",
    why: "Вознаграждение поддерживает долгосрочную мотивацию.",
    role: "Замыкает цикл вовлечения.",
  }),
  patternAnnotation("performance_visibility", {
    list: ["reward_feedback_loop", "behavioral_motivation"],
    problem: "История успешности прогнозов остается невидимой.",
    solution: "Достижения и показатели выводятся в профиль пользователя.",
    why: "Измеримый прогресс мотивирует возвращаться в сервис.",
    role: "Поддерживает долгосрочную вовлеченность.",
  }),
  patternAnnotation("behavioral_motivation", {
    list: ["performance_visibility", "user_generated_content"],
    problem: "Опыт пользователя исчезает после завершения отдельных сценариев.",
    solution: "Система сохраняет историю активности и достижений.",
    why: "Накопленный прогресс повышает ценность аккаунта.",
    role: "Формирует долгосрочную память продукта.",
  }),
];
