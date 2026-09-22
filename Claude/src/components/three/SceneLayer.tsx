'use client';

import dynamic from 'next/dynamic';

// WebGL has no business running on the server, and code-splitting it keeps
// three.js out of the first JS payload so the headline paints immediately.
const Scene = dynamic(() => import('./Scene'), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center">
      <div
        aria-hidden
        className="h-24 w-24 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.5),rgba(110,139,255,0.18)_45%,transparent_70%)] blur-xl"
      />
    </div>
  ),
});

export default function SceneLayer() {
  return (
    <div
      id="webgl-layer"
      className="pointer-events-auto fixed inset-0 z-0 transition-opacity duration-300 ease-apple"
      style={{ opacity: 1 }}
    >
      <Scene />
    </div>
  );
}
