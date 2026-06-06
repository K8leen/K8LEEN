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

    const alignToHeadline = () => {
      const headlines = anchor.querySelectorAll(".headline");
      const headline =
        [...headlines].find((element) => element.getClientRects().length > 0) ??
        headlines[0] ??
        anchor;
      const headlineRect = headline.getBoundingClientRect();
      const floatRect = root.getBoundingClientRect();
      root.style.top = `${headlineRect.top + (headlineRect.height - floatRect.height) / 2}px`;
    };

    alignToHeadline();

    const resizeObserver = new ResizeObserver(alignToHeadline);
    resizeObserver.observe(anchor);
    window.addEventListener("resize", alignToHeadline);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", alignToHeadline);
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
