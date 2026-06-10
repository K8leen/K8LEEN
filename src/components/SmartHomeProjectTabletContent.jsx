import Block, { BlockSlot } from "./Block";
import ProjectCaseResultVisual from "./ProjectCaseResultVisual";
import ProgressiveDisclosureCard from "./ProgressiveDisclosureCard";
import SmartHomeInterfaceSystemDiagramTablet from "./SmartHomeInterfaceSystemDiagramTablet";
import TextBlock from "./TextBlock";
import {
  smartHomeProjectApproachLists,
  smartHomeProjectArchitecturePlain,
  smartHomeProjectContextAppListItems,
  smartHomeProjectContextAppListTitle,
  smartHomeProjectContextFeaturesListItems,
  smartHomeProjectContextFeaturesListTitle,
  smartHomeProjectContextRoleDescription,
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

const tabletSectionBorders = { bottom: true };

function SmartHomeProjectTabletContent() {
  return (
    <>
      <Block title="SEC-00_Результат" borders={{ bottom: true }}>
        <BlockSlot>
          <TextStack lines={smartHomeProjectResultLines} />
        </BlockSlot>
        <BlockSlot>
          <ProjectCaseResultVisual
            src={smartHomeProjectImages.result.src}
            alt={smartHomeProjectImages.result.alt}
            className="block h-auto w-full project-case-result-visual"
            onLoad={() => window.dispatchEvent(new Event("resize"))}
          />
        </BlockSlot>
      </Block>

      <ProgressiveDisclosureCard title="SEC-01...04_Мой подход">
        <Block title="SEC-01_Контекст" borders={tabletSectionBorders}>
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

        <Block title="SEC-02_Проблема" borders={tabletSectionBorders}>
          <BlockSlot>
            <TextBlock variant="list" listItems={smartHomeProjectProblemListItems} />
          </BlockSlot>
        </Block>

        <Block title="SEC-03_Задача" borders={tabletSectionBorders}>
          <BlockSlot>
            <TextBlock
              variant="list"
              title={smartHomeProjectTaskListTitle}
              listItems={smartHomeProjectTaskListItems}
            />
          </BlockSlot>
        </Block>

        <Block title="SEC-04_Подход" borders={{}}>
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
      </ProgressiveDisclosureCard>

      <Block title="SEC-05_Архитектура решения" borders={{ bottom: true }}>
        <BlockSlot>
          <TextBlock variant="plain" text={smartHomeProjectArchitecturePlain} />
        </BlockSlot>
        <BlockSlot>
          <img
            src={smartHomeProjectImages.architecture.src}
            alt={smartHomeProjectImages.architecture.alt}
            className="project-case-architecture-full block h-auto w-full"
            draggable={false}
          />
        </BlockSlot>
      </Block>

      <Block title="SEC-06_Система интерфейса" borders={{ bottom: true }}>
        <BlockSlot>
          <TextBlock variant="plain" text={smartHomeProjectInterfaceSystemPlain} />
        </BlockSlot>
        <BlockSlot>
          <SmartHomeInterfaceSystemDiagramTablet />
        </BlockSlot>
      </Block>

      <ProgressiveDisclosureCard title="SEC-07...09_Реализация и итоги">
        <Block title="SEC-07_Основные принципы решения" borders={tabletSectionBorders}>
          <BlockSlot>
            <TextBlock
              variant="list"
              title={smartHomeProjectPrinciplesListTitle}
              listItems={smartHomeProjectPrinciplesListItems}
            />
          </BlockSlot>
        </Block>

        <Block title="SEC-08_Взаимодействие с разработкой" borders={tabletSectionBorders}>
          <BlockSlot>
            <TextBlock variant="plain" text={smartHomeProjectIntegrationPlain} />
          </BlockSlot>
        </Block>

        <Block title="SEC-09_Итог" borders={{}}>
          <BlockSlot>
            <TextStack lines={smartHomeProjectSummaryLines} />
          </BlockSlot>
        </Block>
      </ProgressiveDisclosureCard>
    </>
  );
}

export default SmartHomeProjectTabletContent;
