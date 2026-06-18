'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations as enTranslations } from '@/lib/i18n/en';
import { translations as mnTranslations } from '@/lib/i18n/mn';

type Lang = 'en' | 'mn';

interface LanguageContextValue {
  lang: Lang;
  toggle: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const stored = localStorage.getItem('earnio-lang');
    if (stored === 'en' || stored === 'mn') {
      setLang(stored);
    }
  }, []);

  const toggle = useCallback(() => {
    setLang(prev => {
      const next: Lang = prev === 'en' ? 'mn' : 'en';
      localStorage.setItem('earnio-lang', next);
      return next;
    });
  }, []);

  const t = useCallback((key: string): string => {
    const dict = lang === 'en' ? enTranslations : mnTranslations;
    return (dict as Record<string, string>)[key] ?? key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
