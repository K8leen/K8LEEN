import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import FoodTechInterfacePatternModal from "./FoodTechInterfacePatternModal";
import HorizontalScrollStrip from "./HorizontalScrollStrip";
import {
  FOOD_TECH_INTERFACE_ANNOTATIONS,
  FOOD_TECH_INTERFACE_SYSTEM_PARTS,
} from "../data/foodTechInterfaceAnnotations";
import { FOOD_TECH_INTERFACE_PART_DOT_POSITIONS } from "../data/foodTechInterfaceCalloutDotPositions";
import { foodTechProjectImages } from "../data/foodTechProjectPage";
import { getFoodTechScenarioModalWidth } from "../utils/foodTechScenarioModalWidth";
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

function FoodTechInterfaceDiagramPart({
  partConfig,
  partIndex,
  dotPositions,
  isFirstPart,
  activeId,
  onOpenAnnotation,
}) {
  const { src, annotationIds } = partConfig;

  const annotations = FOOD_TECH_INTERFACE_ANNOTATIONS.filter((annotation) =>
    annotationIds.has(annotation.id),
  );
  const [labelHitAreas, setLabelHitAreas] = useState({});

  useEffect(() => {
    let cancelled = false;

    fetch(src, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("interface svg fetch failed");
        return response.text();
      })
      .then((markup) => {
        if (cancelled) return;
        setLabelHitAreas(measureInterfaceLabelHitAreas(markup, annotationIds));
      })
      .catch(() => {
        if (!cancelled) setLabelHitAreas({});
      });

    return () => {
      cancelled = true;
    };
  }, [annotationIds, src]);

  return (
    <HorizontalScrollStrip
      className="project-case-interface-scroll"
      ariaLabel={
        isFirstPart
          ? foodTechProjectImages.interfaceSystem.alt
          : "Система интерфейса — ресторанная часть"
      }
    >
      <div className="project-case-interface-scroll__frame">
        <img
          src={src}
          alt={
            isFirstPart
              ? foodTechProjectImages.interfaceSystem.alt
              : "Система интерфейса — ресторанная часть"
          }
          className={`project-case-interface-scroll__image project-case-interface-scroll__image--part-${partIndex + 1}`}
          draggable={false}
          onLoad={() => window.dispatchEvent(new Event("resize"))}
        />
        <div className="interface-system-diagram__dot-overlay">
          {annotations.map((annotation) => {
            const position = dotPositions[annotation.id];
            if (!position) return null;

            const isActive = activeId === annotation.id;

            return (
              <button
                key={`dot-${annotation.id}`}
                type="button"
                className={`interface-system-diagram__callout-dot-btn${isActive ? " interface-system-diagram__callout-dot-btn--active" : ""}`}
                style={{ left: `${position.x}%`, top: `${position.y}%` }}
                aria-label={annotation.label}
                onClick={(event) => openFromTarget(event, annotation.id, onOpenAnnotation)}
              />
            );
          })}
          {annotations.map((annotation) => {
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
                onClick={(event) => openFromTarget(event, annotation.id, onOpenAnnotation)}
              />
            );
          })}
        </div>
      </div>
    </HorizontalScrollStrip>
  );
}

function FoodTechInterfaceSystemDiagramTablet() {
  const anchorRef = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const [anchorPoint, setAnchorPoint] = useState(null);

  const activeAnnotation = FOOD_TECH_INTERFACE_ANNOTATIONS.find((item) => item.id === activeId);

  const closeAnnotation = useCallback(() => {
    setActiveId(null);
    setAnchorPoint(null);
  }, []);

  const openAnnotation = useCallback((annotationId, clientX, clientY) => {
    setActiveId(annotationId);
    setAnchorPoint({ x: clientX, y: clientY });
  }, []);

  useLayoutEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor || !anchorPoint || !activeAnnotation?.modal) return;

    const siteInner = document.querySelector(".site-layout-inner");

    const positionModal = () => {
      const siteRect = siteInner?.getBoundingClientRect();
      const modalWidth = getFoodTechScenarioModalWidth(siteRect);

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
      <div className="interface-system-diagram__stack">
        {FOOD_TECH_INTERFACE_SYSTEM_PARTS.map((partConfig, index) => (
          <FoodTechInterfaceDiagramPart
            key={partConfig.src}
            partConfig={partConfig}
            partIndex={index}
            dotPositions={FOOD_TECH_INTERFACE_PART_DOT_POSITIONS[index]}
            isFirstPart={index === 0}
            activeId={activeId}
            onOpenAnnotation={openAnnotation}
          />
        ))}
      </div>
      {modalPortal}
    </div>
  );
}

export default FoodTechInterfaceSystemDiagramTablet;
