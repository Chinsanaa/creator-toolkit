'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SponsorShell } from '@/components/sponsor/SponsorShell';
import { ApiError } from '@/lib/api/client';
import { createSponsorCampaign } from '@/lib/api/sponsor';

const CONTENT_TYPES = [
  { value: 'tiktok_video', label: 'TikTok video' },
  { value: 'youtube_video', label: 'YouTube video' },
  { value: 'short_video', label: 'Short-form video' },
  { value: 'instagram_reel', label: 'Instagram Reel' },
];

export default function NewSponsorCampaignPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [paymentAmountMnt, setPaymentAmountMnt] = useState('');
  const [contentType, setContentType] = useState('tiktok_video');
  const [requiredFollowersMin, setRequiredFollowersMin] = useState('');
  const [requiredFollowersMax, setRequiredFollowersMax] = useState('');
  const [engagementRateMin, setEngagementRateMin] = useState('');
  const [deadlineApply, setDeadlineApply] = useState('');
  const [deadlineComplete, setDeadlineComplete] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const campaign = await createSponsorCampaign({
        title: title.trim(),
        description: description.trim(),
        paymentAmountMnt: Number(paymentAmountMnt),
        contentType,
        requiredFollowersMin: requiredFollowersMin
          ? Number(requiredFollowersMin)
          : undefined,
        requiredFollowersMax: requiredFollowersMax
          ? Number(requiredFollowersMax)
          : undefined,
        engagementRateMin: engagementRateMin ? Number(engagementRateMin) : undefined,
        deadlineApply: deadlineApply || undefined,
        deadlineComplete: deadlineComplete || undefined,
      });
      router.push(`/sponsor/campaigns/${campaign.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to create campaign');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SponsorShell>
      <Link
        href="/sponsor/campaigns"
        className="text-sm font-medium text-violet-600 hover:text-violet-700"
      >
        ← Back to campaigns
      </Link>

      <h1 className="mt-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">New campaign</h1>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Minimum payout ₮10,000. Campaigns go live immediately as active.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 max-w-xl space-y-5">
        <Field label="Title" required>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="Description" required>
          <textarea
            required
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputClass}
            placeholder="Brief, deliverables, brand guidelines…"
          />
        </Field>

        <Field label="Payment (MNT)" required>
          <input
            type="number"
            required
            min={10000}
            step={1000}
            value={paymentAmountMnt}
            onChange={(e) => setPaymentAmountMnt(e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="Content type">
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className={inputClass}
          >
            {CONTENT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Min followers">
            <input
              type="number"
              min={0}
              value={requiredFollowersMin}
              onChange={(e) => setRequiredFollowersMin(e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Max followers">
            <input
              type="number"
              min={0}
              value={requiredFollowersMax}
              onChange={(e) => setRequiredFollowersMax(e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="Min engagement rate (%)">
          <input
            type="number"
            min={0}
            max={100}
            step={0.1}
            value={engagementRateMin}
            onChange={(e) => setEngagementRateMin(e.target.value)}
            className={inputClass}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Apply by">
            <input
              type="date"
              value={deadlineApply}
              onChange={(e) => setDeadlineApply(e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Complete by">
            <input
              type="date"
              value={deadlineComplete}
              onChange={(e) => setDeadlineComplete(e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-60"
        >
          {submitting ? 'Creating…' : 'Publish campaign'}
        </button>
      </form>
    </SponsorShell>
  );
}

const inputClass =
  'mt-1.5 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900';

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {children}
    </div>
  );
}
