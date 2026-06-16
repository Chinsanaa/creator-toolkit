import { redirect } from 'next/navigation';
import { appendNextParam } from '@/lib/auth/navigation';

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { next?: string };
}) {
  redirect(appendNextParam('/login/creator', searchParams?.next));
}
