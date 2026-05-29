import LinkButton from "./LinkButton";

function Header({ className = "" }) {
  return (
    <header className={`site-header ${className}`.trim()}>
      <LinkButton variant="default" to="/">
        Екатерина Земцова
      </LinkButton>

      <nav className="site-header-nav" aria-label="Основная навигация">
        <LinkButton variant="default" to="/#about">
          Обо мне
        </LinkButton>
        <LinkButton variant="default" to="/#projects">
          Проекты
        </LinkButton>
      </nav>
    </header>
  );
}

export default Header;
