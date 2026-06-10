import ContactButton from "./ContactButton";
import LinkButton from "./LinkButton";

const RESUME_URL =
  "https://hh.ru/resume_converter/%D0%97%D0%B5%D0%BC%D1%86%D0%BE%D0%B2%D0%B0%20%D0%95%D0%BA%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B0%20%D0%92%D1%8F%D1%87%D0%B5%D1%81%D0%BB%D0%B0%D0%B2%D0%BE%D0%B2%D0%BD%D0%B0.pdf?hash=7826058fff0cc9c20b0039ed1f554e4e51534b&type=pdf&hhtmFrom=resume&hhtmSource=resume";

function FooterCell({ children, className = "", ...props }) {
  return (
    <div className={`site-footer-cell ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

function FooterContactButtons({ className }) {
  return (
    <div className={className}>
      <ContactButton variant="telegram" href="https://t.me/K8leen" />
      <ContactButton variant="behance" href="https://www.behance.net/quattrokate" />
      <ContactButton variant="linkedin" href="https://www.linkedin.com/in/k8leen/" />
      <ContactButton variant="email" href="mailto:quattrokate@gmail.com" />
    </div>
  );
}

function FooterMobileIntro() {
  return (
    <>
      <FooterCell className="site-footer-mobile__name">
        <span className="text-body-small text-primary-text">Екатерина Земцова</span>
      </FooterCell>

      <FooterCell className="site-footer-mobile__role">
        <span className="text-body-small text-technical-info">Product &amp; System Designer</span>
      </FooterCell>
    </>
  );
}

function FooterMobileInfoLegal() {
  return (
    <div className="site-footer-mobile__info-legal">
      <FooterCell className="site-footer-mobile__copyright site-footer-cell--hug">
        <span className="text-body-small text-primary-text">© 2026</span>
      </FooterCell>

      <FooterCell className="site-footer-mobile__legal">
        <LinkButton variant="inline" to="/legal">
          Правовая информация
        </LinkButton>
      </FooterCell>
    </div>
  );
}

function FooterMobileResume() {
  return (
    <FooterCell className="site-footer-mobile__resume">
      <LinkButton variant="inline" href={RESUME_URL}>
        Скачать резюме (HH)
      </LinkButton>
    </FooterCell>
  );
}

function FooterMobileContacts() {
  return (
    <FooterCell className="site-footer-mobile__contacts">
      <FooterContactButtons className="site-footer-mobile__contact-buttons" />
    </FooterCell>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-columns site-footer-columns--desktop">
        <div className="site-footer-col site-footer-col--left">
          <FooterCell>
            <span className="text-body-small text-primary-text">Екатерина Земцова</span>
          </FooterCell>

          <FooterCell>
            <span className="text-tech text-technical-info">
              Product systems / Dashboard UX / Design systems
            </span>
          </FooterCell>

          <div className="site-footer-row">
            <FooterCell className="site-footer-cell--hug">
              <span className="text-body-small text-primary-text">© 2026</span>
            </FooterCell>
            <FooterCell className="site-footer-cell--fill">
              <LinkButton variant="inline" to="/legal">
                Согласие на обработку персональных данных
              </LinkButton>
            </FooterCell>
            <FooterCell className="site-footer-cell--fill">
              <LinkButton variant="inline" to="/legal">
                Политика в отношении обработки персональных данных
              </LinkButton>
            </FooterCell>
          </div>
        </div>

        <div className="site-footer-col site-footer-col--right">
          <FooterCell>
            <span className="text-body-small text-technical-info">Product &amp; System Designer</span>
          </FooterCell>

          <div className="site-footer-row">
            <FooterCell className="site-footer-cell--w-123">
              <LinkButton variant="jump" href="https://t.me/K8leen">
                Telegram
              </LinkButton>
            </FooterCell>
            <FooterCell className="site-footer-cell--w-123">
              <LinkButton variant="jump" href="mailto:quattrokate@gmail.com">
                E-mail
              </LinkButton>
            </FooterCell>
            <FooterCell className="site-footer-cell--fill" aria-hidden="true" />
          </div>

          <div className="site-footer-row">
            <FooterCell className="site-footer-cell--w-123">
              <LinkButton variant="jump" href="https://www.behance.net/quattrokate">
                Behance
              </LinkButton>
            </FooterCell>
            <FooterCell className="site-footer-cell--w-123">
              <LinkButton variant="jump" href="https://www.linkedin.com/in/k8leen/">
                LinkedIn
              </LinkButton>
            </FooterCell>
            <FooterCell className="site-footer-cell--fill">
              <LinkButton variant="inline" href={RESUME_URL}>
                Скачать резюме (HH)
              </LinkButton>
            </FooterCell>
          </div>
        </div>
      </div>

      <div className="site-footer-tablet">
        <FooterCell className="site-footer-tablet__name">
          <span className="text-body-small text-primary-text">Екатерина Земцова</span>
        </FooterCell>

        <FooterCell className="site-footer-tablet__role">
          <span className="text-body-small text-technical-info">Product &amp; System Designer</span>
        </FooterCell>

        <FooterCell className="site-footer-tablet__tagline">
          <span className="text-tech text-technical-info">
            Product systems / Dashboard UX / Design systems
          </span>
        </FooterCell>

        <FooterCell className="site-footer-tablet__contacts">
          <FooterContactButtons className="site-footer-tablet__contact-buttons" />
        </FooterCell>

        <div className="site-footer-tablet__info-legal">
          <FooterCell className="site-footer-tablet__copyright site-footer-cell--hug">
            <span className="text-body-small text-primary-text">© 2026</span>
          </FooterCell>

          <FooterCell className="site-footer-tablet__legal">
            <LinkButton variant="inline" to="/legal">
              Правовая информация
            </LinkButton>
          </FooterCell>
        </div>

        <FooterCell className="site-footer-tablet__resume site-footer-cell--fill">
          <LinkButton variant="inline" href={RESUME_URL}>
            Скачать резюме (HH)
          </LinkButton>
        </FooterCell>
      </div>

      <div className="site-footer-mobile site-footer-mobile--narrow">
        <FooterMobileIntro />
        <FooterMobileContacts />
        <FooterMobileResume />
        <FooterMobileInfoLegal />
      </div>

      <div className="site-footer-mobile site-footer-mobile--wide">
        <FooterMobileIntro />
        <FooterMobileResume />
        <FooterMobileContacts />
        <FooterMobileInfoLegal />
      </div>
    </footer>
  );
}

export default Footer;
