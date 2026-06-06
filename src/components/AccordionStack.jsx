import { Fragment, useState } from "react";
import AccordionItem from "./AccordionItem";

function AccordionStack({ items = [], defaultOpenIndex = 0, className = "" }) {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex);

  return (
    <div className={`stack accordion-stack ${className}`.trim()}>
      {items.map((item, index) => (
        <Fragment key={`${item.label}-${index}`}>
          {index > 0 ? <div className="accordion-stack-divider" aria-hidden="true" /> : null}
          <AccordionItem
            label={item.label}
            lines={item.lines}
            open={openIndex === index}
            onToggle={() => setOpenIndex((current) => (current === index ? -1 : index))}
          />
        </Fragment>
      ))}
    </div>
  );
}

export default AccordionStack;
