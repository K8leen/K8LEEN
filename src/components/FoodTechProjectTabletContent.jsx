import Block, { BlockSlot } from "./Block";
import FoodTechArchitectureSectionTablet from "./FoodTechArchitectureSectionTablet";
import FoodTechInterfaceSystemDiagramTablet from "./FoodTechInterfaceSystemDiagramTablet";
import ProgressiveDisclosureCard from "./ProgressiveDisclosureCard";
import TextBlock from "./TextBlock";
import {
  foodTechProjectApproachLists,
  foodTechProjectArchitectureClientPlain,
  foodTechProjectArchitectureRestaurantPlain,
  foodTechProjectContextIdeaDescription,
  foodTechProjectContextListItems,
  foodTechProjectContextListTitle,
  foodTechProjectContextPlain,
  foodTechProjectContextRoleDescription,
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

const tabletSectionBorders = { bottom: true };

function FoodTechProjectTabletContent() {
  return (
    <>
      <Block title="SEC-00_Результат" borders={{ bottom: true }}>
        <BlockSlot>
          <TextStack lines={foodTechProjectResultLines} />
        </BlockSlot>
        <BlockSlot>
          <img
            src={foodTechProjectImages.result.src}
            alt={foodTechProjectImages.result.alt}
            className="block h-auto w-full project-case-result-visual"
            onLoad={() => window.dispatchEvent(new Event("resize"))}
          />
        </BlockSlot>
      </Block>

      <ProgressiveDisclosureCard title="SEC-01...04_Контекст и методология">
        <Block title="SEC-01_Контекст" borders={tabletSectionBorders}>
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

        <Block title="SEC-02_Проблема" borders={tabletSectionBorders}>
          <BlockSlot>
            <TextBlock variant="plain" text={foodTechProjectProblemPlain} />
          </BlockSlot>
        </Block>

        <Block title="SEC-03_Задача" borders={tabletSectionBorders}>
          <BlockSlot>
            <TextBlock
              variant="list"
              title={foodTechProjectTaskListTitle}
              listItems={foodTechProjectTaskListItems}
            />
          </BlockSlot>
        </Block>

        <Block title="SEC-04_Подход" borders={{}}>
          <BlockSlot>
            <div className="stack">
              {foodTechProjectApproachLists.map((block) => (
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

      <Block
        className="project-case-architecture-block"
        title="SEC-05_Архитектура решения"
        borders={{ bottom: true }}
      >
        <BlockSlot>
          <FoodTechArchitectureSectionTablet
            clientPlain={foodTechProjectArchitectureClientPlain}
            restaurantPlain={foodTechProjectArchitectureRestaurantPlain}
          />
        </BlockSlot>
      </Block>

      <Block title="SEC-06_Система интерфейса" borders={{ bottom: true }}>
        <BlockSlot>
          <TextBlock variant="plain" text={foodTechProjectInterfaceSystemPlain} />
        </BlockSlot>
        <BlockSlot>
          <FoodTechInterfaceSystemDiagramTablet />
        </BlockSlot>
      </Block>

      <ProgressiveDisclosureCard title="SEC-07...09_Реализация и результаты">
        <Block title="SEC-07_Основные принципы решения" borders={tabletSectionBorders}>
          <BlockSlot>
            <TextBlock
              variant="list"
              title={foodTechProjectPrinciplesListTitle}
              listItems={foodTechProjectPrinciplesListItems}
            />
          </BlockSlot>
        </Block>

        <Block title="SEC-08_Взаимодействие с разработкой" borders={tabletSectionBorders}>
          <BlockSlot>
            <TextStack lines={foodTechProjectIntegrationLines} />
          </BlockSlot>
        </Block>

        <Block title="SEC-09_Итог" borders={{}}>
          <BlockSlot>
            <TextStack lines={foodTechProjectSummaryLines} />
          </BlockSlot>
        </Block>
      </ProgressiveDisclosureCard>
    </>
  );
}

export default FoodTechProjectTabletContent;
