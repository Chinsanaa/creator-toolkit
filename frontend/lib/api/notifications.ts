import { apiFetch } from './client';
import type { NotificationsResponse } from '@/lib/types/notifications';

export async function getNotifications(): Promise<NotificationsResponse> {
  return apiFetch<NotificationsResponse>('/api/notifications');
}

export async function markNotificationRead(id: string): Promise<void> {
  await apiFetch(`/api/notifications/${id}/read`, { method: 'PATCH' });
}

export async function markAllNotificationsRead(): Promise<void> {
  await apiFetch('/api/notifications/read-all', { method: 'POST' });
}
