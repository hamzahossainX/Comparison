'use client';

import Reveal from './ui/Reveal';

export default function CallToAction() {
  return (
    <section className="relative z-10 overflow-hidden bg-void">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vmin] w-[110vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(176,140,255,0.18) 0%, rgba(110,139,255,0.10) 40%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-shell px-5 py-28 text-center sm:px-8 sm:py-36">
        <Reveal>
          <h2 className="mx-auto max-w-4xl text-headline font-semibold text-balance">
            Hear it in your own room for thirty days.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mx-auto mt-6 max-w-measure text-lede text-white/60">
            If the room doesn&rsquo;t open up, send it back. Return shipping is on us, and the
            packaging is designed to be reused.
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a
              href="#shop"
              className="w-full max-w-[240px] rounded-full bg-white px-8 py-3 text-[15px] font-medium text-ink transition-transform duration-300 ease-apple hover:scale-[1.03] sm:w-auto"
            >
              Buy AURA One
            </a>
            <a
              href="#support"
              className="w-full max-w-[240px] rounded-full border border-white/25 px-8 py-3 text-[15px] font-medium text-white transition-colors duration-300 hover:border-white/60 sm:w-auto"
            >
              Book a listening session
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
