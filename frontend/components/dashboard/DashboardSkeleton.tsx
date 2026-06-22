import { Skeleton } from '@/components/ui/Skeleton';

function StatCardSkeleton() {
  return (
    <div className="card min-h-28 space-y-3 p-4">
      <div className="flex items-center gap-2">
        <Skeleton className="size-9 rounded-full" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-7 w-24" />
      <Skeleton className="h-3 w-28" />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      <div className="card space-y-3 p-4">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-48 w-full" />
      </div>

      <div className="card space-y-3 p-4">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
