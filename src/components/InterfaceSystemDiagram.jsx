import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getFoodTechScenarioModalWidth } from "../utils/foodTechScenarioModalWidth";
import {
  FLOATING_POINTER_OFFSET,
  positionFloatingNearPointer,
} from "../utils/positionFloatingNearPointer";
import FoodTechInterfacePatternModal from "./FoodTechInterfacePatternModal";

const SVG_NS = "http://www.w3.org/2000/svg";
const LABEL_HIT_PAD = 4;

/** Прозрачный rect на bbox группы — hover по всему прямоугольнику, не только по контурам */
function installInterfaceLabelHitArea(group) {
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

function InterfaceSystemDiagram({
  svgSrc,
  svgAlt,
  annotations,
  modalAnchorClassName = "food-tech-interface-pattern-modal-anchor",
  className = "",
}) {
  const hostRef = useRef(null);
  const anchorRef = useRef(null);
  const closeTimerRef = useRef(null);
  const [svgMarkup, setSvgMarkup] = useState("");
  const [loadError, setLoadError] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [anchorPoint, setAnchorPoint] = useState(null);

  const debugLabels =
    import.meta.env.DEV &&
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).has("debug-interface-labels");

  const activeAnnotation = annotations.find((item) => item.id === activeId);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => {
      setActiveId(null);
      setAnchorPoint(null);
    }, 120);
  }, [cancelClose]);

  const openAnnotation = useCallback(
    (annotationId, clientX, clientY) => {
      cancelClose();
      setActiveId(annotationId);
      setAnchorPoint({ x: clientX, y: clientY });
    },
    [cancelClose],
  );

  useEffect(() => () => cancelClose(), [cancelClose]);

  useEffect(() => {
    let cancelled = false;

    fetch(svgSrc, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("interface svg fetch failed");
        return response.text();
      })
      .then((markup) => {
        if (!cancelled) {
          setSvgMarkup(markup);
          setLoadError(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [svgSrc]);

  useLayoutEffect(() => {
    const svg = hostRef.current?.querySelector("svg");
    if (!svg || !svgMarkup) return;

    const cleanups = [];

    const wireLabel = (annotation) => {
      const group = svg.getElementById(annotation.id);
      if (!group) return;

      group.setAttribute("data-interface-label", annotation.id);

      const hit = installInterfaceLabelHitArea(group);
      if (!hit) return;

      hit.setAttribute("aria-label", annotation.label);
      hit.setAttribute("tabindex", "0");

      const onEnter = (event) => {
        group.classList.add("interface-system-diagram__label--hover");
        openAnnotation(annotation.id, event.clientX, event.clientY);
      };
      const onLeave = () => {
        group.classList.remove("interface-system-diagram__label--hover");
        scheduleClose();
      };
      const onFocus = (event) => {
        group.classList.add("interface-system-diagram__label--hover");
        openAnnotation(annotation.id, event.clientX, event.clientY);
      };
      const onBlur = () => {
        group.classList.remove("interface-system-diagram__label--hover");
        scheduleClose();
      };

      hit.addEventListener("mouseenter", onEnter);
      hit.addEventListener("mouseleave", onLeave);
      hit.addEventListener("focus", onFocus);
      hit.addEventListener("blur", onBlur);

      cleanups.push(() => {
        hit.removeEventListener("mouseenter", onEnter);
        hit.removeEventListener("mouseleave", onLeave);
        hit.removeEventListener("focus", onFocus);
        hit.removeEventListener("blur", onBlur);
        hit.remove();
      });
    };

    for (const annotation of annotations) {
      wireLabel(annotation);
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [annotations, svgMarkup, openAnnotation, scheduleClose]);

  useLayoutEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor || !anchorPoint || !activeAnnotation?.modal) return;

    const siteInner = document.querySelector(".site-layout-inner");

    const positionModal = () => {
      const siteRect = siteInner?.getBoundingClientRect();
      const modalWidth = getFoodTechScenarioModalWidth(siteRect);

      anchor.style.width = `${modalWidth}px`;

      positionFloatingNearPointer(anchor, anchorPoint, {
        width: modalWidth,
        height: anchor.offsetHeight,
        offset: FLOATING_POINTER_OFFSET,
        bounds: siteRect,
      });
    };

    positionModal();

    const resizeObserver = new ResizeObserver(positionModal);
    resizeObserver.observe(anchor);
    if (siteInner) resizeObserver.observe(siteInner);
    window.addEventListener("resize", positionModal);
    window.addEventListener("scroll", positionModal, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", positionModal);
      window.removeEventListener("scroll", positionModal);
    };
  }, [activeAnnotation?.modal, anchorPoint]);

  useEffect(() => {
    if (svgMarkup) window.dispatchEvent(new Event("resize"));
  }, [svgMarkup]);

  const modalPortal =
    activeAnnotation?.modal && anchorPoint
      ? createPortal(
          <div
            ref={anchorRef}
            className={modalAnchorClassName}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <FoodTechInterfacePatternModal modal={activeAnnotation.modal} />
          </div>,
          document.body,
        )
      : null;

  return (
    <div
      className={`interface-system-diagram ${debugLabels ? "interface-system-diagram--debug-labels" : ""} ${className}`.trim()}
      aria-busy={!svgMarkup && !loadError}
    >
      {loadError ? (
        <img src={svgSrc} alt={svgAlt} className="interface-system-diagram__fallback" />
      ) : (
        <div
          ref={hostRef}
          className="interface-system-diagram__svg-host"
          dangerouslySetInnerHTML={svgMarkup ? { __html: svgMarkup } : undefined}
          role="img"
          aria-label={svgAlt}
        />
      )}

      {modalPortal}
    </div>
  );
}

export default InterfaceSystemDiagram;
