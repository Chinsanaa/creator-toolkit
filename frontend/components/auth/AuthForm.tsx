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
      <div className="auth-card p-8 sm:p-10">
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
        <h1 className="text-2xl font-semibold text-landing-fg">{title}</h1>
        <p className="mt-2 text-sm text-landing-muted">{subtitle}</p>

        {beforeForm}

        <form onSubmit={handleSubmit} className="space-y-5">
          {fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="mb-2 block text-sm font-medium text-landing-fg"
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

          <button type="submit" disabled={pending} className="landing-btn-dark auth-submit">
            {pending ? 'Please wait…' : submitLabel}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-landing-muted">
          {alternatePrompt}{' '}
          <Link href={alternateHref} className="auth-link">
            {alternateLabel}
          </Link>
        </p>
      </div>
    </div>
  );
}
