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
  children = "BTN",
  state = "default",
  disabled = false,
  className = "",
  ...props
}) {
  const isDisabled = disabled || state === "disabled";
  const tone = tonesByState[isDisabled ? "disabled" : state];

  return (
    <div className={`${tone.shell} ${className}`.trim()}>
      <button
        type="button"
        disabled={isDisabled}
        className={`floating-btn-content py-2 pl-2 pr-4 text-body-small ${tone.button}`.trim()}
        {...props}
      >
        <span aria-hidden="true" className="floating-icon-placeholder" />
        <span className="floating-btn-label">{children}</span>
      </button>
    </div>
  );
}

export default FloatingButton;
