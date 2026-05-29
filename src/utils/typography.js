const NBSP = "\u00A0";

/** Короткие слова, после которых в русской вёрстке ставят неразрывный пробел */
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

  let result = text
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

/**
 * Роль: только строчные, кроме аббревиатур (UX/UI, B2B, …).
 * «Начальник Отдела» → «начальник отдела».
 */
export function formatRoleText(text) {
  if (!text) return text;

  let result = text.toLocaleLowerCase("ru");

  for (const [key, canonical] of ROLE_ABBREVIATIONS) {
    result = result.replace(new RegExp(escapeRegExp(key), "gi"), canonical);
  }

  return result;
}
