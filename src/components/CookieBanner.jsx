import FilledButton from "./FilledButton";

function CookieBanner({ text = "text", className = "" }) {
  return (
    <aside className={`cookie-banner-shell ${className}`.trim()} role="status" aria-live="polite">
      <div className="cookie-banner-content shadow-soft">
        <p className="text-tech text-primary-text">{text}</p>
        <FilledButton state="default">OK</FilledButton>
      </div>
    </aside>
  );
}

export default CookieBanner;
