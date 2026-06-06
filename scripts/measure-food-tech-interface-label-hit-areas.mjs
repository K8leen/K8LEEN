/**
 * Извлекает bbox подписей (id группы) из SVG SEC-06 для overlay на планшете.
 *
 *   node scripts/measure-food-tech-interface-label-hit-areas.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  FOOD_TECH_CLIENT_INTERFACE_PATTERN_IDS,
  FOOD_TECH_RESTAURANT_INTERFACE_PATTERN_IDS,
} from "../src/data/foodTechInterfaceAnnotations.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LABEL_HIT_PAD = 4;

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

function extractGroupMarkup(svg, id) {
  const marker = `<g id="${id}"`;
  const start = svg.indexOf(marker);
  if (start < 0) return null;

  let depth = 0;

  for (let index = start; index < svg.length; index += 1) {
    if (svg.startsWith("<g", index) && /[\s>]/.test(svg[index + 2] ?? "")) {
      depth += 1;
    }

    if (svg.startsWith("</g>", index)) {
      depth -= 1;

      if (depth === 0) {
        return svg.slice(start, index + 4);
      }
    }
  }

  return null;
}

function parsePathNumbers(d) {
  const nums = [...d.matchAll(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi)].map((match) => parseFloat(match[0]));
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (let index = 0; index + 1 < nums.length; index += 2) {
    const x = nums[index];
    const y = nums[index + 1];
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }

  if (minX === Infinity) return null;

  return { minX, minY, maxX, maxY };
}

function groupBounds(markup) {
  const paths = [...markup.matchAll(/\bd="([^"]+)"/g)];
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const [, d] of paths) {
    const bounds = parsePathNumbers(d);
    if (!bounds) continue;
    minX = Math.min(minX, bounds.minX);
    minY = Math.min(minY, bounds.minY);
    maxX = Math.max(maxX, bounds.maxX);
    maxY = Math.max(maxY, bounds.maxY);
  }

  if (minX === Infinity) return null;

  return { minX, minY, maxX, maxY };
}

function readViewBox(svg) {
  const match = svg.match(/viewBox="([^"]+)"/);
  if (!match) throw new Error("viewBox not found");
  const [, , width, height] = match[1].split(/\s+/).map(Number);
  return { width, height };
}

function toPercent(bounds, viewBox) {
  return {
    x: Number((((bounds.minX - LABEL_HIT_PAD) / viewBox.width) * 100).toFixed(2)),
    y: Number((((bounds.minY - LABEL_HIT_PAD) / viewBox.height) * 100).toFixed(2)),
    w: Number((((bounds.maxX - bounds.minX + LABEL_HIT_PAD * 2) / viewBox.width) * 100).toFixed(2)),
    h: Number((((bounds.maxY - bounds.minY + LABEL_HIT_PAD * 2) / viewBox.height) * 100).toFixed(2)),
  };
}

const result = [];
let hasError = false;

for (const part of parts) {
  const svgPath = path.join(__dirname, "../public/img", part.file);
  const svg = fs.readFileSync(svgPath, "utf8");
  const viewBox = readViewBox(svg);
  const partResult = {};

  console.log(`\n${part.file}`);

  for (const id of part.ids) {
    const markup = extractGroupMarkup(svg, id);
    const bounds = markup ? groupBounds(markup) : null;

    if (!bounds) {
      console.log(`  missing ${id}`);
      hasError = true;
      continue;
    }

    partResult[id] = toPercent(bounds, viewBox);
    console.log(`  ok ${id}`, partResult[id]);
  }

  result.push(partResult);
}

if (hasError) process.exit(1);
