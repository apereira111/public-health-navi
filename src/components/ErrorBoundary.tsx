import React from "react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: unknown;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error("Global ErrorBoundary caught an error:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
          <div className="max-w-lg w-full space-y-4 text-center">
            <h1 className="text-2xl font-bold">Algo deu errado</h1>
            <p className="text-muted-foreground">Ocorreu um erro inesperado. Tente recarregar a página.</p>
            <div className="flex items-center justify-center gap-3">
              <Button onClick={this.handleReload}>Recarregar</Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children as React.ReactNode;
  }
}

export default ErrorBoundary;
