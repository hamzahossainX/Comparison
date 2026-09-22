import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AURA One — spatial audio, no seat of honour',
  description:
    'Twelve drivers point outward from a single glass sphere, so the room becomes the speaker. An immersive product prototype built with Next.js, React Three Fiber and Framer Motion.',
  metadataBase: new URL('https://aura.example.com'),
  openGraph: {
    title: 'AURA One',
    description: 'Spatial audio, no seat of honour.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
