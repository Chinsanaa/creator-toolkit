import Link from 'next/link';

export function AuthTypeBackLink({ audience }: { audience: 'creator' | 'sponsor' }) {
  const href = audience === 'creator' ? '/' : '/brands';
  const label = audience === 'creator' ? '← For creators' : '← For brands';

  return (
    <p className="mb-6">
      <Link href={href} className="auth-link text-sm">
        {label}
      </Link>
    </p>
  );
}
