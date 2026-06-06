'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { SponsorShell } from '@/components/sponsor/SponsorShell';
import { ApiError } from '@/lib/api/client';
import {
  getSponsorCampaign,
  updateApplicationStatus,
  updateCampaignStatus,
} from '@/lib/api/sponsor';
import {
  applicationStatusLabel,
  contentTypeLabel,
  formatDate,
  formatMnt,
} from '@/lib/format';
import type { SponsorApplication, SponsorCampaign } from '@/lib/types/sponsor';

export default function SponsorCampaignDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [campaign, setCampaign] = useState<SponsorCampaign | null>(null);
  const [applications, setApplications] = useState<SponsorApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);

  async function load() {
    setError(null);
    try {
      const data = await getSponsorCampaign(id);
      setCampaign(data.campaign);
      setApplications(data.applications);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to load campaign');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  async function handleStatusChange(status: 'active' | 'closed' | 'draft') {
    if (!campaign) return;
    setStatusUpdating(true);
    try {
      await updateCampaignStatus(campaign.id, status);
      setCampaign({ ...campaign, status });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to update status');
    } finally {
      setStatusUpdating(false);
    }
  }

  async function handleApplication(
    applicationId: string,
    status: 'approved' | 'rejected',
    sponsorNotes?: string
  ) {
    setActionId(applicationId);
    try {
      const updated = await updateApplicationStatus(applicationId, status, sponsorNotes);
      setApplications((prev) =>
        prev.map((a) => (a.id === applicationId ? updated : a))
      );
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to update application');
    } finally {
      setActionId(null);
    }
  }

  return (
    <SponsorShell>
      <Link
        href="/sponsor/campaigns"
        className="text-sm font-medium text-primary hover:text-primary"
      >
        ← Back to campaigns
      </Link>

      {loading && <p className="mt-8 text-sm text-muted">Loading…</p>}
      {error && (
        <p className="mt-8 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
          {error}
        </p>
      )}

      {campaign && (
        <article className="mt-6 max-w-3xl">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                {campaign.title}
              </h1>
              <p className="mt-1 text-xl font-semibold text-foreground">
                {formatMnt(campaign.payment_amount_mnt)}
              </p>
              <p className="mt-1 text-sm capitalize text-muted">Status: {campaign.status}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {campaign.status !== 'active' && (
                <button
                  type="button"
                  disabled={statusUpdating}
                  onClick={() => handleStatusChange('active')}
                  className={btnSecondary}
                >
                  Activate
                </button>
              )}
              {campaign.status !== 'closed' && (
                <button
                  type="button"
                  disabled={statusUpdating}
                  onClick={() => handleStatusChange('closed')}
                  className={btnSecondary}
                >
                  Close
                </button>
              )}
              {campaign.status !== 'draft' && (
                <button
                  type="button"
                  disabled={statusUpdating}
                  onClick={() => handleStatusChange('draft')}
                  className={btnSecondary}
                >
                  Mark draft
                </button>
              )}
            </div>
          </div>

          <dl className="mt-6 grid gap-3 rounded-xl border border-border bg-card p-4 text-sm dark:border-border dark:bg-background sm:grid-cols-2">
            <div>
              <dt className="text-muted">Content</dt>
              <dd className="font-medium">{contentTypeLabel(campaign.content_type)}</dd>
            </div>
            <div>
              <dt className="text-muted">Applications</dt>
              <dd className="font-medium">
                {campaign.applicationCount} total · {campaign.pendingCount} pending
              </dd>
            </div>
            <div>
              <dt className="text-muted">Apply by</dt>
              <dd className="font-medium">{formatDate(campaign.deadline_apply)}</dd>
            </div>
            <div>
              <dt className="text-muted">Complete by</dt>
              <dd className="font-medium">{formatDate(campaign.deadline_complete)}</dd>
            </div>
          </dl>

          <div className="mt-6 rounded-xl border border-border bg-card p-5 dark:border-border dark:bg-background">
            <h2 className="font-medium text-foreground">Brief</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted">
              {campaign.description}
            </p>
          </div>

          <h2 className="mt-10 text-lg font-semibold text-foreground">
            Applications
          </h2>

          {applications.length === 0 && (
            <p className="mt-4 text-sm text-muted">No applications yet.</p>
          )}

          <ul className="mt-4 space-y-4">
            {applications.map((app) => (
              <ApplicationCard
                key={app.id}
                application={app}
                busy={actionId === app.id}
                onApprove={(notes) => handleApplication(app.id, 'approved', notes)}
                onReject={(notes) => handleApplication(app.id, 'rejected', notes)}
              />
            ))}
          </ul>
        </article>
      )}
    </SponsorShell>
  );
}

function ApplicationCard({
  application,
  busy,
  onApprove,
  onReject,
}: {
  application: SponsorApplication;
  busy: boolean;
  onApprove: (notes?: string) => void;
  onReject: (notes?: string) => void;
}) {
  const [notes, setNotes] = useState('');
  const pending = application.status === 'pending';

  return (
    <li className="rounded-xl border border-border bg-card p-5 dark:border-border dark:bg-background">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-medium text-foreground">
            {application.creator?.name ?? 'Creator'}
            {application.creator && (
              <span className="ml-2 text-sm font-normal text-muted">
                @{application.creator.username}
              </span>
            )}
          </p>
          <p className="mt-1 text-xs text-muted">
            Applied {formatDate(application.applied_at)} ·{' '}
            {applicationStatusLabel(application.status)}
          </p>
        </div>
      </div>

      {application.response_text && (
        <p className="mt-3 text-sm text-muted whitespace-pre-wrap">
          {application.response_text}
        </p>
      )}

      {application.sponsor_notes && !pending && (
        <p className="mt-2 text-xs text-muted">Your note: {application.sponsor_notes}</p>
      )}

      {pending && (
        <div className="mt-4 space-y-3">
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional note to creator…"
            className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm dark:border-border dark:bg-surface"
          />
          <div className="flex gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => onApprove(notes.trim() || undefined)}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-emerald-700 disabled:opacity-60"
            >
              {busy ? '…' : 'Approve'}
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => onReject(notes.trim() || undefined)}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-surface dark:border-border dark:text-muted disabled:opacity-60"
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

const btnSecondary =
  'rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-surface disabled:opacity-60 dark:border-border dark:text-muted';
