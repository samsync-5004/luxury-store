import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            background: "#0a0a0a",
            color: "#c9a84c",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "serif",
            padding: "2rem",
          }}
        >
          <h1
            style={{
              color: "#c9a84c",
              fontSize: "2rem",
              marginBottom: "1rem",
            }}
          >
            REVE ESSENCE NG
          </h1>
          <p style={{ color: "#888", marginBottom: "0.5rem" }}>
            Something went wrong loading the store.
          </p>
          <pre
            style={{
              color: "#555",
              fontSize: "0.75rem",
              maxWidth: "600px",
              overflow: "auto",
              whiteSpace: "pre-wrap",
            }}
          >
            {this.state.error?.message}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "2rem",
              padding: "0.75rem 2rem",
              border: "1px solid #c9a84c",
              background: "transparent",
              color: "#c9a84c",
              cursor: "pointer",
              letterSpacing: "0.2em",
            }}
          >
            RELOAD
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
