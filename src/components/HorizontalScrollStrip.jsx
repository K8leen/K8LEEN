function HorizontalScrollStrip({
  children,
  className = "",
  ariaLabel = "Горизонтальная прокрутка",
}) {
  return (
    <div
      className={`horizontal-scroll-strip ${className}`.trim()}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

export default HorizontalScrollStrip;
