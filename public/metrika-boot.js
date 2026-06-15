(function () {
  var CONSENT_KEY = "k8leen-cookie-banner-dismissed";
  var COUNTER_ID = 109871402;

  function hasConsent() {
    try {
      return localStorage.getItem(CONSENT_KEY) === "1";
    } catch (error) {
      return false;
    }
  }

  function initMetrika() {
    if (!hasConsent() || window.__k8leenMetrikaInitialized) return;

    (function (m, e, t, r, i, k, a) {
      m[i] =
        m[i] ||
        function () {
          (m[i].a = m[i].a || []).push(arguments);
        };
      m[i].l = 1 * new Date();
      for (var j = 0; j < document.scripts.length; j += 1) {
        if (document.scripts[j].src === r) return;
      }
      k = e.createElement(t);
      a = e.getElementsByTagName(t)[0];
      k.async = 1;
      k.src = r;
      a.parentNode.insertBefore(k, a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(COUNTER_ID, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      ecommerce: "dataLayer",
    });

    window.__k8leenMetrikaInitialized = true;
  }

  initMetrika();
  window.addEventListener("cookie-consent-granted", initMetrika);
})();
