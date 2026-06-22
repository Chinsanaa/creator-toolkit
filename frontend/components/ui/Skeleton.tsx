export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`animate-pulse rounded-lg bg-[color:var(--card-muted)] ${className}`}
    />
  );
}
