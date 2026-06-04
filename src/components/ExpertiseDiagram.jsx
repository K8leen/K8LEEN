import { useLayoutEffect, useRef } from "react";
import diagramSvg from "/img/1_01_01.svg?raw";

/** Множитель длительности анимации; 1 — базовый темп */
const ANIM_TIMELINE_SCALE = 1.5;
const t = (seconds) => seconds * ANIM_TIMELINE_SCALE;

const CIRCLE_RADIUS = 83.5181;
const CIRCLE_LENGTH = 2 * Math.PI * CIRCLE_RADIUS;
const CIRCLE_DRAW_S = t(0.95);
const CIRCLE_GAP_S = t(0.1);
const HATCH_LINE_LENGTH = 1650;
const HATCH_LINE_DRAW_S = t(0.14);
const HATCH_LINE_GAP_S = t(0.0055);
const CALLOUT_LINE_DRAW_S = t(0.75);
const CALLOUT_LABEL_REVEAL_S = t(0.55);
const CALLOUT_DOT_IN_S = t(0.35);
const CALLOUT_DOT_DELAY_S = t(0.06);
const CALLOUT_LABELS_AFTER_LINE_S = t(0.06);
const HATCH_START_PAD_S = t(0.15);
const CENTER_FILL_FADE_S = t(0.35);
const CENTER_OUTLINE_FADE_S = t(0.4);
const CENTER_OUTLINE_DELAY_PAD_S = t(0.08);
const CALLOUT_LINE_LENGTH = 900;
const HATCH_CALLOUT_AT = 0.3;
const LABEL_OPACITY = 0.8;

const CIRCLES = [
  { selector: ".expertise-diagram__circle--1", cx: 352, cy: 187 },
  { selector: ".expertise-diagram__circle--2", cx: 448, cy: 187 },
  { selector: ".expertise-diagram__circle--3", cx: 399, cy: 249 },
];

const ALL_CALLOUTS = [
  {
    clipKey: "circle-1",
    line: ".expertise-diagram__callout-line--circle-1",
    dot: ".expertise-diagram__callout-dot--circle-1",
    labels: ".expertise-diagram__callout-labels--circle-1",
    afterCircle: 0,
  },
  {
    clipKey: "circle-2",
    line: ".expertise-diagram__callout-line--circle-2",
    dot: ".expertise-diagram__callout-dot--circle-2",
    labels: ".expertise-diagram__callout-labels--circle-2",
    afterCircle: 1,
  },
  {
    clipKey: "circle-3",
    line: ".expertise-diagram__callout-line--circle-3",
    dot: ".expertise-diagram__callout-dot--circle-3",
    labels: ".expertise-diagram__callout-labels--circle-3",
    afterCircle: 2,
  },
  {
    clipKey: "center",
    line: ".expertise-diagram__callout-line--center",
    dot: ".expertise-diagram__callout-dot--center",
    labels: ".expertise-diagram__callout-labels--center",
    afterHatch: true,
  },
];

const CALLOUTS = ALL_CALLOUTS.filter((c) => !c.afterHatch);
const CALLOUT_CENTER = ALL_CALLOUTS.find((c) => c.afterHatch);

function circleEndDelay(circleIndex) {
  return circleIndex * (CIRCLE_DRAW_S + CIRCLE_GAP_S) + CIRCLE_DRAW_S;
}

function ensureDefs(svg) {
  let defs = svg.querySelector("defs");
  if (!defs) {
    defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const firstGraphics = svg.querySelector("rect, g, path, circle");
    if (firstGraphics) {
      svg.insertBefore(defs, firstGraphics);
    } else {
      svg.appendChild(defs);
    }
  }
  return defs;
}

function getOrCreateClipRect(svg, instanceId, clipKey) {
  const clipId = `expertise-callout-clip-${instanceId}-${clipKey}`;
  const defs = ensureDefs(svg);
  let clipPath = defs.querySelector(`#${clipId}`);
  let rect;

  if (!clipPath) {
    clipPath = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
    clipPath.setAttribute("id", clipId);
    clipPath.setAttribute("clipPathUnits", "userSpaceOnUse");
    rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    clipPath.appendChild(rect);
    defs.appendChild(clipPath);
  } else {
    rect = clipPath.querySelector("rect");
  }

  return { clipId, rect };
}

/** Сразу прячет подпись (нулевой клип), без opacity — до своей очереди в таймлайне. */
function hideCalloutLabels(labelsEl, instanceId, clipKey) {
  if (!labelsEl) return;

  const svg = labelsEl.ownerSVGElement ?? labelsEl.closest("svg");
  if (!svg) return;

  labelsEl.style.opacity = "0";
  labelsEl.style.visibility = "hidden";

  const bbox = labelsEl.getBBox();
  if (bbox.width <= 0 || bbox.height <= 0) return;

  const pad = 4;
  const { clipId, rect } = getOrCreateClipRect(svg, instanceId, clipKey);

  rect.setAttribute("x", String(bbox.x));
  rect.setAttribute("y", String(bbox.y - pad));
  rect.setAttribute("width", "0");
  rect.setAttribute("height", String(bbox.height + pad * 2));
  labelsEl.setAttribute("clip-path", `url(#${clipId})`);
}

/** Раскрытие подписи слева направо — только после выноски. */
function animateLabelsLtr(labelsEl, instanceId, clipKey, delay, pendingTimeouts) {
  if (!labelsEl) return;

  const svg = labelsEl.ownerSVGElement ?? labelsEl.closest("svg");
  if (!svg) return;

  const bbox = labelsEl.getBBox();
  if (bbox.width <= 0 || bbox.height <= 0) return;

  const pad = 4;
  const x0 = bbox.x;
  const w = bbox.width;
  const y0 = bbox.y - pad;
  const h = bbox.height + pad * 2;
  const { clipId, rect } = getOrCreateClipRect(svg, instanceId, clipKey);

  rect.setAttribute("y", String(y0));
  rect.setAttribute("height", String(h));
  rect.setAttribute("x", String(x0));
  rect.setAttribute("width", "0");
  labelsEl.setAttribute("clip-path", `url(#${clipId})`);

  const reveal = () => {
    labelsEl.style.visibility = "visible";
    labelsEl.style.opacity = String(LABEL_OPACITY);

    rect.animate(
      [
        { x: `${x0}px`, width: "0px" },
        { x: `${x0}px`, width: `${w}px` },
      ],
      {
        duration: CALLOUT_LABEL_REVEAL_S * 1000,
        fill: "forwards",
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    );
  };

  if (delay <= 0) {
    reveal();
  } else {
    const id = window.setTimeout(reveal, delay * 1000);
    pendingTimeouts.push(id);
  }
}

function centerCalloutStartDelay(hatchStart, hatchEnd) {
  const hatchDuration = hatchEnd - hatchStart;
  return hatchStart + hatchDuration * HATCH_CALLOUT_AT;
}

function calloutStartDelay(callout, hatchStart, hatchEnd) {
  if (callout.afterHatch) return centerCalloutStartDelay(hatchStart, hatchEnd);
  return circleEndDelay(callout.afterCircle);
}

function labelsStartDelay(calloutStart) {
  return calloutStart + CALLOUT_LINE_DRAW_S + CALLOUT_LABELS_AFTER_LINE_S;
}

function prepareDiagramHidden(root, instanceId) {
  ALL_CALLOUTS.forEach(({ clipKey, labels }) => {
    hideCalloutLabels(root.querySelector(labels), instanceId, clipKey);
  });

  const centerFill = root.querySelector(".expertise-diagram__center-fill");
  if (centerFill) centerFill.style.opacity = "0";
}

function animateCallout(root, instanceId, callout, startDelay, pendingTimeouts) {
  const lineEl = root.querySelector(callout.line);
  const dotEl = root.querySelector(callout.dot);
  const labelsEl = root.querySelector(callout.labels);

  if (lineEl) {
    const len = lineEl.getTotalLength() || CALLOUT_LINE_LENGTH;
    lineEl.style.strokeDasharray = String(len);
    lineEl.style.strokeDashoffset = String(len);
    lineEl.style.animation = `expertise-diagram-line-draw ${CALLOUT_LINE_DRAW_S}s ease ${startDelay}s forwards`;
  }

  if (dotEl) {
    dotEl.style.animation = `expertise-diagram-dot-in ${CALLOUT_DOT_IN_S}s cubic-bezier(0.22, 1, 0.36, 1) ${startDelay + CALLOUT_DOT_DELAY_S}s forwards`;
  }

  animateLabelsLtr(labelsEl, instanceId, callout.clipKey, labelsStartDelay(startDelay), pendingTimeouts);
}

function showCalloutInstant(root, { line, dot, labels }) {
  const lineEl = root.querySelector(line);
  const dotEl = root.querySelector(dot);
  const labelsEl = root.querySelector(labels);

  if (lineEl) lineEl.style.strokeDashoffset = "0";
  if (dotEl) {
    dotEl.style.opacity = "1";
    dotEl.style.transform = "scale(1)";
  }
  if (labelsEl) {
    labelsEl.removeAttribute("clip-path");
    labelsEl.style.visibility = "visible";
    labelsEl.style.opacity = String(LABEL_OPACITY);
  }
}

function ExpertiseDiagram({ className = "", onLoad }) {
  const wrapRef = useRef(null);
  const instanceIdRef = useRef(`d${Math.random().toString(36).slice(2, 9)}`);

  useLayoutEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    const instanceId = instanceIdRef.current;
    const pendingTimeouts = [];

    root.classList.add("expertise-diagram-wrap--preparing");
    prepareDiagramHidden(root, instanceId);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      root.querySelectorAll(".expertise-diagram__circle circle").forEach((circle) => {
        circle.removeAttribute("transform");
        circle.style.strokeDashoffset = "0";
      });
      root.querySelectorAll(".expertise-diagram__hatch-pattern path").forEach((path) => {
        path.style.strokeDashoffset = "0";
      });
      const centerFill = root.querySelector(".expertise-diagram__center-fill");
      if (centerFill) centerFill.style.opacity = "0.6";
      const outline = root.querySelector(".expertise-diagram__center-outline");
      if (outline) outline.style.opacity = "0.2";
      ALL_CALLOUTS.forEach((callout) => showCalloutInstant(root, callout));
      root.classList.remove("expertise-diagram-wrap--preparing");
      onLoad?.();
      return;
    }

    CIRCLES.forEach((cfg, index) => {
      const circle = root.querySelector(`${cfg.selector} circle`);
      if (!circle) return;

      const delay = index * (CIRCLE_DRAW_S + CIRCLE_GAP_S);
      circle.setAttribute("transform", `rotate(180 ${cfg.cx} ${cfg.cy})`);
      circle.style.strokeDasharray = String(CIRCLE_LENGTH);
      circle.style.strokeDashoffset = String(CIRCLE_LENGTH);
      circle.style.animation = `expertise-circle-draw ${CIRCLE_DRAW_S}s ease ${delay}s forwards`;
    });

    const hatchStart = CIRCLES.length * (CIRCLE_DRAW_S + CIRCLE_GAP_S) + HATCH_START_PAD_S;
    const hatchPaths = root.querySelectorAll(".expertise-diagram__hatch-pattern path");

    const centerFill = root.querySelector(".expertise-diagram__center-fill");
    if (centerFill) {
      centerFill.style.setProperty("--expertise-diagram-fade-target", "0.6");
      centerFill.style.animation = `expertise-diagram-fade-in ${CENTER_FILL_FADE_S}s ease ${hatchStart}s forwards`;
    }

    hatchPaths.forEach((path, index) => {
      const len = path.getTotalLength() || HATCH_LINE_LENGTH;
      const delay = hatchStart + index * HATCH_LINE_GAP_S;
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = String(len);
      path.style.animation = `expertise-hatch-stroke ${HATCH_LINE_DRAW_S}s ease ${delay}s forwards`;
    });

    const hatchEnd = hatchStart + hatchPaths.length * HATCH_LINE_GAP_S + HATCH_LINE_DRAW_S;
    const outline = root.querySelector(".expertise-diagram__center-outline");
    if (outline) {
      outline.style.animation = `expertise-diagram-fade-in ${CENTER_OUTLINE_FADE_S}s ease ${hatchEnd + CENTER_OUTLINE_DELAY_PAD_S}s forwards`;
    }

    CALLOUTS.forEach((callout) => {
      animateCallout(root, instanceId, callout, calloutStartDelay(callout, hatchStart, hatchEnd), pendingTimeouts);
    });

    if (CALLOUT_CENTER) {
      animateCallout(
        root,
        instanceId,
        CALLOUT_CENTER,
        calloutStartDelay(CALLOUT_CENTER, hatchStart, hatchEnd),
        pendingTimeouts,
      );
    }

    root.classList.remove("expertise-diagram-wrap--preparing");
    onLoad?.();

    return () => {
      pendingTimeouts.forEach((id) => window.clearTimeout(id));
    };
  }, [onLoad]);

  return (
    <div
      ref={wrapRef}
      className={`expertise-diagram-wrap expertise-diagram-wrap--preparing ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: diagramSvg }}
    />
  );
}

export default ExpertiseDiagram;
