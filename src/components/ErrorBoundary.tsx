import React from "react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: unknown;
  info?: React.ErrorInfo;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    console.error("Global ErrorBoundary caught an error:", error, info);
    this.setState({ info });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleContinue = () => {
    // tenta limpar o estado de erro e continuar
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const err = this.state.error as any;
      const toSafeString = (val: any): string => {
        if (val === null || val === undefined) return "";
        if (typeof val === "string") return val;
        try { return JSON.stringify(val, null, 2); } catch { return String(val); }
      };
      const rawMessage = (err && (typeof err.message !== "undefined" ? err.message : err));
      const message = toSafeString(rawMessage) || "Erro desconhecido";
      const stack = (err && typeof err.stack === "string") ? err.stack : "";
      return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
          <div className="max-w-2xl w-full space-y-4 text-center">
            <h1 className="text-2xl font-bold">Algo deu errado</h1>
            <p className="text-muted-foreground">Ocorreu um erro inesperado. Você pode tentar continuar ou recarregar a página.</p>
            <div className="flex items-center justify-center gap-3">
              <Button onClick={this.handleContinue} variant="outline">Tentar continuar</Button>
              <Button onClick={this.handleReload}>Recarregar</Button>
            </div>
            <div className="text-left mt-4 p-3 rounded border">
              <p className="text-sm font-medium">Detalhes do erro</p>
              <pre className="text-xs whitespace-pre-wrap text-muted-foreground mt-2">
                {message}
                {stack ? `\n${stack}` : ""}
                {this.state.info?.componentStack ? `\nComponent stack:\n${this.state.info.componentStack}` : ""}
              </pre>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children as React.ReactNode;
  }
}

export default ErrorBoundary;
