export function getSvgPointClientPosition(svgHost, svgX, svgY) {
  const svg = svgHost?.querySelector("svg");
  if (!svg) return null;

  const point = svg.createSVGPoint();
  point.x = svgX;
  point.y = svgY;

  const matrix = svg.getScreenCTM();
  if (!matrix) return null;

  const { x, y } = point.matrixTransform(matrix);
  return { x, y };
}
