'use client';

import type { CSSProperties } from 'react';
import type { Product } from '@/lib/products';

/**
 * Placeholder product imagery, composited in CSS rather than loaded as bitmaps.
 *
 * Two reasons over dropping in stock photos: it never ships a broken image or
 * a network round trip, and it stays on-palette so the grid reads as one
 * product family instead of six unrelated photographs. Replace the inner
 * element with `next/image` when real renders exist.
 */

const finishes: Record<Product['finish'], { body: string; glow: string }> = {
  graphite: { body: 'linear-gradient(150deg, #5a5e68 0%, #34373f 45%, #1c1e24 100%)', glow: 'rgba(160,168,185,0.30)' },
  silver: { body: 'linear-gradient(150deg, #f2f4f8 0%, #c3c8d2 46%, #8f95a2 100%)', glow: 'rgba(226,232,244,0.38)' },
  midnight: { body: 'linear-gradient(150deg, #2b3651 0%, #172033 46%, #080c15 100%)', glow: 'rgba(96,124,196,0.30)' },
  sand: { body: 'linear-gradient(150deg, #efe2d1 0%, #cdb79c 48%, #9d876a 100%)', glow: 'rgba(230,214,192,0.32)' },
  aurora: { body: 'linear-gradient(150deg, #b9c8ff 0%, #6E8BFF 42%, #B08CFF 100%)', glow: 'rgba(140,160,255,0.45)' },
  onyx: { body: 'linear-gradient(150deg, #3a3a40 0%, #202024 48%, #0b0b0d 100%)', glow: 'rgba(150,150,165,0.24)' },
};

const forms: Record<Product['form'], CSSProperties> = {
  sphere: { width: '62%', aspectRatio: '1 / 1', borderRadius: '50%' },
  pill: { width: '34%', aspectRatio: '0.62 / 1', borderRadius: '999px' },
  disc: { width: '72%', aspectRatio: '2.6 / 1', borderRadius: '999px' },
  bar: { width: '86%', aspectRatio: '3.4 / 1', borderRadius: '22px' },
};

export default function ProductVisual({ product }: { product: Product }) {
  const finish = finishes[product.finish];
  const form = forms[product.form];

  return (
    <div className="relative grid aspect-[4/3] w-full place-items-center overflow-hidden">
      {/* Studio backdrop pool. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 42%, ${finish.glow} 0%, transparent 68%)`,
        }}
      />

      {/* The object. */}
      <div
        aria-hidden
        className="relative transition-transform duration-700 ease-apple group-hover:scale-[1.06]"
        style={{
          ...form,
          background: finish.body,
          boxShadow: `0 30px 60px -20px rgba(0,0,0,0.85), inset 0 1px 1px rgba(255,255,255,0.35)`,
        }}
      >
        {/* Specular highlight. */}
        <span
          className="absolute inset-0"
          style={{
            borderRadius: 'inherit',
            background:
              'radial-gradient(circle at 30% 24%, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.12) 22%, transparent 48%)',
          }}
        />
        {/* Machined seam, the family cue shared across every product. */}
        <span
          className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
          }}
        />
      </div>

      {/* Contact shadow. */}
      <div
        aria-hidden
        className="absolute bottom-[14%] h-[6%] w-[52%] rounded-[50%] blur-lg"
        style={{ background: 'rgba(0,0,0,0.7)' }}
      />
    </div>
  );
}
