/** Отступ popover от якорной точки (курсор / угол подписи), px */
export const FLOATING_POINTER_OFFSET = 12;

const VIEWPORT_PADDING = 12;

/**
 * Размещает fixed-якорь рядом с точкой: по умолчанию справа-снизу, с flip у краёв bounds/viewport.
 * @param {HTMLElement} anchor
 * @param {{ x: number, y: number }} point — clientX/clientY в момент открытия (замороженный)
 * @param {{ width: number, height: number, offset?: number, bounds?: DOMRect | null }} size
 * @returns {number} фактическая ширина после ограничения границами
 */
export function positionFloatingNearPointer(
  anchor,
  point,
  { width, height, offset = FLOATING_POINTER_OFFSET, bounds = null },
) {
  const pad = VIEWPORT_PADDING;
  const boxLeft = bounds?.left ?? 0;
  const boxRight = bounds?.right ?? window.innerWidth;
  const minLeft = boxLeft + pad;
  const maxRight = boxRight - pad;
  const minTop = pad;
  const maxBottom = window.innerHeight - pad;

  const maxAvailableWidth = Math.max(0, maxRight - minLeft);
  const safeWidth = Math.max(0, Math.min(width, maxAvailableWidth));
  const safeHeight = Math.max(0, Math.min(height, maxBottom - minTop));

  let left = point.x + offset;
  let top = point.y + offset;

  if (left + safeWidth > maxRight) {
    left = point.x - safeWidth - offset;
  }

  if (left < minLeft) {
    left = minLeft;
  }

  if (left + safeWidth > maxRight) {
    left = maxRight - safeWidth;
  }

  if (top + safeHeight > maxBottom) {
    top = point.y - safeHeight - offset;
  }

  if (top < minTop) {
    top = minTop;
  }

  if (top + safeHeight > maxBottom) {
    top = maxBottom - safeHeight;
  }

  anchor.style.left = `${left}px`;
  anchor.style.top = `${top}px`;

  return safeWidth;
}

const CALLOUT_DOT_HIT_RADIUS = 14;

/**
 * Плашка подписи SEC-00: по центру под точкой, ниже hit-area.
 */
export function positionResultCalloutModal(
  anchor,
  point,
  { width, height, bounds = null },
) {
  const pad = VIEWPORT_PADDING;
  const boxLeft = bounds?.left ?? 0;
  const boxRight = bounds?.right ?? window.innerWidth;
  const minLeft = boxLeft + pad;
  const maxRight = boxRight - pad;
  const minTop = pad;
  const maxBottom = window.innerHeight - pad;

  const maxAvailableWidth = Math.max(0, maxRight - minLeft);
  const safeWidth = Math.max(0, Math.min(width, maxAvailableWidth));
  const safeHeight = Math.max(0, Math.min(height, maxBottom - minTop));

  let left = point.x - safeWidth / 2;
  let top = point.y + CALLOUT_DOT_HIT_RADIUS + FLOATING_POINTER_OFFSET;

  if (left < minLeft) left = minLeft;
  if (left + safeWidth > maxRight) left = maxRight - safeWidth;
  if (top + safeHeight > maxBottom) top = point.y - safeHeight - FLOATING_POINTER_OFFSET;
  if (top < minTop) top = minTop;
  if (top + safeHeight > maxBottom) top = maxBottom - safeHeight;

  anchor.style.left = `${left}px`;
  anchor.style.top = `${top}px`;

  return safeWidth;
}
