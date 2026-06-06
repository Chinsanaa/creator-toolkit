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
    question: 'How are you using Earnio?',
    creatorHref: '/login/creator',
    sponsorHref: '/login/sponsor',
    switchHref: '/signup',
    switchPrompt: 'New here?',
    switchLabel: 'Create an account',
  },
  signup: {
    title: 'Get started',
    question: 'How will you use Earnio?',
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
      <div className="auth-card p-8 sm:p-10">
        <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-landing-fg text-white">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M3 12L21 4L14 21L11 13L3 12Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-landing-fg">{c.title}</h1>
        <p className="mt-6 text-center text-sm font-medium text-landing-fg">{c.question}</p>

        <div className="mt-6 space-y-3">
          <AccountTypeCard
            href={c.creatorHref}
            label="Creator"
            description="Track earnings, apply to brand deals, and manage payouts."
          />
          <AccountTypeCard
            href={c.sponsorHref}
            label="Sponsor"
            description="Post campaigns and review creator applications."
          />
        </div>

        <p className="mt-8 text-center text-sm text-landing-muted">
          {c.switchPrompt}{' '}
          <Link href={c.switchHref} className="auth-link">
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
}: {
  href: string;
  label: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-sky-100 bg-white/80 p-5 text-left transition hover:border-landing-fg/20 hover:bg-white hover:shadow-sm"
    >
      <span className="text-base font-semibold text-landing-fg group-hover:text-landing-fg">
        {label}
      </span>
      <p className="mt-1.5 text-sm text-landing-muted">{description}</p>
    </Link>
  );
}
