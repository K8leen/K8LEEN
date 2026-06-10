import { useEffect, useState } from "react";

export const COOKIE_BANNER_STORAGE_KEY = "k8leen-cookie-banner-dismissed";

export default function useCookieBanner({ preview = false, onDismiss } = {}) {
  const [visible, setVisible] = useState(preview ? true : null);

  useEffect(() => {
    if (preview) return;
    setVisible(localStorage.getItem(COOKIE_BANNER_STORAGE_KEY) !== "1");
  }, [preview]);

  const dismiss = () => {
    if (!preview) {
      localStorage.setItem(COOKIE_BANNER_STORAGE_KEY, "1");
    }
    setVisible(false);
    onDismiss?.();
  };

  return { visible: visible === true, dismiss };
}
