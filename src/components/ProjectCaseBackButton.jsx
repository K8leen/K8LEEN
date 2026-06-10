import { useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import FloatingButton from "./FloatingButton";

function ProjectCaseBackButton({ alignRef, fallbackTo = "/projects", label = "назад" }) {
  const navigate = useNavigate();
  const floatRef = useRef(null);

  const handleBack = () => {
    const historyIndex = window.history.state?.idx;
    if (typeof historyIndex === "number" && historyIndex > 0) {
      navigate(-1);
      return;
    }
    navigate(fallbackTo);
  };

  useLayoutEffect(() => {
    const root = floatRef.current;
    const anchor = alignRef?.current;
    if (!root || !anchor) return;

    const header = document.querySelector(".site-header");

    const alignToHeadline = () => {
      const headlines = anchor.querySelectorAll(".headline");
      const headline =
        [...headlines].find((element) => element.getClientRects().length > 0) ??
        headlines[0] ??
        anchor;
      const headlineRect = headline.getBoundingClientRect();
      const floatRect = root.getBoundingClientRect();
      const alignedTop =
        headlineRect.top + (headlineRect.height - floatRect.height) / 2;
      const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
      const minTop = Math.max(0, headerBottom);
      root.style.top = `${Math.max(minTop, alignedTop)}px`;
    };

    alignToHeadline();

    const resizeObserver = new ResizeObserver(alignToHeadline);
    resizeObserver.observe(anchor);
    resizeObserver.observe(root);
    if (header) resizeObserver.observe(header);
    window.addEventListener("resize", alignToHeadline);
    window.addEventListener("scroll", alignToHeadline, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", alignToHeadline);
      window.removeEventListener("scroll", alignToHeadline);
    };
  }, [alignRef]);

  return createPortal(
    <div ref={floatRef} className="project-case-back-float">
      <FloatingButton iconSrc="/icons/arrow-left.svg" onClick={handleBack}>
        {label}
      </FloatingButton>
    </div>,
    document.body,
  );
}

export default ProjectCaseBackButton;
