'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SponsorShell } from '@/components/sponsor/SponsorShell';
import { CampaignEditor } from '@/components/sponsor/CampaignEditor';
import { CampaignEditorToolbar } from '@/components/sponsor/CampaignEditorToolbar';
import { PageHeader } from '@/components/ui/PageHeader';
import { ApiError } from '@/lib/api/client';
import { createSponsorCampaign } from '@/lib/api/sponsor';
import {
  emptyCampaignForm,
  formValuesToPayload,
  type CampaignFormValues,
} from '@/lib/sponsor/campaignForm';

export default function NewSponsorCampaignPage() {
  const router = useRouter();
  const [values, setValues] = useState<CampaignFormValues>(emptyCampaignForm);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function publish() {
    setError(null);
    setBusy(true);
    try {
      const campaign = await createSponsorCampaign(formValuesToPayload(values));
      router.push(`/sponsor/campaigns/${campaign.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to publish campaign');
    } finally {
      setBusy(false);
    }
  }

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    void publish();
  }

  return (
    <SponsorShell>
      <Link href="/sponsor/campaigns" className="link-primary text-sm">
        ← Back to campaigns
      </Link>

      <div className="mt-4">
        <PageHeader
          eyebrow="New campaign"
          title="Campaign editor"
          description="Fill in the details and publish when you are ready for creators to apply."
        />
      </div>

      <form onSubmit={handleFormSubmit} className="mt-8 max-w-2xl">
        <div className="creator-panel-lg p-6 sm:p-8">
          <CampaignEditor values={values} onChange={setValues} disabled={busy} />

          {error ? (
            <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
          ) : null}

          <CampaignEditorToolbar variant="create" busy={busy} onPublish={() => void publish()} />
        </div>
      </form>
    </SponsorShell>
  );
}
