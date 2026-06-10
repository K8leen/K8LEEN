import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Block, { BlockSlot } from "./Block";
import FloatingButton from "./FloatingButton";
import FoodTechInterfacePatternModal from "./FoodTechInterfacePatternModal";
import ProgressiveDisclosureCard from "./ProgressiveDisclosureCard";
import { PREDICTIONS_INTERFACE_ANNOTATIONS } from "../data/predictionsInterfaceAnnotations";
import { PREDICTIONS_INTERFACE_CALLOUT_DOTS } from "../data/predictionsInterfaceCalloutDots";
import {
  predictionsProjectImages,
  predictionsProjectInterfaceSystemPlain,
} from "../data/predictionsProjectPage";
import {
  getInterfacePatternModalWidth,
  getModalPositionBounds,
} from "../utils/foodTechScenarioModalWidth";
import { wireInterfaceLabelTap } from "../utils/interfaceDiagramTapWiring";
import {
  FLOATING_POINTER_OFFSET,
  positionFloatingNearPointer,
} from "../utils/positionFloatingNearPointer";

const SVG_NS = "http://www.w3.org/2000/svg";
const DOT_HIT_RADIUS = 14;

function installCalloutDotHitArea(dot, annotationId) {
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

function PredictionsInterfaceDiagramInteractive({
  className = "",
  positionBoundsRef = null,
}) {
  const hostRef = useRef(null);
  const anchorRef = useRef(null);
  const [svgMarkup, setSvgMarkup] = useState("");
  const [loadError, setLoadError] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [anchorPoint, setAnchorPoint] = useState(null);

  const activeAnnotation = PREDICTIONS_INTERFACE_ANNOTATIONS.find((item) => item.id === activeId);

  const closeAnnotation = useCallback(() => {
    setActiveId(null);
    setAnchorPoint(null);
  }, []);

  const openAnnotation = useCallback((annotationId, clientX, clientY) => {
    setActiveId(annotationId);
    setAnchorPoint({ x: clientX, y: clientY });
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch(predictionsProjectImages.interfaceSystem.src, { cache: "no-store" })
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
  }, []);

  useLayoutEffect(() => {
    const svg = hostRef.current?.querySelector("svg");
    if (!svg || !svgMarkup) return;

    const cleanups = [];

    for (const annotation of PREDICTIONS_INTERFACE_ANNOTATIONS) {
      const labelCleanup = wireInterfaceLabelTap(svg, annotation, { openAnnotation });
      if (labelCleanup) cleanups.push(labelCleanup);

      const dotId = PREDICTIONS_INTERFACE_CALLOUT_DOTS[annotation.id];
      const dot = dotId ? svg.getElementById(dotId) : null;
      if (!dot) continue;

      const wired = installCalloutDotHitArea(dot, annotation.id);
      if (!wired) continue;

      const { hit, pulse } = wired;

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

      cleanups.push(() => {
        hit.removeEventListener("click", onActivate);
        hit.remove();
        pulse.remove();
        dot.classList.remove("interface-system-diagram__callout-dot-source");
      });
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [svgMarkup, openAnnotation]);

  useLayoutEffect(() => {
    const svg = hostRef.current?.querySelector("svg");
    if (!svg) return;

    for (const hit of svg.querySelectorAll(".interface-system-diagram__callout-dot-hit")) {
      const isActive = hit.getAttribute("data-interface-dot") === activeId;
      hit.classList.toggle("interface-system-diagram__callout-dot-hit--active", Boolean(isActive));
    }
  }, [activeId, svgMarkup]);

  useLayoutEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor || !anchorPoint || !activeAnnotation?.modal) return;

    const boundsEl = positionBoundsRef?.current ?? document.querySelector(".site-layout-inner");

    const positionModal = () => {
      const boundsRect = getModalPositionBounds(boundsEl);
      const modalWidth = getInterfacePatternModalWidth(boundsRect);

      anchor.style.width = `${modalWidth}px`;

      const placedWidth = positionFloatingNearPointer(anchor, anchorPoint, {
        width: modalWidth,
        height: anchor.offsetHeight,
        offset: FLOATING_POINTER_OFFSET,
        bounds: boundsRect,
      });

      if (placedWidth !== modalWidth) {
        anchor.style.width = `${placedWidth}px`;
      }
    };

    positionModal();

    const resizeObserver = new ResizeObserver(positionModal);
    resizeObserver.observe(anchor);
    if (boundsEl) resizeObserver.observe(boundsEl);
    window.addEventListener("resize", positionModal);
    window.addEventListener("scroll", positionModal, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", positionModal);
      window.removeEventListener("scroll", positionModal);
    };
  }, [activeAnnotation?.modal, anchorPoint, positionBoundsRef]);

  useEffect(() => {
    if (!activeId) return undefined;

    const onPointerDown = (event) => {
      const target = event.target;
      if (target instanceof Element && target.closest(".interface-system-diagram__callout-dot-hit")) {
        return;
      }
      if (target instanceof Element && target.closest(".interface-system-diagram__hit-rect")) {
        return;
      }
      if (target instanceof Element && target.closest(".food-tech-interface-pattern-modal-anchor")) {
        return;
      }
      closeAnnotation();
    };

    document.addEventListener("pointerdown", onPointerDown);

    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [activeId, closeAnnotation]);

  useEffect(() => {
    if (svgMarkup) window.dispatchEvent(new Event("resize"));
  }, [svgMarkup]);

  const modalPortal =
    activeAnnotation?.modal && anchorPoint
      ? createPortal(
          <div
            ref={anchorRef}
            className="food-tech-interface-pattern-modal-anchor food-tech-interface-pattern-modal-anchor--viewport"
          >
            <FoodTechInterfacePatternModal modal={activeAnnotation.modal} />
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div
        className={`interface-system-diagram interface-system-diagram--tablet ${className}`.trim()}
        aria-busy={!svgMarkup && !loadError}
      >
        {loadError ? (
          <img
            src={predictionsProjectImages.interfaceSystem.src}
            alt={predictionsProjectImages.interfaceSystem.alt}
            className="interface-system-diagram__fallback"
          />
        ) : (
          <div
            ref={hostRef}
            className="interface-system-diagram__svg-host"
            dangerouslySetInnerHTML={svgMarkup ? { __html: svgMarkup } : undefined}
            role="img"
            aria-label={predictionsProjectImages.interfaceSystem.alt}
          />
        )}
      </div>
      {modalPortal}
    </>
  );
}

function PredictionsInterfaceSystemDiagramTablet() {
  const overlayShellRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") setExpanded(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [expanded]);

  const overlay =
    expanded &&
    createPortal(
      <div
        className="project-case-application-viewport"
        role="dialog"
        aria-modal="true"
        aria-label={predictionsProjectInterfaceSystemPlain}
      >
        <button
          type="button"
          className="project-case-application-viewport__backdrop"
          aria-label="Закрыть"
          onClick={() => setExpanded(false)}
        />

        <div ref={overlayShellRef} className="project-case-application-viewport__shell">
          <ProgressiveDisclosureCard
            open
            title={predictionsProjectInterfaceSystemPlain}
            onToggle={() => setExpanded(false)}
            className="project-case-application-viewport-pdc"
          >
            <Block className="project-case-application-viewport-block" title="Схема" borders={{}}>
              <BlockSlot>
                <PredictionsInterfaceDiagramInteractive positionBoundsRef={overlayShellRef} />
              </BlockSlot>
            </Block>
          </ProgressiveDisclosureCard>
        </div>
      </div>,
      document.body,
    );

  return (
    <>
      <div className="project-case-application-diagram">
        <img
          src={predictionsProjectImages.interfaceSystem.src}
          alt={predictionsProjectImages.interfaceSystem.alt}
          className="block h-auto w-full"
          draggable={false}
        />
        <FloatingButton
          iconSrc="/icons/maximize-01.svg"
          className="project-case-application-diagram__expand project-case-application-diagram__expand--bottom"
          onClick={() => setExpanded(true)}
          aria-label="Развернуть схему"
        >
          {""}
        </FloatingButton>
      </div>
      {overlay}
    </>
  );
}

export default PredictionsInterfaceSystemDiagramTablet;
