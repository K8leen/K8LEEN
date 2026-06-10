function ProjectCaseResultCalloutModal({ labelSvg }) {
  if (!labelSvg) return null;

  return (
    <div className="modal-shell cookie-hatch-bg project-case-result-callout-modal">
      <div className="modal-content shadow-soft project-case-result-callout-modal__content">
        <div
          className="project-case-result-callout-modal__label"
          dangerouslySetInnerHTML={{ __html: labelSvg }}
        />
      </div>
    </div>
  );
}

export default ProjectCaseResultCalloutModal;
