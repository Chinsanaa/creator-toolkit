'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { SponsorShell } from '@/components/sponsor/SponsorShell';
import { CampaignEditorToolbar } from '@/components/sponsor/CampaignEditorToolbar';
import { CampaignReadOnly } from '@/components/sponsor/CampaignReadOnly';
import { ApiError } from '@/lib/api/client';
import {
  closeCampaign,
  deleteSponsorCampaign,
  getSponsorCampaign,
  publishCampaign,
  updateApplicationStatus,
} from '@/lib/api/sponsor';
import { applicationStatusLabel, formatDate } from '@/lib/format';
import { isLegacyUnpublished, isPublished } from '@/lib/sponsor/campaignForm';
import type { SponsorApplication, SponsorCampaign } from '@/lib/types/sponsor';

export default function SponsorCampaignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [campaign, setCampaign] = useState<SponsorCampaign | null>(null);
  const [applications, setApplications] = useState<SponsorApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const data = await getSponsorCampaign(id);
        if (!cancelled) {
          setCampaign(data.campaign);
          setApplications(data.applications);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : 'Failed to load campaign');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  async function reload() {
    const data = await getSponsorCampaign(id);
    setCampaign(data.campaign);
    setApplications(data.applications);
  }

  async function handlePublish() {
    if (!campaign) return;
    setBusy(true);
    setError(null);
    try {
      await publishCampaign(id);
      await reload();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to publish');
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (!campaign) return;
    if (
      !window.confirm(
        'Delete this campaign? This cannot be undone.'
      )
    ) {
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await deleteSponsorCampaign(id);
      router.push('/sponsor/campaigns');
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to delete campaign');
    } finally {
      setBusy(false);
    }
  }

  async function handleClose() {
    setBusy(true);
    setError(null);
    try {
      await closeCampaign(id);
      await reload();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to close campaign');
    } finally {
      setBusy(false);
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

  const legacy = campaign && isLegacyUnpublished(campaign.status);
  const published = campaign && isPublished(campaign.status);
  const canDelete =
    campaign &&
    campaign.status !== 'closed' &&
    campaign.applicationCount === 0;

  return (
    <SponsorShell>
      <Link href="/sponsor/campaigns" className="link-primary text-sm">
        ← Back to campaigns
      </Link>

      {loading && (
        <p className="mt-8 text-sm text-[color:var(--muted-foreground)]">Loading…</p>
      )}
      {error && <p className="alert-error mt-8">{error}</p>}

      {campaign && (
        <article className="mt-6 max-w-3xl space-y-10">
          <div className="glass-panel p-6 sm:p-8">
            <CampaignReadOnly campaign={campaign} />

            {(legacy || published) && (
              <div className="mt-6">
                <CampaignEditorToolbar
                  variant={legacy ? 'legacy-unpublished' : 'published'}
                  busy={busy}
                  onPublish={legacy ? () => void handlePublish() : undefined}
                  onClose={published ? () => void handleClose() : undefined}
                  onDelete={canDelete ? () => void handleDelete() : undefined}
                />
              </div>
            )}
          </div>

          {!legacy && (
            <section>
              <h2 className="font-display text-lg font-bold text-[color:var(--foreground)]">
                Applications
              </h2>

              {applications.length === 0 && (
                <p className="mt-4 text-sm text-[color:var(--muted-foreground)]">
                  No applications yet.
                </p>
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
            </section>
          )}

          {legacy && (
            <p className="text-sm text-[color:var(--muted-foreground)]">
              Publish this campaign to make it visible to creators and receive applications.
            </p>
          )}
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
    <li className="glass-card p-5">
      <div>
        <p className="font-semibold text-[color:var(--foreground)]">
          {application.creator?.name ?? 'Creator'}
          {application.creator && (
            <span className="ml-2 text-sm font-normal text-[color:var(--muted)]">
              @{application.creator.username}
            </span>
          )}
        </p>
        <p className="mt-1 text-xs text-[color:var(--muted)]">
          Applied {formatDate(application.applied_at)} ·{' '}
          {applicationStatusLabel(application.status)}
        </p>
      </div>

      {application.response_text && (
        <p className="mt-3 whitespace-pre-wrap text-sm text-[color:var(--muted-foreground)]">
          {application.response_text}
        </p>
      )}

      {application.sponsor_notes && !pending && (
        <p className="mt-2 text-xs text-[color:var(--muted)]">
          Your note: {application.sponsor_notes}
        </p>
      )}

      {pending && (
        <div className="mt-4 space-y-3">
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional note to creator…"
            className="input-touch"
          />
          <div className="flex gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => onApprove(notes.trim() || undefined)}
              className="min-h-11 rounded-xl bg-[color:var(--success)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {busy ? '…' : 'Approve'}
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => onReject(notes.trim() || undefined)}
              className="btn-secondary"
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
