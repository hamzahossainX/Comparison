'use client';

import { Environment, Lightformer } from '@react-three/drei';

/**
 * A hand-built studio environment.
 *
 * Deliberately not an HDRI preset: `<Environment preset="city" />` downloads a
 * multi-megabyte map from a CDN at runtime, which fails offline and delays
 * first paint. These Lightformers are rendered once into a 256px cube map and
 * give the glass shell the long, soft highlights that read as product
 * photography rather than a game engine.
 */
export default function Studio() {
  return (
    <>
      {/* Key, fill and rim — the classic three-point setup. */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} color="#ffffff" />
      <directionalLight position={[-5, 2, -3]} intensity={0.7} color="#6E8BFF" />
      <pointLight position={[0, -3, 2]} intensity={12} distance={9} color="#B08CFF" />

      <Environment resolution={256} frames={1}>
        {/* Long overhead softbox: the signature stripe across the top of the shell. */}
        <Lightformer
          form="rect"
          intensity={5}
          position={[0, 5, -2]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[12, 4, 1]}
          color="#ffffff"
        />
        {/* Cool edge light, camera left. */}
        <Lightformer
          form="rect"
          intensity={3.2}
          position={[-5, 1, 1]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[8, 6, 1]}
          color="#6E8BFF"
        />
        {/* Warm-violet kicker, camera right. */}
        <Lightformer
          form="rect"
          intensity={2.6}
          position={[5, -1, 1]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[8, 6, 1]}
          color="#B08CFF"
        />
        {/* Tight circular catch light so the sphere always has a hot spot. */}
        <Lightformer
          form="circle"
          intensity={6}
          position={[2, 3, 4]}
          scale={2}
          color="#ffffff"
        />
        {/* Floor bounce keeps the underside from going fully black. */}
        <Lightformer
          form="rect"
          intensity={1.1}
          position={[0, -5, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[10, 10, 1]}
          color="#3a3a44"
        />
      </Environment>
    </>
  );
}
