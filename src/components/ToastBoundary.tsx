import React from "react";

interface ToastBoundaryProps {
  children: React.ReactNode;
}

interface ToastBoundaryState {
  hasError: boolean;
}

class ToastBoundary extends React.Component<ToastBoundaryProps, ToastBoundaryState> {
  constructor(props: ToastBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ToastBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    console.error("[ToastBoundary] Error in Toaster subtree:", error, info);
  }

  render() {
    if (this.state.hasError) {
      // Swallow toast subtree errors to avoid crashing the whole app
      return null;
    }

    return this.props.children as React.ReactNode;
  }
}

export default ToastBoundary;
