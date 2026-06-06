const CONTACT_LABELS = {
  telegram: "Telegram",
  behance: "Behance",
  linkedin: "LinkedIn",
  email: "E-mail",
};

const CONTACT_ICON_SRC = {
  telegram: "/icons/telegram.svg",
  behance: "/icons/behance.svg",
  linkedin: "/icons/linkedin.svg",
  email: "/icons/mail-01.svg",
};

function ContactButton({
  variant = "telegram",
  state,
  href,
  className = "",
  ...props
}) {
  const label = CONTACT_LABELS[variant] ?? variant;
  const isStaticPreview = state !== undefined;
  const plateClass = [
    "contact-btn-plate",
    isStaticPreview
      ? state === "pressed"
        ? "contact-btn-plate--pressed"
        : "contact-btn-plate--default"
      : "contact-btn-plate--interactive",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const icon = (
    <img
      src={CONTACT_ICON_SRC[variant]}
      alt=""
      className="contact-btn-icon"
      aria-hidden="true"
    />
  );

  const shellClass = "contact-btn-shell floating-shell floating-shell-accent";

  if (href && !isStaticPreview) {
    return (
      <div className={shellClass}>
        <a
          href={href}
          className={plateClass}
          aria-label={label}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          {...props}
        >
          {icon}
        </a>
      </div>
    );
  }

  return (
    <div className={shellClass}>
      <button type="button" className={plateClass} aria-label={label} {...props}>
        {icon}
      </button>
    </div>
  );
}

export default ContactButton;
