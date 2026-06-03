import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FilledButton from "../components/FilledButton";
import Footer from "../components/Footer";

function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevTitle = document.title;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    document.title = "Страница не найдена";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      document.title = prevTitle;
    };
  }, []);

  return (
    <div className="not-found-page site-layout bg-base-bg text-primary-text">
      <div className="site-layout-inner not-found-page__inner">
        <main className="not-found-page__main" aria-labelledby="not-found-title">
          <div className="not-found-page__stage">
            <div className="stack not-found-page__content">
              <p className="not-found-page__code cookie-hatch-bg" aria-hidden="true">
                404
              </p>

              <div className="stack not-found-page__copy">
                <h1 id="not-found-title" className="text-subhero text-structure-text">
                  Страница не найдена
                </h1>
                <p className="text-body-main text-technical-info">
                  Запрашиваемый адрес не&nbsp;существует или был перемещен
                </p>
              </div>

              <FilledButton type="button" onClick={() => navigate("/")}>
                На главную
              </FilledButton>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default NotFoundPage;
