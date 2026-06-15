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

    const maybeInit = () => {
      if (hasAnalyticsConsent()) {
        initYandexMetrika(COUNTER_ID);
      }
    };

    maybeInit();

    const onConsentGranted = () => {
      initYandexMetrika(COUNTER_ID);
      hitYandexMetrika(COUNTER_ID, `${pathname}${search}`);
    };

    window.addEventListener("cookie-consent-granted", onConsentGranted);

    return () => {
      window.removeEventListener("cookie-consent-granted", onConsentGranted);
    };
  }, []);

  useEffect(() => {
    if (!COUNTER_ID || !hasAnalyticsConsent()) return;

    hitYandexMetrika(COUNTER_ID, `${pathname}${search}`);
  }, [pathname, search]);

  return null;
}

export default YandexMetrika;
