'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export function CreatorFaq() {
  const { t } = useLanguage();

  const faq = [
    { question: t('faq_signup_q'), answer: t('faq_signup_a') },
    { question: t('faq_who_can_join_q'), answer: t('faq_who_can_join_a') },
    { question: t('faq_payments_q'), answer: t('faq_payments_a') },
    { question: t('faq_multiple_brands_q'), answer: t('faq_multiple_brands_a') },
  ];

  return (
    <section id="faq" className="landing-section px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-landing-fg sm:text-4xl">
            {t('have_questions')}
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {faq.map((item) => (
            <details key={item.question} className="landing-feature-card group rounded-2xl px-6 py-4">
              <summary className="cursor-pointer list-none text-base font-semibold text-landing-fg marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {item.question}
                  <span className="text-landing-muted transition group-open:rotate-180">▾</span>
                </span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-landing-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
