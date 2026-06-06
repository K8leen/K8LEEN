import { useEffect, useState } from "react";
import FilledButton from "./FilledButton";
import LinkButton from "./LinkButton";

const STORAGE_KEY = "k8leen-cookie-banner-dismissed";

function CookieBanner({ fixed = false, preview = false, onDismiss, className = "" }) {
  const [visible, setVisible] = useState(preview ? true : null);

  useEffect(() => {
    if (preview) return;
    setVisible(localStorage.getItem(STORAGE_KEY) !== "1");
  }, [preview]);

  const dismiss = () => {
    if (!preview) {
      localStorage.setItem(STORAGE_KEY, "1");
    }
    setVisible(false);
    onDismiss?.();
  };

  if (visible !== true) return null;

  const banner = (
    <aside
      className={`cookie-banner-shell cookie-hatch-bg ${className}`.trim()}
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-live="polite"
    >
      <div className="cookie-banner-content shadow-soft">
        <p id="cookie-banner-title" className="cookie-banner-text text-tech text-primary-text">
          Сайт использует cookie-файлы и сервис веб-аналитики Яндекс.Метрика для улучшения
          работы сайта. Продолжая использование сайта, вы даете свое{" "}
          <LinkButton variant="inline" to="/legal">
            Согласие на обработку персональных данных
          </LinkButton>{" "}
          в соответствии с{" "}
          <LinkButton variant="inline" to="/legal">
            Политикой обработки персональных данных
          </LinkButton>
        </p>
        <FilledButton type="button" onClick={dismiss}>
          OK
        </FilledButton>
      </div>
    </aside>
  );

  if (fixed) {
    return <div className="cookie-banner-anchor">{banner}</div>;
  }

  return banner;
}

export default CookieBanner;
