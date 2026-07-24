'use client';

import { useLanguage } from '@/contexts/LanguageContext';

type ToolbarVariant = 'create' | 'published' | 'legacy-unpublished';

interface CampaignEditorToolbarProps {
  variant: ToolbarVariant;
  busy: boolean;
  onPublish?: () => void;
  onClose?: () => void;
  onDelete?: () => void;
}

export function CampaignEditorToolbar({
  variant,
  busy,
  onPublish,
  onClose,
  onDelete,
}: CampaignEditorToolbarProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-[color:var(--border)] pt-6">
      {variant === 'create' && onPublish && (
        <button type="button" disabled={busy} onClick={onPublish} className="btn-primary w-auto px-6">
          {busy ? t('publishing') : t('publish')}
        </button>
      )}

      {variant === 'legacy-unpublished' && onPublish && (
        <>
          <button type="button" disabled={busy} onClick={onPublish} className="btn-primary w-auto px-6">
            {busy ? t('publishing') : t('publish')}
          </button>
          <p className="w-full text-sm text-[color:var(--muted-foreground)]">
            {t('legacy_campaign_publish_note')}
          </p>
        </>
      )}

      {variant === 'published' && onClose && (
        <>
          <button type="button" disabled={busy} onClick={onClose} className="btn-secondary">
            {busy ? t('closing') : t('close_campaign')}
          </button>
          <p className="w-full text-sm text-[color:var(--muted-foreground)]">
            {t('closing_campaign_note')}
          </p>
        </>
      )}

      {onDelete && (
        <button
          type="button"
          disabled={busy}
          onClick={onDelete}
          className={`min-h-11 rounded-xl border border-[color:var(--destructive)]/40 px-4 py-2.5 text-sm font-semibold text-destructive-text transition hover:bg-red-50 dark:hover:bg-red-950/30 ${
            variant === 'published' ? '' : 'ml-auto'
          }`}
        >
          {t('delete')}
        </button>
      )}
    </div>
  );
}
