import { prepareProjectCaseResultSvg } from "./prepareProjectCaseResultSvg";

export function stripProjectCaseResultCallouts(svgMarkup) {
  return prepareProjectCaseResultSvg(svgMarkup).markup;
}
