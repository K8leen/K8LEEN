/** Ширина модалки сценария — как у клиентской модалки в SEC-05 (от левого края колонки 380 до правого края подложки). */
export function getFoodTechScenarioModalWidth(siteRect) {
  if (!siteRect) return 480;

  const contentLeft = siteRect.left + 40;
  const architectureModalLeft = contentLeft + 760 + 20;

  return siteRect.right - architectureModalLeft;
}
