"use client";

import { motion } from "framer-motion";

const TILES = [
  {
    eyebrow: "AURA SOUND",
    title: "Sound. Reimagined.",
    copy: "Adaptive spatial audio that maps itself to your world.",
    accent: "#f472b6",
  },
  {
    eyebrow: "AURA VISION",
    title: "Vision. Beyond.",
    copy: "A canvas that floats in your space, not on your desk.",
    accent: "#34d399",
  },
];

export default function Promo() {
  return (
    <section className="bg-ink px-4 pb-24 md:px-6">
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
        {TILES.map((t, i) => (
          <motion.div
            key={t.eyebrow}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex min-h-[440px] flex-col overflow-hidden rounded-3xl border border-white/[0.08] p-10"
            style={{
              background: `radial-gradient(circle at 50% 130%, ${t.accent}2e, transparent 65%), #0a0a10`,
            }}
          >
            <p
              className="text-xs font-semibold tracking-[0.3em]"
              style={{ color: t.accent }}
            >
              {t.eyebrow}
            </p>
            <h3 className="mt-3 text-4xl font-semibold tracking-tightest text-white md:text-5xl">
              {t.title}
            </h3>
            <p className="mt-3 max-w-xs text-base text-silver">{t.copy}</p>
            <div className="mt-4 flex gap-6 text-sm">
              <a href="#" className="text-[#2997ff] transition-opacity hover:underline">
                Learn more &rsaquo;
              </a>
              <a href="#" className="text-[#2997ff] transition-opacity hover:underline">
                Buy &rsaquo;
              </a>
            </div>

            {/* abstract device placeholder */}
            <div
              className="pointer-events-none absolute -bottom-16 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full border border-white/10 transition-transform duration-700 group-hover:scale-110"
              style={{
                boxShadow: `0 0 120px 20px ${t.accent}30, inset 0 0 60px ${t.accent}18`,
              }}
            />
            <div className="pointer-events-none absolute -bottom-24 left-1/2 h-40 w-72 -translate-x-1/2 rounded-[3rem] bg-gradient-to-b from-white/[0.07] to-transparent blur-sm" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
