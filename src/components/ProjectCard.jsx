import FloatingButton from "./FloatingButton";
import LinkButton from "./LinkButton";
import DeferredImage from "./DeferredImage";
import RoleText from "./RoleText";
import Tag from "./Tag";

function normalizeTag(tag) {
  if (typeof tag === "object" && tag !== null) {
    return { label: tag.label, tone: tag.tone ?? "nda" };
  }
  return { label: tag, tone: "nda" };
}

function ProjectCardTags({ tags, className }) {
  return (
    <div className={className}>
      {tags.map((tag, index) => {
        const { label, tone } = normalizeTag(tag);
        return (
          <Tag key={`${label}-${index}`} tone={tone}>
            {label}
          </Tag>
        );
      })}
    </div>
  );
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
  detailTo,
  showDetailLink = true,
  className = "",
}) {
  const normalizedTags = tags.map(normalizeTag);

  return (
    <article className={`project-card ${className}`.trim()}>
      <div className="project-card__layout project-card__layout--desktop">
        <DeferredImage src={imageSrc} alt={imageAlt} className="project-card-visual" />

        <div className="project-card-divider" aria-hidden="true" />

        <div className="project-card-info">
          <div className="project-card-topline">
            <ProjectCardTags tags={normalizedTags} className="project-card-tags" />
            {showDetailLink ? (
              <LinkButton variant="jump" to={detailTo} state={detailTo ? undefined : "default"}>
                {linkLabel}
              </LinkButton>
            ) : null}
          </div>

          <h3 className="project-card-title">
            <LinkButton
              variant="default"
              to={detailTo}
              state={detailTo ? undefined : "default"}
            >
              {title}
            </LinkButton>
          </h3>

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
      </div>

      <div className="project-card__layout project-card__layout--mobile">
        <div className="project-card-mobile__header">
          <h3 className="project-card-mobile__title">
            <LinkButton
              variant="default"
              to={detailTo}
              state={detailTo ? undefined : "default"}
            >
              {title}
            </LinkButton>
          </h3>
          {showDetailLink ? (
            <FloatingButton
              iconSrc="/icons/maximize-01.svg"
              to={detailTo}
              state={detailTo ? undefined : "default"}
              className="project-card-mobile__maximize"
              aria-label="Максимизировать"
            >
              {""}
            </FloatingButton>
          ) : null}
        </div>

        <div className="project-card-mobile__body">
          <DeferredImage
            src={imageSrc}
            alt={imageAlt}
            className="project-card-mobile__visual"
          />

          <div className="project-card-mobile__divider" aria-hidden="true" />

          <div className="project-card-mobile__aside">
            <ProjectCardTags tags={normalizedTags} className="project-card-mobile__tags" />
            <div className="project-card-mobile__role">
              <div className="project-card-mobile__role-copy">
                <p className="text-body-small text-technical-info">{roleLabel}</p>
                <p className="text-body-small text-structure-text">
                  <RoleText>{roleValue}</RoleText>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="project-card-mobile__result">
          <p className="text-body-small text-technical-info">{resultLabel}</p>
          <p className="text-body-small text-structure-text">{resultValue}</p>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
