import { useCallback, useLayoutEffect, useRef, useState } from "react";
import AccordionStack from "./AccordionStack";
import Block, { BlockSlot } from "./Block";
import HomeExpertiseDiagram from "./HomeExpertiseDiagram";

const SEC01_TITLE = "SEC-01_Междисциплинарная экспертиза";
const SEC02_TITLE = "SEC-02_Навыки";

function Sec01Block({ onDiagramLoad }) {
  return (
    <Block title={SEC01_TITLE} borders={{ bottom: true }}>
      <BlockSlot>
        <HomeExpertiseDiagram className="block w-full" onLoad={onDiagramLoad} />
      </BlockSlot>
    </Block>
  );
}

function Sec02Block({ skillsItems, defaultOpenIndex }) {
  return (
    <Block title={SEC02_TITLE} borders={{ bottom: true, left: true }}>
      <BlockSlot>
        <AccordionStack items={skillsItems} defaultOpenIndex={defaultOpenIndex} />
      </BlockSlot>
    </Block>
  );
}

function HomeTopRow({ skillsItems }) {
  const [rowMinHeight, setRowMinHeight] = useState(null);
  const sec01MeasureRef = useRef(null);
  const sec02MeasureRefs = useRef([]);

  const measureRowHeight = useCallback(() => {
    const sec01Height = sec01MeasureRef.current?.offsetHeight ?? 0;
    const sec02Heights = sec02MeasureRefs.current
      .slice(0, skillsItems.length)
      .map((el) => el?.offsetHeight ?? 0);
    const sec02Max = sec02Heights.length > 0 ? Math.max(...sec02Heights) : 0;
    const next = Math.max(sec01Height, sec02Max);
    if (next <= 0) return;
    setRowMinHeight((prev) => (prev === next ? prev : next));
  }, [skillsItems.length]);

  useLayoutEffect(() => {
    const stackedMq = window.matchMedia("(max-width: 1279px)");

    const onResize = () => {
      if (stackedMq.matches) {
        setRowMinHeight(null);
        return;
      }
      measureRowHeight();
    };

    onResize();
    stackedMq.addEventListener("change", onResize);
    window.addEventListener("resize", onResize);
    return () => {
      stackedMq.removeEventListener("change", onResize);
      window.removeEventListener("resize", onResize);
    };
  }, [skillsItems, measureRowHeight]);

  return (
    <>
      <div
        className="home-page-block-row home-page-block-row--top"
        style={rowMinHeight != null ? { minHeight: `${rowMinHeight}px` } : undefined}
      >
        <Sec01Block onDiagramLoad={measureRowHeight} />
        <Sec02Block skillsItems={skillsItems} defaultOpenIndex={0} />
      </div>

      <div className="home-top-row-measurer" aria-hidden="true">
        <div
          ref={sec01MeasureRef}
          className="home-top-row-measurer__cell home-top-row-measurer__cell--800"
        >
          <Sec01Block onDiagramLoad={measureRowHeight} />
        </div>
        {skillsItems.map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              sec02MeasureRefs.current[index] = el;
            }}
            className="home-top-row-measurer__cell home-top-row-measurer__cell--400"
          >
            <Sec02Block skillsItems={skillsItems} defaultOpenIndex={index} />
          </div>
        ))}
      </div>
    </>
  );
}

export default HomeTopRow;
