import Link from 'next/link';

export function AuthTypeBackLink({ mode }: { mode: 'login' | 'signup' }) {
  const href = mode === 'login' ? '/login' : '/signup';
  return (
    <p className="mb-6">
      <Link
        href={href}
        className="text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400"
      >
        ← Change account type
      </Link>
    </p>
  );
}
