import { useRef } from "react";
import Block, { BlockSlot } from "../components/Block";
import Headline from "../components/Headline";
import ProjectCaseBackButton from "../components/ProjectCaseBackButton";
import ProjectCaseTopRow from "../components/ProjectCaseTopRow";
import SiteLayout from "../components/SiteLayout";
import TextBlock from "../components/TextBlock";
import {
  dashboardsProjectApproachLists,
  dashboardsProjectArchitecturePlain,
  dashboardsProjectContextDescription,
  dashboardsProjectContextListItems,
  dashboardsProjectContextListTitle,
  dashboardsProjectContextPlain,
  dashboardsProjectHeadline,
  dashboardsProjectImages,
  dashboardsProjectIntegrationDescriptions,
  dashboardsProjectPrinciplesDescriptions,
  dashboardsProjectProblemListItems,
  dashboardsProjectProblemListTitle,
  dashboardsProjectProblemPlain,
  dashboardsProjectResultLines,
  dashboardsProjectSummaryLines,
  dashboardsProjectTaskListItems,
  dashboardsProjectTaskListTitle,
} from "../data/dashboardsProjectPage";

function TextStack({ lines }) {
  return (
    <div className="stack">
      {lines.map((line) => (
        <TextBlock key={line} variant="plain" text={line} />
      ))}
    </div>
  );
}

function DescriptionStack({ items }) {
  return (
    <div className="stack">
      {items.map((item) => (
        <TextBlock
          key={item.title}
          variant="description"
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
}

function DashboardsProjectPage() {
  const headlineAnchorRef = useRef(null);

  return (
    <SiteLayout>
      <ProjectCaseBackButton alignRef={headlineAnchorRef} />
      <main className="project-case-page">
        <div ref={headlineAnchorRef} className="project-case-headline-anchor">
          <Headline
            header={dashboardsProjectHeadline.header}
            subheader={dashboardsProjectHeadline.subheader}
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
                <TextStack lines={dashboardsProjectResultLines} />
              </BlockSlot>
              <BlockSlot>
                <img
                  src={dashboardsProjectImages.result.src}
                  alt={dashboardsProjectImages.result.alt}
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
                  <TextBlock variant="plain" text={dashboardsProjectContextPlain} />
                  <TextBlock
                    variant="list"
                    title={dashboardsProjectContextListTitle}
                    listItems={dashboardsProjectContextListItems}
                  />
                  <TextBlock
                    variant="description"
                    title={dashboardsProjectContextDescription.title}
                    description={dashboardsProjectContextDescription.description}
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
                  <TextBlock variant="plain" text={dashboardsProjectProblemPlain} />
                  <TextBlock
                    variant="list"
                    title={dashboardsProjectProblemListTitle}
                    listItems={dashboardsProjectProblemListItems}
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
                  title={dashboardsProjectTaskListTitle}
                  listItems={dashboardsProjectTaskListItems}
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
              {dashboardsProjectApproachLists.map((block) => (
                <TextBlock
                  key={block.title}
                  className="project-case-approach-list"
                  variant="list"
                  title={block.title}
                  listItems={block.listItems}
                />
              ))}
            </div>
          </BlockSlot>
        </Block>

        <Block
          className="project-case-block--1200"
          title="SEC-05_Архитектура dashboard-системы"
          borders={{ bottom: true }}
        >
          <BlockSlot>
            <TextBlock
              className="project-case-plain--760"
              variant="plain"
              text={dashboardsProjectArchitecturePlain}
            />
          </BlockSlot>
          <BlockSlot>
            <img
              src={dashboardsProjectImages.widgets.src}
              alt={dashboardsProjectImages.widgets.alt}
              className="block h-auto w-full"
            />
          </BlockSlot>
          <BlockSlot>
            <img
              src={dashboardsProjectImages.flow.src}
              alt={dashboardsProjectImages.flow.alt}
              className="block h-auto w-full"
            />
          </BlockSlot>
        </Block>

        <div className="project-case-row project-case-row--triple">
          <Block
            className="project-case-block--400 h-full"
            title="SEC-06_Принципы решения"
            borders={{ bottom: true, right: true }}
          >
            <BlockSlot>
              <DescriptionStack items={dashboardsProjectPrinciplesDescriptions} />
            </BlockSlot>
          </Block>

          <Block
            className="project-case-block--400 h-full"
            title="SEC-07_Интеграция с разработкой"
            borders={{ bottom: true, left: true, right: true }}
          >
            <BlockSlot>
              <DescriptionStack items={dashboardsProjectIntegrationDescriptions} />
            </BlockSlot>
          </Block>

          <Block
            className="project-case-block--400 h-full"
            title="SEC-08_Итог"
            borders={{ bottom: true, left: true }}
          >
            <BlockSlot>
              <TextStack lines={dashboardsProjectSummaryLines} />
            </BlockSlot>
          </Block>
        </div>
      </main>
    </SiteLayout>
  );
}

export default DashboardsProjectPage;
