import { CREATOR_FAQ } from '@/lib/landing/content';

export function CreatorFaq() {
  return (
    <section id="faq" className="landing-section px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-landing-fg sm:text-4xl">
            Have questions? We have answers
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {CREATOR_FAQ.map((item) => (
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
