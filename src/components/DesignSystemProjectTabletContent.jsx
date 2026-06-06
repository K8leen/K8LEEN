import Block, { BlockSlot } from "./Block";
import DesignSystemApplicationDiagram from "./DesignSystemApplicationDiagram";
import HorizontalScrollStrip from "./HorizontalScrollStrip";
import ProgressiveDisclosureCard from "./ProgressiveDisclosureCard";
import TextBlock from "./TextBlock";
import {
  designSystemProjectApproachLists,
  designSystemProjectApplicationPlain,
  designSystemProjectArchitecturePlain,
  designSystemProjectContextDescription,
  designSystemProjectContextListItems,
  designSystemProjectContextListTitle,
  designSystemProjectContextPlain,
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

const tabletSectionBorders = { bottom: true };

function DesignSystemProjectTabletContent() {
  return (
    <>
      <Block title="SEC-00_Результат" borders={{ bottom: true }}>
        <BlockSlot>
          <TextStack lines={designSystemProjectResultLines} />
        </BlockSlot>
        <BlockSlot>
          <img
            src={designSystemProjectImages.result.src}
            alt={designSystemProjectImages.result.alt}
            className="block h-auto w-full"
          />
        </BlockSlot>
      </Block>

      <ProgressiveDisclosureCard title="SEC-01...04_Контекст и методология">
        <Block title="SEC-01_Контекст" borders={tabletSectionBorders}>
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

        <Block title="SEC-02_Проблема" borders={tabletSectionBorders}>
          <BlockSlot>
            <TextBlock variant="list" listItems={designSystemProjectProblemListItems} />
          </BlockSlot>
        </Block>

        <Block title="SEC-03_Задача" borders={tabletSectionBorders}>
          <BlockSlot>
            <TextBlock
              variant="list"
              title={designSystemProjectTaskListTitle}
              listItems={designSystemProjectTaskListItems}
            />
          </BlockSlot>
        </Block>

        <Block title="SEC-04_Подход" borders={{}}>
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
      </ProgressiveDisclosureCard>

      <Block title="SEC-05_Архитектура системы" borders={{ bottom: true }}>
        <BlockSlot>
          <TextBlock
            className="project-case-plain--760"
            variant="plain"
            text={designSystemProjectArchitecturePlain}
          />
        </BlockSlot>
        <BlockSlot>
          <HorizontalScrollStrip
            className="project-case-architecture-scroll"
            ariaLabel={designSystemProjectImages.architecture.alt}
          >
            <img
              src={designSystemProjectImages.architecture.src}
              alt={designSystemProjectImages.architecture.alt}
              className="project-case-architecture-scroll__image"
              draggable={false}
            />
          </HorizontalScrollStrip>
        </BlockSlot>
      </Block>

      <Block title="SEC-06_Применение в продукте" borders={{ bottom: true }}>
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

      <ProgressiveDisclosureCard title="SEC-07...08_Внедрение системы и бизнес-эффект">
        <Block title="SEC-07_Интеграция с разработкой" borders={tabletSectionBorders}>
          <BlockSlot>
            <TextStack lines={designSystemProjectIntegrationLines} />
          </BlockSlot>
        </Block>

        <Block title="SEC-08_Итог" borders={{}}>
          <BlockSlot>
            <TextStack lines={designSystemProjectSummaryLines} />
          </BlockSlot>
        </Block>
      </ProgressiveDisclosureCard>
    </>
  );
}

export default DesignSystemProjectTabletContent;
