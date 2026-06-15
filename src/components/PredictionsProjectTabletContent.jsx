import Block, { BlockSlot } from "./Block";
import DeferredImage from "./DeferredImage";
import ProjectCaseResultVisual from "./ProjectCaseResultVisual";
import PredictionsInterfaceSystemDiagramTablet from "./PredictionsInterfaceSystemDiagramTablet";
import ProgressiveDisclosureCard from "./ProgressiveDisclosureCard";
import TextBlock from "./TextBlock";
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

const tabletSectionBorders = { bottom: true };

function PredictionsProjectTabletContent() {
  return (
    <>
      <Block title="SEC-00_Результат" borders={{ bottom: true }}>
        <BlockSlot>
          <TextStack lines={predictionsProjectResultLines} />
        </BlockSlot>
        <BlockSlot>
          <ProjectCaseResultVisual
            src={predictionsProjectImages.result.src}
            alt={predictionsProjectImages.result.alt}
            className="block h-auto w-full project-case-result-visual"
          />
        </BlockSlot>
      </Block>

      <ProgressiveDisclosureCard title="SEC-01...04_Контекст и методология">
        <Block title="SEC-01_Контекст" borders={tabletSectionBorders}>
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

        <Block title="SEC-02_Проблема" borders={tabletSectionBorders}>
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

        <Block title="SEC-03_Задача" borders={tabletSectionBorders}>
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

        <Block title="SEC-04_Подход" borders={{}}>
          <BlockSlot>
            <div className="stack">
              <TextBlock
                variant="description"
                title={predictionsProjectApproachResearch.title}
                description={predictionsProjectApproachResearch.description}
              />
              <TextBlock
                variant="list"
                title={predictionsProjectApproachStructuring.title}
                listItems={predictionsProjectApproachStructuring.listItems}
              />
              <TextBlock
                variant="list"
                title={predictionsProjectApproachDesign.title}
                listItems={predictionsProjectApproachDesign.listItems}
              />
            </div>
          </BlockSlot>
        </Block>
      </ProgressiveDisclosureCard>

      <Block title="SEC-05_Архитектура решения" borders={{ bottom: true }}>
        <BlockSlot>
          <TextBlock variant="plain" text={predictionsProjectArchitecturePlain} />
        </BlockSlot>
        <BlockSlot>
          <DeferredImage
            src={predictionsProjectImages.architecture.src}
            alt={predictionsProjectImages.architecture.alt}
            className="project-case-architecture-full block h-auto"
            draggable={false}
          />
        </BlockSlot>
      </Block>

      <ProgressiveDisclosureCard title={predictionsProjectArchitecturePrinciplesTitle}>
        <Block
          className="project-case-pdc-principles-block"
          title={predictionsProjectArchitecturePrinciplesTitle}
          borders={{}}
        >
          <BlockSlot>
            <div className="stack">
              {predictionsProjectArchitecturePrinciplesDescriptions.map((item) => (
                <TextBlock
                  key={item.title}
                  variant="description"
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </BlockSlot>
        </Block>
      </ProgressiveDisclosureCard>

      <Block title="SEC-06_Система интерфейса" borders={{ bottom: true }}>
        <BlockSlot>
          <TextBlock variant="plain" text={predictionsProjectInterfaceSystemPlain} />
        </BlockSlot>
        <BlockSlot>
          <PredictionsInterfaceSystemDiagramTablet />
        </BlockSlot>
      </Block>

      <ProgressiveDisclosureCard title="SEC-07...09_Реализация и результаты">
        <Block title="SEC-07_Визуальная система" borders={tabletSectionBorders}>
          <BlockSlot>
            <TextStack lines={predictionsProjectVisualSystemLines} />
          </BlockSlot>
        </Block>

        <Block title="SEC-08_Интеграция с разработкой" borders={tabletSectionBorders}>
          <BlockSlot>
            <TextStack lines={predictionsProjectIntegrationLines} />
          </BlockSlot>
        </Block>

        <Block title="SEC-09_Итог" borders={{}}>
          <BlockSlot>
            <TextBlock
              variant="list"
              title={predictionsProjectSummaryListTitle}
              listItems={predictionsProjectSummaryListItems}
            />
          </BlockSlot>
        </Block>
      </ProgressiveDisclosureCard>
    </>
  );
}

export default PredictionsProjectTabletContent;
