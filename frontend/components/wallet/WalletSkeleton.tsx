import { Skeleton } from '@/components/ui/Skeleton';

export function WalletSkeleton() {
  return (
    <div className="space-y-8">
      <div className="creator-hero-card">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-3 h-9 w-48" />
        <Skeleton className="mt-6 h-32 w-full" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="creator-panel-lg space-y-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="creator-panel-lg space-y-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>

      <div className="creator-panel-lg space-y-3">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
