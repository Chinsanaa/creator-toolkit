'use client';

import Link from 'next/link';
import { LANDING_CONTENT } from '@/lib/landing/content';
import { HeroIllustration } from '@/components/landing/HeroIllustration';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { LandingNav } from '@/components/landing/LandingNav';
import { useLanguage } from '@/contexts/LanguageContext';

/** Brand landing — original hero + sections layout */
export function BrandLandingPage() {
  const baseContent = LANDING_CONTENT.brand;
  const { t } = useLanguage();

  const content = {
    ...baseContent,
    switchAudience: { label: t('for_creators'), href: '/' },
    signupCta: t('get_started'),
    navItems: [
      { type: 'link' as const, label: t('campaigns'), href: '/sponsor/campaigns' },
      { type: 'link' as const, label: t('home'), href: '/sponsor/dashboard' },
    ],
  };

  return (
    <div className="landing-page flex min-h-full flex-col">
      <LandingNav content={content} />

      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 pt-12 lg:grid-cols-2 lg:gap-8 lg:px-10 lg:pb-24 lg:pt-16">
          <div className="max-w-xl">
            <h1 className="text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.03em] text-landing-fg sm:text-5xl lg:text-[3.25rem]">
              {t('reach_mongolian_creators')}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-landing-muted sm:text-xl">
              {t('reach_mongolian_creators_subtitle')}
            </p>
            <div className="mt-10">
              <Link href={content.signupHref} className="landing-btn-dark px-8 py-3.5 text-[15px]">
                {t('get_started')}
              </Link>
            </div>
          </div>

          <div className="relative lg:pl-8">
            <HeroIllustration metrics={content.illustrationMetrics} />
          </div>
        </section>

        <HowItWorks
          content={{
            ...content.howItWorks,
            title: t('how_brand_partnerships_work'),
            subtitle: t('launch_campaigns_subtitle'),
            steps: [
              { title: t('create_your_account'), description: t('create_your_account_desc') },
              { title: t('post_a_campaign'), description: t('post_a_campaign_desc') },
              { title: t('review_applications'), description: t('review_applications_desc') },
              { title: t('track_results'), description: t('track_results_desc') },
            ],
          }}
          signupHref={content.signupHref}
          signupCta={t('get_started')}
        />
      </main>

      <footer className="border-t border-sky-100/80 px-6 py-10 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-landing-muted">{t('footer_brands')}</p>
          <div className="flex gap-6 text-sm">
            <Link href={content.loginHref} className="text-landing-muted transition hover:text-landing-fg">
              {t('log_in')}
            </Link>
            <Link href={content.signupHref} className="font-medium text-landing-fg">
              {t('get_started')}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
