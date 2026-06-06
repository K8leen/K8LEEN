import { useLocation } from "react-router-dom";
import LinkButton from "./LinkButton";

function Header({ className = "" }) {
  const { pathname } = useLocation();
  const isAboutActive = pathname === "/";
  const isProjectsActive =
    pathname === "/projects" || pathname.startsWith("/projects/");

  return (
    <header className={`site-header ${className}`.trim()}>
      <span className="link-btn-text text-primary-text">Екатерина Земцова</span>

      <nav className="site-header-nav" aria-label="Основная навигация">
        <LinkButton
          variant="inline"
          to={isAboutActive ? undefined : "/"}
          active={isAboutActive}
        >
          Обо мне
        </LinkButton>
        <LinkButton variant="inline" to="/projects" active={isProjectsActive}>
          Проекты
        </LinkButton>
      </nav>
    </header>
  );
}

export default Header;
