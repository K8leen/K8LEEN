import { useLocation } from "react-router-dom";
import LinkButton from "./LinkButton";

function Header({ className = "" }) {
  const { pathname } = useLocation();
  const isAboutActive = pathname === "/";
  const isProjectsActive =
    pathname === "/projects" || pathname.startsWith("/projects/");

  return (
    <header className={`site-header ${className}`.trim()}>
      <span className="text-body-small text-primary-text">Екатерина Земцова</span>

      <nav className="site-header-nav" aria-label="Основная навигация">
        <LinkButton
          variant="default"
          to={isAboutActive ? undefined : "/"}
          active={isAboutActive}
        >
          Обо мне
        </LinkButton>
        <LinkButton variant="default" to="/#projects" active={isProjectsActive}>
          Проекты
        </LinkButton>
      </nav>
    </header>
  );
}

export default Header;
