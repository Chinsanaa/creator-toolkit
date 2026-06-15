'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-full flex-col items-center justify-center px-4 py-16">
      <h1 className="text-xl font-semibold text-foreground">{t('something_went_wrong')}</h1>
      <p className="mt-2 max-w-md text-center text-sm text-muted">
        {error.message || t('unexpected_error')}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
      >
        {t('try_again')}
      </button>
    </div>
  );
}
