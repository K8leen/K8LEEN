import { useState } from "react";
import LinkButton from "../components/LinkButton";
import ContactButton from "../components/ContactButton";
import FloatingButton from "../components/FloatingButton";
import FilledButton from "../components/FilledButton";
import AccordionStack from "../components/AccordionStack";
import CookieBanner from "../components/CookieBanner";
import Modal from "../components/Modal";
import Tag from "../components/Tag";
import ProjectCard from "../components/ProjectCard";
import TextBlock from "../components/TextBlock";
import Block, { BlockSlot } from "../components/Block";
import ProgressiveDisclosureCard from "../components/ProgressiveDisclosureCard";
import Header from "../components/Header";
import Headline from "../components/Headline";
import ExperienceBlock from "../components/ExperienceBlock";
import ExperienceStack from "../components/ExperienceStack";
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

const experienceShowcaseItems = [
  {
    year: "YEAR",
    company: "COMPANY",
    role: "UX/UI дизайнер",
    description: "DESCRIPTION",
  },
  {
    year: "YEAR",
    company: "COMPANY",
    role: "product / UX/UI дизайнер",
    description: "DESCRIPTION",
  },
];

function ModalShowcaseDemo({ overlay = false, label }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="stack items-start">
      <p className="text-tech showcase-variant-label text-technical-info">{label}</p>
      <Modal
        open={open}
        overlay={overlay}
        title="title"
        text="text"
        onClose={() => setOpen(false)}
      />
      {!open && (
        <FilledButton type="button" onClick={() => setOpen(true)}>
          Открыть modal
        </FilledButton>
      )}
    </div>
  );
}

function CookieShowcaseDemo({ fixed = false, label }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="stack items-start">
      <p className="text-tech showcase-variant-label text-technical-info">{label}</p>
      {visible ? (
        fixed ? (
          <div className="showcase-fixed-host">
            <CookieBanner fixed preview onDismiss={() => setVisible(false)} />
          </div>
        ) : (
          <CookieBanner preview onDismiss={() => setVisible(false)} />
        )
      ) : (
        <FilledButton type="button" onClick={() => setVisible(true)}>
          Показать banner
        </FilledButton>
      )}
    </div>
  );
}

function ComponentShowcasePage() {
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
          <p className="text-tech text-technical-info">Design system / песочница</p>
          <h1 className="text-hero mt-6">COMPONENT SHOWCASE</h1>
          <p className="text-body-main mt-4 max-w-2xl">
            Все варианты компонентов дизайн-системы в одном месте. Responsive-варианты
            (Footer, типографика) показаны явно — desktop и tablet рядом.
          </p>
          <p className="text-tech mt-5 text-technical-info">
            Маршрут песочницы: <code>/design-system</code> (не путать с кейсом{" "}
            <code>/projects/design-system</code>).
          </p>
          <nav className="stack mt-5 text-tech text-technical-info" aria-label="Компоненты">
            <a className="showcase-toc-link" href="#color-tokens">
              Color tokens
            </a>
            <a className="showcase-toc-link" href="#typography">
              Typography check
            </a>
            <a className="showcase-toc-link" href="#assets">
              Assets and shadow check
            </a>
            <a className="showcase-toc-link" href="#link-button">
              Link button
            </a>
            <a className="showcase-toc-link" href="#floating-button">
              Floating button
            </a>
            <a className="showcase-toc-link" href="#contact-button">
              Contact button
            </a>
            <a className="showcase-toc-link" href="#filled-button">
              Filled button
            </a>
            <a className="showcase-toc-link" href="#cookie-banner">
              Cookie banner
            </a>
            <a className="showcase-toc-link" href="#modal">
              Modal
            </a>
            <a className="showcase-toc-link" href="#tag">
              Tag
            </a>
            <a className="showcase-toc-link" href="#text-block">
              Text block
            </a>
            <a className="showcase-toc-link" href="#accordion">
              Accordion (stack)
            </a>
            <a className="showcase-toc-link" href="#experience-block">
              Experience block
            </a>
            <a className="showcase-toc-link" href="#header">
              Header
            </a>
            <a className="showcase-toc-link" href="#headline">
              Headline
            </a>
            <a className="showcase-toc-link" href="#block">
              Block
            </a>
            <a className="showcase-toc-link" href="#progressive-disclosure">
              Progressive disclosure card
            </a>
            <a className="showcase-toc-link" href="#project-card">
              Project card
            </a>
            <a className="showcase-toc-link" href="#footer">
              Footer
            </a>
          </nav>
        </section>

        <section
          id="color-tokens"
          className="rounded-2xl border border-structural-line bg-surface p-8"
        >
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

        <section
          id="typography"
          className="rounded-2xl border border-structural-line bg-surface p-8"
        >
          <h2 className="text-block mb-5">Typography check</h2>
          <p className="text-body-small text-technical-info mb-5">
            Брейкпоинты: mobile ≤699px, tablet 700–1279px, desktop ≥1280px. Ниже — живой
            превью (меняется при ресайзе окна) и таблицы по брейкпоинтам.
          </p>

          <div className="rounded-xl border border-technical-line bg-base-bg p-6">
            <p className="text-tech mb-4 text-technical-info">Live preview (responsive)</p>
            <p className="text-hero">Hero / Alumni Sans SC</p>
            <p className="text-subhero mt-4">Subhero / Alumni Sans SC</p>
            <p className="text-block mt-4">Block / Alumni Sans SC</p>
            <p className="text-body-main mt-4">Body main / Alumni Sans</p>
            <p className="text-body-small mt-3 text-technical-info">Body small / Alumni Sans</p>
            <p className="text-tech mt-3 text-technical-info">
              Tech / GOST Type AU / 130% / 5%
            </p>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            <div className="rounded-xl border border-technical-line bg-base-bg p-5">
              <p className="text-tech mb-3 text-technical-info">Desktop ≥1280px</p>
              <ul className="stack text-tech text-technical-info">
                <li>Hero / Alumni Sans SC / 56</li>
                <li>Subhero / Alumni Sans SC / 32</li>
                <li>Block / Alumni Sans SC / 24</li>
                <li>Body main / Alumni Sans / 18</li>
                <li>Body small / Alumni Sans / 16</li>
                <li>Tech / GOST Type AU / 14 / 130% / 5%</li>
              </ul>
            </div>

            <div className="rounded-xl border border-technical-line bg-base-bg p-5">
              <p className="text-tech mb-3 text-technical-info">Tablet 700–1279px</p>
              <ul className="stack text-tech text-technical-info">
                <li>Hero / Alumni Sans SC / 48</li>
                <li>Subhero / Alumni Sans SC / 28</li>
                <li>Block / Alumni Sans SC / 20</li>
                <li>Body main / Alumni Sans / 17</li>
                <li>Body small / Alumni Sans / 15</li>
                <li>Tech / GOST Type AU / 13 / 130% / 5%</li>
              </ul>
            </div>

            <div className="rounded-xl border border-technical-line bg-base-bg p-5">
              <p className="text-tech mb-3 text-technical-info">Mobile ≤699px</p>
              <ul className="stack text-tech text-technical-info">
                <li>Hero / Alumni Sans SC / 36</li>
                <li>Subhero / Alumni Sans SC / 24</li>
                <li>Block / Alumni Sans SC / 18</li>
                <li>Body main / Alumni Sans / 16</li>
                <li>Body small / Alumni Sans / 14</li>
                <li>Tech / GOST Type AU / 12 / 130% / 5%</li>
              </ul>
            </div>
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

        <section
          id="assets"
          className="rounded-2xl border border-structural-line bg-surface p-8"
        >
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
                <img src="/icons/x-close.svg" alt="close icon" className="h-[18px] w-[18px]" />
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

        <section
          id="link-button"
          className="rounded-2xl border border-structural-line bg-surface p-8"
        >
          <h2 className="text-block mb-5">Link button component</h2>
          <p className="text-body-small text-technical-info mb-5">
            Размер текста фиксированный — body small desktop (16px), не масштабируется по
            брейкпоинтам.
          </p>
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

        <section
          id="floating-button"
          className="rounded-2xl border border-structural-line bg-surface p-8"
        >
          <h2 className="text-block mb-5">Floating button component</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-technical-line bg-base-bg p-4">
              <p className="text-tech mb-4 text-technical-info">default</p>
              <FloatingButton state="default">Btn</FloatingButton>
            </div>

            <div className="rounded-xl border border-technical-line bg-base-bg p-4">
              <p className="text-tech mb-4 text-technical-info">hover</p>
              <FloatingButton state="hover">Btn</FloatingButton>
            </div>

            <div className="rounded-xl border border-technical-line bg-base-bg p-4">
              <p className="text-tech mb-4 text-technical-info">disabled</p>
              <FloatingButton state="disabled">Btn</FloatingButton>
            </div>

            <div className="rounded-xl border border-technical-line bg-base-bg p-4">
              <p className="text-tech mb-4 text-technical-info">interactive + icon</p>
              <FloatingButton iconSrc="/icons/arrow-left.svg" onClick={() => {}}>
                назад
              </FloatingButton>
            </div>
          </div>
        </section>

        <section
          id="contact-button"
          className="rounded-2xl border border-structural-line bg-surface p-8"
        >
          <h2 className="text-block mb-5">Contact button component</h2>
          <p className="text-body-small text-technical-info mb-5">
            44×44px — подложка с линиями (floating-shell), внутри плашка 32×32px с иконкой 24×24px.
            Default — surface, pressed — light_accent. Без теней и анимаций.
          </p>
          <div className="rounded-xl border border-technical-line bg-base-bg p-6">
            <p className="text-tech showcase-variant-label text-technical-info">default</p>
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <ContactButton variant="telegram" state="default" />
              <ContactButton variant="behance" state="default" />
              <ContactButton variant="linkedin" state="default" />
              <ContactButton variant="email" state="default" />
            </div>

            <p className="text-tech showcase-variant-label text-technical-info">pressed (tap)</p>
            <div className="flex flex-wrap items-center gap-4">
              <ContactButton variant="telegram" state="pressed" />
              <ContactButton variant="behance" state="pressed" />
              <ContactButton variant="linkedin" state="pressed" />
              <ContactButton variant="email" state="pressed" />
            </div>
          </div>
        </section>

        <section
          id="filled-button"
          className="rounded-2xl border border-structural-line bg-surface p-8"
        >
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

        <section
          id="cookie-banner"
          className="rounded-2xl border border-structural-line bg-surface p-8"
        >
          <h2 className="text-block mb-5">Cookie banner component</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="showcase-panel">
              <CookieShowcaseDemo label="inline (в потоке страницы)" />
            </div>
            <div className="showcase-panel">
              <CookieShowcaseDemo fixed label="fixed (как на сайте, position: fixed)" />
            </div>
          </div>
        </section>

        <section
          id="modal"
          className="rounded-2xl border border-structural-line bg-surface p-8"
        >
          <h2 className="text-block mb-5">Modal component</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="showcase-panel">
              <ModalShowcaseDemo label="inline (в потоке)" />
            </div>
            <div className="showcase-panel">
              <ModalShowcaseDemo overlay label="overlay (поверх страницы)" />
            </div>
          </div>
        </section>

        <section id="tag" className="rounded-2xl border border-structural-line bg-surface p-8">
          <h2 className="text-block mb-5">Tag component</h2>
          <div className="showcase-panel">
            <div className="stack items-start">
              <Tag tone="nda">NDA</Tag>
              <Tag tone="web">web</Tag>
              <Tag tone="webMobile">web+mobile</Tag>
              <Tag tone="mobile">mobile</Tag>
              <Tag tone="uxUi">UX/UI design</Tag>
              <Tag tone="code">code</Tag>
            </div>
          </div>
        </section>

        <section
          id="text-block"
          className="rounded-2xl border border-structural-line bg-surface p-8"
        >
          <h2 className="text-block mb-5">Text block component</h2>
          <div className="showcase-panel">
            <div className="stack items-start">
              <div>
                <p className="text-tech showcase-variant-label text-technical-info">
                  plain / primary_text
                </p>
                <TextBlock variant="plain" text="текстовая строка с аббревиатурой B2B SaaS" />
              </div>

              <div>
                <p className="text-tech showcase-variant-label text-technical-info">
                  plain / technical_info
                </p>
                <TextBlock
                  variant="plain"
                  textTone="technical-info"
                  text="второй абзац с техническим цветом текста"
                />
              </div>

              <div>
                <p className="text-tech showcase-variant-label text-technical-info">list</p>
                <TextBlock
                  variant="list"
                  title="заголовок списка"
                  listItems={["первый пункт списка", "второй пункт"]}
                />
              </div>

              <div>
                <p className="text-tech showcase-variant-label text-technical-info">
                  description
                </p>
                <TextBlock
                  variant="description"
                  title="заголовок блока"
                  description="описание с аббревиатурой UX/UI"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="accordion"
          className="rounded-2xl border border-structural-line bg-surface p-8"
        >
          <h2 className="text-block mb-5">Accordion component (stack)</h2>
          <p className="text-body-small text-technical-info mb-5">
            Tablet: стек gap 8px, дивайдеры 0.3px structural_line, закрытый 44px, открытый —
            8px до/после контента, gap 4px внутри.
          </p>
          <div className="rounded-xl border border-technical-line bg-base-bg p-6">
            <AccordionStack items={accordionItems} />
          </div>
        </section>

        <section
          id="experience-block"
          className="rounded-2xl border border-structural-line bg-surface p-8"
        >
          <h2 className="text-block mb-5">Experience block component</h2>
          <p className="text-body-small text-technical-info mb-5">
            Tablet: YEAR + COMPANY (128px, gap 4px) → 8px → ROLE + DESCRIPTION (до края области).
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="showcase-panel">
              <p className="text-tech showcase-variant-label text-technical-info">single</p>
              <ExperienceBlock />
            </div>
            <div className="showcase-panel">
              <p className="text-tech showcase-variant-label text-technical-info">stack</p>
              <ExperienceStack items={experienceShowcaseItems} />
            </div>
          </div>
        </section>

        <section
          id="header"
          className="rounded-2xl border border-structural-line bg-surface p-8"
        >
          <h2 className="text-block mb-5">Header component</h2>
          <div className="stack mb-5 text-body-small text-technical-info">
            <p>
              <span className="text-tech">desktop</span> ≥1280px — 1200px, высота 58px, padding
              20px.
            </p>
            <p>
              <span className="text-tech">tablet</span> 700–1279px — на всю контентную зону,
              высота 58px, padding по горизонтали 16px.
            </p>
            <p>
              <span className="text-tech">mobile</span> 320–699px — как tablet, высота 38px,
              padding по горизонтали 16px.
            </p>
          </div>
          <div className="stack">
            <div>
              <p className="text-tech showcase-variant-label text-technical-info">desktop</p>
              <div className="showcase-header--desktop showcase-panel">
                <Header />
              </div>
            </div>
            <div>
              <p className="text-tech showcase-variant-label text-technical-info">tablet</p>
              <div className="showcase-tablet-shell showcase-header--tablet showcase-panel">
                <Header />
              </div>
            </div>
            <div>
              <p className="text-tech showcase-variant-label text-technical-info">mobile</p>
              <div className="showcase-mobile-shell showcase-header--mobile showcase-panel">
                <Header />
              </div>
            </div>
          </div>
        </section>

        <section
          id="headline"
          className="rounded-2xl border border-structural-line bg-surface p-8"
        >
          <h2 className="text-block mb-5">Headline component</h2>
          <div className="rounded-xl border border-technical-line bg-base-bg p-6">
            <Headline header="HEADER" subheader="SUBHEADER" />
          </div>
        </section>

        <section id="block" className="rounded-2xl border border-structural-line bg-surface p-8">
          <h2 className="text-block mb-5">Block component</h2>
          <div className="showcase-panel">
            <Block title="BLOCK HEADER" linkLabel="Посмотреть все" borders={{ top: true, bottom: true }}>
              <BlockSlot className="ds-block-slot--demo">Слот 1</BlockSlot>
              <BlockSlot className="ds-block-slot--demo">Слот 2</BlockSlot>
              <BlockSlot className="ds-block-slot--demo">Слот 3</BlockSlot>
            </Block>
          </div>
        </section>

        <section
          id="progressive-disclosure"
          className="rounded-2xl border border-structural-line bg-surface p-8"
        >
          <h2 className="text-block mb-5">Progressive disclosure card</h2>
          <p className="text-body-small text-technical-info mb-5">
            Tablet-компонент: подложка как у Floating button, headline — text-block /
            structure_text. Surface → контент 20px; HEADLINE → Block 16px; стек — стандартный
            stack-gap; Block — padding сверху/снизу 20px, без боковых.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="showcase-panel">
              <p className="text-tech showcase-variant-label text-technical-info">collapsed</p>
              <ProgressiveDisclosureCard title="HEADLINE" open={false} onToggle={() => {}}>
                <Block title="BLOCK COMPONENT" />
                <Block title="BLOCK COMPONENT" />
              </ProgressiveDisclosureCard>
            </div>
            <div className="showcase-panel">
              <p className="text-tech showcase-variant-label text-technical-info">expanded</p>
              <ProgressiveDisclosureCard title="HEADLINE" open onToggle={() => {}}>
                <Block title="BLOCK COMPONENT" />
                <Block title="BLOCK COMPONENT" />
              </ProgressiveDisclosureCard>
            </div>
          </div>
        </section>

        <section
          id="project-card"
          className="rounded-2xl border border-structural-line bg-surface p-8"
        >
          <h2 className="text-block mb-5">Project card component</h2>
          <div className="stack mb-5 text-body-small text-technical-info">
            <p>
              <span className="text-tech">desktop / tablet</span> ≥700px — горизонтальная сетка,
              padding 20px сверху/снизу.
            </p>
            <p>
              <span className="text-tech">mobile</span> 320–699px — заголовок + jump-иконка,
              padding 16/16/20, картинка 148×148, теги gap 8px, role/name и результат gap 4px,
              типографика mobile.
            </p>
          </div>
          <div className="stack">
            <div>
              <p className="text-tech showcase-variant-label text-technical-info">desktop</p>
              <div className="showcase-panel">
                <ProjectCard
                  tags={[
                    { label: "NDA", tone: "nda" },
                    { label: "web", tone: "web" },
                    { label: "UX/UI design", tone: "uxUi" },
                  ]}
                  title="TITLE"
                  roleLabel="Моя роль"
                  roleValue="UX/UI дизайнер"
                  resultLabel="Ключевой результат"
                  resultValue="DESCRIPTION"
                />
              </div>
            </div>
            <div>
              <p className="text-tech showcase-variant-label text-technical-info">mobile</p>
              <div className="showcase-mobile-shell showcase-project-card--mobile showcase-panel">
                <ProjectCard
                  imageSrc="/img/pattern.svg"
                  tags={[
                    { label: "NDA", tone: "nda" },
                    { label: "NDA", tone: "nda" },
                    { label: "NDA", tone: "nda" },
                    { label: "NDA", tone: "nda" },
                  ]}
                  title="TITLE"
                  roleLabel="ROLE"
                  roleValue="NAME"
                  resultLabel="ключевой результат"
                  resultValue="DESCRIPTION"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="footer"
          className="rounded-2xl border border-structural-line bg-surface p-8"
        >
          <h2 className="text-block mb-5">Footer component</h2>
          <div className="stack mb-5 text-body-small text-technical-info">
            <p>
              <span className="text-tech">desktop</span> ≥1280px — 1200px, padding 80/60,
              ячейки 44px (padding 20px), соцсети — Link Btn jump.
            </p>
            <p>
              <span className="text-tech">tablet</span> 700–1279px — 700px, 3 строки × 52px,
              padding 60/40, ячейки 16px, contact-кнопки.
            </p>
            <p>
              <span className="text-tech">mobile</span> 320–699px — на всю ширину экрана, 5
              строк × 52px, padding 60/40, ячейки 16px, contact-кнопки.
            </p>
          </div>
          <div className="stack">
            <div>
              <p className="text-tech showcase-variant-label text-technical-info">desktop</p>
              <div className="showcase-footer--desktop showcase-panel">
                <Footer />
              </div>
            </div>
            <div>
              <p className="text-tech showcase-variant-label text-technical-info">tablet</p>
              <div className="showcase-tablet-shell showcase-footer--tablet showcase-panel">
                <Footer />
              </div>
            </div>
            <div>
              <p className="text-tech showcase-variant-label text-technical-info">mobile</p>
              <div className="showcase-mobile-shell showcase-footer--mobile showcase-panel">
                <Footer />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ComponentShowcasePage;
