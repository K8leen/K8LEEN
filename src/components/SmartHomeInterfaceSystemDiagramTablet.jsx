import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import FoodTechInterfacePatternModal from "./FoodTechInterfacePatternModal";
import DeferredImage from "./DeferredImage";
import HorizontalScrollStrip from "./HorizontalScrollStrip";
import {
  SMART_HOME_INTERFACE_ANNOTATIONS,
  SMART_HOME_INTERFACE_ANNOTATION_IDS,
} from "../data/smartHomeInterfaceAnnotations";
import { SMART_HOME_INTERFACE_CALLOUT_DOT_POSITIONS } from "../data/smartHomeInterfaceCalloutDotPositions";
import { smartHomeProjectImages } from "../data/smartHomeProjectPage";
import {
  getInterfacePatternModalWidth,
  getModalPositionBounds,
} from "../utils/foodTechScenarioModalWidth";
import { measureInterfaceLabelHitAreas } from "../utils/measureInterfaceLabelHitAreas";
import {
  FLOATING_POINTER_OFFSET,
  positionFloatingNearPointer,
} from "../utils/positionFloatingNearPointer";

function openFromTarget(event, annotationId, onOpenAnnotation) {
  event.stopPropagation();
  const rect = event.currentTarget.getBoundingClientRect();
  onOpenAnnotation(annotationId, rect.left + rect.width / 2, rect.top + rect.height / 2);
}

function SmartHomeInterfaceSystemDiagramTablet() {
  const anchorRef = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const [anchorPoint, setAnchorPoint] = useState(null);
  const [labelHitAreas, setLabelHitAreas] = useState({});

  const activeAnnotation = SMART_HOME_INTERFACE_ANNOTATIONS.find((item) => item.id === activeId);

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

    fetch(smartHomeProjectImages.interfaceSystem.src, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("interface svg fetch failed");
        return response.text();
      })
      .then((markup) => {
        if (cancelled) return;
        setLabelHitAreas(measureInterfaceLabelHitAreas(markup, SMART_HOME_INTERFACE_ANNOTATION_IDS));
      })
      .catch(() => {
        if (!cancelled) setLabelHitAreas({});
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useLayoutEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor || !anchorPoint || !activeAnnotation?.modal) return;

    const siteInner = document.querySelector(".site-layout-inner");

    const positionModal = () => {
      const siteRect = getModalPositionBounds(siteInner);
      const modalWidth = getInterfacePatternModalWidth(siteRect);

      anchor.style.width = `${modalWidth}px`;

      const placedWidth = positionFloatingNearPointer(anchor, anchorPoint, {
        width: modalWidth,
        height: anchor.offsetHeight,
        offset: FLOATING_POINTER_OFFSET,
        bounds: siteRect,
      });

      if (placedWidth !== modalWidth) {
        anchor.style.width = `${placedWidth}px`;
      }
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
    if (!activeId) return undefined;

    const onPointerDown = (event) => {
      const target = event.target;
      if (
        target instanceof Element &&
        (target.closest(".interface-system-diagram__callout-dot-btn") ||
          target.closest(".interface-system-diagram__label-hit"))
      ) {
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

  const modalPortal =
    activeAnnotation?.modal && anchorPoint
      ? createPortal(
          <div ref={anchorRef} className="food-tech-interface-pattern-modal-anchor">
            <FoodTechInterfacePatternModal modal={activeAnnotation.modal} />
          </div>,
          document.body,
        )
      : null;

  return (
    <div className="interface-system-diagram interface-system-diagram--tablet interface-system-diagram--tablet-img">
      <HorizontalScrollStrip
        className="project-case-interface-scroll"
        ariaLabel={smartHomeProjectImages.interfaceSystem.alt}
      >
        <div className="project-case-interface-scroll__frame">
          <DeferredImage
            src={smartHomeProjectImages.interfaceSystem.src}
            alt={smartHomeProjectImages.interfaceSystem.alt}
            className="project-case-interface-scroll__image project-case-interface-scroll__image--smart-home"
            draggable={false}
            onLoad={() => window.dispatchEvent(new Event("resize"))}
          />
          <div className="interface-system-diagram__dot-overlay">
            {SMART_HOME_INTERFACE_ANNOTATIONS.map((annotation) => {
              const position = SMART_HOME_INTERFACE_CALLOUT_DOT_POSITIONS[annotation.id];
              if (!position) return null;

              const isActive = activeId === annotation.id;

              return (
                <button
                  key={`dot-${annotation.id}`}
                  type="button"
                  className={`interface-system-diagram__callout-dot-btn${isActive ? " interface-system-diagram__callout-dot-btn--active" : ""}`}
                  style={{ left: `${position.x}%`, top: `${position.y}%` }}
                  aria-label={annotation.label}
                  onClick={(event) => openFromTarget(event, annotation.id, openAnnotation)}
                />
              );
            })}
            {SMART_HOME_INTERFACE_ANNOTATIONS.map((annotation) => {
              const area = labelHitAreas[annotation.id];
              if (!area) return null;

              return (
                <button
                  key={`label-${annotation.id}`}
                  type="button"
                  className="interface-system-diagram__label-hit"
                  style={{
                    left: `${area.x}%`,
                    top: `${area.y}%`,
                    width: `${area.w}%`,
                    height: `${area.h}%`,
                  }}
                  aria-label={annotation.label}
                  onClick={(event) => openFromTarget(event, annotation.id, openAnnotation)}
                />
              );
            })}
          </div>
        </div>
      </HorizontalScrollStrip>
      {modalPortal}
    </div>
  );
}

export default SmartHomeInterfaceSystemDiagramTablet;
