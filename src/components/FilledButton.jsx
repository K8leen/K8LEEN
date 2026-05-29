const tonesByState = {
  default: "bg-primary-accent text-surface",
  hover: "bg-primary-text text-surface",
};

function FilledButton({
  children = "BTN",
  state = "default",
  className = "",
  ...props
}) {
  const tone = tonesByState[state] ?? tonesByState.default;

  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-[4px] px-4 py-1 text-body-small ${tone} ${className}`.trim()}
      {...props}
    >
      <span className="text-body-small">{children}</span>
    </button>
  );
}

export default FilledButton;
