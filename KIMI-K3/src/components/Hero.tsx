"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

export default function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.35], [0, -90]);

  return (
    <section ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ambient backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#17182b_0%,#050507_62%)]" />

        <Hero3D progress={scrollYProgress} />

        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-end pb-20 text-center"
        >
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.4em] text-silver/70">
            Drag to rotate
          </p>
          <p className="text-sm font-medium tracking-[0.3em] text-silver">
            INTRODUCING
          </p>
          <h1 className="mt-3 text-6xl font-semibold tracking-tightest text-white md:text-8xl">
            AURA ONE
          </h1>
          <p className="mt-4 max-w-md text-lg text-silver">
            Beyond imagination. Impossibly light.
          </p>
          <div className="pointer-events-auto mt-8 flex items-center gap-6">
            <a
              href="#grid"
              className="rounded-full bg-[#2997ff] px-6 py-2.5 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.04] active:scale-95"
            >
              Buy
            </a>
            <a
              href="#showcase"
              className="text-sm text-[#2997ff] transition-colors hover:underline"
            >
              Learn more &rsaquo;
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
