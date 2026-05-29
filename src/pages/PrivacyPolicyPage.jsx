import SiteLayout from "../components/SiteLayout";
import Headline from "../components/Headline";
import TextBlock from "../components/TextBlock";

function PrivacyPolicyPage() {
  return (
    <SiteLayout>
      <main className="legal-page">
        <Headline
          header="Политика в отношении обработки персональных данных"
          subheader="Порядок сбора, хранения и защиты данных"
        />

        <div className="legal-page-content">
          <TextBlock
            variant="plain"
            text="Настоящая политика определяет порядок обработки и защиты персональных данных пользователей сайта портфолио Екатерины Земцовой."
          />

          <TextBlock
            variant="list"
            title="Какие данные могут обрабатываться"
            listItems={[
              "имя и контактные данные, указанные в формах",
              "адрес электронной почты",
              "технические данные о посещении сайта",
            ]}
          />

          <TextBlock
            variant="description"
            title="Контакты по вопросам персональных данных"
            description="По вопросам обработки персональных данных можно написать на quattrokate@gmail.com."
          />
        </div>
      </main>
    </SiteLayout>
  );
}

export default PrivacyPolicyPage;
