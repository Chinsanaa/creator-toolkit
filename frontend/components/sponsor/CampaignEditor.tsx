'use client';

import type { CampaignFormValues } from '@/lib/sponsor/campaignForm';
import { CAMPAIGN_CONTENT_TYPES } from '@/lib/sponsor/campaignForm';

interface CampaignEditorProps {
  values: CampaignFormValues;
  onChange: (values: CampaignFormValues) => void;
  disabled?: boolean;
}

export function CampaignEditor({ values, onChange, disabled = false }: CampaignEditorProps) {
  function set<K extends keyof CampaignFormValues>(key: K, value: CampaignFormValues[K]) {
    onChange({ ...values, [key]: value });
  }

  return (
    <div className="space-y-5">
      <Field label="Title" required>
        <input
          type="text"
          required
          disabled={disabled}
          value={values.title}
          onChange={(e) => set('title', e.target.value)}
          className="input-touch"
        />
      </Field>

      <Field label="Description" required>
        <textarea
          required
          rows={6}
          disabled={disabled}
          value={values.description}
          onChange={(e) => set('description', e.target.value)}
          className="input-touch"
          placeholder="Brief, deliverables, brand guidelines…"
        />
      </Field>

      <Field label="Payment (MNT)" required>
        <input
          type="number"
          required
          min={10000}
          step={1000}
          disabled={disabled}
          value={values.paymentAmountMnt}
          onChange={(e) => set('paymentAmountMnt', e.target.value)}
          className="input-touch"
        />
      </Field>

      <Field label="Content type">
        <select
          disabled={disabled}
          value={values.contentType}
          onChange={(e) => set('contentType', e.target.value)}
          className="input-touch"
        >
          {CAMPAIGN_CONTENT_TYPES.map((t) => (
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
            disabled={disabled}
            value={values.requiredFollowersMin}
            onChange={(e) => set('requiredFollowersMin', e.target.value)}
            className="input-touch"
          />
        </Field>
        <Field label="Max followers">
          <input
            type="number"
            min={0}
            disabled={disabled}
            value={values.requiredFollowersMax}
            onChange={(e) => set('requiredFollowersMax', e.target.value)}
            className="input-touch"
          />
        </Field>
      </div>

      <Field label="Min engagement rate (%)">
        <input
          type="number"
          min={0}
          max={100}
          step={0.1}
          disabled={disabled}
          value={values.engagementRateMin}
          onChange={(e) => set('engagementRateMin', e.target.value)}
          className="input-touch"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Apply by">
          <input
            type="date"
            disabled={disabled}
            value={values.deadlineApply}
            onChange={(e) => set('deadlineApply', e.target.value)}
            className="input-touch"
          />
        </Field>
        <Field label="Complete by">
          <input
            type="date"
            disabled={disabled}
            value={values.deadlineComplete}
            onChange={(e) => set('deadlineComplete', e.target.value)}
            className="input-touch"
          />
        </Field>
      </div>
    </div>
  );
}

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
      <label className="mb-1.5 block text-sm font-semibold text-[color:var(--foreground)]">
        {label}
        {required && <span className="text-[color:var(--destructive)]"> *</span>}
      </label>
      {children}
    </div>
  );
}
