const CALLOUT_DOT_FILL = new Set(["#c2c2c2", "#9cb7e2"]);
const MAX_LABEL_DISTANCE = 400;
const DOT_MATCH_TOLERANCE = 12;
const LABEL_SVG_PADDING = 2;

function isCalloutDot(circle) {
  const radius = circle.getAttribute("r");
  if (radius !== "3" && radius !== "2") return false;
  const fill = (circle.getAttribute("fill") || "").toLowerCase();
  return CALLOUT_DOT_FILL.has(fill);
}

function isCalloutConnector(path) {
  const stroke = (path.getAttribute("stroke") || "").toLowerCase();
  if (stroke !== "#c2c2c2") return false;

  const fill = path.getAttribute("fill");
  if (fill && fill !== "none") return false;

  const strokeWidth = parseFloat(path.getAttribute("stroke-width") || "1");
  if (strokeWidth > 0.6) return false;

  const d = path.getAttribute("d") || "";
  if (/[cC]/.test(d)) return false;

  return /L/i.test(d) && /[hHlLvV]/.test(d);
}

function shouldStripCalloutRect(rect) {
  const stroke = (rect.getAttribute("stroke") || "").toLowerCase();
  if (stroke !== "#c2c2c2") return false;

  const strokeWidth = parseFloat(rect.getAttribute("stroke-width") || "1");
  return strokeWidth <= 0.25;
}

function parseConnectorEndpoints(d) {
  const tokens = [];
  const re = /([MLHVCSQTAZmlhvcsqtaz])|([-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?)/g;
  let match = re.exec(d);

  while (match) {
    if (match[1]) tokens.push({ type: "cmd", value: match[1] });
    else tokens.push({ type: "num", value: parseFloat(match[2]) });
    match = re.exec(d);
  }

  let index = 0;
  let x = 0;
  let y = 0;
  let startX = 0;
  let startY = 0;
  let lastX = 0;
  let lastY = 0;

  while (index < tokens.length) {
    const token = tokens[index++];
    if (token.type !== "cmd") continue;

    const upper = token.value.toUpperCase();
    const relative = token.value !== upper;

    if (upper === "M") {
      x = tokens[index++].value;
      y = tokens[index++].value;
      if (relative) {
        x += lastX;
        y += lastY;
      }
      startX = x;
      startY = y;
      lastX = x;
      lastY = y;
    } else if (upper === "H") {
      x = tokens[index++].value;
      if (relative) x += lastX;
      lastX = x;
    } else if (upper === "L") {
      x = tokens[index++].value;
      y = tokens[index++].value;
      if (relative) {
        x += lastX;
        y += lastY;
      }
      lastX = x;
      lastY = y;
    } else if (upper === "V") {
      y = tokens[index++].value;
      if (relative) y += lastY;
      lastY = y;
    }
  }

  return {
    start: { x: startX, y: startY },
    end: { x: lastX, y: lastY },
  };
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function getElementCenter(element) {
  const bbox = element.getBBox();
  return {
    x: bbox.x + bbox.width / 2,
    y: bbox.y + bbox.height / 2,
  };
}

function isInsideClipPath(element) {
  let node = element.parentElement;

  while (node && node.tagName !== "svg") {
    if (node.tagName === "g" && node.hasAttribute("clip-path")) return true;
    node = node.parentElement;
  }

  return false;
}

function connectorLabelDistance(center, link) {
  const dot = {
    x: Number(link.dot.getAttribute("cx")),
    y: Number(link.dot.getAttribute("cy")),
  };

  return Math.min(
    distance(center, link.endpoints.start),
    distance(center, link.endpoints.end),
    distance(center, dot),
  );
}

function collectLabelElements(svg) {
  const elements = new Set();

  for (const group of svg.querySelectorAll('g[opacity="0.8"]')) {
    if (isInsideClipPath(group)) continue;

    const childPaths = [...group.querySelectorAll(":scope > path")];
    if (childPaths.length > 0) {
      childPaths.forEach((path) => elements.add(path));
    } else {
      elements.add(group);
    }
  }

  for (const path of svg.querySelectorAll('path[opacity="0.8"]')) {
    if (isInsideClipPath(path)) continue;
    elements.add(path);
  }

  return [...elements];
}

function buildLabelSvg(elements) {
  const textElements = elements.filter((element) => element.tagName !== "rect");
  if (!textElements.length) return "";

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const element of textElements) {
    const bbox = element.getBBox();
    minX = Math.min(minX, bbox.x);
    minY = Math.min(minY, bbox.y);
    maxX = Math.max(maxX, bbox.x + bbox.width);
    maxY = Math.max(maxY, bbox.y + bbox.height);
  }

  const viewX = minX - LABEL_SVG_PADDING;
  const viewY = minY - LABEL_SVG_PADDING;
  const viewW = maxX - minX + LABEL_SVG_PADDING * 2;
  const viewH = maxY - minY + LABEL_SVG_PADDING * 2;
  const inner = textElements.map((element) => element.outerHTML).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewX} ${viewY} ${viewW} ${viewH}" role="img" aria-hidden="true">${inner}</svg>`;
}

function mountSvg(svgMarkup) {
  const host = document.createElement("div");
  host.style.cssText = "position:fixed;left:-10000px;top:0;visibility:hidden;pointer-events:none";
  document.body.appendChild(host);
  host.innerHTML = svgMarkup.trim();
  const svg = host.querySelector("svg");
  return { host, svg };
}

export function prepareProjectCaseResultSvg(svgMarkup) {
  const { host, svg } = mountSvg(svgMarkup);

  if (!svg) {
    host.remove();
    return { markup: svgMarkup, annotations: [] };
  }

  const dots = [...svg.querySelectorAll("circle")].filter(isCalloutDot);
  const connectors = [...svg.querySelectorAll("path")].filter(isCalloutConnector);
  const labelElements = collectLabelElements(svg);

  const connectorLinks = connectors
    .map((connector) => {
      const endpoints = parseConnectorEndpoints(connector.getAttribute("d") || "");
      const dot = dots.find((item) => distance(endpoints.end, {
        x: Number(item.getAttribute("cx")),
        y: Number(item.getAttribute("cy")),
      }) <= DOT_MATCH_TOLERANCE);

      if (!dot) return null;

      return { connector, endpoints, dot };
    })
    .filter(Boolean);

  const labelsByConnector = new Map(
    connectorLinks.map((link) => [link.connector, []]),
  );

  for (const labelElement of labelElements) {
    const center = getElementCenter(labelElement);
    let bestLink = null;
    let bestDistance = Infinity;

    for (const link of connectorLinks) {
      const labelDistance = connectorLabelDistance(center, link);
      if (labelDistance > MAX_LABEL_DISTANCE || labelDistance >= bestDistance) continue;
      bestDistance = labelDistance;
      bestLink = link;
    }

    if (!bestLink) continue;
    labelsByConnector.get(bestLink.connector).push(labelElement);
  }

  const annotations = [];
  const usedDots = new Set();

  connectorLinks.forEach((link, index) => {
    if (usedDots.has(link.dot)) return;

    const labelParts = labelsByConnector.get(link.connector) ?? [];
    const labelSvg = buildLabelSvg(labelParts);
    const id = `result-callout-${index}`;

    link.dot.setAttribute("data-result-callout", id);
    usedDots.add(link.dot);

    annotations.push({
      id,
      labelSvg,
      dotCx: Number(link.dot.getAttribute("cx")),
      dotCy: Number(link.dot.getAttribute("cy")),
    });
  });

  for (const group of [...svg.querySelectorAll('g[opacity="0.8"]')]) {
    group.remove();
  }

  for (const path of [...svg.querySelectorAll('path[opacity="0.8"]')]) {
    path.remove();
  }

  for (const path of connectors) {
    path.remove();
  }

  for (const rect of [...svg.querySelectorAll("rect")]) {
    if (shouldStripCalloutRect(rect)) rect.remove();
  }

  for (const group of [...svg.querySelectorAll("mask")]) {
    const hasDashedStroke = group.querySelector("path[stroke-dasharray], rect[stroke-dasharray]");
    if (hasDashedStroke) group.remove();
  }

  const markup = svg.outerHTML;
  host.remove();

  return { markup, annotations };
}
