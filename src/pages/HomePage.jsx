import Block, { BlockSlot } from "../components/Block";
import HomeTopRow from "../components/HomeTopRow";
import ExperienceStack from "../components/ExperienceStack";
import Headline from "../components/Headline";
import ProjectCard from "../components/ProjectCard";
import SiteLayout from "../components/SiteLayout";
import { homeExperienceItems } from "../data/homeExperience";
import { homeProjects } from "../data/homeProjects";
import { homeSkillsAccordionItems } from "../data/homeSkills";

function HomePage() {
  return (
    <SiteLayout>
      <main className="home-page">
        <Headline
          header="PRODUCT DESIGNER"
          subheader="Проектирую сложные системы, опираясь на логику и психологию"
        />

        <div className="flex flex-col">
          <HomeTopRow skillsItems={homeSkillsAccordionItems} />

          <div className="home-page-block-row home-page-block-row--bottom">
            <Block title="SEC-03_Опыт" borders={{ bottom: true, right: true }}>
              <BlockSlot>
                <ExperienceStack items={homeExperienceItems} />
              </BlockSlot>
            </Block>

            <Block
              className="home-block--projects"
              title="SEC-04_Проекты"
              linkLabel="Посмотреть все"
              borders={{ bottom: true, left: true }}
            >
              {homeProjects.map((project) => (
                <BlockSlot key={project.imageSrc}>
                  <ProjectCard {...project} />
                </BlockSlot>
              ))}
            </Block>
          </div>
        </div>
      </main>
    </SiteLayout>
  );
}

export default HomePage;
