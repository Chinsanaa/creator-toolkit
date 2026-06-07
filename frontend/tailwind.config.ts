import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-muted': 'var(--card-muted)',
        border: 'var(--border)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        primary: 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        'primary-soft': 'var(--primary-soft)',
        'primary-subtle': 'var(--primary-soft)',
        'primary-foreground': '#ffffff',
        accent: 'var(--accent)',
        'accent-soft': 'var(--accent-soft)',
        success: 'var(--success)',
        destructive: 'var(--destructive)',
        ring: 'var(--ring)',
        surface: 'var(--surface)',
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
      },
      fontFamily: {
        sans: 'var(--font-dm-sans), system-ui, sans-serif',
        display: 'var(--font-outfit), system-ui, sans-serif',
        mono: 'var(--font-jetbrains), ui-monospace, monospace',
      },
      boxShadow: {
        sm: 'var(--shadow-sm, 0 1px 2px 0 rgb(0 0 0 / 0.05))',
        md: 'var(--shadow-md, 0 4px 6px -1px rgb(0 0 0 / 0.1))',
        lg: 'var(--shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1))',
        glow: 'var(--shadow-glow)',
      },
    },
  },
  plugins: [],
} satisfies Config;
