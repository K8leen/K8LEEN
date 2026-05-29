import LinkButton from "../components/LinkButton";
import FloatingButton from "../components/FloatingButton";
import FilledButton from "../components/FilledButton";
import AccordionStack from "../components/AccordionStack";
import CookieBanner from "../components/CookieBanner";
import Tag from "../components/Tag";
import ProjectCard from "../components/ProjectCard";
import TextBlock from "../components/TextBlock";
import Block, { BlockSlot } from "../components/Block";
import Header from "../components/Header";
import Headline from "../components/Headline";
import ExperienceBlock from "../components/ExperienceBlock";
import Footer from "../components/Footer";

const palette = [
  ["base_bg", "#F4F6F8"],
  ["surface", "#FFFFFF"],
  ["structural_line", "#E5E9ED"],
  ["primary_accent", "#5A89B1"],
  ["light_accent", "#EBF2F8"],
  ["dark_accent", "#436B8D"],
  ["primary_text", "#1A1A1A"],
  ["structure_text", "#000000"],
  ["technical_info", "#666666"],
  ["technical_line", "#C2C2C2"],
];

function DesignSystemPage() {
  const states = ["default", "hover", "pressed", "disabled"];
  const accordionItems = [
    { label: "LABEL", lines: ["TEXT LINE", "TEXT LINE", "TEXT LINE", "TEXT LINE", "TEXT LINE"] },
    { label: "LABEL", lines: ["TEXT LINE", "TEXT LINE", "TEXT LINE", "TEXT LINE", "TEXT LINE"] },
    { label: "LABEL", lines: ["TEXT LINE", "TEXT LINE", "TEXT LINE", "TEXT LINE", "TEXT LINE"] },
    { label: "LABEL", lines: ["TEXT LINE", "TEXT LINE", "TEXT LINE", "TEXT LINE", "TEXT LINE"] },
    { label: "LABEL", lines: ["TEXT LINE", "TEXT LINE", "TEXT LINE", "TEXT LINE", "TEXT LINE"] },
    { label: "LABEL", lines: ["TEXT LINE", "TEXT LINE", "TEXT LINE", "TEXT LINE", "TEXT LINE"] },
    { label: "LABEL", lines: ["TEXT LINE", "TEXT LINE", "TEXT LINE", "TEXT LINE", "TEXT LINE"] },
  ];

  return (
    <main className="min-h-screen bg-base-bg px-6 py-12 text-primary-text">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <p>
          <LinkButton variant="inline" to="/">
            На главную
          </LinkButton>
        </p>

        <section className="shadow-soft rounded-2xl border border-structural-line bg-surface p-8">
          <p className="text-tech text-technical-info">Design system baseline</p>
          <h1 className="text-hero mt-6">RAG 123</h1>
          <h2 className="text-subhero mt-4 text-dark-accent">Subhero example</h2>
          <h3 className="text-block mt-5">Block headline</h3>
          <p className="text-body-main mt-4 max-w-2xl">
            Это стартовая страница портфолио. Дальше сюда можно добавить кейсы,
            процесс работы, отзывы и контакты.
          </p>
          <p className="text-body-small mt-3 max-w-2xl text-technical-info">
            Базовые стили уже подключены через токены: цвета, типографика и
            вспомогательные utility-классы.
          </p>
        </section>

        <section className="rounded-2xl border border-structural-line bg-surface p-8">
          <h2 className="text-block mb-5">Color tokens</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {palette.map(([name, hex]) => (
              <div
                key={name}
                className="flex items-center justify-between rounded-xl border border-technical-line bg-base-bg px-4 py-3"
              >
                <span className="text-body-small">{name}</span>
                <div className="flex items-center gap-2">
                  <span
                    className="h-6 w-6 rounded-md border border-technical-line"
                    style={{ backgroundColor: hex }}
                  />
                  <code className="text-tech text-technical-info">{hex}</code>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-structural-line bg-surface p-8">
          <h2 className="text-block mb-5">Typography check</h2>
          <div className="rounded-xl border border-technical-line bg-base-bg p-6">
            <p className="text-hero">Hero / Alumni Sans SC / 56</p>
            <p className="text-subhero mt-4">Subhero / Alumni Sans SC / 32</p>
            <p className="text-block mt-4">Block / Alumni Sans SC / 24</p>
            <p className="text-body-main mt-4">Body main / Alumni Sans / 18</p>
            <p className="text-body-small mt-3 text-technical-info">
              Body small / Alumni Sans / 16
            </p>
            <p className="text-tech mt-3 text-technical-info">
              Tech / GOST Type AU / 14 / 5%
            </p>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-technical-line bg-base-bg p-5">
              <p className="text-tech text-technical-info">Local GOST Type AU</p>
              <p className="text-tech mt-3 text-xl text-primary-text">
                0123456789 / Aa Bb Cc / Тест кириллицы
              </p>
            </div>

            <div className="rounded-xl border border-technical-line bg-base-bg p-5">
              <p className="text-tech text-technical-info">Fallback monospace</p>
              <p
                className="mt-3 text-xl text-primary-text"
                style={{
                  fontFamily:
                    '"Roboto Mono", "SFMono-Regular", "Menlo", "Consolas", monospace',
                  letterSpacing: "0.05em",
                }}
              >
                0123456789 / Aa Bb Cc / Тест кириллицы
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-structural-line bg-surface p-8">
          <h2 className="text-block mb-5">Assets and shadow check</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-technical-line bg-base-bg p-4">
              <p className="text-tech text-technical-info">Pattern preview</p>
              <div className="bg-pattern mt-3 h-40 rounded-lg border border-technical-line" />
              <p className="text-tech mt-3 text-technical-info">
                /public/img/pattern.svg
              </p>
            </div>

            <div className="rounded-xl border border-technical-line bg-base-bg p-4">
              <p className="text-tech text-technical-info">Icons preview</p>
              <div className="mt-3 flex items-center gap-3 rounded-lg border border-technical-line bg-surface p-3">
                <img src="/icons/arrow-left.svg" alt="arrow left icon" className="h-6 w-6" />
                <img src="/icons/minus.svg" alt="minus icon" className="h-6 w-6" />
                <img src="/icons/plus.svg" alt="plus icon" className="h-6 w-6" />
              </div>
              <p className="text-tech mt-3 text-technical-info">/public/icons/*.svg</p>
            </div>
          </div>

          <div className="shadow-soft mt-4 rounded-xl border border-technical-line bg-surface p-5">
            <p className="text-tech text-technical-info">Shadow token (from Figma)</p>
            <p className="text-body-small mt-2">
              0px 4px 6px -1px rgba(10,13,18,0.10) + 0px 2px 4px -2px
              rgba(10,13,18,0.06)
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-structural-line bg-surface p-8">
          <h2 className="text-block mb-5">Link button component</h2>
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-xl border border-technical-line bg-base-bg p-5">
              <p className="text-tech mb-4 text-technical-info">Link Btn</p>
              <div className="flex flex-col gap-4">
                {states.map((state) => (
                  <LinkButton key={`default-${state}`} variant="default" state={state}>
                    LINK BTN
                  </LinkButton>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-technical-line bg-base-bg p-5">
              <p className="text-tech mb-4 text-technical-info">Link Btn Inline</p>
              <div className="flex flex-col gap-4">
                {states.map((state) => (
                  <LinkButton key={`inline-${state}`} variant="inline" state={state}>
                    LINK BTN
                  </LinkButton>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-technical-line bg-base-bg p-5">
              <p className="text-tech mb-4 text-technical-info">Link Btn jump</p>
              <div className="flex flex-col gap-5">
                {states.map((state) => (
                  <LinkButton key={`jump-${state}`} variant="jump" state={state}>
                    LINK BTN
                  </LinkButton>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-structural-line bg-surface p-8">
          <h2 className="text-block mb-5">Floating button component</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-technical-line bg-base-bg p-4">
              <p className="text-tech mb-4 text-technical-info">default</p>
              <FloatingButton state="default">BTN</FloatingButton>
            </div>

            <div className="rounded-xl border border-technical-line bg-base-bg p-4">
              <p className="text-tech mb-4 text-technical-info">hover</p>
              <FloatingButton state="hover">BTN</FloatingButton>
            </div>

            <div className="rounded-xl border border-technical-line bg-base-bg p-4">
              <p className="text-tech mb-4 text-technical-info">disabled</p>
              <FloatingButton state="disabled">BTN</FloatingButton>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-structural-line bg-surface p-8">
          <h2 className="text-block mb-5">Filled button component</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-technical-line bg-base-bg p-6">
              <p className="text-tech mb-4 text-technical-info">default</p>
              <FilledButton state="default">BTN</FilledButton>
            </div>

            <div className="rounded-xl border border-technical-line bg-base-bg p-6">
              <p className="text-tech mb-4 text-technical-info">hover</p>
              <FilledButton state="hover">BTN</FilledButton>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-structural-line bg-surface p-8">
          <h2 className="text-block mb-5">Accordion component (stack)</h2>
          <div className="rounded-xl border border-technical-line bg-base-bg p-6">
            <AccordionStack items={accordionItems} />
          </div>
        </section>

        <section className="rounded-2xl border border-structural-line bg-surface p-8">
          <h2 className="text-block mb-5">Cookie banner component</h2>
          <div className="rounded-xl border border-technical-line bg-base-bg p-6">
            <CookieBanner text="text" />
          </div>
        </section>

        <section className="rounded-2xl border border-structural-line bg-surface p-8">
          <h2 className="text-block mb-5">Tag component</h2>
          <div className="rounded-xl border border-technical-line bg-base-bg p-6">
            <div className="flex flex-col items-start gap-4">
              <Tag tone="nda">NDA</Tag>
              <Tag tone="web">web</Tag>
              <Tag tone="webMobile">web+mobile</Tag>
              <Tag tone="mobile">mobile</Tag>
              <Tag tone="uxUi">UX/UI design</Tag>
              <Tag tone="code">code</Tag>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-structural-line bg-surface p-8">
          <h2 className="text-block mb-5">Project card component</h2>
          <div className="rounded-xl border border-technical-line bg-base-bg p-6">
            <ProjectCard
              tags={["NDA", "NDA"]}
              title="TITLE"
              roleLabel="Моя роль"
              roleValue="UX/UI дизайнер"
              resultLabel="Ключевой результат"
              resultValue="DESCRIPTION"
            />
          </div>
        </section>

        <section className="rounded-2xl border border-structural-line bg-surface p-8">
          <h2 className="text-block mb-5">Footer component</h2>
          <div className="overflow-x-auto rounded-xl border border-technical-line bg-base-bg p-6">
            <Footer />
          </div>
        </section>

        <section className="rounded-2xl border border-structural-line bg-surface p-8">
          <h2 className="text-block mb-5">Experience block component</h2>
          <div className="rounded-xl border border-technical-line bg-base-bg p-6">
            <ExperienceBlock />
          </div>
        </section>

        <section className="rounded-2xl border border-structural-line bg-surface p-8">
          <h2 className="text-block mb-5">Headline component</h2>
          <div className="rounded-xl border border-technical-line bg-base-bg p-6">
            <Headline header="HEADER" subheader="SUBHEADER" />
          </div>
        </section>

        <section className="rounded-2xl border border-structural-line bg-surface p-8">
          <h2 className="text-block mb-5">Header component</h2>
          <div className="rounded-xl border border-technical-line bg-base-bg p-6">
            <Header />
          </div>
        </section>

        <section className="rounded-2xl border border-structural-line bg-surface p-8">
          <h2 className="text-block mb-5">Block component</h2>
          <div className="rounded-xl border border-technical-line bg-surface p-6">
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-tech mb-3 text-technical-info">with link</p>
                <Block title="BLOCK HEADER" linkLabel="Посмотреть все" borders={{ top: true, bottom: true }}>
                  <BlockSlot className="ds-block-slot--demo">Слот 1</BlockSlot>
                  <BlockSlot className="ds-block-slot--demo">Слот 2</BlockSlot>
                  <BlockSlot className="ds-block-slot--demo">Слот 3</BlockSlot>
                  {Array.from({ length: 5 }, (_, index) => (
                    <BlockSlot key={index} className="ds-block-slot--demo">
                      Слот
                    </BlockSlot>
                  ))}
                </Block>
              </div>

              <div>
                <p className="text-tech mb-3 text-technical-info">without link</p>
                <Block title="BLOCK HEADER" borders={{ left: true, right: true }}>
                  {Array.from({ length: 8 }, (_, index) => (
                    <BlockSlot key={index} className="ds-block-slot--demo">
                      Слот
                    </BlockSlot>
                  ))}
                </Block>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-structural-line bg-surface p-8">
          <h2 className="text-block mb-5">Text block component</h2>
          <div className="rounded-xl border border-technical-line bg-base-bg p-6">
            <div className="flex flex-col items-start gap-8">
              <div>
                <p className="text-tech mb-3 text-technical-info">plain</p>
                <TextBlock variant="plain" text="TEXT LINE" />
              </div>

              <div>
                <p className="text-tech mb-3 text-technical-info">list</p>
                <TextBlock variant="list" title="TITLE" listItems={["LIST"]} />
              </div>

              <div>
                <p className="text-tech mb-3 text-technical-info">description</p>
                <TextBlock variant="description" title="TITLE" description="DESCRIPTION" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default DesignSystemPage;
