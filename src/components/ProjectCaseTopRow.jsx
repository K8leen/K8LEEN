import { useCallback, useLayoutEffect, useRef, useState } from "react";

function ProjectCaseTopRow({
  sec00,
  sec01,
  sec02,
  sec03,
  sec04,
  /** "max" — выше из двух колонок; "column" — сумма SEC-01…03; "sec00" — высота SEC-00 */
  rowHeight = "max",
  /** Фиксированная высота ряда (макет), только с rowHeight="column" */
  rowHeightPx,
  rowClassName = "",
}) {
  const [rowMinHeight, setRowMinHeight] = useState(null);
  const sec00MeasureRef = useRef(null);
  const colMeasureRef = useRef(null);
  const anchorColumn = rowHeight === "column";
  const anchorSec00 = rowHeight === "sec00";

  const measureRowHeight = useCallback(() => {
    const sec00Height = sec00MeasureRef.current?.offsetHeight ?? 0;
    const colHeight = colMeasureRef.current?.offsetHeight ?? 0;
    const next =
      rowHeightPx != null
        ? rowHeightPx
        : anchorSec00
          ? sec00Height
          : anchorColumn
            ? colHeight
            : Math.max(sec00Height, colHeight);
    setRowMinHeight((prev) => (prev === next ? prev : next));
  }, [anchorColumn, anchorSec00, rowHeightPx]);

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
  }, [anchorColumn, anchorSec00, measureRowHeight, rowHeightPx, sec00, sec01, sec02, sec03, sec04]);

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
        className={`project-case-row project-case-row--top${anchorColumn ? " project-case-row--anchor-column" : ""}${anchorSec00 ? " project-case-row--anchor-sec00" : ""} ${rowClassName}`.trim()}
        style={
          rowMinHeight != null
            ? anchorColumn || anchorSec00
              ? { height: `${rowMinHeight}px` }
              : { minHeight: `${rowMinHeight}px` }
            : undefined
        }
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
