import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import AccordionStack from "./AccordionStack";
import Block, { BlockSlot } from "./Block";
import TextBlock from "./TextBlock";
import {
  buildPolicyAccordionItems,
  consentConfirmListItems,
  consentConfirmListTitle,
  consentIntroPlain,
  consentPurposesListItems,
  consentPurposesListTitle,
} from "../data/legalInformationPage";

const ROW_WIDTH = 1200;

function LegalSec01Block({ className = "" }) {
  const siteDomain = window.location.hostname;

  return (
    <Block
      className={className}
      title="SEC-01_Согласие на обработку персональных данных"
      borders={{ bottom: true }}
    >
      <BlockSlot>
        <TextBlock legal variant="plain" text={consentIntroPlain(siteDomain)} />
      </BlockSlot>
      <BlockSlot>
        <TextBlock
          legal
          variant="list"
          title={consentConfirmListTitle}
          listItems={consentConfirmListItems}
        />
      </BlockSlot>
      <BlockSlot>
        <TextBlock
          legal
          variant="list"
          title={consentPurposesListTitle}
          listItems={consentPurposesListItems}
        />
      </BlockSlot>
      <BlockSlot>
        <TextBlock
          legal
          variant="plain"
          text="Я уведомлен(а), что могу отключить cookie-файлы в настройках браузера."
        />
      </BlockSlot>
      <BlockSlot>
        <TextBlock
          legal
          variant="plain"
          text="С Политикой в отношении обработки персональных данных ознакомлен(а)."
        />
      </BlockSlot>
    </Block>
  );
}

function LegalSec02Block({ className = "", policyItems, defaultOpenIndex = 0 }) {
  return (
    <Block
      className={className}
      title="SEC-02_Политика в отношении обработки персональных данных"
      borders={{ bottom: true, left: true }}
    >
      <BlockSlot>
        <AccordionStack items={policyItems} defaultOpenIndex={defaultOpenIndex} />
      </BlockSlot>
    </Block>
  );
}

function LegalInfoPageRow({ sec01Width }) {
  const siteDomain = window.location.hostname;
  const policyItems = useMemo(
    () => buildPolicyAccordionItems(siteDomain),
    [siteDomain],
  );

  const [rowMinHeight, setRowMinHeight] = useState(null);
  const [isTabletLayout, setIsTabletLayout] = useState(false);
  const sec01MeasureRef = useRef(null);
  const sec02MeasureRefs = useRef([]);

  const sec02Width =
    sec01Width != null ? ROW_WIDTH - sec01Width : ROW_WIDTH - 600;

  const rowStyle = isTabletLayout
    ? undefined
    : {
        ...(sec01Width != null ? { "--legal-sec01-width": `${sec01Width}px` } : {}),
        ...(rowMinHeight != null
          ? { height: `${rowMinHeight}px`, minHeight: `${rowMinHeight}px` }
          : {}),
      };

  const blockStretchClass = isTabletLayout ? "" : "h-full";

  const measureRowHeight = useCallback(() => {
    const sec02Heights = sec02MeasureRefs.current
      .slice(0, policyItems.length)
      .map((el) => el?.offsetHeight ?? 0);
    const sec02Max = sec02Heights.length > 0 ? Math.max(...sec02Heights) : 0;
    const sec01Height = sec01MeasureRef.current?.offsetHeight ?? 0;
    const next = sec02Max > 0 ? sec02Max : sec01Height;
    if (next <= 0) return;
    setRowMinHeight((prev) => (prev === next ? prev : next));
  }, [policyItems.length]);

  useLayoutEffect(() => {
    const tabletMq = window.matchMedia("(max-width: 1279px)");

    const onResize = () => {
      setIsTabletLayout(tabletMq.matches);
      if (tabletMq.matches) {
        setRowMinHeight(null);
        return;
      }
      measureRowHeight();
    };

    onResize();

    const observer =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(onResize) : null;
    if (sec01MeasureRef.current) observer?.observe(sec01MeasureRef.current);
    sec02MeasureRefs.current.forEach((el) => {
      if (el) observer?.observe(el);
    });

    tabletMq.addEventListener("change", onResize);
    window.addEventListener("resize", onResize);

    return () => {
      observer?.disconnect();
      tabletMq.removeEventListener("change", onResize);
      window.removeEventListener("resize", onResize);
    };
  }, [policyItems, sec01Width, measureRowHeight]);

  return (
    <>
      <div className="legal-info-page-row" style={rowStyle}>
        <LegalSec01Block className={`legal-info-block--sec01 ${blockStretchClass}`.trim()} />
        <LegalSec02Block
          className={`legal-info-block--sec02 ${blockStretchClass}`.trim()}
          policyItems={policyItems}
          defaultOpenIndex={0}
        />
      </div>

      <div className="legal-info-page-measurer" aria-hidden="true">
        <div
          ref={sec01MeasureRef}
          className="legal-info-page-measurer__cell legal-info-page-measurer__cell--sec01"
          style={
            sec01Width != null
              ? { width: `${sec01Width}px` }
              : { width: "var(--legal-sec01-width, 600px)" }
          }
        >
          <LegalSec01Block />
        </div>
        {policyItems.map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              sec02MeasureRefs.current[index] = el;
            }}
            className="legal-info-page-measurer__cell legal-info-page-measurer__cell--sec02"
            style={{ width: `${sec02Width}px` }}
          >
            <LegalSec02Block policyItems={policyItems} defaultOpenIndex={index} />
          </div>
        ))}
      </div>
    </>
  );
}

export default LegalInfoPageRow;
