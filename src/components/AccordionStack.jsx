import { useState } from "react";
import AccordionItem from "./AccordionItem";

function AccordionStack({ items = [], defaultOpenIndex = 0, className = "" }) {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex);

  return (
    <div className={`flex flex-col gap-3 ${className}`.trim()}>
      {items.map((item, index) => (
        <AccordionItem
          key={`${item.label}-${index}`}
          label={item.label}
          lines={item.lines}
          open={openIndex === index}
          onToggle={() => setOpenIndex((current) => (current === index ? -1 : index))}
        />
      ))}
    </div>
  );
}

export default AccordionStack;
