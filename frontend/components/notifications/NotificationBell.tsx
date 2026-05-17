'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from '@/lib/api/notifications';
import { ApiError } from '@/lib/api/client';
import type { Notification } from '@/lib/types/notifications';

function formatWhen(iso: string): string {
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  if (diff < 60_000) return 'Just now';
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Notification[]>([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getNotifications();
      setItems(data.notifications);
      setUnread(data.unreadCount);
    } catch {
      // ignore when unauthenticated
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, 60_000);
    return () => clearInterval(interval);
  }, [load]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  async function handleOpen() {
    const next = !open;
    setOpen(next);
    if (next) await load();
  }

  async function handleRead(id: string) {
    try {
      await markNotificationRead(id);
      setItems((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read_at: new Date().toISOString() } : n))
      );
      setUnread((c) => Math.max(0, c - 1));
    } catch (err) {
      console.error(err instanceof ApiError ? err.message : 'Failed to mark read');
    }
  }

  async function handleReadAll() {
    try {
      await markAllNotificationsRead();
      setItems((prev) => prev.map((n) => ({ ...n, read_at: n.read_at ?? new Date().toISOString() })));
      setUnread(0);
    } catch (err) {
      console.error(err instanceof ApiError ? err.message : 'Failed to mark all read');
    }
  }

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={handleOpen}
        className="relative rounded-lg border border-zinc-300 p-2 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
        aria-label="Notifications"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.454 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
        {unread > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-violet-600 px-1 text-[10px] font-bold text-white">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-950 sm:w-96">
          <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3 dark:border-zinc-800">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Notifications</p>
            {unread > 0 && (
              <button
                type="button"
                onClick={handleReadAll}
                className="text-xs font-medium text-violet-600 hover:text-violet-700"
              >
                Mark all read
              </button>
            )}
          </div>
          <ul className="max-h-80 overflow-y-auto">
            {loading && items.length === 0 && (
              <li className="px-4 py-6 text-center text-sm text-zinc-500">Loading…</li>
            )}
            {!loading && items.length === 0 && (
              <li className="px-4 py-6 text-center text-sm text-zinc-500">No notifications yet</li>
            )}
            {items.map((n) => (
              <li
                key={n.id}
                className={`border-b border-zinc-50 px-4 py-3 last:border-0 dark:border-zinc-900 ${
                  !n.read_at ? 'bg-violet-50/50 dark:bg-violet-950/20' : ''
                }`}
              >
                <button
                  type="button"
                  className="w-full text-left"
                  onClick={() => !n.read_at && handleRead(n.id)}
                >
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{n.title}</p>
                  <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">{n.body}</p>
                  <p className="mt-1 text-[10px] text-zinc-400">{formatWhen(n.created_at)}</p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
