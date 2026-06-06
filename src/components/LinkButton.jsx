import { Link } from "react-router-dom";

const toneByVariant = {
  default: {
    default: "text-structure-text",
    hover: "text-dark-accent",
    pressed: "text-primary-accent",
    disabled: "text-technical-line",
  },
  inline: {
    default: "text-primary-accent",
    hover: "text-dark-accent",
    pressed: "text-technical-info",
    disabled: "text-technical-line",
  },
  jump: {
    default: "text-structure-text",
    hover: "text-dark-accent",
    pressed: "text-primary-accent",
    disabled: "text-technical-line",
  },
};

function LinkContent({ variant, children }) {
  if (variant === "jump") {
    return (
      <span className="follow-link-shell">
        <span className="link-btn-text follow-link-text">{children}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 17 17"
          className="follow-link-icon"
          fill="none"
          shapeRendering="geometricPrecision"
        >
          <path
            d="M0.5 16.5L16 1M11 1H16V6"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </span>
    );
  }

  return <span className="link-btn-text">{children}</span>;
}

function LinkButton({
  children,
  variant = "default",
  state,
  active = false,
  href,
  to,
  disabled = false,
  type: buttonType = "button",
  download,
  target,
  rel,
  className = "",
  ...props
}) {
  const isDisabled = disabled || state === "disabled";
  const isStaticPreview = state !== undefined;
  const content = <LinkContent variant={variant}>{children}</LinkContent>;
  const pressedClass = active && !isDisabled ? "link-btn--pressed" : "";

  if (isStaticPreview) {
    const colorClass = toneByVariant[variant][isDisabled ? "disabled" : state];
    const baseClass =
      `link-btn-base ${colorClass} ${isDisabled ? "link-btn-disabled" : ""} ${className}`.trim();

    return (
      <button type={buttonType} className={baseClass} disabled={isDisabled} {...props}>
        {content}
      </button>
    );
  }

  const interactiveClass =
    `link-btn-base link-btn--${variant} ${pressedClass} ${isDisabled ? "link-btn-disabled" : ""} ${className}`.trim();

  if (to) {
    return (
      <Link
        to={to}
        className={interactiveClass}
        aria-current={active ? "page" : undefined}
        aria-disabled={isDisabled}
        {...props}
      >
        {content}
      </Link>
    );
  }

  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    const isMailto = href.startsWith("mailto:");

    return (
      <a
        href={isDisabled ? undefined : href}
        className={interactiveClass}
        download={download}
        target={target ?? (isExternal ? "_blank" : undefined)}
        rel={rel ?? (isExternal ? "noopener noreferrer" : undefined)}
        aria-disabled={isDisabled}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={buttonType}
      className={interactiveClass}
      disabled={isDisabled}
      aria-current={active ? "page" : undefined}
      {...props}
    >
      {content}
    </button>
  );
}

export default LinkButton;
