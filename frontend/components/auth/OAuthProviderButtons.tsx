'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { startOAuthSignIn, type OAuthProvider } from '@/lib/auth/oauth';
import type { UserType } from '@/lib/types/auth';

interface OAuthProviderButtonsProps {
  userType: UserType;
  disabled?: boolean;
}

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C4.79 15.25 3.8 10.54 6.53 7.72c1.19-1.3 3.05-2.04 4.81-1.93 1.19.1 2.05.58 3.1.58 1.01 0 1.64-.47 3.1-.58 1.4-.12 2.77.56 3.77 1.72-3.31 1.82-2.77 6.58.74 7.77-.57 1.48-1.31 2.95-2 4.06zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

export function OAuthProviderButtons({ userType, disabled = false }: OAuthProviderButtonsProps) {
  const [error, setError] = useState<string | null>(null);
  const [pendingProvider, setPendingProvider] = useState<OAuthProvider | null>(null);
  const { t } = useLanguage();

  async function handleProvider(provider: OAuthProvider) {
    if (disabled || pendingProvider) return;

    setError(null);
    setPendingProvider(provider);

    try {
      await startOAuthSignIn(provider, userType);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Social sign-in is unavailable. Check Supabase OAuth configuration.';
      setError(message);
      setPendingProvider(null);
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        disabled={disabled || pendingProvider !== null}
        onClick={() => void handleProvider('google')}
        className="oauth-provider-btn"
      >
        <GoogleIcon />
        <span>{pendingProvider === 'google' ? t('redirecting') : t('continue_with_google')}</span>
      </button>

      <button
        type="button"
        disabled={disabled || pendingProvider !== null}
        onClick={() => void handleProvider('apple')}
        className="oauth-provider-btn"
      >
        <AppleIcon />
        <span>{pendingProvider === 'apple' ? t('redirecting') : t('continue_with_apple')}</span>
      </button>

      {error ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
