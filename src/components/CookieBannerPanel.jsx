import FilledButton from "./FilledButton";
import LinkButton from "./LinkButton";
import { typograph } from "../utils/typography";

function CookieBannerPanel({ onDismiss, okClassName = "" }) {
  return (
    <div className="cookie-banner-content shadow-soft">
      <p id="cookie-banner-title" className="cookie-banner-text text-tech text-primary-text">
        {typograph(
          "Сайт использует cookie-файлы и сервис веб-аналитики Яндекс.Метрика для улучшения работы сайта. Продолжая использование сайта, вы даете свое",
        )}{" "}
        <LinkButton variant="inline" to="/legal">
          Согласие на обработку персональных данных
        </LinkButton>{" "}
        {typograph("в соответствии с")}{" "}
        <LinkButton variant="inline" to="/legal">
          Политикой обработки персональных данных
        </LinkButton>
      </p>
      <FilledButton type="button" onClick={onDismiss} className={okClassName}>
        OK
      </FilledButton>
    </div>
  );
}

export default CookieBannerPanel;
