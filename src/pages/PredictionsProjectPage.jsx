import { useRef } from "react";
import Block, { BlockSlot } from "../components/Block";
import Headline from "../components/Headline";
import ProjectCaseBackButton from "../components/ProjectCaseBackButton";
import PredictionsInterfaceSystemDiagram from "../components/PredictionsInterfaceSystemDiagram";
import ProjectCaseTopRow from "../components/ProjectCaseTopRow";
import SiteLayout from "../components/SiteLayout";
import TextBlock from "../components/TextBlock";
import {
  predictionsProjectApproachDesign,
  predictionsProjectApproachResearch,
  predictionsProjectApproachStructuring,
  predictionsProjectArchitecturePlain,
  predictionsProjectArchitecturePrinciplesDescriptions,
  predictionsProjectArchitecturePrinciplesTitle,
  predictionsProjectContextDescription,
  predictionsProjectContextListItems,
  predictionsProjectContextListTitle,
  predictionsProjectContextPlain,
  predictionsProjectHeadline,
  predictionsProjectImages,
  predictionsProjectIntegrationLines,
  predictionsProjectInterfaceSystemPlain,
  predictionsProjectProblemListPrimaryItems,
  predictionsProjectProblemListPrimaryTitle,
  predictionsProjectProblemListSecondaryItems,
  predictionsProjectProblemListSecondaryTitle,
  predictionsProjectResultLines,
  predictionsProjectSummaryListItems,
  predictionsProjectSummaryListTitle,
  predictionsProjectTaskDescription,
  predictionsProjectTaskListItems,
  predictionsProjectTaskListTitle,
  predictionsProjectVisualSystemLines,
} from "../data/predictionsProjectPage";

function TextStack({ lines }) {
  return (
    <div className="stack">
      {lines.map((line) => (
        <TextBlock key={line} variant="plain" text={line} />
      ))}
    </div>
  );
}

function PredictionsProjectPage() {
  const headlineAnchorRef = useRef(null);

  return (
    <SiteLayout>
      <ProjectCaseBackButton alignRef={headlineAnchorRef} />
      <main className="project-case-page">
        <div ref={headlineAnchorRef} className="project-case-headline-anchor">
          <Headline
            header={predictionsProjectHeadline.header}
            subheader={predictionsProjectHeadline.subheader}
          />
        </div>

        <ProjectCaseTopRow
          rowHeight="column"
          sec00={
            <Block
              className="project-case-block--800 h-full"
              title="SEC-00_Результат"
              borders={{ bottom: true, right: true }}
            >
              <BlockSlot>
                <TextStack lines={predictionsProjectResultLines} />
              </BlockSlot>
              <BlockSlot>
                <img
                  src={predictionsProjectImages.result.src}
                  alt={predictionsProjectImages.result.alt}
                  className="block h-auto w-full"
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
                  <TextBlock variant="plain" text={predictionsProjectContextPlain} />
                  <TextBlock
                    variant="list"
                    title={predictionsProjectContextListTitle}
                    listItems={predictionsProjectContextListItems}
                  />
                  <TextBlock
                    variant="description"
                    title={predictionsProjectContextDescription.title}
                    description={predictionsProjectContextDescription.description}
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
                <div className="stack">
                  <TextBlock
                    variant="list"
                    title={predictionsProjectProblemListPrimaryTitle}
                    listItems={predictionsProjectProblemListPrimaryItems}
                  />
                  <TextBlock
                    variant="list"
                    title={predictionsProjectProblemListSecondaryTitle}
                    listItems={predictionsProjectProblemListSecondaryItems}
                  />
                </div>
              </BlockSlot>
            </Block>
          }
          sec03={
            <Block
              className="project-case-block--400"
              title="SEC-03_Задача"
              borders={{ bottom: true, left: true }}
            >
              <BlockSlot>
                <TextBlock
                  variant="list"
                  title={predictionsProjectTaskListTitle}
                  listItems={predictionsProjectTaskListItems}
                />
              </BlockSlot>
              <BlockSlot>
                <TextBlock
                  variant="description"
                  title={predictionsProjectTaskDescription.title}
                  description={predictionsProjectTaskDescription.description}
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
              <TextBlock
                className="project-case-approach-list"
                variant="description"
                title={predictionsProjectApproachResearch.title}
                description={predictionsProjectApproachResearch.description}
              />
              <TextBlock
                className="project-case-approach-list"
                variant="list"
                title={predictionsProjectApproachStructuring.title}
                listItems={predictionsProjectApproachStructuring.listItems}
              />
              <TextBlock
                className="project-case-approach-list"
                variant="list"
                title={predictionsProjectApproachDesign.title}
                listItems={predictionsProjectApproachDesign.listItems}
              />
            </div>
          </BlockSlot>
        </Block>

        <Block
          className="project-case-block--1200 project-case-architecture-block"
          title="SEC-05_Архитектура решения"
          borders={{ bottom: true }}
        >
          <BlockSlot>
            <div className="project-case-architecture-row">
              <div className="project-case-architecture-slot-main">
                <div className="stack">
                  <TextBlock variant="plain" text={predictionsProjectArchitecturePlain} />
                  <img
                    src={predictionsProjectImages.architecture.src}
                    alt={predictionsProjectImages.architecture.alt}
                    className="block h-auto w-full"
                  />
                </div>
              </div>

              <div className="project-case-architecture-slot-side">
                <h3 className="text-body-main text-structure-text">
                  {predictionsProjectArchitecturePrinciplesTitle}
                </h3>
                <div className="project-case-architecture-principles">
                  {predictionsProjectArchitecturePrinciplesDescriptions.map((item) => (
                    <TextBlock
                      key={item.title}
                      variant="description"
                      title={item.title}
                      description={item.description}
                    />
                  ))}
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
            <TextBlock variant="plain" text={predictionsProjectInterfaceSystemPlain} />
          </BlockSlot>
          <BlockSlot>
            <PredictionsInterfaceSystemDiagram />
          </BlockSlot>
        </Block>

        <div className="project-case-row project-case-row--triple">
          <Block
            className="project-case-block--400 h-full"
            title="SEC-07_Визуальная система"
            borders={{ bottom: true, right: true }}
          >
            <BlockSlot>
              <TextStack lines={predictionsProjectVisualSystemLines} />
            </BlockSlot>
          </Block>

          <Block
            className="project-case-block--400 h-full"
            title="SEC-08_Интеграция с разработкой"
            borders={{ bottom: true, left: true, right: true }}
          >
            <BlockSlot>
              <TextStack lines={predictionsProjectIntegrationLines} />
            </BlockSlot>
          </Block>

          <Block
            className="project-case-block--400 h-full"
            title="SEC-09_Итог"
            borders={{ bottom: true, left: true }}
          >
            <BlockSlot>
              <TextBlock
                variant="list"
                title={predictionsProjectSummaryListTitle}
                listItems={predictionsProjectSummaryListItems}
              />
            </BlockSlot>
          </Block>
        </div>
      </main>
    </SiteLayout>
  );
}

export default PredictionsProjectPage;
