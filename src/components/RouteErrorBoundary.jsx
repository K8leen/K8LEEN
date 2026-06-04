import { Component } from "react";
import LinkButton from "./LinkButton";

class RouteErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <main className="legal-page-content mx-auto max-w-xl p-8">
          <h1 className="text-block text-primary-text">Не удалось показать страницу</h1>
          <p className="text-body-main text-technical-info mt-4">
            {this.state.error.message}
          </p>
          <p className="mt-6">
            <LinkButton variant="inline" to="/projects">
              Вернуться к проектам
            </LinkButton>
          </p>
        </main>
      );
    }

    return this.props.children;
  }
}

export default RouteErrorBoundary;
