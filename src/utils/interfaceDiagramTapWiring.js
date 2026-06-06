const SVG_NS = "http://www.w3.org/2000/svg";
const LABEL_HIT_PAD = 4;

/** Прозрачный rect на bbox группы — тап по всему прямоугольнику подписи */
export function installInterfaceLabelHitArea(group) {
  group.querySelector(".interface-system-diagram__hit-rect")?.remove();

  let bbox;
  try {
    bbox = group.getBBox();
  } catch {
    return null;
  }

  if (bbox.width <= 0 && bbox.height <= 0) return null;

  const hit = document.createElementNS(SVG_NS, "rect");
  hit.setAttribute("class", "interface-system-diagram__hit-rect");
  hit.setAttribute("x", String(bbox.x - LABEL_HIT_PAD));
  hit.setAttribute("y", String(bbox.y - LABEL_HIT_PAD));
  hit.setAttribute("width", String(bbox.width + LABEL_HIT_PAD * 2));
  hit.setAttribute("height", String(bbox.height + LABEL_HIT_PAD * 2));
  hit.setAttribute("fill", "transparent");
  group.appendChild(hit);

  return hit;
}

export function wireInterfaceLabelTap(svg, annotation, { openAnnotation }) {
  const group = svg.getElementById(annotation.id);
  if (!group) return null;

  group.setAttribute("data-interface-label", annotation.id);

  const hit = installInterfaceLabelHitArea(group);
  if (!hit) return null;

  hit.setAttribute("aria-label", annotation.label);
  hit.setAttribute("tabindex", "0");

  const onActivate = (event) => {
    event.stopPropagation();
    const point = "touches" in event && event.touches[0] ? event.touches[0] : event;
    openAnnotation(annotation.id, point.clientX, point.clientY);
  };

  hit.addEventListener("click", onActivate);
  hit.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    const rect = hit.getBoundingClientRect();
    openAnnotation(annotation.id, rect.left + rect.width / 2, rect.top + rect.height / 2);
  });

  return () => {
    hit.removeEventListener("click", onActivate);
    hit.remove();
  };
}
