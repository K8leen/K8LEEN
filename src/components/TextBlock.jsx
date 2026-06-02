import {
  formatLegalListItem,
  formatLegalListTitle,
  formatLegalPlain,
  formatTextBlockListItem,
  formatTextBlockListTitle,
  formatTextBlockPlain,
} from "../utils/typography";

function TextBlock({
  variant = "plain",
  text = "TEXT LINE",
  textTone = "primary",
  title,
  listItems = ["LIST"],
  description = "DESCRIPTION",
  legal = false,
  className = "",
}) {
  const formatPlain = legal ? formatLegalPlain : formatTextBlockPlain;
  const formatListTitle = legal ? formatLegalListTitle : formatTextBlockListTitle;
  const formatListItem = legal ? formatLegalListItem : formatTextBlockListItem;
  const plainTextClass =
    textTone === "technical-info"
      ? "text-body-main text-technical-info"
      : textTone === "structure"
        ? "text-body-main text-structure-text"
        : "text-body-main text-primary-text";

  if (variant === "list") {
    return (
      <article className={`content-text-block ${className}`.trim()}>
        <section className="content-text-block-section">
          {title ? (
            <h3 className="text-body-main text-primary-text">
              {formatListTitle(title)}
            </h3>
          ) : null}
          <ul className="content-text-block-list">
            {listItems.map((item, index) => (
              <li key={`${item}-${index}`} className="text-body-small text-technical-info">
                {formatListItem(item)}
              </li>
            ))}
          </ul>
        </section>
      </article>
    );
  }

  if (variant === "description") {
    return (
      <article className={`content-text-block ${className}`.trim()}>
        <section className="content-text-block-section">
          <h3 className="text-body-main text-primary-text">
            {formatListTitle(title)}
          </h3>
          <p className="text-body-small text-technical-info">
            {formatPlain(description)}
          </p>
        </section>
      </article>
    );
  }

  return (
    <article className={`content-text-block ${className}`.trim()}>
      <p className={plainTextClass}>{formatPlain(text)}</p>
    </article>
  );
}

export default TextBlock;
