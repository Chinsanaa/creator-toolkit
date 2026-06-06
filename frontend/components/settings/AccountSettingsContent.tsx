'use client';

import { DeleteAccountSection } from '@/components/settings/DeleteAccountSection';
import { formatHandle } from '@/lib/format';
import type { AuthUser } from '@/lib/types/auth';

export function AccountSettingsContent({ user }: { user: AuthUser }) {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <section className="creator-panel-lg">
        <h2 className="text-base font-semibold tracking-tight text-landing-fg">Profile</h2>
        <dl className="mt-5 space-y-4 text-sm">
          <div>
            <dt className="font-medium text-landing-muted">Name</dt>
            <dd className="mt-1 text-landing-fg">{user.name || '—'}</dd>
          </div>
          <div>
            <dt className="font-medium text-landing-muted">Username</dt>
            <dd className="mt-1 text-landing-fg">{user.username ? formatHandle(user.username) : '—'}</dd>
          </div>
          <div>
            <dt className="font-medium text-landing-muted">Email</dt>
            <dd className="mt-1 text-landing-fg">{user.email}</dd>
          </div>
          <div>
            <dt className="font-medium text-landing-muted">Account type</dt>
            <dd className="mt-1 capitalize text-landing-fg">{user.userType}</dd>
          </div>
        </dl>
      </section>

      <DeleteAccountSection />
    </div>
  );
}
