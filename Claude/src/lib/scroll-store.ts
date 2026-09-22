/**
 * A single mutable object shared between the DOM scroll listener and the
 * requestAnimationFrame loop inside the WebGL canvas.
 *
 * Scroll position is deliberately kept out of React state: at 120 Hz a
 * setState per frame would re-render the tree and stutter the 3D scene.
 * The driver writes here, `useFrame` reads here, React never sees it.
 */
export type ScrollState = {
  /** 0 → 1 across the whole document. */
  page: number;
  /** 0 → 1 across the hero section only. */
  hero: number;
  /** 0 → 1 across the sticky showcase section only. */
  showcase: number;
  /** Which showcase chapter is active: 0, 1 or 2. */
  chapter: number;
  /** How visible the 3D object should be, 0 → 1. */
  presence: number;
  /** Pixels scrolled, used for nav state. */
  y: number;
};

export const scrollState: ScrollState = {
  page: 0,
  hero: 0,
  showcase: 0,
  chapter: 0,
  presence: 1,
  y: 0,
};

export const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

/** Maps `value` from [inMin, inMax] into [outMin, outMax], clamped. */
export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number => {
  const t = clamp01((value - inMin) / (inMax - inMin || 1));
  return outMin + t * (outMax - outMin);
};

/** Element ids the driver measures each frame. */
export const SECTION_IDS = {
  hero: 'hero',
  showcase: 'showcase',
} as const;
