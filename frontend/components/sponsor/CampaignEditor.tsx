'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import type { CampaignFormValues } from '@/lib/sponsor/campaignForm';
import { CAMPAIGN_CONTENT_TYPES } from '@/lib/sponsor/campaignForm';

interface CampaignEditorProps {
  values: CampaignFormValues;
  onChange: (values: CampaignFormValues) => void;
  disabled?: boolean;
}

export function CampaignEditor({ values, onChange, disabled = false }: CampaignEditorProps) {
  const { t } = useLanguage();

  function set<K extends keyof CampaignFormValues>(key: K, value: CampaignFormValues[K]) {
    onChange({ ...values, [key]: value });
  }

  return (
    <div className="space-y-5">
      <Field label={t('campaign_title_label')} required>
        <input
          type="text"
          required
          disabled={disabled}
          value={values.title}
          onChange={(e) => set('title', e.target.value)}
          className="input-touch"
        />
      </Field>

      <Field label={t('campaign_description_label')} required>
        <textarea
          required
          rows={6}
          disabled={disabled}
          value={values.description}
          onChange={(e) => set('description', e.target.value)}
          className="input-touch"
          placeholder={t('campaign_description_placeholder')}
        />
      </Field>

      <Field label={t('campaign_payment_label')} required>
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

      <Field label={t('campaign_content_type_label')}>
        <select
          disabled={disabled}
          value={values.contentType}
          onChange={(e) => set('contentType', e.target.value)}
          className="input-touch"
        >
          {CAMPAIGN_CONTENT_TYPES.map((ct) => (
            <option key={ct.value} value={ct.value}>
              {ct.label}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t('campaign_min_followers_label')}>
          <input
            type="number"
            min={0}
            disabled={disabled}
            value={values.requiredFollowersMin}
            onChange={(e) => set('requiredFollowersMin', e.target.value)}
            className="input-touch"
          />
        </Field>
        <Field label={t('campaign_max_followers_label')}>
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

      <Field label={t('campaign_engagement_label')}>
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
        <Field label={t('apply_by_label')}>
          <input
            type="date"
            disabled={disabled}
            value={values.deadlineApply}
            onChange={(e) => set('deadlineApply', e.target.value)}
            className="input-touch"
          />
        </Field>
        <Field label={t('complete_by_label')}>
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
