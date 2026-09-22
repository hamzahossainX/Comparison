'use client';

import { motion, useReducedMotion } from 'framer-motion';

const ease = [0.28, 0.11, 0.32, 1] as const;

export default function Hero() {
  const reduced = useReducedMotion();

  // One orchestrated page-load sequence, then the page stays still until the
  // visitor acts. Everything below the fold is scroll-driven instead.
  const rise = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0.3 : 1.1, delay, ease },
  });

  return (
    <section
      id="hero"
      className="relative flex h-[100svh] min-h-[620px] flex-col justify-between overflow-hidden px-5 pb-8 pt-24 sm:px-8 sm:pb-12"
    >
      {/* Ambient bloom sitting behind the object, painted in CSS so it costs
          nothing on the GPU budget the canvas needs. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[130vmin] w-[130vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
        style={{
          background:
            'radial-gradient(circle, rgba(110,139,255,0.18) 0%, rgba(176,140,255,0.10) 32%, transparent 62%)',
        }}
      />

      {/* pointer-events-none lets drags fall through to the canvas; the two
          buttons opt back in. */}
      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-shell text-center">
        <motion.p
          {...rise(0.1)}
          className="text-[13px] font-medium text-mute sm:text-[15px]"
        >
          Spatial audio, no seat of honour
        </motion.p>

        <motion.h1
          {...rise(0.22)}
          className="mt-3 text-display font-semibold text-balance"
        >
          AURA One
        </motion.h1>
      </div>

      {/* The product runs behind the closing copy, so the frame darkens toward
          the bottom. Same treatment Apple uses under a hero video. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%]"
        style={{
          background:
            'linear-gradient(to top, #000 0%, rgba(0,0,0,0.92) 26%, rgba(0,0,0,0.6) 55%, transparent 100%)',
        }}
      />

      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-shell">
        <motion.p
          {...rise(0.5)}
          className="mx-auto max-w-measure text-center text-lede text-white/70"
        >
          Twelve drivers point outward from a single glass sphere. Sound reaches the walls before
          it reaches you, so the room becomes the speaker.
        </motion.p>

        <motion.div
          {...rise(0.62)}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href="#shop"
            className="pointer-events-auto w-full max-w-[240px] rounded-full bg-white px-8 py-3 text-center text-[15px] font-medium text-ink transition-transform duration-300 ease-apple hover:scale-[1.03] sm:w-auto"
          >
            Buy from $549
          </a>
          <a
            href="#showcase"
            className="pointer-events-auto w-full max-w-[240px] rounded-full border border-white/25 px-8 py-3 text-center text-[15px] font-medium text-white transition-colors duration-300 hover:border-white/60 sm:w-auto"
          >
            See how it works
          </a>
        </motion.div>

        <motion.div
          {...rise(0.8)}
          className="mt-10 text-center text-[12px] text-mute"
        >
          Drag anywhere to turn it. Scroll to go inside.
        </motion.div>
      </div>
    </section>
  );
}
