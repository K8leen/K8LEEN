import SiteLayout from "../components/SiteLayout";
import Headline from "../components/Headline";
import TextBlock from "../components/TextBlock";

function ConsentPage() {
  return (
    <SiteLayout>
      <main className="legal-page">
        <Headline
          header="Согласие на обработку персональных данных"
          subheader="Документ для пользователей сайта"
        />

        <div className="legal-page-content">
          <TextBlock
            variant="plain"
            text="Настоящим я, оставляя данные на сайте, даю согласие владельцу сайта на обработку моих персональных данных, указанных при заполнении форм или при использовании сервисов сайта."
          />

          <TextBlock
            variant="list"
            title="Цели обработки"
            listItems={[
              "обработка входящих обращений и сообщений",
              "предоставление запрашиваемой информации",
              "улучшение качества работы сайта",
            ]}
          />

          <TextBlock
            variant="description"
            title="Срок действия согласия"
            description="Согласие действует до момента его отзыва. Отозвать согласие можно, направив запрос на электронную почту quattrokate@gmail.com."
          />
        </div>
      </main>
    </SiteLayout>
  );
}

export default ConsentPage;
