'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  /** Seconds to hold before starting; used to stagger a headline and its lede. */
  delay?: number;
  className?: string;
  as?: 'div' | 'span' | 'li';
};

/**
 * A short, restrained entrance: 14px of travel and a long ease. Anything
 * further reads as a slideshow rather than a page settling into place.
 */
export default function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{
        duration: reduced ? 0.2 : 0.9,
        delay,
        ease: [0.28, 0.11, 0.32, 1],
      }}
    >
      {children}
    </Tag>
  );
}
