import LinkButton from "../components/LinkButton";
import SiteLayout from "../components/SiteLayout";
import Headline from "../components/Headline";

function HomePage() {
  return (
    <SiteLayout>
      <main className="home-page">
        <Headline
          header="Екатерина Земцова"
          subheader="Product & System Designer"
        />
        <p className="home-page-note text-body-main text-primary-text">
          Главная страница портфолио в разработке. Юридические страницы и контакты доступны в
          футере.
        </p>
        <p className="home-page-note mt-4">
          <LinkButton variant="inline" to="/design-system">
            Открыть песочницу компонентов
          </LinkButton>
        </p>
        <section id="about" className="home-page-section" aria-label="Обо мне" />
        <section id="projects" className="home-page-section" aria-label="Проекты" />
      </main>
    </SiteLayout>
  );
}

export default HomePage;
