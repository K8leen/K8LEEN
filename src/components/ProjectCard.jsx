import LinkButton from "./LinkButton";
import RoleText from "./RoleText";
import Tag from "./Tag";

function normalizeTag(tag) {
  if (typeof tag === "object" && tag !== null) {
    return { label: tag.label, tone: tag.tone ?? "nda" };
  }
  return { label: tag, tone: "nda" };
}

function ProjectCard({
  imageSrc = "/img/pattern.svg",
  imageAlt = "Project illustration",
  tags = ["NDA", "NDA"],
  title = "TITLE",
  roleLabel = "Роль",
  roleValue = "UX/UI дизайнер",
  resultLabel = "КЛЮЧЕВОЙ РЕЗУЛЬТАТ",
  resultValue = "DESCRIPTION",
  linkLabel = "Подробнее",
  className = "",
}) {
  return (
    <article className={`project-card ${className}`.trim()}>
      <img src={imageSrc} alt={imageAlt} className="project-card-visual" />

      <div className="project-card-divider" aria-hidden="true" />

      <div className="project-card-info">
        <div className="project-card-topline">
          <div className="project-card-tags">
            {tags.map((tag, index) => {
              const { label, tone } = normalizeTag(tag);
              return (
                <Tag key={`${label}-${index}`} tone={tone}>
                  {label}
                </Tag>
              );
            })}
          </div>
          <LinkButton variant="jump" state="default">
            {linkLabel}
          </LinkButton>
        </div>

        <h3 className="project-card-title text-body-main text-primary-text">{title}</h3>

        <dl className="project-card-meta">
          <div className="project-card-meta-row">
            <dt className="text-body-small text-technical-info project-card-meta-key">
              {roleLabel}
            </dt>
            <dd className="text-body-small text-structure-text">
              <RoleText>{roleValue}</RoleText>
            </dd>
          </div>

          <div className="project-card-meta-row">
            <dt className="text-body-small text-technical-info project-card-meta-key">
              {resultLabel}
            </dt>
            <dd className="text-body-small text-structure-text">{resultValue}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

export default ProjectCard;
