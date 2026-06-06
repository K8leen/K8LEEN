const TABLET_MODAL_MIN = 280;
const TABLET_MODAL_MAX = 380;
const DESKTOP_MODAL_MIN = 280;

/** Ширина модалки сценария — как у клиентской модалки в SEC-05 (от левого края колонки 380 до правого края подложки). */
export function getFoodTechScenarioModalWidth(siteRect) {
  if (!siteRect) return 480;

  if (siteRect.width < 1280) {
    return Math.min(Math.max(siteRect.width - 32, TABLET_MODAL_MIN), TABLET_MODAL_MAX);
  }

  const contentLeft = siteRect.left + 40;
  const architectureModalLeft = contentLeft + 760 + 20;
  const width = siteRect.right - architectureModalLeft;

  return Math.max(width, DESKTOP_MODAL_MIN);
}
