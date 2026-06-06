import Link from 'next/link';

export function CreatorCtaBand({
  signupHref,
  signupCta,
}: {
  signupHref: string;
  signupCta: string;
}) {
  return (
    <section className="landing-section border-t border-sky-100/80 px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-landing-fg sm:text-4xl">
          Start creating with top brands today
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href={signupHref} className="landing-btn-dark px-8 py-3.5 text-[15px]">
            {signupCta}
          </Link>
          <a href="#features" className="landing-btn-light px-8 py-3.5 text-[15px]">
            Explore sponsorships
          </a>
        </div>
      </div>
    </section>
  );
}
