'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageSwitcher() {
  const { lang, toggle } = useLanguage();
  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-lg hover:bg-surface transition"
      aria-label={lang === 'en' ? 'Switch to Mongolian' : 'Switch to English'}
    >
      {lang === 'en' ? '🇬🇧 EN' : '🇲🇳 MN'}
    </button>
  );
}
