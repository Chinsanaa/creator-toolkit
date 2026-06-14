'use client';

import { useTheme } from '@/lib/theme/ThemeProvider';
import { useLanguage } from '@/contexts/LanguageContext';

const buttonClass =
  'flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--card-muted)] text-[color:var(--foreground)] transition duration-200 hover:border-[color:var(--primary)]/40';

/** Placeholder matches server render until theme is read from localStorage. */
function ThemeTogglePlaceholder() {
  return (
    <button
      type="button"
      className={buttonClass}
      aria-label="Toggle color theme"
      tabIndex={-1}
      aria-hidden
    >
      <svg
        className="h-5 w-5 opacity-50"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
        />
      </svg>
    </button>
  );
}

export function ThemeToggle() {
  const { theme, ready, toggleTheme } = useTheme();
  const { t } = useLanguage();

  if (!ready) {
    return <ThemeTogglePlaceholder />;
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={buttonClass}
      aria-label={theme === 'dark' ? t('switch_to_light') : t('switch_to_dark')}
    >
      {theme === 'dark' ? (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
        </svg>
      ) : (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
      )}
    </button>
  );
}
