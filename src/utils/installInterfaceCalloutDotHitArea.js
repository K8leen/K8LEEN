const SVG_NS = "http://www.w3.org/2000/svg";
const DOT_HIT_RADIUS = 14;

export function installInterfaceCalloutDotHitArea(dot, annotationId) {
  const cx = Number(dot.getAttribute("cx"));
  const cy = Number(dot.getAttribute("cy"));
  if (!Number.isFinite(cx) || !Number.isFinite(cy)) return null;

  const hit = document.createElementNS(SVG_NS, "circle");
  hit.setAttribute("class", "interface-system-diagram__callout-dot-hit");
  hit.setAttribute("cx", String(cx));
  hit.setAttribute("cy", String(cy));
  hit.setAttribute("r", String(DOT_HIT_RADIUS));
  hit.setAttribute("fill", "transparent");
  hit.setAttribute("data-interface-dot", annotationId);
  hit.setAttribute("aria-label", annotationId);
  hit.setAttribute("tabindex", "0");

  const pulse = document.createElementNS(SVG_NS, "circle");
  pulse.setAttribute("class", "interface-system-diagram__callout-dot-pulse");
  pulse.setAttribute("cx", String(cx));
  pulse.setAttribute("cy", String(cy));
  pulse.setAttribute("r", dot.getAttribute("r") ?? "3");
  pulse.style.setProperty("--callout-dot-base", dot.getAttribute("fill") ?? "#C2C2C2");
  pulse.setAttribute("pointer-events", "none");

  dot.classList.add("interface-system-diagram__callout-dot-source");
  dot.parentNode?.insertBefore(hit, dot.nextSibling);
  dot.parentNode?.insertBefore(pulse, hit.nextSibling);

  return { hit, pulse };
}
