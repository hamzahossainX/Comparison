'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const links = [
  { label: 'Overview', href: '#hero' },
  { label: 'Design', href: '#showcase' },
  { label: 'Specs', href: '#specs' },
  { label: 'Shop', href: '#shop' },
  { label: 'Support', href: '#support' },
];

export default function Navbar() {
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the sheet on Escape and lock the page behind it.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={[
          'border-b transition-all duration-500 ease-apple',
          condensed || menuOpen
            ? 'border-white/10 bg-black/60 backdrop-blur-pane backdrop-saturate-150'
            : 'border-transparent bg-transparent',
        ].join(' ')}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-12 max-w-shell items-center justify-between px-5 sm:px-8"
        >
          <a
            href="#hero"
            className="text-[15px] font-semibold tracking-[-0.02em] text-white/95"
          >
            aura
          </a>

          <ul className="hidden items-center gap-9 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[12.5px] font-normal text-white/75 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href="#shop"
              className="hidden rounded-full bg-white px-4 py-1.5 text-[12.5px] font-medium text-ink transition-transform duration-300 ease-apple hover:scale-[1.03] md:inline-block"
            >
              Buy
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="-mr-1 flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
            >
              <span
                className={[
                  'block h-[2px] w-[20px] rounded-full bg-white transition-transform duration-300 ease-apple',
                  menuOpen ? 'translate-y-[3px] rotate-45' : '',
                ].join(' ')}
              />
              <span
                className={[
                  'block h-[2px] w-[20px] rounded-full bg-white transition-transform duration-300 ease-apple',
                  menuOpen ? '-translate-y-[3px] -rotate-45' : '',
                ].join(' ')}
              />
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.28, 0.11, 0.32, 1] }}
            className="border-b border-white/10 bg-black/85 backdrop-blur-pane md:hidden"
          >
            <ul className="mx-auto max-w-shell px-5 py-4">
              {links.map((link) => (
                <li key={link.href} className="border-b border-white/[0.07] last:border-none">
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-4 text-[22px] font-medium tracking-[-0.02em] text-white/90"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
