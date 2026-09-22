"use client";

import { motion } from "framer-motion";
import { PRODUCTS } from "@/lib/products";

export default function ProductGrid() {
  return (
    <section id="grid" className="relative bg-ink py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-semibold tracking-tightest text-white md:text-6xl">
            Which AURA is yours?
          </h2>
          <p className="mt-4 text-lg text-silver">
            Four shapes of the future. One is calling.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group glass relative overflow-hidden rounded-3xl p-4 transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
            >
              {/* product art */}
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-2xl"
                style={{
                  background: `radial-gradient(circle at 50% 115%, ${p.accent}40, transparent 62%), #0e0e15`,
                }}
              >
                <div
                  className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-[60%] rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.12] to-white/[0.02] transition-transform duration-700 ease-out group-hover:-rotate-6 group-hover:scale-110"
                  style={{
                    boxShadow: `0 0 70px 8px ${p.accent}33, inset 0 1px 0 rgba(255,255,255,0.15)`,
                  }}
                />
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
                <span className="absolute bottom-3 left-4 text-[11px] font-medium uppercase tracking-[0.25em] text-white/40">
                  {p.kicker}
                </span>
              </div>

              <div className="px-2 pb-2 pt-5">
                <h3 className="text-lg font-semibold text-white">{p.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-silver">
                  {p.tagline}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-mist/80">
                    From{" "}
                    <span className="font-semibold text-white">
                      ${p.price.toLocaleString()}
                    </span>
                  </p>
                  <button className="rounded-full border border-[#2997ff]/30 bg-[#2997ff]/10 px-4 py-1.5 text-xs font-medium text-[#2997ff] transition-all duration-300 hover:bg-[#2997ff] hover:text-white">
                    Buy
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
