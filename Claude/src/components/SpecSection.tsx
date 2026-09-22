'use client';

import Reveal from './ui/Reveal';

const figures = [
  { value: '360°', label: 'Dispersion, measured at 2 kHz' },
  { value: '92 dB', label: 'Output at one metre' },
  { value: '6.4 mm', label: 'Shell wall, uniform throughout' },
  { value: '18 hr', label: 'Untethered playback' },
];

const details = [
  {
    title: 'Room sensing',
    body: 'Four microphones map reflective surfaces and re-weight each driver. It runs again whenever the speaker is moved.',
  },
  {
    title: 'Lossless over the air',
    body: 'Full 24-bit / 192 kHz across the local network, with a wired input for anyone who would rather not trust the air.',
  },
  {
    title: 'Serviceable by design',
    body: 'Six screws, one cable, and a driver module you can replace at home. The shell is not glued to anything.',
  },
];

export default function SpecSection() {
  return (
    <section id="specs" className="relative z-10 bg-paper text-ink">
      <div className="mx-auto max-w-shell px-5 py-28 sm:px-8 sm:py-36">
        <Reveal>
          <h2 className="max-w-3xl text-headline font-semibold text-balance">
            Everything you can measure, and the part you can&rsquo;t.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-6 max-w-measure text-lede text-mute">
            The numbers below are honest ones, taken in a room with furniture in it rather than an
            anechoic chamber.
          </p>
        </Reveal>

        <dl className="mt-20 grid grid-cols-2 gap-x-6 gap-y-14 border-t border-black/10 pt-14 lg:grid-cols-4">
          {figures.map((figure, index) => (
            <Reveal key={figure.value} delay={index * 0.06}>
              <div>
                <dt className="sr-only">{figure.label}</dt>
                <dd>
                  <span className="block text-[clamp(2.5rem,5.5vw,4.25rem)] font-semibold leading-none tracking-[-0.04em]">
                    {figure.value}
                  </span>
                  <span className="mt-4 block max-w-[15rem] text-[14px] leading-relaxed text-mute">
                    {figure.label}
                  </span>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>

        <div className="mt-24 grid gap-x-6 gap-y-12 border-t border-black/10 pt-14 md:grid-cols-3">
          {details.map((detail, index) => (
            <Reveal key={detail.title} delay={index * 0.06}>
              <div>
                <h3 className="text-title font-semibold">{detail.title}</h3>
                <p className="mt-4 max-w-[24rem] text-[15px] leading-relaxed text-mute">
                  {detail.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
