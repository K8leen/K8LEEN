const NBSP = "\u00A0";

/** Единое написание: U+0451/U+0401 → е/Е (включая decomposed е + diaeresis). */
export function normalizeYo(text) {
  if (!text) return text;
  return text
    .replace(/\u0401/g, "\u0415")
    .replace(/\u0451/g, "\u0435")
    .replace(/\u0415\u0308/g, "\u0415")
    .replace(/\u0435\u0308/g, "\u0435");
}

/** Короткие слова, после которых в русской верстке ставят неразрывный пробел */
const NBSP_AFTER = [
  "без",
  "в",
  "во",
  "для",
  "до",
  "за",
  "из",
  "к",
  "ко",
  "на",
  "над",
  "но",
  "о",
  "об",
  "от",
  "по",
  "под",
  "при",
  "про",
  "с",
  "со",
  "у",
  "через",
  "а",
  "и",
];

const NBSP_AFTER_PATTERN = new RegExp(
  `(^|[\\s(,«"—])(${NBSP_AFTER.join("|")}) (?=[\\p{L}\\d])`,
  "giu",
);

/** «слово- и слово» → «слово-⎵и⎵слово» */
const HYPHEN_AND_PATTERN = /(\p{L}+)- и /giu;

/**
 * Базовая русская типографика для UI-текстов: NBSP после предлогов/союзов,
 * тире вокруг «—», связки через дефис с «и».
 */
export function typograph(text) {
  if (!text) return text;

  let result = normalizeYo(text)
    .replace(/\s*—\s*/g, `${NBSP}—${NBSP}`)
    .replace(/(\d+)\s*-\s*(\d+)/g, "$1–$2")
    .replace(HYPHEN_AND_PATTERN, `$1-${NBSP}и${NBSP}`);

  let prev;
  do {
    prev = result;
    result = result.replace(NBSP_AFTER_PATTERN, `$1$2${NBSP}`);
  } while (result !== prev);

  return result;
}

/** Аббревиатуры в Text block (plain / description) и в заголовках list */
const TEXT_BLOCK_ABBREVIATIONS = [
  ["ux/ui", "UX/UI"],
  ["nda", "NDA"],
  ["b2b", "B2B"],
  ["saas", "SaaS"],
  ["mvp", "MVP"],
  ["api", "API"],
  ["ux", "UX"],
  ["ui", "UI"],
  ["hr", "HR"],
  ["it", "IT"],
  ["pm", "PM"],
  ["po", "PO"],
  ["qa", "QA"],
  ["mui", "MUI"],
  ["material ui", "Material UI"],
].sort((a, b) => b[0].length - a[0].length);

/** Аббревиатуры в строке роли — фиксированный регистр (длинные ключи раньше) */
const ROLE_ABBREVIATIONS = [
  ["ux/ui", "UX/UI"],
  ["nda", "NDA"],
  ["b2b", "B2B"],
  ["saas", "SaaS"],
  ["api", "API"],
  ["ux", "UX"],
  ["ui", "UI"],
  ["hr", "HR"],
  ["it", "IT"],
  ["pm", "PM"],
  ["po", "PO"],
  ["qa", "QA"],
].sort((a, b) => b[0].length - a[0].length);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function applyTextBlockAbbreviations(text) {
  let result = text;
  for (const [key, canonical] of TEXT_BLOCK_ABBREVIATIONS) {
    result = result.replace(new RegExp(escapeRegExp(key), "gi"), canonical);
  }
  return result;
}

/** Географические имена: после toLowerCase восстанавливаем написание */
const TEXT_BLOCK_PROPER_NOUNS = [
  ["казахстане", "Казахстане"],
  ["казахстана", "Казахстана"],
  ["казахстан", "Казахстан"],
].sort((a, b) => b[0].length - a[0].length);

function applyTextBlockProperNouns(text) {
  let result = text;
  for (const [key, canonical] of TEXT_BLOCK_PROPER_NOUNS) {
    result = result.replace(new RegExp(escapeRegExp(key), "gi"), canonical);
  }
  return result;
}

/** plain / description: каждое предложение с заглавной буквы, аббревиатуры — капсом */
export function formatTextBlockPlain(text) {
  if (!text) return text;
  let result = text.toLocaleLowerCase("ru");
  result = applyTextBlockProperNouns(result);
  result = result.replace(/(^|[.!?]\s+)(\p{L})/gu, (_match, prefix, letter) => {
    return `${prefix}${letter.toLocaleUpperCase("ru")}`;
  });
  result = applyTextBlockAbbreviations(result);
  return typograph(result);
}

/** modal: абзацы через \\n — каждый блок как plain TextBlock */
export function formatModalText(text) {
  if (!text) return text;
  return text
    .split("\n")
    .map((line) => (line.length > 0 ? formatTextBlockPlain(line) : line))
    .join("\n");
}

/** list: заголовок с заглавной буквы (аббревиатуры сохраняются) */
export function formatTextBlockListTitle(text) {
  if (!text) return text;
  let result = text.toLocaleLowerCase("ru");
  result = result.charAt(0).toLocaleUpperCase("ru") + result.slice(1);
  result = applyTextBlockAbbreviations(result);
  return typograph(result);
}

/** list: пункты с маленькой буквы */
export function formatTextBlockListItem(text) {
  if (!text) return text;
  let result = text.toLocaleLowerCase("ru");
  if (result.length > 0) {
    result = result.charAt(0).toLocaleLowerCase("ru") + result.slice(1);
  }
  return typograph(result);
}

const NB_HYPHEN = "\u2011";

const FEDERAL_LAW_152FZ_PATTERN =
  /№\s*152\s*-\s*фз\s*«\s*о\s+персональных\s+данных\s*»/giu;
const FEDERAL_LAW_152FZ_LOOSE = /№152-ФЗ «О персональных данных»/giu;
/** Неразрывная формулировка: не переносить между строками */
const FEDERAL_LAW_152FZ_CANONICAL = `№152${NB_HYPHEN}ФЗ${NBSP}«О${NBSP}персональных${NBSP}данных»`;
const YANDEX_METRIKA_PATTERN = /Яндекс\s+Метрика/giu;
const YANDEX_METRIKA_CANONICAL = "Яндекс.Метрика";

/** Юридические тексты: фиксированный регистр и официальные названия */
export function normalizeLegalReferences(text) {
  if (!text) return text;
  return text
    .replace(FEDERAL_LAW_152FZ_PATTERN, FEDERAL_LAW_152FZ_CANONICAL)
    .replace(FEDERAL_LAW_152FZ_LOOSE, FEDERAL_LAW_152FZ_CANONICAL)
    .replace(YANDEX_METRIKA_PATTERN, YANDEX_METRIKA_CANONICAL);
}

/** Правовая страница: typograph без смены регистра абзаца */
export function formatLegalPlain(text) {
  if (!text) return text;
  return normalizeLegalReferences(typograph(text));
}

export function formatLegalListTitle(text) {
  if (!text) return text;
  return normalizeLegalReferences(typograph(text));
}

export function formatLegalListItem(text) {
  if (!text) return text;
  return normalizeLegalReferences(typograph(text));
}

/**
 * Роль: только строчные, кроме аббревиатур (UX/UI, B2B, …).
 * «Начальник Отдела» → «начальник отдела».
 */
export function formatRoleText(text) {
  if (!text) return text;

  let result = normalizeYo(text).toLocaleLowerCase("ru");

  for (const [key, canonical] of ROLE_ABBREVIATIONS) {
    result = result.replace(new RegExp(escapeRegExp(key), "gi"), canonical);
  }

  return result;
}
