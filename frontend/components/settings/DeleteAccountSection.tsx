'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiError, deleteAccount } from '@/lib/api/client';
import { clearSessionCookies } from '@/lib/auth/session';

const CONFIRM_TEXT = 'DELETE';

export function DeleteAccountSection() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const canSubmit =
    password.length > 0 && confirmText === CONFIRM_TEXT && !pending;

  async function handleDelete(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setError(null);
    setPending(true);

    try {
      await deleteAccount(password);
      clearSessionCookies();
      router.push('/');
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to delete account');
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="creator-panel-lg border border-red-200/80">
      <h2 className="text-base font-semibold tracking-tight text-red-700">Delete account</h2>
      <p className="mt-2 text-sm text-landing-muted">
        Permanently remove your Earnio account, profile, and associated data. This cannot be undone.
      </p>

      <form onSubmit={handleDelete} className="mt-6 space-y-4">
        <div>
          <label htmlFor="delete-password" className="mb-2 block text-sm font-medium text-landing-fg">
            Current password
          </label>
          <input
            id="delete-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            placeholder="Enter your password"
          />
        </div>

        <div>
          <label htmlFor="delete-confirm" className="mb-2 block text-sm font-medium text-landing-fg">
            Type <span className="font-mono text-red-700">{CONFIRM_TEXT}</span> to confirm
          </label>
          <input
            id="delete-confirm"
            type="text"
            required
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="auth-input font-mono"
            placeholder={CONFIRM_TEXT}
            autoComplete="off"
          />
        </div>

        {error ? (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={!canSubmit}
          className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? 'Deleting account…' : 'Delete my account'}
        </button>
      </form>
    </section>
  );
}
