export type LandingAudience = 'creator' | 'brand';

export type LandingNavItem =
  | { type: 'scroll'; label: string; href: string }
  | { type: 'link'; label: string; href: string };

export interface LandingContent {
  audience: LandingAudience;
  homeHref: string;
  switchAudience: { label: string; href: string };
  loginHref: string;
  signupHref: string;
  signupCta: string;
  navItems: LandingNavItem[];
  showNavChevron: boolean;
  hero: {
    title: string;
    subtitle: string;
    secondaryCta?: { label: string; href: string };
  };
  howItWorks: {
    id: string;
    title: string;
    subtitle: string;
    steps: { title: string; description: string }[];
  };
  footer: {
    tagline: string;
  };
  illustrationMetrics: [string, string, string];
}

export const CREATOR_FEATURES = [
  {
    title: 'Centralized opportunities.',
    description: 'Find and apply to sponsorship campaigns from Mongolian brands.',
  },
  {
    title: 'Payments built-in.',
    description: 'Track earnings and receive MNT payouts automatically.',
  },
  {
    title: 'Track performance.',
    description: 'See views, revenue, and engagement from TikTok and YouTube.',
  },
  {
    title: 'Easy delivery.',
    description: 'Manage briefs, applications, and payouts in one platform.',
  },
] as const;

export const CREATOR_TESTIMONIALS = [
  {
    quote:
      'Earnio helped me track my TikTok earnings and land my first brand deal in Mongolia. Everything is in one place.',
    name: 'Bold-Erdene',
    role: 'TikTok creator',
  },
  {
    quote:
      'I used to spreadsheet everything manually. Now I see YouTube and sponsorship income together and get paid in MNT.',
    name: 'Sarnai',
    role: 'YouTube creator',
  },
  {
    quote:
      'The sponsorship board is the best part — I apply to local brands without cold DMs and keep status updated in the app.',
    name: 'Temuulen',
    role: 'UGC creator',
  },
] as const;

export const CREATOR_FAQ = [
  {
    question: 'How do I sign up as a creator?',
    answer:
      'Create a free Earnio account, connect your TikTok or YouTube platforms, and complete your profile. You can browse sponsorships and apply directly from your dashboard.',
  },
  {
    question: 'Who can join?',
    answer:
      'Mongolian content creators on TikTok and YouTube who want to track earnings, find brand deals, and manage payouts in MNT.',
  },
  {
    question: 'How do payments work?',
    answer:
      'Earnings sync from connected platforms. Sponsorship payouts and wallet withdrawals are handled in MNT through your Earnio wallet.',
  },
  {
    question: 'Can I work with multiple brands at once?',
    answer:
      'Yes. Apply to multiple sponsorships and manage each application from your dashboard.',
  },
] as const;

export const LANDING_CONTENT: Record<LandingAudience, LandingContent> = {
  creator: {
    audience: 'creator',
    homeHref: '/',
    switchAudience: { label: 'For Brands', href: '/brands' },
    loginHref: '/login/creator',
    signupHref: '/signup/creator',
    signupCta: 'Get started',
    showNavChevron: false,
    navItems: [
      { type: 'scroll', label: 'How it works', href: '#how-it-works' },
      { type: 'scroll', label: 'Features', href: '#features' },
      { type: 'scroll', label: 'FAQ', href: '#faq' },
    ],
    hero: {
      title: 'The platform for Mongolian creators',
      subtitle:
        'Earnio connects you with local brands, handles sponsorships and payouts, and lets you focus on creating.',
      secondaryCta: { label: 'Explore sponsorships', href: '#features' },
    },
    howItWorks: {
      id: 'how-it-works',
      title: 'How Earnio works for creators',
      subtitle: 'From connecting platforms to getting paid in MNT — four simple steps.',
      steps: [
        {
          title: 'Connect platforms.',
          description: 'Link TikTok and YouTube to sync earnings automatically.',
        },
        {
          title: 'Track performance.',
          description: 'See revenue, trends, and platform breakdowns in real time.',
        },
        {
          title: 'Find sponsorships.',
          description: 'Browse brand deals and apply directly from your dashboard.',
        },
        {
          title: 'Get paid in MNT.',
          description: 'Manage wallet payouts and bank accounts in one place.',
        },
      ],
    },
    footer: {
      tagline: '© Earnio — Built for Mongolian creators',
    },
    illustrationMetrics: ['2.4M', '890K', '₮12M'],
  },
  brand: {
    audience: 'brand',
    homeHref: '/brands',
    switchAudience: { label: 'For Creators', href: '/' },
    loginHref: '/login/sponsor',
    signupHref: '/signup/sponsor',
    signupCta: 'Get started',
    showNavChevron: true,
    navItems: [
      { type: 'link', label: 'Campaigns', href: '/sponsor/campaigns' },
      { type: 'link', label: 'Dashboard', href: '/sponsor/dashboard' },
    ],
    hero: {
      title: 'Reach Mongolian creators with sponsored campaigns',
      subtitle:
        'Post brand deals, review creator applications, and manage partnerships with TikTok and YouTube talent — from one dashboard.',
    },
    howItWorks: {
      id: 'how-it-works',
      title: 'How brand partnerships work',
      subtitle: 'Launch campaigns, find the right creators, and manage deals in MNT.',
      steps: [
        {
          title: 'Create your account.',
          description: 'Sign up as a brand and set up your company profile.',
        },
        {
          title: 'Post a campaign.',
          description: 'Define budget, content type, and creator requirements.',
        },
        {
          title: 'Review applications.',
          description: 'Compare creators and approve the best fits for your brand.',
        },
        {
          title: 'Track results.',
          description: 'Monitor campaign status and partnership outcomes in one place.',
        },
      ],
    },
    footer: {
      tagline: '© Earnio — Built for Mongolian brands',
    },
    illustrationMetrics: ['120', '₮5M', '48h'],
  },
};
