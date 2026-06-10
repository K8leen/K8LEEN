import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import useMediaQuery from "../hooks/useMediaQuery";
import ProjectCaseResultCalloutModal from "./ProjectCaseResultCalloutModal";
import { installInterfaceCalloutDotHitArea } from "../utils/installInterfaceCalloutDotHitArea";
import { prepareProjectCaseResultSvg } from "../utils/prepareProjectCaseResultSvg";
import {
  clampModalContentWidth,
  getModalPositionBounds,
} from "../utils/foodTechScenarioModalWidth";
import { getSvgPointClientPosition } from "../utils/getSvgPointClientPosition";
import { positionResultCalloutModal } from "../utils/positionFloatingNearPointer";

const MOBILE_MQ = "(max-width: 699px)";

function ProjectCaseResultVisual({ src, alt, className = "", onLoad }) {
  const isMobile = useMediaQuery(MOBILE_MQ);
  const hostRef = useRef(null);
  const anchorRef = useRef(null);
  const [svgMarkup, setSvgMarkup] = useState("");
  const [annotations, setAnnotations] = useState([]);
  const [loadError, setLoadError] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [anchorPoint, setAnchorPoint] = useState(null);

  const activeAnnotation = annotations.find((item) => item.id === activeId);

  const closeAnnotation = useCallback(() => {
    setActiveId(null);
    setAnchorPoint(null);
  }, []);

  const openAnnotation = useCallback((annotationId, clientX, clientY) => {
    setActiveId(annotationId);
    setAnchorPoint({ x: clientX, y: clientY });
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setSvgMarkup("");
      setAnnotations([]);
      setLoadError(false);
      setActiveId(null);
      setAnchorPoint(null);
      return;
    }

    let cancelled = false;
    const controller = new AbortController();

    fetch(src, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load ${src}`);
        return response.text();
      })
      .then((text) => {
        if (cancelled) return;
        const prepared = prepareProjectCaseResultSvg(text);
        setSvgMarkup(prepared.markup);
        setAnnotations(prepared.annotations);
        setLoadError(false);
        onLoad?.();
      })
      .catch((error) => {
        if (cancelled || error.name === "AbortError") return;
        setLoadError(true);
        setSvgMarkup("");
        setAnnotations([]);
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [isMobile, onLoad, src]);

  useLayoutEffect(() => {
    const svg = hostRef.current?.querySelector("svg");
    if (!svg || !svgMarkup) return;

    const cleanups = [];

    for (const annotation of annotations) {
      const dot = svg.querySelector(`[data-result-callout="${annotation.id}"]`);
      if (!dot) continue;

      const wired = installInterfaceCalloutDotHitArea(dot, annotation.id);
      if (!wired) continue;

      const { hit, pulse } = wired;

      const onActivate = (event) => {
        event.stopPropagation();
        if (!annotation.labelSvg) return;
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
  }, [annotations, openAnnotation, svgMarkup]);

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
    const host = hostRef.current;
    if (!anchor || !activeAnnotation?.labelSvg) return;

    const siteInner = document.querySelector(".site-layout-inner");
    const dotPoint = getSvgPointClientPosition(host, activeAnnotation.dotCx, activeAnnotation.dotCy);

    const positionModal = () => {
      const siteRect = getModalPositionBounds(siteInner);
      const point = dotPoint ?? anchorPoint;
      if (!point) return;

      anchor.style.visibility = "hidden";
      anchor.style.width = "max-content";

      const modalWidth = clampModalContentWidth(anchor.offsetWidth, siteRect);
      anchor.style.width = `${modalWidth}px`;

      positionResultCalloutModal(anchor, point, {
        width: modalWidth,
        height: anchor.offsetHeight,
        bounds: siteRect,
      });

      anchor.style.visibility = "visible";
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
  }, [activeAnnotation, anchorPoint]);

  useEffect(() => {
    if (!isMobile || !activeId) return undefined;

    const onScroll = () => closeAnnotation();

    document.addEventListener("scroll", onScroll, { passive: true, capture: true });

    return () => document.removeEventListener("scroll", onScroll, { capture: true });
  }, [activeId, closeAnnotation, isMobile]);

  useEffect(() => {
    if (!activeId) return undefined;

    const onPointerDown = (event) => {
      const target = event.target;
      if (target instanceof Element && target.closest(".interface-system-diagram__callout-dot-hit")) {
        return;
      }
      if (target instanceof Element && target.closest(".project-case-result-callout-modal-anchor")) {
        return;
      }
      closeAnnotation();
    };

    document.addEventListener("pointerdown", onPointerDown);

    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [activeId, closeAnnotation]);

  if (!isMobile || loadError) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        onLoad={onLoad}
      />
    );
  }

  const modalPortal =
    activeAnnotation?.labelSvg && anchorPoint
      ? createPortal(
          <div ref={anchorRef} className="project-case-result-callout-modal-anchor">
            <ProjectCaseResultCalloutModal labelSvg={activeAnnotation.labelSvg} />
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div
        className={`interface-system-diagram interface-system-diagram--tablet project-case-result-visual${className ? ` ${className}` : ""}`}
        aria-busy={!svgMarkup}
      >
        <div
          ref={hostRef}
          className="interface-system-diagram__svg-host"
          dangerouslySetInnerHTML={svgMarkup ? { __html: svgMarkup } : undefined}
          role="img"
          aria-label={alt}
        />
      </div>
      {modalPortal}
    </>
  );
}

export default ProjectCaseResultVisual;
