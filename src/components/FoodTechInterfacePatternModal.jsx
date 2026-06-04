import {
  formatModalText,
  formatTextBlockListTitle,
  typograph,
} from "../utils/typography";

function FoodTechInterfacePatternModal({ modal }) {
  if (!modal) return null;

  return (
    <div className="modal-shell cookie-hatch-bg food-tech-interface-pattern-modal">
      <div className="modal-content shadow-soft">
        <div className="food-tech-interface-pattern-modal__sections stack">
          {modal.sections.map((section) => (
            <section key={section.heading} className="food-tech-interface-pattern-modal__section">
              <h3 className="food-tech-interface-pattern-modal__heading text-tech text-primary-text">
                {formatTextBlockListTitle(section.heading)}
              </h3>
              {section.body ? (
                <p className="food-tech-interface-pattern-modal__text text-tech text-technical-info">
                  {formatModalText(section.body)}
                </p>
              ) : null}
              {section.list ? (
                <ul className="food-tech-interface-pattern-modal__list text-tech text-technical-info">
                  {section.list.map((item) => (
                    <li key={item}>{typograph(item)}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FoodTechInterfacePatternModal;
