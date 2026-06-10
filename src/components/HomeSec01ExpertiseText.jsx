import {
  formatTextBlockListTitle,
  formatTextBlockPlain,
} from "../utils/typography";

function HomeSec01ExpertiseText({ index, title, description }) {
  return (
    <article className="content-text-block home-sec01-expertise-text">
      <section className="content-text-block-section">
        <h3 className="text-tech text-primary-text">
          {formatTextBlockListTitle(`${index}. ${title}`)}
        </h3>
        {description ? (
          <p className="text-tech text-technical-info">
            {formatTextBlockPlain(description)}
          </p>
        ) : null}
      </section>
    </article>
  );
}

export default HomeSec01ExpertiseText;
