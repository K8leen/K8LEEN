import { useEffect, useState } from "react";
import ExpertiseDiagram from "./ExpertiseDiagram";

const MOBILE_XXS_MQ = "(max-width: 511px)";
const MOBILE_XS_MQ = "(min-width: 512px) and (max-width: 699px)";

function resolveVariant() {
  if (typeof window === "undefined") return "desktop";
  if (window.matchMedia(MOBILE_XXS_MQ).matches) return "xxs";
  if (window.matchMedia(MOBILE_XS_MQ).matches) return "xs";
  return "desktop";
}

function HomeExpertiseDiagram({ className = "", onLoad }) {
  const [variant, setVariant] = useState(resolveVariant);

  useEffect(() => {
    const xxsMq = window.matchMedia(MOBILE_XXS_MQ);
    const xsMq = window.matchMedia(MOBILE_XS_MQ);

    const update = () => setVariant(resolveVariant());

    update();
    xxsMq.addEventListener("change", update);
    xsMq.addEventListener("change", update);
    return () => {
      xxsMq.removeEventListener("change", update);
      xsMq.removeEventListener("change", update);
    };
  }, []);

  if (variant === "desktop") {
    return <ExpertiseDiagram className={className} onLoad={onLoad} />;
  }

  const src = variant === "xxs" ? "/img/00_01_xxs.svg" : "/img/00_01_xs.svg";

  return (
    <img
      src={src}
      alt="Диаграмма междисциплинарной экспертизы"
      className={`expertise-diagram-mobile block w-full h-auto ${className}`.trim()}
      onLoad={onLoad}
    />
  );
}

export default HomeExpertiseDiagram;
