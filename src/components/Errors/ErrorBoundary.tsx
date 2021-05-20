import { Component, ErrorInfo } from "react";
import ErrorMessage from "./ErrorMessage";

export default class ErrorBoundary extends Component {
  state = {
    error: null,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error: error.message });
  }

  render() {
    const { error } = this.state;
    return !!error ? (
      <ErrorMessage message={error || "Oops... Something went wrong"} />
    ) : (
      this.props.children
    );
  }
}
