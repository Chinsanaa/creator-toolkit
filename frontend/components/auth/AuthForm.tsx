'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
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
}: AuthFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const formData = new FormData(e.currentTarget);
    const values: Record<string, string> = {};
    fields.forEach((field) => {
      values[field.name] = String(formData.get(field.name) ?? '');
    });

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
      <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wide text-violet-600">
            Creator Toolkit
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            {title}
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{subtitle}</p>
        </div>

        {beforeForm}

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type ?? 'text'}
                required={field.required ?? true}
                placeholder={field.placeholder}
                className="input-touch"
              />
            </div>
          ))}

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="btn-primary"
          >
            {pending ? 'Please wait…' : submitLabel}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          {alternatePrompt}{' '}
          <Link href={alternateHref} className="font-medium text-violet-600 hover:text-violet-700">
            {alternateLabel}
          </Link>
        </p>
      </div>
    </div>
  );
}
