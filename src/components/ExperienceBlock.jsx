import RoleText from "./RoleText";

function ExperienceBlock({
  year = "YEAR",
  company = "COMPANY",
  role = "UX/UI дизайнер",
  description = "DESCRIPTION",
  className = "",
}) {
  return (
    <article className={`experience-block ${className}`.trim()}>
      <div className="experience-block-row">
        <span className="experience-block-year text-body-main text-primary-text">{year}</span>
        <span className="experience-block-company text-body-main text-primary-text">
          {company}
        </span>
        <RoleText className="experience-block-role text-body-main text-primary-text">{role}</RoleText>
      </div>

      <p className="experience-block-description text-body-small text-technical-info">
        {description}
      </p>
    </article>
  );
}

export default ExperienceBlock;
