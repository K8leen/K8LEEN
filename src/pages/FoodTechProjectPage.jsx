import { useRef } from "react";
import Block, { BlockSlot } from "../components/Block";
import Headline from "../components/Headline";
import ProjectCaseBackButton from "../components/ProjectCaseBackButton";
import ProjectCaseTopRow from "../components/ProjectCaseTopRow";
import SiteLayout from "../components/SiteLayout";
import TextBlock from "../components/TextBlock";
import {
  foodTechProjectApproachLists,
  foodTechProjectArchitectureClientPlain,
  foodTechProjectArchitectureRestaurantPlain,
  foodTechProjectContextIdeaDescription,
  foodTechProjectContextListItems,
  foodTechProjectContextListTitle,
  foodTechProjectContextPlain,
  foodTechProjectContextRoleDescription,
  foodTechProjectHeadline,
  foodTechProjectImages,
  foodTechProjectIntegrationLines,
  foodTechProjectInterfaceSystemPlain,
  foodTechProjectPrinciplesListItems,
  foodTechProjectPrinciplesListTitle,
  foodTechProjectProblemPlain,
  foodTechProjectResultLines,
  foodTechProjectSummaryLines,
  foodTechProjectTaskListItems,
  foodTechProjectTaskListTitle,
} from "../data/foodTechProjectPage";

function TextStack({ lines }) {
  return (
    <div className="stack">
      {lines.map((line) => (
        <TextBlock key={line} variant="plain" text={line} />
      ))}
    </div>
  );
}

function FoodTechProjectPage() {
  const headlineAnchorRef = useRef(null);

  return (
    <SiteLayout>
      <ProjectCaseBackButton alignRef={headlineAnchorRef} />
      <main className="project-case-page">
        <div ref={headlineAnchorRef} className="project-case-headline-anchor">
          <Headline
            header={foodTechProjectHeadline.header}
            subheader={foodTechProjectHeadline.subheader}
          />
        </div>

        <ProjectCaseTopRow
          rowHeight="sec00"
          rowClassName="project-case-row--food-tech-top"
          sec00={
            <Block
              className="project-case-block--800 project-case-block--with-visual h-full"
              title="SEC-00_Результат"
              borders={{ bottom: true, right: true }}
            >
              <BlockSlot>
                <TextStack lines={foodTechProjectResultLines} />
              </BlockSlot>
              <BlockSlot className="project-case-result-visual-slot">
                <img
                  src={foodTechProjectImages.result.src}
                  alt={foodTechProjectImages.result.alt}
                  className="project-case-result-visual"
                  onLoad={() => window.dispatchEvent(new Event("resize"))}
                />
              </BlockSlot>
            </Block>
          }
          sec01={
            <Block
              className="project-case-block--400"
              title="SEC-01_Контекст"
              borders={{ bottom: true, left: true }}
            >
              <BlockSlot>
                <div className="stack">
                  <TextBlock variant="plain" text={foodTechProjectContextPlain} />
                  <TextBlock
                    variant="list"
                    title={foodTechProjectContextListTitle}
                    listItems={foodTechProjectContextListItems}
                  />
                  <TextBlock
                    variant="description"
                    title={foodTechProjectContextIdeaDescription.title}
                    description={foodTechProjectContextIdeaDescription.description}
                  />
                  <TextBlock
                    variant="description"
                    title={foodTechProjectContextRoleDescription.title}
                    description={foodTechProjectContextRoleDescription.description}
                  />
                </div>
              </BlockSlot>
            </Block>
          }
          sec02={
            <Block
              className="project-case-block--400"
              title="SEC-02_Проблема"
              borders={{ bottom: true, left: true }}
            >
              <BlockSlot>
                <TextBlock variant="plain" text={foodTechProjectProblemPlain} />
              </BlockSlot>
            </Block>
          }
          sec03={
            <Block
              className="project-case-block--400 project-case-block--grow h-full"
              title="SEC-03_Задача"
              borders={{ bottom: true, left: true }}
            >
              <BlockSlot>
                <TextBlock
                  variant="list"
                  title={foodTechProjectTaskListTitle}
                  listItems={foodTechProjectTaskListItems}
                />
              </BlockSlot>
            </Block>
          }
        />

        <Block
          className="project-case-block--1200"
          title="SEC-04_Подход"
          borders={{ bottom: true }}
        >
          <BlockSlot>
            <div className="project-case-approach-row">
              {foodTechProjectApproachLists.map((block) => (
                <TextBlock
                  key={block.title}
                  className="project-case-approach-list project-case-approach-list--260"
                  variant="list"
                  title={block.title}
                  listItems={block.listItems}
                />
              ))}
            </div>
          </BlockSlot>
        </Block>

        <Block
          className="project-case-block--1200 project-case-architecture-block project-case-architecture-block--760-380"
          title="SEC-05_Архитектура решения"
          borders={{ bottom: true }}
        >
          <BlockSlot>
            <div className="project-case-architecture-row project-case-architecture-row--760-380">
              <div className="project-case-architecture-slot-main project-case-architecture-slot-main--760">
                <div className="stack">
                  <TextBlock
                    className="project-case-plain--440"
                    variant="plain"
                    text={foodTechProjectArchitectureClientPlain}
                  />
                  <img
                    src={foodTechProjectImages.architectureClient.src}
                    alt={foodTechProjectImages.architectureClient.alt}
                    className="block h-auto w-full"
                  />
                </div>
              </div>

              <div className="project-case-architecture-slot-side project-case-architecture-slot-side--380">
                <div className="stack">
                  <TextBlock variant="plain" text={foodTechProjectArchitectureRestaurantPlain} />
                  <img
                    src={foodTechProjectImages.architectureRestaurant.src}
                    alt={foodTechProjectImages.architectureRestaurant.alt}
                    className="block h-auto w-full"
                  />
                </div>
              </div>
            </div>
          </BlockSlot>
        </Block>

        <Block
          className="project-case-block--1200"
          title="SEC-06_Система интерфейса"
          borders={{ bottom: true }}
        >
          <BlockSlot>
            <TextBlock
              className="project-case-plain--800"
              variant="plain"
              text={foodTechProjectInterfaceSystemPlain}
            />
          </BlockSlot>
          <BlockSlot>
            <img
              src={foodTechProjectImages.interfaceSystem.src}
              alt={foodTechProjectImages.interfaceSystem.alt}
              className="block h-auto w-full"
            />
          </BlockSlot>
        </Block>

        <div className="project-case-row project-case-row--triple">
          <Block
            className="project-case-block--400 h-full"
            title="SEC-07_Основные принципы решения"
            borders={{ bottom: true, right: true }}
          >
            <BlockSlot>
              <TextBlock
                variant="list"
                title={foodTechProjectPrinciplesListTitle}
                listItems={foodTechProjectPrinciplesListItems}
              />
            </BlockSlot>
          </Block>

          <Block
            className="project-case-block--400 h-full"
            title="SEC-08_Взаимодействие с разработкой"
            borders={{ bottom: true, left: true, right: true }}
          >
            <BlockSlot>
              <TextStack lines={foodTechProjectIntegrationLines} />
            </BlockSlot>
          </Block>

          <Block
            className="project-case-block--400 h-full"
            title="SEC-09_Итог"
            borders={{ bottom: true, left: true }}
          >
            <BlockSlot>
              <TextStack lines={foodTechProjectSummaryLines} />
            </BlockSlot>
          </Block>
        </div>
      </main>
    </SiteLayout>
  );
}

export default FoodTechProjectPage;
