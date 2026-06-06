import { useLayoutEffect, useState } from "react";

const ROW_WIDTH = 1200;
const MIN_SEC02_WIDTH = 400;
const SEC01_BLOCK_TITLE = "SEC-01_Согласие на обработку персональных данных";
const SEC01_BLOCK_HORIZONTAL_PADDING = 40;

const FOOTER_CONSENT_ROW_SELECTOR =
  ".site-footer-col--left > .site-footer-row:last-of-type";

function measureFooterConsentDividerOffset() {
  const row = document.querySelector(FOOTER_CONSENT_ROW_SELECTOR);
  const policyCell = row?.children[2];
  if (!row || !policyCell) return null;

  return policyCell.getBoundingClientRect().left - row.getBoundingClientRect().left;
}

function measureSec01BlockTitleWidth() {
  const probe = document.createElement("div");
  probe.setAttribute("aria-hidden", "true");
  probe.className = "legal-sec01-title-measure";
  probe.innerHTML = `<header class="ds-block-header"><h2 class="text-block text-primary-text">${SEC01_BLOCK_TITLE}</h2></header>`;
  document.body.appendChild(probe);

  const titleEl = probe.querySelector("h2");
  const titleWidth = titleEl?.scrollWidth ?? probe.offsetWidth;
  document.body.removeChild(probe);

  return Math.ceil(titleWidth + SEC01_BLOCK_HORIZONTAL_PADDING);
}

function resolveSec01Width() {
  const footerWidth = measureFooterConsentDividerOffset() ?? 0;
  const titleWidth = measureSec01BlockTitleWidth();
  const maxSec01Width = ROW_WIDTH - MIN_SEC02_WIDTH;
  const next = Math.max(footerWidth, titleWidth);
  return Math.min(next, maxSec01Width);
}

export function useLegalSec01Width() {
  const [width, setWidth] = useState(null);

  useLayoutEffect(() => {
    const tabletMq = window.matchMedia("(min-width: 768px) and (max-width: 1279px)");

    const update = () => {
      if (tabletMq.matches) {
        setWidth(null);
        return;
      }
      const next = resolveSec01Width();
      if (next > 0) setWidth((prev) => (prev === next ? prev : next));
    };

    update();

    const row = document.querySelector(FOOTER_CONSENT_ROW_SELECTOR);
    const observer =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    if (row) observer?.observe(row);

    tabletMq.addEventListener("change", update);
    window.addEventListener("resize", update);
    document.fonts?.ready?.then(update);

    return () => {
      observer?.disconnect();
      tabletMq.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return width;
}
