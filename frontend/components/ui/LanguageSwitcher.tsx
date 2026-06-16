'use client';

import { useLanguage } from '@/contexts/LanguageContext';

function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

export function LanguageSwitcher() {
  const { lang, toggle } = useLanguage();
  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-lg hover:bg-surface transition"
      aria-label={lang === 'en' ? 'Switch to Mongolian' : 'Switch to English'}
    >
      <GlobeIcon />
      {lang === 'en' ? 'EN' : 'MN'}
    </button>
  );
}
