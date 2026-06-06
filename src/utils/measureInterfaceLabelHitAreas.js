const LABEL_HIT_PAD = 4;

/**
 * Bbox подписей (% viewBox) — как installInterfaceLabelHitArea на desktop.
 * @param {string} svgMarkup
 * @param {Iterable<string>} annotationIds
 */
export function measureInterfaceLabelHitAreas(svgMarkup, annotationIds) {
  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText =
    "position:fixed;left:-9999px;top:0;width:0;height:0;overflow:hidden;pointer-events:none;visibility:hidden";
  host.innerHTML = svgMarkup;

  document.body.appendChild(host);

  try {
    const svg = host.querySelector("svg");
    if (!svg) return {};

    const viewBox = svg.viewBox.baseVal;
    const width = viewBox.width || Number(svg.getAttribute("width")) || 1;
    const height = viewBox.height || Number(svg.getAttribute("height")) || 1;
    const areas = {};

    for (const id of annotationIds) {
      const group = svg.getElementById(id);
      if (!group) continue;

      let bbox;
      try {
        bbox = group.getBBox();
      } catch {
        continue;
      }

      if (bbox.width <= 0 && bbox.height <= 0) continue;

      areas[id] = {
        x: ((bbox.x - LABEL_HIT_PAD) / width) * 100,
        y: ((bbox.y - LABEL_HIT_PAD) / height) * 100,
        w: ((bbox.width + LABEL_HIT_PAD * 2) / width) * 100,
        h: ((bbox.height + LABEL_HIT_PAD * 2) / height) * 100,
      };
    }

    return areas;
  } finally {
    host.remove();
  }
}
