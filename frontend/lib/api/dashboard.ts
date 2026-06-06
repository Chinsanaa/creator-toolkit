import { apiFetch } from './client';
import type { DashboardSummary } from '@/lib/types/dashboard';

export async function getDashboardSummary(): Promise<DashboardSummary> {
  return apiFetch<DashboardSummary>('/api/dashboard/summary');
}
