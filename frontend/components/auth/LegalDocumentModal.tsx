'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ApiError } from '@/lib/api/client';
import { getLegalDocument } from '@/lib/api/legal';
import type { LegalDocumentSlug } from '@/lib/types/legal';

interface LegalDocumentModalProps {
  slug: LegalDocumentSlug | null;
  onClose: () => void;
}

export function LegalDocumentModal({ slug, onClose }: LegalDocumentModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;
    setLoading(true);
    setError(null);
    setTitle('');
    setContent('');

    getLegalDocument(slug)
      .then((res) => {
        if (cancelled) return;
        setTitle(res.document.title);
        setContent(res.document.content);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof ApiError ? err.message : 'Failed to load document');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (!slug) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [slug, onClose]);

  if (!slug) return null;

  return (
    <div className="legal-modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="legal-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="legal-modal-header">
          <h2 id="legal-modal-title" className="text-lg font-semibold text-landing-fg">
            {title || 'Loading…'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="legal-modal-close"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="legal-modal-body">
          {loading && <p className="text-sm text-landing-muted">Loading document…</p>}
          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
          )}
          {!loading && !error && content ? (
            <div className="legal-markdown">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
