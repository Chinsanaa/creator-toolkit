import { redirect } from 'next/navigation';
import { appendNextParam } from '@/lib/auth/navigation';

export default function SignupPage({
  searchParams,
}: {
  searchParams?: { next?: string };
}) {
  redirect(appendNextParam('/signup/creator', searchParams?.next));
}
