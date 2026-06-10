import CookieBannerPanel from "./CookieBannerPanel";
import useCookieBanner from "../hooks/useCookieBanner";

function CookieBannerMobile({ fixed = false, preview = false, onDismiss, className = "" }) {
  const { visible, dismiss } = useCookieBanner({ preview, onDismiss });

  if (!visible) return null;

  const banner = (
    <aside
      className={`cookie-banner-shell cookie-banner-shell--mobile cookie-hatch-bg ${className}`.trim()}
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-live="polite"
    >
      <CookieBannerPanel onDismiss={dismiss} okClassName="cookie-banner-mobile__ok" />
    </aside>
  );

  if (fixed) {
    return <div className="cookie-banner-anchor cookie-banner-anchor--mobile">{banner}</div>;
  }

  return banner;
}

export default CookieBannerMobile;
