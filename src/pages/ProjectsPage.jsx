import Block, { BlockSlot } from "../components/Block";
import Headline from "../components/Headline";
import ProjectCard from "../components/ProjectCard";
import SiteLayout from "../components/SiteLayout";
import TextBlock from "../components/TextBlock";
import {
  projectsPageHeadline,
  projectsPagePrinciples,
  projectsPageProjects,
  projectsPageScopeClosing,
  projectsPageScopeListItems,
  projectsPageScopeListTitle,
  projectsPageTypicalTasksListItems,
  projectsPageAfterProjectIntro,
  projectsPageAfterProjectListItems,
  projectsPageAfterProjectListTitle,
} from "../data/projectsPage";

function ProjectsPage() {
  return (
    <SiteLayout>
      <main className="projects-page">
        <Headline
          header={projectsPageHeadline.header}
          subheader={projectsPageHeadline.subheader}
        />

        <div className="projects-page-block-row">
          <div className="projects-page-col-left">
            <Block title="SEC-01_Принципы" borders={{ bottom: true, right: true }}>
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

            <Block title="SEC-02_Область применения" borders={{ bottom: true, right: true }}>
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

            <Block title="SEC-03_Типовые задачи" borders={{ bottom: true, right: true }}>
              <BlockSlot>
                <TextBlock variant="list" listItems={projectsPageTypicalTasksListItems} />
              </BlockSlot>
            </Block>

            <Block
              className="projects-block--after-project"
              title="SEC-04_Что остается после проекта"
              borders={{ bottom: true, right: true }}
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
          </div>

          <Block
            className="projects-block--list"
            title="SEC-05_Проекты"
            borders={{ bottom: true, left: true }}
          >
            {projectsPageProjects.map((project) => (
              <BlockSlot key={project.imageSrc}>
                <ProjectCard {...project} />
              </BlockSlot>
            ))}
          </Block>
        </div>
      </main>
    </SiteLayout>
  );
}

export default ProjectsPage;
