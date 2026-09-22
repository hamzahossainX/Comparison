'use client';

import { useCallback, useRef, type MouseEvent } from 'react';
import { formatPrice, products, type Product } from '@/lib/products';
import ProductVisual from './ui/ProductVisual';
import Reveal from './ui/Reveal';

function ProductCard({ product }: { product: Product }) {
  const cardRef = useRef<HTMLElement>(null);

  // The spotlight follows the pointer by writing CSS custom properties
  // directly. Routing this through React state would re-render the card on
  // every mousemove for no visual benefit.
  const handleMove = useCallback((event: MouseEvent<HTMLElement>) => {
    const node = cardRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    node.style.setProperty('--my', `${event.clientY - rect.top}px`);
    node.style.setProperty('--spot', '1');
  }, []);

  const handleLeave = useCallback(() => {
    cardRef.current?.style.setProperty('--spot', '0');
  }, []);

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ '--mx': '50%', '--my': '50%', '--spot': '0' } as React.CSSProperties}
      className="group glass glass-hairline relative overflow-hidden rounded-[26px] transition-all duration-500 ease-apple hover:-translate-y-1 hover:border-white/25"
    >
      {/* Pointer spotlight. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: 'var(--spot)',
          background:
            'radial-gradient(420px circle at var(--mx) var(--my), rgba(255,255,255,0.10), transparent 60%)',
        }}
      />

      {product.badge && (
        <span className="absolute left-5 top-5 z-10 rounded-full bg-white/12 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur">
          {product.badge}
        </span>
      )}

      <ProductVisual product={product} />

      <div className="relative flex flex-col gap-2 border-t border-white/[0.08] p-6">
        <h3 className="text-[19px] font-semibold tracking-[-0.02em]">{product.name}</h3>
        <p className="min-h-[2.6rem] text-[14px] leading-relaxed text-white/55">
          {product.tagline}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-[15px] text-white/80">{formatPrice(product.price)}</span>
          <button
            type="button"
            className="rounded-full bg-white/10 px-5 py-2 text-[13px] font-medium text-white transition-colors duration-300 hover:bg-white hover:text-ink"
          >
            Add to bag
          </button>
        </div>
      </div>
    </article>
  );
}

export default function ProductGrid() {
  return (
    <section id="shop" className="relative z-10 bg-void">
      {/* A faint field behind the glass so the panes have something to refract. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 20% 0%, rgba(110,139,255,0.16), transparent 60%), radial-gradient(ellipse 50% 40% at 85% 25%, rgba(176,140,255,0.13), transparent 60%)',
        }}
      />

      <div className="relative mx-auto max-w-shell px-5 py-28 sm:px-8 sm:py-36">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <h2 className="max-w-2xl text-headline font-semibold text-balance">
              The rest of the family
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-[22rem] text-[15px] leading-relaxed text-white/55">
              Every piece runs the same room-sensing engine, so they stay in phase with each other
              across the house.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={Math.min(index, 3) * 0.05}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
