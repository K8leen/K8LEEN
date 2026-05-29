import LinkButton from "./LinkButton";

function Block({
  title = "BLOCK HEADER",
  linkLabel,
  linkTo,
  linkHref,
  borders = {},
  children,
  className = "",
}) {
  const { top = false, right = false, bottom = false, left = false } = borders;
  const borderClass = [
    top ? "ds-block--border-top" : "",
    right ? "ds-block--border-right" : "",
    bottom ? "ds-block--border-bottom" : "",
    left ? "ds-block--border-left" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={`ds-block ${borderClass} ${className}`.trim()}>
      <header className="ds-block-header">
        <h2 className="text-block text-primary-text">{title}</h2>
        {linkLabel ? (
          <LinkButton
            variant="inline"
            to={linkTo}
            href={linkHref}
            state={linkTo || linkHref ? undefined : "default"}
          >
            {linkLabel}
          </LinkButton>
        ) : null}
      </header>

      {children ? <div className="ds-block-slots">{children}</div> : null}
    </section>
  );
}

export function BlockSlot({ children, className = "" }) {
  return <div className={`ds-block-slot ${className}`.trim()}>{children}</div>;
}

export default Block;
