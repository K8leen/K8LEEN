import Block, { BlockSlot } from "./Block";
import TextBlock from "./TextBlock";
import {
  projectsPagePrinciples,
  projectsPageScopeClosing,
  projectsPageScopeListItems,
  projectsPageScopeListTitle,
  projectsPageTypicalTasksListItems,
  projectsPageAfterProjectIntro,
  projectsPageAfterProjectListItems,
  projectsPageAfterProjectListTitle,
} from "../data/projectsPage";

function ProjectsApproachBlocks({ variant = "desktop" }) {
  const isDesktop = variant === "desktop";
  const desktopBorders = { bottom: true, right: true };
  const tabletSectionBorders = { bottom: true };

  return (
    <>
      <Block
        title="SEC-01_Принципы"
        borders={isDesktop ? desktopBorders : tabletSectionBorders}
      >
        <BlockSlot>
          <div className="stack">
            {projectsPagePrinciples.map((paragraph, index) => (
              <TextBlock
                key={paragraph}
                variant="plain"
                text={paragraph}
                textTone={index === 2 ? "technical-info" : "primary"}
              />
            ))}
          </div>
        </BlockSlot>
      </Block>

      <Block
        title="SEC-02_Область применения"
        borders={isDesktop ? desktopBorders : tabletSectionBorders}
      >
        <BlockSlot>
          <div className="stack">
            <TextBlock
              variant="list"
              title={projectsPageScopeListTitle}
              listItems={projectsPageScopeListItems}
            />
            <TextBlock variant="plain" text={projectsPageScopeClosing} />
          </div>
        </BlockSlot>
      </Block>

      <Block
        title="SEC-03_Типовые задачи"
        borders={isDesktop ? desktopBorders : tabletSectionBorders}
      >
        <BlockSlot>
          <TextBlock variant="list" listItems={projectsPageTypicalTasksListItems} />
        </BlockSlot>
      </Block>

      <Block
        className={isDesktop ? "projects-block--after-project" : undefined}
        title="SEC-04_Что остается после проекта"
        borders={isDesktop ? desktopBorders : {}}
      >
        <BlockSlot>
          <TextBlock variant="plain" text={projectsPageAfterProjectIntro} />
        </BlockSlot>
        <BlockSlot>
          <TextBlock
            variant="list"
            title={projectsPageAfterProjectListTitle}
            listItems={projectsPageAfterProjectListItems}
          />
        </BlockSlot>
      </Block>
    </>
  );
}

export default ProjectsApproachBlocks;
