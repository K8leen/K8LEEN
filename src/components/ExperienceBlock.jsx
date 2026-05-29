function ExperienceBlock({
  year = "YEAR",
  company = "COMPANY",
  role = "ROLE",
  description = "DESCRIPTION",
  className = "",
}) {
  return (
    <article className={`experience-block ${className}`.trim()}>
      <div className="experience-block-row">
        <span className="experience-block-year text-body-main text-structure-text">{year}</span>
        <span className="experience-block-company text-body-main text-structure-text">
          {company}
        </span>
        <span className="experience-block-role text-body-main text-structure-text">{role}</span>
      </div>

      <p className="experience-block-description text-body-small text-technical-info">
        {description}
      </p>
    </article>
  );
}

export default ExperienceBlock;
