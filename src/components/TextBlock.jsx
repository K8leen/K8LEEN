function TextBlock({
  variant = "plain",
  text = "TEXT LINE",
  textTone = "primary",
  title,
  listItems = ["LIST"],
  description = "DESCRIPTION",
  className = "",
}) {
  const plainTextClass =
    textTone === "technical-info"
      ? "text-body-main text-technical-info"
      : "text-body-main text-primary-text";
  if (variant === "list") {
    return (
      <article className={`content-text-block ${className}`.trim()}>
        <section className="content-text-block-section">
          {title ? (
            <h3 className="text-body-main text-primary-text">{title}</h3>
          ) : null}
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
          <h3 className="text-body-main text-primary-text">{title}</h3>
          <p className="text-body-small text-technical-info">{description}</p>
        </section>
      </article>
    );
  }

  return (
    <article className={`content-text-block ${className}`.trim()}>
      <p className={plainTextClass}>{text}</p>
    </article>
  );
}

export default TextBlock;
