export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  /** Drives the CSS-composited placeholder render. */
  finish: 'graphite' | 'silver' | 'midnight' | 'sand' | 'aurora' | 'onyx';
  /** Shape hint for the placeholder render. */
  form: 'sphere' | 'pill' | 'disc' | 'bar';
  badge?: string;
};

export const products: Product[] = [
  {
    id: 'aura-one',
    name: 'AURA One',
    tagline: 'The full sphere. Twelve drivers, one room.',
    price: 549,
    finish: 'aurora',
    form: 'sphere',
    badge: 'New',
  },
  {
    id: 'aura-mini',
    name: 'AURA Mini',
    tagline: 'Same field, desk-sized.',
    price: 249,
    finish: 'silver',
    form: 'sphere',
  },
  {
    id: 'aura-bar',
    name: 'AURA Bar',
    tagline: 'Sits under the screen and disappears.',
    price: 799,
    finish: 'graphite',
    form: 'bar',
  },
  {
    id: 'aura-buds',
    name: 'AURA Buds',
    tagline: 'The room, folded into your ears.',
    price: 199,
    finish: 'sand',
    form: 'pill',
  },
  {
    id: 'aura-dock',
    name: 'AURA Dock',
    tagline: 'Charges, tunes, and stays out of the way.',
    price: 129,
    finish: 'midnight',
    form: 'disc',
  },
  {
    id: 'aura-studio',
    name: 'AURA Studio',
    tagline: 'A matched pair for people who master.',
    price: 1299,
    finish: 'onyx',
    form: 'bar',
    badge: 'Pro',
  },
];

export const formatPrice = (value: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
