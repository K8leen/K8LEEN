/** Отступ popover от якорной точки (курсор / угол подписи), px */
export const FLOATING_POINTER_OFFSET = 12;

const VIEWPORT_PADDING = 12;

/**
 * Размещает fixed-якорь рядом с точкой: по умолчанию справа-снизу, с flip у краёв viewport.
 * @param {HTMLElement} anchor
 * @param {{ x: number, y: number }} point — clientX/clientY в момент открытия (замороженный)
 * @param {{ width: number, height: number, offset?: number, bounds?: DOMRect | null }} size
 */
export function positionFloatingNearPointer(anchor, point, { width, height, offset = FLOATING_POINTER_OFFSET, bounds = null }) {
  const pad = VIEWPORT_PADDING;
  const minLeft = bounds ? bounds.left + pad : pad;
  const maxLeft = (bounds ? bounds.right : window.innerWidth) - width - pad;
  const minTop = pad;
  const maxTop = window.innerHeight - height - pad;

  let left = point.x + offset;
  let top = point.y + offset;

  if (left + width > window.innerWidth - pad) {
    left = point.x - width - offset;
  }

  if (top + height > window.innerHeight - pad) {
    top = point.y - height - offset;
  }

  left = Math.min(Math.max(left, minLeft), Math.max(minLeft, maxLeft));
  top = Math.min(Math.max(top, minTop), Math.max(minTop, maxTop));

  anchor.style.left = `${left}px`;
  anchor.style.top = `${top}px`;
}
