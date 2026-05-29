import { useState } from "react";

function AccordionItem({
  label = "LABEL",
  lines = [],
  isOpen = false,
  open: controlledOpen,
  onToggle,
  className = "",
}) {
  const [internalOpen, setInternalOpen] = useState(isOpen);
  const open = controlledOpen ?? internalOpen;
  const iconSrc = open ? "/icons/minus.svg" : "/icons/plus.svg";
  const iconAlt = open ? "collapse accordion item" : "expand accordion item";

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
      return;
    }
    setInternalOpen((value) => !value);
  };

  return (
    <article className={`accordion-item ${className}`.trim()}>
      <button
        type="button"
        className="flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent p-0 text-left"
        onClick={handleToggle}
        aria-expanded={open}
      >
        <h3 className="text-body-main text-primary-text">{label}</h3>
        <img src={iconSrc} alt={iconAlt} className="h-7 w-7 shrink-0" />
      </button>

      {lines.length > 0 && (
        <div className={`accordion-panel ${open ? "is-open" : ""}`}>
          <div className="accordion-panel-inner">
            {lines.map((line, index) => (
              <p key={`${line}-${index}`} className="text-body-small text-technical-info">
                {line}
              </p>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

export default AccordionItem;
