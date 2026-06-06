'use client';

import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('UI error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-full flex-col items-center justify-center px-4 py-16">
          <h1 className="text-xl font-semibold text-foreground">
            Something went wrong
          </h1>
          <p className="mt-2 max-w-md text-center text-sm text-muted">
            We hit an unexpected error. Try refreshing the page.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn-primary mt-6 w-auto px-8"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
