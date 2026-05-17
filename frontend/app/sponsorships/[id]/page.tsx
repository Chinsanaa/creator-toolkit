'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { ApiError } from '@/lib/api/client';
import { applyToSponsorship, getSponsorship } from '@/lib/api/sponsorships';
import {
  applicationStatusLabel,
  contentTypeLabel,
  formatDate,
  formatMnt,
} from '@/lib/format';
import type { SponsorshipListing } from '@/lib/types/sponsorship';

export default function SponsorshipDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [sponsorship, setSponsorship] = useState<SponsorshipListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);

  useEffect(() => {
    getSponsorship(id)
      .then(setSponsorship)
      .catch((err) =>
        setError(err instanceof ApiError ? err.message : 'Failed to load sponsorship')
      )
      .finally(() => setLoading(false));
  }, [id]);

  async function handleApply(e: FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setApplyError(null);
    setSubmitting(true);
    try {
      await applyToSponsorship(id, message.trim());
      router.push('/sponsorships/applications');
      router.refresh();
    } catch (err) {
      setApplyError(err instanceof ApiError ? err.message : 'Failed to apply');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <DashboardShell>
      <Link
        href="/sponsorships"
        className="text-sm font-medium text-violet-600 hover:text-violet-700"
      >
        ← Back to marketplace
      </Link>

      {loading && <p className="mt-8 text-sm text-zinc-500">Loading…</p>}
      {error && (
        <p className="mt-8 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      {sponsorship && (
        <article className="mt-6 max-w-2xl">
          <p className="text-sm font-medium text-violet-600">
            {sponsorship.sponsor?.name ?? 'Brand partner'}
            {sponsorship.sponsor && ` · @${sponsorship.sponsor.username}`}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
            {sponsorship.title.replace(/^\[Demo\]\s*/, '')}
          </h1>
          <p className="mt-2 text-2xl font-semibold text-zinc-800 dark:text-zinc-200">
            {formatMnt(sponsorship.payment_amount_mnt)}
          </p>

          <dl className="mt-6 grid gap-3 rounded-xl border border-zinc-200 bg-white p-4 text-sm dark:border-zinc-800 dark:bg-zinc-950 sm:grid-cols-2">
            <div>
              <dt className="text-zinc-500">Content</dt>
              <dd className="font-medium">{contentTypeLabel(sponsorship.content_type)}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Min engagement</dt>
              <dd className="font-medium">
                {sponsorship.engagement_rate_min != null
                  ? `${sponsorship.engagement_rate_min}%`
                  : '—'}
              </dd>
            </div>
            <div>
              <dt className="text-zinc-500">Followers</dt>
              <dd className="font-medium">
                {formatFollowers(
                  sponsorship.required_followers_min,
                  sponsorship.required_followers_max
                )}
              </dd>
            </div>
            <div>
              <dt className="text-zinc-500">Apply by</dt>
              <dd className="font-medium">{formatDate(sponsorship.deadline_apply)}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Complete by</dt>
              <dd className="font-medium">{formatDate(sponsorship.deadline_complete)}</dd>
            </div>
          </dl>

          <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="font-medium text-zinc-900 dark:text-zinc-50">Brief</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {sponsorship.description}
            </p>
          </div>

          {sponsorship.hasApplied ? (
            <p className="mt-6 rounded-lg bg-violet-50 px-4 py-3 text-sm font-medium text-violet-800 dark:bg-violet-950/40 dark:text-violet-200">
              You applied — status:{' '}
              {applicationStatusLabel(sponsorship.applicationStatus ?? 'pending')}
            </p>
          ) : (
            <form onSubmit={handleApply} className="mt-6 space-y-4 pb-24 md:pb-0">
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Your pitch
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Why you're a fit, your audience, and relevant past work…"
                  className="input-touch mt-1.5 min-h-[120px]"
                />
              </div>
              {applyError && (
                <p className="text-sm text-red-600 dark:text-red-400">{applyError}</p>
              )}
              <div className="fixed bottom-16 left-0 right-0 z-30 border-t border-zinc-200 bg-white/95 p-4 backdrop-blur md:static md:border-0 md:bg-transparent md:p-0 dark:border-zinc-800 dark:bg-zinc-950/95 md:dark:bg-transparent">
                <button type="submit" disabled={submitting} className="btn-primary">
                  {submitting ? 'Submitting…' : 'Submit application'}
                </button>
              </div>
            </form>
          )}
        </article>
      )}
    </DashboardShell>
  );
}

function formatFollowers(min: number | null, max: number | null): string {
  if (min && max) return `${min.toLocaleString()} – ${max.toLocaleString()}`;
  if (min) return `${min.toLocaleString()}+`;
  if (max) return `Up to ${max.toLocaleString()}`;
  return 'Any';
}
