function TextBlock({
  variant = "plain",
  text = "TEXT LINE",
  title = "TITLE",
  listItems = ["LIST"],
  description = "DESCRIPTION",
  className = "",
}) {
  if (variant === "list") {
    return (
      <article className={`content-text-block ${className}`.trim()}>
        <section className="content-text-block-section">
          <h3 className="text-body-main text-structure-text">{title}</h3>
          <ul className="content-text-block-list">
            {listItems.map((item, index) => (
              <li key={`${item}-${index}`} className="text-body-small text-technical-info">
                {item}
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
          <h3 className="text-body-main text-structure-text">{title}</h3>
          <p className="text-body-small text-technical-info">{description}</p>
        </section>
      </article>
    );
  }

  return (
    <article className={`content-text-block ${className}`.trim()}>
      <p className="text-body-main text-structure-text">{text}</p>
    </article>
  );
}

export default TextBlock;
