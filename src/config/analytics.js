// Публичный ID счётчика — не секрет, виден в коде страницы после загрузки Метрики.
// .env переопределяет значение локально; fallback нужен для production-сборки без .env.
export const YANDEX_METRIKA_COUNTER_ID =
  import.meta.env.VITE_YANDEX_METRIKA_ID || "109871402";
