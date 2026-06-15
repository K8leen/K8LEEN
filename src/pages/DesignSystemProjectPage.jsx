import { useRef } from "react";
import Block, { BlockSlot } from "../components/Block";
import DesignSystemApplicationDiagram from "../components/DesignSystemApplicationDiagram";
import DesignSystemProjectTabletContent from "../components/DesignSystemProjectTabletContent";
import Headline from "../components/Headline";
import DeferredImage from "../components/DeferredImage";
import ProjectCaseBackButton from "../components/ProjectCaseBackButton";
import ProjectCaseTopRow from "../components/ProjectCaseTopRow";
import SiteLayout from "../components/SiteLayout";
import TextBlock from "../components/TextBlock";
import {
  designSystemProjectApproachLists,
  designSystemProjectApplicationPlain,
  designSystemProjectArchitecturePlain,
  designSystemProjectContextDescription,
  designSystemProjectContextListItems,
  designSystemProjectContextListTitle,
  designSystemProjectContextPlain,
  designSystemProjectHeadline,
  designSystemProjectHeadlineTablet,
  designSystemProjectImages,
  designSystemProjectIntegrationLines,
  designSystemProjectProblemListItems,
  designSystemProjectResultLines,
  designSystemProjectSummaryLines,
  designSystemProjectTaskListItems,
  designSystemProjectTaskListTitle,
} from "../data/designSystemProjectPage";

function TextStack({ lines }) {
  return (
    <div className="stack">
      {lines.map((line) => (
        <TextBlock key={line} variant="plain" text={line} />
      ))}
    </div>
  );
}

function DesignSystemProjectPage() {
  const headlineAnchorRef = useRef(null);

  return (
    <SiteLayout>
      <ProjectCaseBackButton alignRef={headlineAnchorRef} />
      <main className="project-case-page">
        <div ref={headlineAnchorRef} className="project-case-headline-anchor">
          <Headline
            className="project-case-headline--desktop"
            header={designSystemProjectHeadline.header}
            subheader={designSystemProjectHeadline.subheader}
          />
          <Headline
            className="project-case-headline--tablet"
            header={designSystemProjectHeadlineTablet.header}
            subheader={designSystemProjectHeadlineTablet.subheader}
          />
        </div>

        <div className="project-case-page--desktop">
        <ProjectCaseTopRow
          sec00={
            <Block
              className="project-case-block--800 h-full"
              title="SEC-00_Результат"
              borders={{ bottom: true, right: true }}
            >
              <BlockSlot>
                <TextStack lines={designSystemProjectResultLines} />
              </BlockSlot>
              <BlockSlot>
                <DeferredImage
                  src={designSystemProjectImages.result.src}
                  alt={designSystemProjectImages.result.alt}
                  className="block h-auto w-full"
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
                  <TextBlock variant="plain" text={designSystemProjectContextPlain} />
                  <TextBlock
                    variant="list"
                    title={designSystemProjectContextListTitle}
                    listItems={designSystemProjectContextListItems}
                  />
                  <TextBlock
                    variant="description"
                    title={designSystemProjectContextDescription.title}
                    description={designSystemProjectContextDescription.description}
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
                <TextBlock variant="list" listItems={designSystemProjectProblemListItems} />
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
                  title={designSystemProjectTaskListTitle}
                  listItems={designSystemProjectTaskListItems}
                />
              </BlockSlot>
            </Block>
          }
          sec04={
            <Block
              className="project-case-block--400 project-case-block--grow"
              title="SEC-04_Подход"
              borders={{ bottom: true, left: true }}
            >
              <BlockSlot>
                <div className="stack">
                  {designSystemProjectApproachLists.map((block) => (
                    <TextBlock
                      key={block.title}
                      variant="list"
                      title={block.title}
                      listItems={block.listItems}
                    />
                  ))}
                </div>
              </BlockSlot>
            </Block>
          }
        />

        <Block
          className="project-case-block--1200"
          title="SEC-05_Архитектура системы"
          borders={{ bottom: true }}
        >
          <BlockSlot>
            <TextBlock
              className="project-case-plain--760"
              variant="plain"
              text={designSystemProjectArchitecturePlain}
            />
          </BlockSlot>
          <BlockSlot>
            <DeferredImage
              src={designSystemProjectImages.architecture.src}
              alt={designSystemProjectImages.architecture.alt}
              className="block h-auto w-full"
            />
          </BlockSlot>
        </Block>

        <Block
          className="project-case-block--1200"
          title="SEC-06_Применение в продукте"
          borders={{ bottom: true }}
        >
          <BlockSlot>
            <TextBlock
              className="project-case-plain--760"
              variant="plain"
              text={designSystemProjectApplicationPlain}
            />
          </BlockSlot>
          <BlockSlot>
            <DesignSystemApplicationDiagram
              src={designSystemProjectImages.application.src}
              alt={designSystemProjectImages.application.alt}
            />
          </BlockSlot>
        </Block>

        <div className="project-case-row project-case-row--bottom">
          <Block
            className="project-case-block--400 h-full"
            title="SEC-07_Интеграция с разработкой"
            borders={{ bottom: true, right: true }}
          >
            <BlockSlot>
              <TextStack lines={designSystemProjectIntegrationLines} />
            </BlockSlot>
          </Block>

          <Block
            className="project-case-block--800 h-full"
            title="SEC-08_Итог"
            borders={{ bottom: true, left: true }}
          >
            <BlockSlot>
              <TextStack lines={designSystemProjectSummaryLines} />
            </BlockSlot>
          </Block>
        </div>
        </div>

        <div className="project-case-page-tablet">
          <DesignSystemProjectTabletContent />
        </div>
      </main>
    </SiteLayout>
  );
}

export default DesignSystemProjectPage;
