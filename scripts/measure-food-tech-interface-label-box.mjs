/**
 * Проверяет, что группы подписей из foodTechInterfaceAnnotations.js есть в SVG SEC-06.
 *
 *   node scripts/measure-food-tech-interface-label-box.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  FOOD_TECH_CLIENT_INTERFACE_PATTERN_IDS,
  FOOD_TECH_RESTAURANT_INTERFACE_PATTERN_IDS,
} from "../src/data/foodTechInterfaceAnnotations.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const parts = [
  {
    file: "04_04_03_01.svg",
    ids: FOOD_TECH_CLIENT_INTERFACE_PATTERN_IDS,
  },
  {
    file: "04_04_03_02.svg",
    ids: FOOD_TECH_RESTAURANT_INTERFACE_PATTERN_IDS,
  },
];

let hasError = false;

for (const part of parts) {
  const svgPath = path.join(__dirname, "../public/img", part.file);
  const svg = fs.readFileSync(svgPath, "utf8");

  console.log(`\n${part.file}`);

  for (const id of part.ids) {
    const found = svg.includes(`id="${id}"`);
    console.log(found ? `  ok ${id}` : `  missing ${id}`);
    if (!found) hasError = true;
  }
}

process.exit(hasError ? 1 : 0);
