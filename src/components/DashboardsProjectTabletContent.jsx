import Block, { BlockSlot } from "./Block";
import DashboardsFlowDiagramTablet from "./DashboardsFlowDiagramTablet";
import HorizontalScrollStrip from "./HorizontalScrollStrip";
import ProgressiveDisclosureCard from "./ProgressiveDisclosureCard";
import TextBlock from "./TextBlock";
import {
  dashboardsProjectApproachLists,
  dashboardsProjectArchitecturePlain,
  dashboardsProjectContextDescription,
  dashboardsProjectContextListItems,
  dashboardsProjectContextListTitle,
  dashboardsProjectContextPlain,
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

const tabletSectionBorders = { bottom: true };

function DashboardsProjectTabletContent() {
  return (
    <>
      <Block title="SEC-00_Результат" borders={{ bottom: true }}>
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

      <ProgressiveDisclosureCard title="SEC-01...04_Мой подход">
        <Block title="SEC-01_Контекст" borders={tabletSectionBorders}>
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

        <Block title="SEC-02_Проблема" borders={tabletSectionBorders}>
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

        <Block title="SEC-03_Задача" borders={tabletSectionBorders}>
          <BlockSlot>
            <TextBlock
              variant="list"
              title={dashboardsProjectTaskListTitle}
              listItems={dashboardsProjectTaskListItems}
            />
          </BlockSlot>
        </Block>

        <Block title="SEC-04_Подход" borders={{}}>
          <BlockSlot>
            <div className="stack">
              {dashboardsProjectApproachLists.map((block) => (
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
      </ProgressiveDisclosureCard>

      <Block title="SEC-05_Архитектура dashboard-системы" borders={{ bottom: true }}>
        <BlockSlot>
          <TextBlock variant="plain" text={dashboardsProjectArchitecturePlain} />
        </BlockSlot>
        <BlockSlot>
          <HorizontalScrollStrip
            className="project-case-architecture-scroll"
            ariaLabel={dashboardsProjectImages.widgets.alt}
          >
            <img
              src={dashboardsProjectImages.widgets.src}
              alt={dashboardsProjectImages.widgets.alt}
              className="project-case-architecture-scroll__image project-case-dashboards-widgets-scroll__image"
              draggable={false}
            />
          </HorizontalScrollStrip>
        </BlockSlot>
        <BlockSlot>
          <div className="project-case-dashboards-flow-slot">
            <DashboardsFlowDiagramTablet />
          </div>
        </BlockSlot>
      </Block>

      <ProgressiveDisclosureCard title="SEC-06...08_Реализация системы и итоги">
        <Block title="SEC-06_Принципы решения" borders={tabletSectionBorders}>
          <BlockSlot>
            <DescriptionStack items={dashboardsProjectPrinciplesDescriptions} />
          </BlockSlot>
        </Block>

        <Block title="SEC-07_Интеграция с разработкой" borders={tabletSectionBorders}>
          <BlockSlot>
            <DescriptionStack items={dashboardsProjectIntegrationDescriptions} />
          </BlockSlot>
        </Block>

        <Block title="SEC-08_Итог" borders={{}}>
          <BlockSlot>
            <TextStack lines={dashboardsProjectSummaryLines} />
          </BlockSlot>
        </Block>
      </ProgressiveDisclosureCard>
    </>
  );
}

export default DashboardsProjectTabletContent;
