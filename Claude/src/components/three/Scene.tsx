'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, ContactShadows, PresentationControls, Preload } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import AuraModel from './AuraModel';
import Studio from './Studio';

/**
 * One canvas for the whole page.
 *
 * It is fixed behind the content and never unmounts, which is what lets the
 * product travel continuously from the hero into the showcase instead of
 * popping in and out per section. `touch-action: pan-y` is the important
 * detail on mobile: horizontal drags rotate the model, vertical drags still
 * scroll the page.
 */
export default function Scene() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6.2], fov: 38, near: 0.1, far: 40 }}
      style={{ touchAction: 'pan-y' }}
    >
      <Suspense fallback={null}>
        <Studio />

        <PresentationControls
          global
          cursor
          snap
          speed={1.3}
          zoom={1}
          polar={[-Math.PI / 7, Math.PI / 7]}
          azimuth={[-Math.PI / 1.6, Math.PI / 1.6]}
          config={{ mass: 1.2, tension: 220, friction: 26 }}
        >
          <AuraModel reducedMotion={reducedMotion} />
        </PresentationControls>

        <ContactShadows
          position={[0, -2.15, 0]}
          opacity={0.45}
          scale={12}
          blur={3}
          far={4.5}
          color="#000000"
        />

        <AdaptiveDpr pixelated={false} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
