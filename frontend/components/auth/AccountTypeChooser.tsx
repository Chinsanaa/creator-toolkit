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
      <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-sm font-medium uppercase tracking-wide text-violet-600">
          Creator Toolkit
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{c.title}</h1>
        <p className="mt-6 text-center text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {c.question}
        </p>

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

        <p className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
          {c.switchPrompt}{' '}
          <Link href={c.switchHref} className="font-medium text-violet-600 hover:text-violet-700">
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
      className="block rounded-xl border border-zinc-200 bg-zinc-50 p-5 text-left transition hover:border-violet-400 hover:bg-violet-50/50 dark:border-zinc-700 dark:bg-zinc-900/50 dark:hover:border-violet-600 dark:hover:bg-violet-950/30"
    >
      <span className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{label}</span>
      <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
    </Link>
  );
}
