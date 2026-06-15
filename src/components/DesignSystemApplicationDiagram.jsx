import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Block, { BlockSlot } from "./Block";
import DeferredImage from "./DeferredImage";
import FloatingButton from "./FloatingButton";
import ProgressiveDisclosureCard from "./ProgressiveDisclosureCard";

function DesignSystemApplicationDiagram({ src, alt }) {
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
        aria-label={alt}
      >
        <button
          type="button"
          className="project-case-application-viewport__backdrop"
          aria-label="Закрыть"
          onClick={() => setExpanded(false)}
        />

        <div className="project-case-application-viewport__shell">
          <ProgressiveDisclosureCard
            open
            title="Применение в продукте"
            onToggle={() => setExpanded(false)}
            className="project-case-application-viewport-pdc"
          >
            <Block className="project-case-application-viewport-block" title="Схема" borders={{}}>
              <BlockSlot>
                <DeferredImage src={src} alt={alt} className="block h-auto w-full" draggable={false} />
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
        <DeferredImage src={src} alt={alt} className="block h-auto w-full" draggable={false} />
        <FloatingButton
          iconSrc="/icons/maximize-01.svg"
          className="project-case-application-diagram__expand"
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

export default DesignSystemApplicationDiagram;
