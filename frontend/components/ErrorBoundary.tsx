'use client';

import { Component, type ReactNode } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

function ErrorFallback() {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-full flex-col items-center justify-center px-4 py-16">
      <h1 className="text-xl font-semibold text-foreground">{t('something_went_wrong')}</h1>
      <p className="mt-2 max-w-md text-center text-sm text-muted">{t('error_refresh_message')}</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="btn-primary mt-6 w-auto px-8"
      >
        {t('try_again')}
      </button>
    </div>
  );
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
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
