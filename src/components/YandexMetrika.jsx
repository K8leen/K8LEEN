import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { COOKIE_BANNER_STORAGE_KEY } from "../hooks/useCookieBanner";
import { YANDEX_METRIKA_COUNTER_ID } from "../config/analytics";
import { hitYandexMetrika, initYandexMetrika } from "../utils/yandexMetrika";

const COUNTER_ID = YANDEX_METRIKA_COUNTER_ID;

function hasAnalyticsConsent() {
  return localStorage.getItem(COOKIE_BANNER_STORAGE_KEY) === "1";
}

function YandexMetrika() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (!COUNTER_ID) return undefined;

    const syncMetrika = () => {
      if (!hasAnalyticsConsent()) return;
      initYandexMetrika(COUNTER_ID);
      hitYandexMetrika(COUNTER_ID, `${pathname}${search}`);
    };

    syncMetrika();

    window.addEventListener("cookie-consent-granted", syncMetrika);
    window.addEventListener("pageshow", syncMetrika);

    return () => {
      window.removeEventListener("cookie-consent-granted", syncMetrika);
      window.removeEventListener("pageshow", syncMetrika);
    };
  }, [pathname, search]);

  return null;
}

export default YandexMetrika;
