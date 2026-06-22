import { Skeleton } from '@/components/ui/Skeleton';

function StatCardSkeleton() {
  return (
    <div className="stat-card">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="mt-3 h-7 w-32" />
      <Skeleton className="mt-2 h-3 w-20" />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      <div className="card p-5">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="mt-4 h-48 w-full" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card space-y-3 p-5">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
        <div className="card space-y-3 p-5">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </div>

      <div className="card space-y-3 p-5">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}
