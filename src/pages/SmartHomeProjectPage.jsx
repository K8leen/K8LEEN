import { useRef } from "react";
import Block, { BlockSlot } from "../components/Block";
import Headline from "../components/Headline";
import ProjectCaseBackButton from "../components/ProjectCaseBackButton";
import ProjectCaseTopRow from "../components/ProjectCaseTopRow";
import SmartHomeInterfaceSystemDiagram from "../components/SmartHomeInterfaceSystemDiagram";
import SiteLayout from "../components/SiteLayout";
import TextBlock from "../components/TextBlock";
import {
  smartHomeProjectApproachLists,
  smartHomeProjectArchitecturePlain,
  smartHomeProjectContextAppListItems,
  smartHomeProjectContextAppListTitle,
  smartHomeProjectContextFeaturesListItems,
  smartHomeProjectContextFeaturesListTitle,
  smartHomeProjectContextRoleDescription,
  smartHomeProjectHeadline,
  smartHomeProjectImages,
  smartHomeProjectIntegrationPlain,
  smartHomeProjectInterfaceSystemPlain,
  smartHomeProjectPrinciplesListItems,
  smartHomeProjectPrinciplesListTitle,
  smartHomeProjectProblemListItems,
  smartHomeProjectResultLines,
  smartHomeProjectSummaryLines,
  smartHomeProjectTaskListItems,
  smartHomeProjectTaskListTitle,
} from "../data/smartHomeProjectPage";

function TextStack({ lines }) {
  return (
    <div className="stack">
      {lines.map((line) => (
        <TextBlock key={line} variant="plain" text={line} />
      ))}
    </div>
  );
}

function SmartHomeProjectPage() {
  const headlineAnchorRef = useRef(null);

  return (
    <SiteLayout>
      <ProjectCaseBackButton alignRef={headlineAnchorRef} />
      <main className="project-case-page">
        <div ref={headlineAnchorRef} className="project-case-headline-anchor">
          <Headline
            header={smartHomeProjectHeadline.header}
            subheader={smartHomeProjectHeadline.subheader}
          />
        </div>

        <ProjectCaseTopRow
          rowHeight="sec00"
          sec00={
            <Block
              className="project-case-block--800"
              title="SEC-00_Результат"
              borders={{ bottom: true, right: true }}
            >
              <BlockSlot>
                <TextStack lines={smartHomeProjectResultLines} />
              </BlockSlot>
              <BlockSlot>
                <img
                  src={smartHomeProjectImages.result.src}
                  alt={smartHomeProjectImages.result.alt}
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
                  <TextBlock
                    variant="list"
                    title={smartHomeProjectContextAppListTitle}
                    listItems={smartHomeProjectContextAppListItems}
                  />
                  <TextBlock
                    variant="list"
                    title={smartHomeProjectContextFeaturesListTitle}
                    listItems={smartHomeProjectContextFeaturesListItems}
                  />
                  <TextBlock
                    variant="description"
                    title={smartHomeProjectContextRoleDescription.title}
                    description={smartHomeProjectContextRoleDescription.description}
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
                <TextBlock variant="list" listItems={smartHomeProjectProblemListItems} />
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
                  title={smartHomeProjectTaskListTitle}
                  listItems={smartHomeProjectTaskListItems}
                />
              </BlockSlot>
            </Block>
          }
        />

        <div className="project-case-row project-case-row--bottom">
          <Block
            className="project-case-block--400 h-full"
            title="SEC-04_Подход"
            borders={{ bottom: true, right: true }}
          >
            <BlockSlot>
              <div className="stack">
                {smartHomeProjectApproachLists.map((block) => (
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

          <Block
            className="project-case-block--800 h-full"
            title="SEC-05_Архитектура решения"
            borders={{ bottom: true, left: true }}
          >
            <BlockSlot>
              <div className="stack">
                <TextBlock variant="plain" text={smartHomeProjectArchitecturePlain} />
                <img
                  src={smartHomeProjectImages.architecture.src}
                  alt={smartHomeProjectImages.architecture.alt}
                  className="block h-auto w-full"
                />
              </div>
            </BlockSlot>
          </Block>
        </div>

        <Block
          className="project-case-block--1200"
          title="SEC-06_Система интерфейса"
          borders={{ bottom: true }}
        >
          <BlockSlot>
            <TextBlock
              className="project-case-plain--800"
              variant="plain"
              text={smartHomeProjectInterfaceSystemPlain}
            />
          </BlockSlot>
          <BlockSlot>
            <SmartHomeInterfaceSystemDiagram />
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
                title={smartHomeProjectPrinciplesListTitle}
                listItems={smartHomeProjectPrinciplesListItems}
              />
            </BlockSlot>
          </Block>

          <Block
            className="project-case-block--400 h-full"
            title="SEC-08_Взаимодействие с разработкой"
            borders={{ bottom: true, left: true, right: true }}
          >
            <BlockSlot>
              <TextBlock variant="plain" text={smartHomeProjectIntegrationPlain} />
            </BlockSlot>
          </Block>

          <Block
            className="project-case-block--400 h-full"
            title="SEC-09_Итог"
            borders={{ bottom: true, left: true }}
          >
            <BlockSlot>
              <TextStack lines={smartHomeProjectSummaryLines} />
            </BlockSlot>
          </Block>
        </div>
      </main>
    </SiteLayout>
  );
}

export default SmartHomeProjectPage;
