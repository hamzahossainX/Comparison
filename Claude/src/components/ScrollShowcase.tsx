'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

type Chapter = {
  heading: string;
  body: string;
  /** Which side of the sticky pane the copy occupies. */
  side: 'left' | 'right' | 'center';
  /** [fadeIn, hold start, hold end, fadeOut] as fractions of the section. */
  window: [number, number, number, number];
};

const chapters: Chapter[] = [
  {
    heading: 'Twelve drivers, no front row',
    body: 'Sound leaves the sphere in every direction at once. Walk around the room and the mix stays exactly where the artist put it.',
    side: 'left',
    window: [0.0, 0.06, 0.28, 0.34],
  },
  {
    heading: 'One billet of aluminium',
    body: 'The ring is cut from a single block and polished for nine hours until the seam disappears. It carries the shell without ever touching the glass.',
    side: 'right',
    window: [0.33, 0.4, 0.6, 0.66],
  },
  {
    heading: 'Four seconds to set up',
    body: 'Plug it in. AURA One listens to the room, finds the walls, and tunes itself. Nothing to calibrate, nothing to read.',
    side: 'center',
    window: [0.65, 0.72, 1, 1],
  },
];

const sideClasses: Record<Chapter['side'], string> = {
  left: 'md:col-start-1 md:col-end-6 md:text-left',
  right: 'md:col-start-8 md:col-end-13 md:text-left',
  // The closing statement sits high in the frame; the product drops below it.
  center: 'md:col-start-3 md:col-end-11 md:self-start md:pt-[9vh] md:text-center',

};

function ChapterBlock({
  chapter,
  progress,
  reduced,
}: {
  chapter: Chapter;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const [inStart, holdStart, holdEnd, outEnd] = chapter.window;

  const opacity = useTransform(progress, [inStart, holdStart, holdEnd, outEnd], [0, 1, 1, 0]);
  const y = useTransform(
    progress,
    [inStart, holdStart, holdEnd, outEnd],
    reduced ? [0, 0, 0, 0] : [40, 0, 0, -40],
  );
  const blur = useTransform(
    progress,
    [inStart, holdStart, holdEnd, outEnd],
    reduced ? ['blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(0px)'] : ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(8px)'],
  );

  return (
    <motion.div
      style={{ opacity, y, filter: blur }}
      className={[
        'pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center',
        'md:relative',
        // On md+ every chapter is placed into the SAME grid row so they stack
        // on top of each other and stay vertically centred, instead of
        // flowing into three separate rows.
        'md:relative md:inset-x-auto md:top-auto md:row-start-1 md:row-end-2 md:translate-y-0 md:self-center',
        sideClasses[chapter.side],
      ].join(' ')}
    >
      {chapter.side === 'center' && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden h-[190%] w-[150%] -translate-x-1/2 -translate-y-1/2 md:block"
          style={{
            background:
              'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.4) 45%, transparent 72%)',
          }}
        />
      )}
      <h2 className="text-headline font-semibold text-balance">{chapter.heading}</h2>
      <p className="mx-auto mt-5 max-w-measure text-lede text-white/65 md:mx-0 md:max-w-[26rem]">
        {chapter.body}
      </p>
    </motion.div>
  );
}

export default function ScrollShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="showcase" ref={sectionRef} className="relative h-[380svh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        {/* Legibility scrim: on narrow screens the copy sits over the object,
            so the object gets pushed back rather than the text getting heavier. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-black/45 md:hidden"
        />

        <div className="relative mx-auto grid w-full max-w-shell grid-cols-1 items-center gap-x-6 px-5 sm:px-8 md:min-h-[64svh] md:grid-cols-12">
          {chapters.map((chapter) => (
            <ChapterBlock
              key={chapter.heading}
              chapter={chapter}
              progress={scrollYProgress}
              reduced={reduced}
            />
          ))}
        </div>

        <ChapterRail progress={scrollYProgress} />
      </div>
    </section>
  );
}

/** Three marks, because this genuinely is a sequence with a position in it. */
function ChapterRail({ progress }: { progress: MotionValue<number> }) {
  const scaleX = useTransform(progress, [0, 1], [0.02, 1]);

  return (
    <div
      aria-hidden
      className="absolute bottom-9 left-1/2 hidden h-[2px] w-28 -translate-x-1/2 overflow-hidden rounded-full bg-white/15 md:block"
    >
      <motion.div style={{ scaleX, originX: 0 }} className="h-full w-full bg-white/80" />
    </div>
  );
}
