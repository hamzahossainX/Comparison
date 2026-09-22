"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { CHAPTERS, type Chapter } from "@/lib/products";

const Showcase3D = dynamic(() => import("./Showcase3D"), { ssr: false });

function ChapterBlock({
  chapter,
  index,
  total,
  progress,
}: {
  chapter: Chapter;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const seg = 1 / total;
  const s = index * seg;
  const opacity = useTransform(
    progress,
    [s, s + seg * 0.15, s + seg * 0.85, s + seg],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [s, s + seg * 0.15, s + seg * 0.85, s + seg],
    [40, 0, 0, -40]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <p
        className="text-sm font-medium tracking-[0.3em]"
        style={{ color: chapter.accent }}
      >
        {chapter.index}
      </p>
      <h2 className="mt-4 text-4xl font-semibold tracking-tightest text-white md:text-6xl">
        {chapter.title}
      </h2>
      <p className="mt-5 max-w-md text-lg leading-relaxed text-silver">
        {chapter.body}
      </p>
    </motion.div>
  );
}

export default function Showcase() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} id="showcase" className="relative h-[320vh] bg-ink">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,#141529_0%,#050507_60%)]" />

        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
          <div className="relative order-2 h-[300px] md:order-1">
            {CHAPTERS.map((c, i) => (
              <ChapterBlock
                key={c.index}
                chapter={c}
                index={i}
                total={CHAPTERS.length}
                progress={scrollYProgress}
              />
            ))}
          </div>

          <div className="order-1 h-[52vh] md:order-2 md:h-[70vh]">
            <Showcase3D progress={scrollYProgress} />
          </div>
        </div>

        {/* scroll progress bar */}
        <div className="absolute inset-x-0 bottom-10 mx-auto h-px w-40 overflow-hidden rounded-full bg-white/10">
          <motion.div
            style={{ scaleX: barScale }}
            className="h-full w-full origin-left bg-white/70"
          />
        </div>
      </div>
    </section>
  );
}
