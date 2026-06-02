const tonesByState = {
  default: "bg-primary-accent text-surface",
  hover: "bg-primary-text text-surface",
};

function FilledButton({
  children = "BTN",
  state,
  className = "",
  ...props
}) {
  const isStaticPreview = state !== undefined;
  const tone = isStaticPreview
    ? (tonesByState[state] ?? tonesByState.default)
    : "bg-primary-accent text-surface transition-colors duration-150 hover:bg-primary-text disabled:bg-technical-line";

  return (
    <button
      type="button"
      className={`inline-flex cursor-pointer items-center justify-center rounded-[4px] px-4 py-1 text-body-small disabled:cursor-not-allowed ${tone} ${className}`.trim()}
      {...props}
    >
      <span className="text-body-small">{children}</span>
    </button>
  );
}

export default FilledButton;
