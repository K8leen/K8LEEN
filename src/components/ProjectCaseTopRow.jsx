import { useCallback, useLayoutEffect, useRef, useState } from "react";

function ProjectCaseTopRow({ sec00, sec01, sec02, sec03, sec04 }) {
  const [rowMinHeight, setRowMinHeight] = useState(null);
  const sec00MeasureRef = useRef(null);
  const colMeasureRef = useRef(null);

  const measureRowHeight = useCallback(() => {
    const sec00Height = sec00MeasureRef.current?.offsetHeight ?? 0;
    const colHeight = colMeasureRef.current?.offsetHeight ?? 0;
    const next = Math.max(sec00Height, colHeight);
    setRowMinHeight((prev) => (prev === next ? prev : next));
  }, []);

  useLayoutEffect(() => {
    measureRowHeight();
    window.addEventListener("resize", measureRowHeight);

    const resizeObserver = new ResizeObserver(measureRowHeight);
    if (sec00MeasureRef.current) resizeObserver.observe(sec00MeasureRef.current);
    if (colMeasureRef.current) resizeObserver.observe(colMeasureRef.current);

    return () => {
      window.removeEventListener("resize", measureRowHeight);
      resizeObserver.disconnect();
    };
  }, [measureRowHeight, sec00, sec01, sec02, sec03, sec04]);

  const colBlocks = (
    <>
      {sec01}
      {sec02}
      {sec03}
      {sec04}
    </>
  );

  return (
    <>
      <div
        className="project-case-row project-case-row--top"
        style={rowMinHeight != null ? { minHeight: `${rowMinHeight}px` } : undefined}
      >
        <div className="project-case-top-cell project-case-top-cell--800">{sec00}</div>
        <div className="project-case-col-stack">{colBlocks}</div>
      </div>

      <div className="project-top-row-measurer" aria-hidden="true">
        <div
          ref={sec00MeasureRef}
          className="project-top-row-measurer__cell project-top-row-measurer__cell--800"
        >
          {sec00}
        </div>
        <div
          ref={colMeasureRef}
          className="project-top-row-measurer__cell project-top-row-measurer__cell--400"
        >
          <div className="project-case-col-stack">{colBlocks}</div>
        </div>
      </div>
    </>
  );
}

export default ProjectCaseTopRow;
