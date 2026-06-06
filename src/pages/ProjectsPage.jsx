import Block, { BlockSlot } from "../components/Block";
import Headline from "../components/Headline";
import ProgressiveDisclosureCard from "../components/ProgressiveDisclosureCard";
import ProjectCard from "../components/ProjectCard";
import ProjectsApproachBlocks from "../components/ProjectsApproachBlocks";
import SiteLayout from "../components/SiteLayout";
import { projectsPageHeadline, projectsPageProjects } from "../data/projectsPage";

function ProjectsPage() {
  return (
    <SiteLayout>
      <main className="projects-page">
        <Headline
          header={projectsPageHeadline.header}
          subheader={projectsPageHeadline.subheader}
        />

        <div className="projects-page-block-row projects-page-block-row--desktop">
          <div className="projects-page-col-left">
            <ProjectsApproachBlocks variant="desktop" />
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

        <div className="projects-page-tablet">
          <ProgressiveDisclosureCard title="SEC-01...04_Мой подход">
            <ProjectsApproachBlocks variant="tablet" />
          </ProgressiveDisclosureCard>

          <Block
            className="projects-block--list"
            title="SEC-05_Проекты"
            borders={{ bottom: true }}
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
