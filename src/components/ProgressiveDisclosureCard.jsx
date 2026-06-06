import { useState } from "react";

function ProgressiveDisclosureCard({
  title = "HEADLINE",
  showTitle = true,
  defaultOpen = false,
  open: controlledOpen,
  onToggle,
  children,
  className = "",
}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;
  const iconSrc = open ? "/icons/minimize-01.svg" : "/icons/maximize-01.svg";
  const iconAlt = open ? "Свернуть" : "Развернуть";
  const hasTitle = showTitle && String(title ?? "").trim() !== "";

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
      return;
    }
    setInternalOpen((value) => !value);
  };

  return (
    <article
      className={`pdc-card floating-shell floating-shell-accent ${open ? "pdc-card--open" : ""} ${className}`.trim()}
    >
      <div className="pdc-card-surface shadow-soft">
        <button
          type="button"
          className={`pdc-card-header ${hasTitle ? "" : "pdc-card-header--icon-only"}`.trim()}
          onClick={handleToggle}
          aria-expanded={open}
          aria-label={hasTitle ? undefined : iconAlt}
        >
          {hasTitle ? (
            <h2
              className={`pdc-card-title text-block ${open ? "text-technical-info" : "text-structure-text"}`}
            >
              {title}
            </h2>
          ) : null}
          <img
            src={iconSrc}
            alt={hasTitle ? iconAlt : ""}
            className="pdc-card-toggle-icon"
            width={24}
            height={24}
            aria-hidden={hasTitle ? undefined : true}
          />
        </button>

        {children ? (
          <div className={`pdc-card-panel ${open ? "is-open" : ""}`}>
            <div className="pdc-card-panel-inner">
              <div className="pdc-card-body stack">{children}</div>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default ProgressiveDisclosureCard;
