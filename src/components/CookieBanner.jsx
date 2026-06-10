import CookieBannerPanel from "./CookieBannerPanel";
import useCookieBanner from "../hooks/useCookieBanner";

function CookieBanner({ fixed = false, preview = false, onDismiss, className = "" }) {
  const { visible, dismiss } = useCookieBanner({ preview, onDismiss });

  if (!visible) return null;

  const banner = (
    <aside
      className={`cookie-banner-shell cookie-hatch-bg ${className}`.trim()}
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-live="polite"
    >
      <CookieBannerPanel onDismiss={dismiss} />
    </aside>
  );

  if (fixed) {
    return <div className="cookie-banner-anchor">{banner}</div>;
  }

  return banner;
}

export default CookieBanner;
