import Link from 'next/link';
import type { LandingContent } from '@/lib/landing/content';

export function HowItWorks({
  content,
  signupHref,
  signupCta,
  showDocsLink = true,
}: {
  content: LandingContent['howItWorks'];
  signupHref: string;
  signupCta: string;
  showDocsLink?: boolean;
}) {
  return (
    <section id={content.id} className="landing-section px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-landing-fg sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-4 text-lg text-landing-muted">{content.subtitle}</p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.steps.map((step, i) => (
            <div key={step.title} className="landing-feature-card rounded-3xl p-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-700">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-landing-fg">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-landing-muted">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
          <Link href={signupHref} className="landing-btn-dark px-8 py-3.5 text-[15px]">
            {signupCta}
          </Link>
          {showDocsLink ? (
            <Link href="/docs" className="landing-btn-light px-8 py-3.5 text-[15px]">
              Read the docs
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
