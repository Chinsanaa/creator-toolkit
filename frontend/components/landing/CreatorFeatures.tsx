'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export function CreatorFeatures() {
  const { t } = useLanguage();

  const features = [
    { title: t('centralized_opportunities'), description: t('centralized_opportunities_desc') },
    { title: t('payments_built_in'), description: t('payments_built_in_desc') },
    { title: t('track_performance'), description: t('see_views_revenue') },
    { title: t('easy_delivery'), description: t('easy_delivery_desc') },
  ];

  return (
    <section id="features" className="landing-section border-t border-sky-100/80 px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-landing-fg sm:text-4xl">
            {t('everything_creators_need')}
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.title} className="landing-feature-card rounded-3xl p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100">
                <span className="h-3 w-3 rounded-full bg-sky-500" />
              </div>
              <h3 className="text-xl font-semibold text-landing-fg">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-landing-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
