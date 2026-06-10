const TABLET_MODAL_MIN = 280;
const TABLET_MODAL_MAX = 380;
const DESKTOP_MODAL_MIN = 280;
const MOBILE_MODAL_EDGE_PAD = 24;

export const MOBILE_MODAL_MQ = "(max-width: 699px)";

export function isMobileModalViewport() {
  return typeof window !== "undefined" && window.matchMedia(MOBILE_MODAL_MQ).matches;
}

export function getDeviceViewportRect() {
  return {
    left: 0,
    top: 0,
    right: window.innerWidth,
    bottom: window.innerHeight,
    width: window.innerWidth,
    height: window.innerHeight,
    x: 0,
    y: 0,
  };
}

/** Границы для позиционирования всплывашки: на мобилке — экран устройства, не скролл-контейнер схемы. */
export function getModalPositionBounds(boundsEl) {
  if (isMobileModalViewport()) return getDeviceViewportRect();
  return boundsEl?.getBoundingClientRect() ?? getDeviceViewportRect();
}

export function getInterfacePatternModalWidth(bounds) {
  if (!bounds) return 480;

  if (isMobileModalViewport()) {
    return Math.max(TABLET_MODAL_MIN, bounds.width - MOBILE_MODAL_EDGE_PAD);
  }

  if (bounds.width < 1280) {
    return Math.min(Math.max(bounds.width - 32, TABLET_MODAL_MIN), TABLET_MODAL_MAX);
  }

  const contentLeft = bounds.left + 40;
  const architectureModalLeft = contentLeft + 760 + 20;
  const width = bounds.right - architectureModalLeft;

  return Math.max(width, DESKTOP_MODAL_MIN);
}

/** Ширина модалки сценария — как у клиентской модалки в SEC-05 (от левого края колонки 380 до правого края подложки). */
export function getFoodTechScenarioModalWidth(siteRect) {
  return getInterfacePatternModalWidth(siteRect);
}

export function clampModalContentWidth(contentWidth, bounds) {
  const positionBounds = bounds ?? getDeviceViewportRect();
  const maxWidth = Math.max(0, positionBounds.width - MOBILE_MODAL_EDGE_PAD);
  return Math.min(contentWidth, maxWidth);
}
