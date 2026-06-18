'use client';

import { CREATOR_TESTIMONIALS } from '@/lib/landing/content';
import { useLanguage } from '@/contexts/LanguageContext';

export function CreatorTestimonials() {
  const { t } = useLanguage();

  return (
    <section className="landing-section border-t border-sky-100/80 bg-white/40 px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-landing-fg sm:text-4xl">
            {t('creators_love_earnio')}
          </h2>
          <p className="mt-4 text-lg text-landing-muted">
            {t('join_hundreds')}
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {CREATOR_TESTIMONIALS.map((item) => (
            <figure key={item.name} className="landing-feature-card rounded-3xl p-6">
              <blockquote className="text-sm leading-relaxed text-landing-muted">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6">
                <p className="font-semibold text-landing-fg">{item.name}</p>
                <p className="text-sm text-landing-muted">{item.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
