import { Link } from "react-router-dom";
import { typographIfString } from "../utils/typography";

function toSentenceCase(text) {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

const tonesByState = {
  default: {
    shell: "floating-shell floating-shell-accent",
    button: "bg-surface text-structure-text shadow-soft",
  },
  hover: {
    shell: "floating-shell floating-shell-accent",
    button: "bg-light-accent text-dark-accent shadow-soft",
  },
  disabled: {
    shell: "floating-shell floating-shell-muted",
    button: "bg-base-bg text-technical-line",
  },
};

function FloatingButton({
  children = "Btn",
  state,
  disabled = false,
  iconSrc,
  to,
  onClick,
  className = "",
  ...props
}) {
  const isInteractive = (Boolean(to) || onClick) && state === undefined;
  const isDisabled = disabled || state === "disabled";
  const tone = tonesByState[isDisabled ? "disabled" : (state ?? "default")];
  const shellClass = [tone.shell, className]
    .filter(Boolean)
    .join(" ");
  const showLabel = children != null && String(children).trim() !== "";

  const contentClass = [
    "floating-btn-content",
    showLabel ? "py-2 pl-2 pr-4 text-body-small" : "floating-btn-content--icon-only py-2 px-2",
    isInteractive && !isDisabled
      ? "bg-surface text-structure-text shadow-soft hover:bg-light-accent hover:text-dark-accent active:text-primary-accent"
      : tone.button,
  ]
    .filter(Boolean)
    .join(" ");

  const icon = iconSrc === "/icons/arrow-left.svg" ? (
    <svg
      className="floating-btn-icon"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M19 12H5M12 5L5 12L12 19"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : iconSrc ? (
    <img src={iconSrc} alt="" className="floating-btn-icon" aria-hidden="true" />
  ) : (
    <span aria-hidden="true" className="floating-icon-placeholder" />
  );

  const inner = showLabel ? (
    <>
      {icon}
      <span className="floating-btn-label">
        {typeof children === "string"
          ? typographIfString(toSentenceCase(children))
          : children}
      </span>
    </>
  ) : (
    icon
  );

  return (
    <div className={shellClass}>
      {to && !isDisabled ? (
        <Link to={to} className={contentClass} {...props}>
          {inner}
        </Link>
      ) : (
        <button
          type="button"
          disabled={isDisabled}
          className={contentClass}
          onClick={onClick}
          {...props}
        >
          {inner}
        </button>
      )}
    </div>
  );
}

export default FloatingButton;
