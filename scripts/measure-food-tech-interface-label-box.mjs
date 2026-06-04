/**
 * Проверяет, что группы подписей из foodTechInterfaceAnnotations.js есть в SVG.
 *
 *   node scripts/measure-food-tech-interface-label-box.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const svgPath = path.join(__dirname, "../public/img/04_04_03.svg");
const svg = fs.readFileSync(svgPath, "utf8");

const ids = ["continuous_feed_structure", "content_category_navigation", "unified_search_entry"];

for (const id of ids) {
  const found = svg.includes(`id="${id}"`);
  console.log(found ? `ok ${id}` : `missing ${id}`);
}
