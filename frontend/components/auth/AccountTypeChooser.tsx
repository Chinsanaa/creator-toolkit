import Link from 'next/link';

type ChooserMode = 'login' | 'signup';

const copy: Record<
  ChooserMode,
  {
    title: string;
    question: string;
    creatorHref: string;
    sponsorHref: string;
    switchHref: string;
    switchPrompt: string;
    switchLabel: string;
  }
> = {
  login: {
    title: 'Sign in',
    question: 'How are you using Creator Toolkit?',
    creatorHref: '/login/creator',
    sponsorHref: '/login/sponsor',
    switchHref: '/signup',
    switchPrompt: 'New here?',
    switchLabel: 'Create an account',
  },
  signup: {
    title: 'Get started',
    question: 'How will you use Creator Toolkit?',
    creatorHref: '/signup/creator',
    sponsorHref: '/signup/sponsor',
    switchHref: '/login',
    switchPrompt: 'Already have an account?',
    switchLabel: 'Sign in',
  },
};

export function AccountTypeChooser({ mode }: { mode: ChooserMode }) {
  const c = copy[mode];

  return (
    <div className="w-full max-w-md">
      <div className="glass-panel p-8 shadow-[var(--shadow-glow)]">
        <p className="badge-pill">Creator Toolkit</p>
        <h1 className="font-display mt-3 text-2xl font-bold text-[color:var(--foreground)]">
          {c.title}
        </h1>
        <p className="mt-6 text-center text-sm font-semibold text-[color:var(--foreground)]">
          {c.question}
        </p>

        <div className="mt-6 space-y-3">
          <AccountTypeCard
            href={c.creatorHref}
            label="Creator"
            description="Track earnings, apply to brand deals, and manage payouts."
            variant="creator"
          />
          <AccountTypeCard
            href={c.sponsorHref}
            label="Sponsor"
            description="Post campaigns and review creator applications."
            variant="sponsor"
          />
        </div>

        <p className="mt-8 text-center text-sm text-[color:var(--muted-foreground)]">
          {c.switchPrompt}{' '}
          <Link href={c.switchHref} className="link-primary">
            {c.switchLabel}
          </Link>
        </p>
      </div>
    </div>
  );
}

function AccountTypeCard({
  href,
  label,
  description,
  variant,
}: {
  href: string;
  label: string;
  description: string;
  variant: 'creator' | 'sponsor';
}) {
  return (
    <Link
      href={href}
      className={`block cursor-pointer rounded-2xl border p-5 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-md ${
        variant === 'creator'
          ? 'border-[color:var(--border)] bg-[color:var(--card-muted)] hover:border-[color:var(--primary)]/50'
          : 'border-[color:var(--border)] bg-[color:var(--accent-soft)]/30 hover:border-[color:var(--accent)]/50'
      }`}
    >
      <span className="font-display text-base font-bold text-[color:var(--foreground)]">
        {label}
      </span>
      <p className="mt-1.5 text-sm text-[color:var(--muted-foreground)]">{description}</p>
    </Link>
  );
}
