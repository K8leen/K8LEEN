const CALLOUT_DOT_FILL = new Set(["#c2c2c2", "#9cb7e2"]);
const MAX_LABEL_DISTANCE = 400;
const DOT_MATCH_TOLERANCE = 12;
const LABEL_SVG_PADDING = 2;
const LABEL_CLUSTER_GAP = 12;
const LABEL_LINE_Y_TOLERANCE = 6;

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

const CAPTION_LABEL_FILLS = new Set(["#666666", "#666"]);

function isCaptionLabelPath(path) {
  const fill = (path.getAttribute("fill") || "").toLowerCase();
  return CAPTION_LABEL_FILLS.has(fill);
}

/** Подписи callout — только path-буквы #666666, без иллюстрации (rect/filter и т.д.). */
function isCalloutLabelGroup(group) {
  if (group.getAttribute("opacity") !== "0.8") return false;
  if (group.hasAttribute("filter")) return false;

  const children = [...group.children];
  if (!children.length || children.some((child) => child.tagName !== "path")) return false;

  return children.every(isCaptionLabelPath);
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
    if (!isCalloutLabelGroup(group)) continue;
    for (const path of group.children) {
      if (path.tagName === "path" && isCaptionLabelPath(path)) elements.add(path);
    }
  }

  for (const path of svg.querySelectorAll('path[opacity="0.8"]')) {
    if (isCaptionLabelPath(path)) elements.add(path);
  }

  return [...elements];
}

function assignLabelsToConnectors(labelElements, connectorLinks) {
  const labelsByConnector = new Map(
    connectorLinks.map((link) => [link.connector, []]),
  );

  for (const labelCluster of clusterLabelElements(labelElements)) {
    const center = getClusterCenter(labelCluster);
    let bestLink = null;
    let bestDistance = Infinity;

    for (const link of connectorLinks) {
      const labelDistance = connectorLabelDistance(center, link);
      if (labelDistance > MAX_LABEL_DISTANCE || labelDistance >= bestDistance) continue;
      bestDistance = labelDistance;
      bestLink = link;
    }

    if (!bestLink) continue;
    labelsByConnector.get(bestLink.connector).push(...labelCluster);
  }

  return labelsByConnector;
}

function ensureConnectorDot(svg, connector, endpoints, dots) {
  const existing = dots.find((dot) => distance(endpoints.end, {
    x: Number(dot.getAttribute("cx")),
    y: Number(dot.getAttribute("cy")),
  }) <= DOT_MATCH_TOLERANCE);

  if (existing) return existing;

  const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  dot.setAttribute("cx", String(endpoints.end.x));
  dot.setAttribute("cy", String(endpoints.end.y));
  dot.setAttribute("r", "3");
  dot.setAttribute("fill", "#C2C2C2");
  svg.appendChild(dot);
  dots.push(dot);
  return dot;
}

function stripCollectedLabels(labelElements) {
  const parents = new Set();

  for (const element of labelElements) {
    parents.add(element.parentElement);
    element.remove();
  }

  for (const parent of parents) {
    if (parent?.tagName === "g" && !parent.childElementCount) {
      parent.remove();
    }
  }
}

function getClusterBbox(elements) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const element of elements) {
    const bbox = element.getBBox();
    minX = Math.min(minX, bbox.x);
    minY = Math.min(minY, bbox.y);
    maxX = Math.max(maxX, bbox.x + bbox.width);
    maxY = Math.max(maxY, bbox.y + bbox.height);
  }

  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}

function getClusterCenter(elements) {
  const bbox = getClusterBbox(elements);
  return { x: bbox.x + bbox.width / 2, y: bbox.y + bbox.height / 2 };
}

function bboxesBelongToSameLabel(a, b, gap = LABEL_CLUSTER_GAP) {
  const yOverlap = Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y);
  const minHeight = Math.min(a.height, b.height, 1);
  const sameLine =
    yOverlap >= minHeight * 0.25 || Math.abs(a.y - b.y) <= LABEL_LINE_Y_TOLERANCE;

  const horizontalGap = Math.max(0, Math.max(a.x - (b.x + b.width), b.x - (a.x + a.width)));
  const verticalGap = Math.max(0, Math.max(a.y - (b.y + b.height), b.y - (a.y + a.height)));

  if (sameLine) return horizontalGap <= gap * 4;
  return horizontalGap <= gap && verticalGap <= gap;
}

/** Группирует path-буквы одной подписи, чтобы не разбивать слова по разным callout. */
function clusterLabelElements(elements) {
  if (!elements.length) return [];

  const items = elements.map((element) => ({ element, bbox: element.getBBox() }));
  const clusters = [];
  const used = new Set();

  for (let i = 0; i < items.length; i++) {
    if (used.has(i)) continue;

    const cluster = [items[i].element];
    used.add(i);
    let changed = true;

    while (changed) {
      changed = false;
      const clusterBbox = getClusterBbox(cluster);

      for (let j = 0; j < items.length; j++) {
        if (used.has(j)) continue;
        if (!bboxesBelongToSameLabel(clusterBbox, items[j].bbox)) continue;

        cluster.push(items[j].element);
        used.add(j);
        changed = true;
      }
    }

    clusters.push(cluster);
  }

  return clusters;
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
  host.style.cssText =
    "position:fixed;left:0;top:0;width:780px;height:674px;opacity:0;pointer-events:none;z-index:-1";
  document.body.appendChild(host);
  host.innerHTML = svgMarkup.trim();
  const svg = host.querySelector("svg");
  if (svg) {
    svg.setAttribute("width", svg.getAttribute("width") || "780");
    svg.setAttribute("height", svg.getAttribute("height") || "674");
  }
  return { host, svg };
}

/** Снимает корневой clip-path (= viewBox): иначе тени/изометрия обрезаются на мобилке. */
function unwrapRootClipPath(svg) {
  const clipGroup = svg.querySelector(":scope > g[clip-path]");
  if (!clipGroup) return;

  const clipRef = clipGroup.getAttribute("clip-path") || "";
  const clipId = clipRef.match(/#([^)]+)/)?.[1];
  const clipPath = clipId ? svg.querySelector(`#${clipId}`) : null;
  const clipRect = clipPath?.querySelector("rect");
  const viewBox = (svg.getAttribute("viewBox") || "").split(/\s+/).map(Number);

  if (!clipRect || viewBox.length !== 4) return;

  const clipW = Number.parseFloat(clipRect.getAttribute("width") || "0");
  const clipH = Number.parseFloat(clipRect.getAttribute("height") || "0");

  if (Math.abs(clipW - viewBox[2]) > 1 || Math.abs(clipH - viewBox[3]) > 1) return;

  const parent = clipGroup.parentNode;
  if (!parent) return;

  while (clipGroup.firstChild) {
    parent.insertBefore(clipGroup.firstChild, clipGroup);
  }

  clipGroup.remove();
}

export function prepareProjectCaseResultSvg(svgMarkup) {
  const { host, svg } = mountSvg(svgMarkup);

  if (!svg) {
    host.remove();
    return { markup: svgMarkup, annotations: [] };
  }

  unwrapRootClipPath(svg);

  const dots = [...svg.querySelectorAll("circle")].filter(isCalloutDot);
  const connectors = [...svg.querySelectorAll("path")].filter(isCalloutConnector);
  const labelElements = collectLabelElements(svg);

  const connectorLinks = connectors.map((connector) => {
    const endpoints = parseConnectorEndpoints(connector.getAttribute("d") || "");
    const dot = ensureConnectorDot(svg, connector, endpoints, dots);
    return { connector, endpoints, dot };
  });

  const labelsByConnector = assignLabelsToConnectors(labelElements, connectorLinks);

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

  stripCollectedLabels(labelElements);

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

  for (const foreignObject of [...svg.querySelectorAll("foreignObject")]) {
    foreignObject.remove();
  }

  svg.setAttribute("overflow", "visible");

  const markup = svg.outerHTML;
  host.remove();

  return { markup, annotations };
}
