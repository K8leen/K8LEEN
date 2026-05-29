import ExperienceBlock from "./ExperienceBlock";

function ExperienceStack({ items = [], className = "" }) {
  return (
    <div className={`experience-stack ${className}`.trim()}>
      {items.map((item, index) => (
        <ExperienceBlock
          key={`${item.year}-${item.company}-${index}`}
          year={item.year}
          company={item.company}
          role={item.role}
          description={item.description}
        />
      ))}
    </div>
  );
}

export default ExperienceStack;
