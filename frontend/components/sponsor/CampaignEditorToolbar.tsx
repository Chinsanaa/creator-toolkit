'use client';

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
  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-[color:var(--border)] pt-6">
      {variant === 'create' && onPublish && (
        <button type="button" disabled={busy} onClick={onPublish} className="btn-primary w-auto px-6">
          {busy ? 'Publishing…' : 'Publish'}
        </button>
      )}

      {variant === 'legacy-unpublished' && onPublish && (
        <>
          <button type="button" disabled={busy} onClick={onPublish} className="btn-primary w-auto px-6">
            {busy ? 'Publishing…' : 'Publish'}
          </button>
          <p className="w-full text-sm text-[color:var(--muted-foreground)]">
            This campaign was saved before publishing was required. Publish to make it visible to
            creators.
          </p>
        </>
      )}

      {variant === 'published' && onClose && (
        <>
          <button type="button" disabled={busy} onClick={onClose} className="btn-secondary">
            {busy ? 'Closing…' : 'Close campaign'}
          </button>
          <p className="w-full text-sm text-[color:var(--muted-foreground)]">
            Closing stops new applications. Published campaigns cannot be edited.
          </p>
        </>
      )}

      {onDelete && (
        <button
          type="button"
          disabled={busy}
          onClick={onDelete}
          className={`min-h-11 rounded-xl border border-[color:var(--destructive)]/40 px-4 py-2.5 text-sm font-semibold text-[color:var(--destructive)] transition hover:bg-red-50 dark:hover:bg-red-950/30 ${
            variant === 'published' ? '' : 'ml-auto'
          }`}
        >
          Delete
        </button>
      )}
    </div>
  );
}
