import { homeExpertiseItems } from "../data/homeExpertise";
import useMediaQuery from "../hooks/useMediaQuery";
import HomeSec01ExpertiseText from "./HomeSec01ExpertiseText";

const WIDE_LAYOUT_MQ = "(min-width: 465px)";

function HomeSec01Mobile({ onLoad }) {
  const isWideLayout = useMediaQuery(WIDE_LAYOUT_MQ);

  return (
    <div className={`home-sec01-mobile${isWideLayout ? " home-sec01-mobile--wide" : ""}`}>
      <div className="home-sec01-mobile__visual">
        <img
          src={isWideLayout ? "/img/scheme_s.svg" : "/img/scheme.svg"}
          alt="Схема междисциплинарной экспертизы"
          className="home-sec01-scheme"
          onLoad={onLoad}
        />
      </div>

      <div className="home-sec01-mobile__copy stack">
        {homeExpertiseItems.map((item, index) => (
          <HomeSec01ExpertiseText
            key={item.title}
            index={index + 1}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}

export default HomeSec01Mobile;
