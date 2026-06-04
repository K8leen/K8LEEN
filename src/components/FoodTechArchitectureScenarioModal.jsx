import { useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Modal from "./Modal";

function FoodTechArchitectureScenarioModal({
  open,
  title,
  text,
  alignRef,
  onClose,
  placement = "client",
}) {
  const anchorRef = useRef(null);

  useLayoutEffect(() => {
    const anchor = anchorRef.current;
    const alignEl = alignRef?.current;
    if (!anchor || !alignEl || !open) return;

    const siteInner = document.querySelector(".site-layout-inner");

    const positionModal = () => {
      const diagramRect = alignEl.getBoundingClientRect();
      const row = alignEl.closest(".project-case-architecture-row--760-380");
      const sideSlot = row?.querySelector(".project-case-architecture-slot-side--380");
      const siteRect = siteInner?.getBoundingClientRect();

      if (placement === "restaurant" && sideSlot && siteRect) {
        const sideRect = sideSlot.getBoundingClientRect();
        const modalWidth = siteRect.right - sideRect.left;

        anchor.style.top = `${diagramRect.top}px`;
        anchor.style.left = `${sideRect.left - modalWidth}px`;
        anchor.style.right = `${window.innerWidth - sideRect.left}px`;
        return;
      }

      const sideLeft = sideSlot?.getBoundingClientRect().left ?? diagramRect.right + 20;

      anchor.style.top = `${diagramRect.top}px`;
      anchor.style.left = `${sideLeft}px`;
      anchor.style.right = "";
    };

    positionModal();

    const resizeObserver = new ResizeObserver(positionModal);
    resizeObserver.observe(alignEl);
    const row = alignEl.closest(".project-case-architecture-row--760-380");
    if (row) resizeObserver.observe(row);
    if (siteInner) resizeObserver.observe(siteInner);
    window.addEventListener("resize", positionModal);
    window.addEventListener("scroll", positionModal, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", positionModal);
      window.removeEventListener("scroll", positionModal);
    };
  }, [alignRef, open, placement]);

  if (!open || !title || !text) return null;

  const anchorClass =
    placement === "restaurant"
      ? "food-tech-architecture-modal-anchor food-tech-architecture-modal-anchor--restaurant"
      : "food-tech-architecture-modal-anchor food-tech-architecture-modal-anchor--client";

  return createPortal(
    <div ref={anchorRef} className={anchorClass}>
      <Modal
        open
        title={title}
        text={text}
        onClose={onClose}
        className="food-tech-architecture-modal"
      />
    </div>,
    document.body,
  );
}

export default FoodTechArchitectureScenarioModal;
