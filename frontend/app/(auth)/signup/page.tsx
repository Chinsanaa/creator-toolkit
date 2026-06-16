import { redirect } from 'next/navigation';
import { appendNextParam } from '@/lib/auth/navigation';

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[] }>;
}) {
  const params = await searchParams;
  const next = Array.isArray(params.next) ? params.next[0] : params.next;
  redirect(appendNextParam('/signup/creator', next));
}
