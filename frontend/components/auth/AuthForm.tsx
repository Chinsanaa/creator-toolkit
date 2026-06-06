'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { LegalConsent } from '@/components/auth/LegalConsent';
import { ApiError } from '@/lib/api/client';

interface Field {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}

interface AuthFormProps {
  title: string;
  subtitle: string;
  fields: Field[];
  submitLabel: string;
  alternateHref: string;
  alternatePrompt: string;
  alternateLabel: string;
  onSubmit: (values: Record<string, string>) => Promise<void>;
  beforeForm?: React.ReactNode;
  legalConsentMode?: 'signup' | 'login';
}

function AuthLogoMark() {
  return (
    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-landing-fg text-white">
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M3 12L21 4L14 21L11 13L3 12Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function AuthForm({
  title,
  subtitle,
  fields,
  submitLabel,
  alternateHref,
  alternatePrompt,
  alternateLabel,
  onSubmit,
  beforeForm,
  legalConsentMode,
}: AuthFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const formData = new FormData(e.currentTarget);
    const values: Record<string, string> = {};
    fields.forEach((field) => {
      values[field.name] = String(formData.get(field.name) ?? '');
    });

    if (legalConsentMode === 'signup' && !acceptedTerms) {
      setError('You must accept the Terms and Conditions and Privacy Policy');
      setPending(false);
      return;
    }

    if (legalConsentMode === 'signup') {
      values.acceptedTerms = 'true';
    }

    try {
      await onSubmit(values);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="glass-panel p-8 shadow-[var(--shadow-glow)]">
        <div className="mb-8">
          <p className="badge-pill">Account</p>
          <h1 className="font-display mt-3 text-2xl font-bold text-[color:var(--foreground)]">
            {title}
          </h1>
          <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">{subtitle}</p>
        </div>

        {beforeForm}

        <form onSubmit={handleSubmit} className="space-y-5">
          {fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="mb-1.5 block text-sm font-semibold text-[color:var(--foreground)]"
              >
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type ?? 'text'}
                required={field.required ?? true}
                placeholder={field.placeholder}
                className="auth-input"
              />
            </div>
          ))}

<<<<<<< HEAD
          {legalConsentMode ? (
            <LegalConsent
              mode={legalConsentMode}
              checked={acceptedTerms}
              onCheckedChange={setAcceptedTerms}
            />
          ) : null}

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
          )}
=======
          {error && <p className="alert-error">{error}</p>}
>>>>>>> refs/remotes/origin/cursor/2026-06-07-9o3t-79105

          <button type="submit" disabled={pending} className="btn-primary">
            {pending ? 'Please wait…' : submitLabel}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[color:var(--muted-foreground)]">
          {alternatePrompt}{' '}
          <Link href={alternateHref} className="link-primary">
            {alternateLabel}
          </Link>
        </p>
      </div>
    </div>
  );
}
