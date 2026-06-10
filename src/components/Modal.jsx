import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { typograph } from "../utils/typography";

function Modal({
  open = true,
  title = "title",
  text = "text",
  onClose,
  overlay = false,
  className = "",
}) {
  const titleId = useId();
  useEffect(() => {
    if (!overlay || !open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open, overlay]);

  if (!open) return null;

  const dialog = (
    <div
      className={`modal-shell cookie-hatch-bg ${className}`.trim()}
      role="dialog"
      aria-modal={overlay ? "true" : undefined}
      aria-labelledby={titleId}
    >
      <div className="modal-content shadow-soft">
        <div className="modal-header">
          <h2 id={titleId} className="modal-title text-tech text-primary-text">
            {typograph(title)}
          </h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Закрыть"
          >
            <img
              src="/icons/x-close.svg"
              alt=""
              className="modal-close-icon"
              width={18}
              height={18}
            />
          </button>
        </div>
        {text ? (
          <p className="modal-text text-tech text-technical-info">{typograph(text)}</p>
        ) : null}
      </div>
    </div>
  );

  if (!overlay) return dialog;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-overlay-inner" onClick={(event) => event.stopPropagation()}>
        {dialog}
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
