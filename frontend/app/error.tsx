'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center px-4 py-16">
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Something went wrong</h1>
      <p className="mt-2 max-w-md text-center text-sm text-zinc-600 dark:text-zinc-400">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
      >
        Try again
      </button>
    </div>
  );
}
