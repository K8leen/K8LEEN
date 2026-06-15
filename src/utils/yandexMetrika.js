const METRIKA_SCRIPT_SRC = "https://mc.yandex.ru/metrika/tag.js";

let initializedCounterId = null;

function loadMetrikaScript() {
  if (typeof window === "undefined" || window.ym) return;

  (function (m, e, t, r, i, k, a) {
    m[i] =
      m[i] ||
      function () {
        (m[i].a = m[i].a || []).push(arguments);
      };
    m[i].l = 1 * new Date();
    for (let j = 0; j < document.scripts.length; j += 1) {
      if (document.scripts[j].src === r) return;
    }
    k = e.createElement(t);
    a = e.getElementsByTagName(t)[0];
    k.async = 1;
    k.src = r;
    a.parentNode.insertBefore(k, a);
  })(window, document, "script", METRIKA_SCRIPT_SRC, "ym");
}

export function initYandexMetrika(counterId) {
  const id = Number(counterId);
  if (!id || initializedCounterId === id) return;

  loadMetrikaScript();

  window.ym(id, "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
    ecommerce: "dataLayer",
  });

  initializedCounterId = id;
}

export function hitYandexMetrika(counterId, url) {
  const id = Number(counterId);
  if (!id || initializedCounterId !== id || typeof window.ym !== "function") return;

  window.ym(id, "hit", url);
}
