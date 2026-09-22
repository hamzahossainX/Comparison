'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { mapRange, scrollState } from '@/lib/scroll-store';

type Choreography = {
  x: number;
  y: number;
  z: number;
  scale: number;
  tilt: number;
  spin: number;
  ringSpread: number;
};

/**
 * Returns the pose the object should be in for the current scroll position.
 *
 * Three chapters, matching the three blocks of copy in the showcase:
 *   0 — the object slides right, copy takes the left column
 *   1 — it crosses to the left and grows, copy takes the right column
 *   2 — it recentres, shrinks, and the ring lifts away from the shell
 */
function poseFor(
  hero: number,
  showcase: number,
  narrow: boolean,
  /** Half the visible world width, so travel scales with the viewport. */
  spread: number,
): Choreography {
  // Hero: a slow settle as the headline scrolls away.
  if (showcase <= 0) {
    return {
      x: 0,
      y: mapRange(hero, 0, 1, 0.26, -0.55),
      z: mapRange(hero, 0, 1, 0, -1.1),
      scale: mapRange(hero, 0, 1, 0.94, 0.86),
      tilt: mapRange(hero, 0, 1, 0, 0.25),
      spin: hero * 1.2,
      ringSpread: 0,
    };
  }

  // On phones the object stays centred behind the copy. On wider screens it
  // steps aside by a fraction of the *visible* width rather than a fixed world
  // distance, so it never slides off a narrow desktop window.
  const lateral = narrow ? 0 : spread;

  if (showcase < 0.34) {
    const t = mapRange(showcase, 0, 0.34, 0, 1);
    return {
      x: mapRange(t, 0, 1, 0, lateral),
      y: mapRange(t, 0, 1, -0.55, 0),
      z: mapRange(t, 0, 1, -1.1, 0),
      scale: mapRange(t, 0, 1, 0.86, narrow ? 0.8 : 1),
      tilt: mapRange(t, 0, 1, 0.25, -0.12),
      spin: 1.2 + t * 1.6,
      ringSpread: 0,
    };
  }

  if (showcase < 0.66) {
    const t = mapRange(showcase, 0.34, 0.66, 0, 1);
    return {
      x: mapRange(t, 0, 1, lateral, -lateral),
      y: mapRange(t, 0, 1, 0, 0.1),
      z: mapRange(t, 0, 1, 0, 0.9),
      scale: mapRange(t, 0, 1, narrow ? 0.8 : 1, narrow ? 0.9 : 1.28),
      tilt: mapRange(t, 0, 1, -0.12, 0.3),
      spin: 2.8 + t * 2.2,
      ringSpread: 0,
    };
  }

  const t = mapRange(showcase, 0.66, 1, 0, 1);
  // Front-loaded: the move completes in the first third of the chapter so the
  // frame is settled by the time the closing statement is readable.
  const settle = Math.min(1, t / 0.32);
  return {
    x: mapRange(settle, 0, 1, -lateral, 0),
    y: mapRange(settle, 0, 1, 0.1, narrow ? -0.2 : -1.62),
    z: mapRange(settle, 0, 1, 0.9, -1.2),
    scale: mapRange(settle, 0, 1, narrow ? 0.9 : 1.28, narrow ? 0.84 : 0.78),
    tilt: mapRange(t, 0, 1, 0.3, 0),
    spin: 5 + t * 1.4,
    // The final beat: the ring separates and floats clear of the shell.
    ringSpread: t,
  };
}

export default function AuraModel({ reducedMotion }: { reducedMotion: boolean }) {
  const rig = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Group>(null);
  const halo = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);

  const { size } = useThree();
  const narrow = size.width < 820;
  // Short viewports get a smaller object so the hero copy keeps its clearance.
  const compact = size.height < 840 ? 0.85 : 1;

  // Geometry is created once and shared; recreating it per frame is the most
  // common cause of GC stutter in scroll-driven scenes.
  const geometry = useMemo(
    () => ({
      shell: new THREE.IcosahedronGeometry(1, 5),
      facets: new THREE.IcosahedronGeometry(1.001, 1),
      ring: new THREE.TorusGeometry(1.34, 0.045, 24, 220),
      halo: new THREE.TorusGeometry(1.62, 0.008, 12, 220),
      core: new THREE.IcosahedronGeometry(0.52, 2),
    }),
    [],
  );

  useFrame((state, rawDelta) => {
    // Clamp delta so a backgrounded tab doesn't teleport the object on return.
    const delta = Math.min(rawDelta, 1 / 30);
    // viewport.width is the world width visible at z = 0.
    const spread = THREE.MathUtils.clamp(state.viewport.width * 0.23, 1.15, 2.5);
    // On portrait phones the frame is narrower than the object's ring, so scale
    // it to fit the visible width instead of letting it crop off both edges.
    // 2.9 is the ring's outer diameter in world units.
    const fit = THREE.MathUtils.clamp((state.viewport.width * 0.7) / 2.9, 0.4, 1);
    const pose = poseFor(scrollState.hero, scrollState.showcase, narrow, spread);
    const t = state.clock.elapsedTime;

    if (rig.current) {
      const drift = reducedMotion ? 0 : Math.sin(t * 0.55) * 0.06;

      rig.current.position.x = THREE.MathUtils.damp(rig.current.position.x, pose.x, 3.6, delta);
      rig.current.position.y = THREE.MathUtils.damp(
        rig.current.position.y,
        pose.y + drift,
        3.6,
        delta,
      );
      rig.current.position.z = THREE.MathUtils.damp(rig.current.position.z, pose.z, 3.6, delta);

      const s = THREE.MathUtils.damp(rig.current.scale.x, pose.scale * compact * fit, 3.6, delta);
      rig.current.scale.setScalar(s);

      rig.current.rotation.z = THREE.MathUtils.damp(
        rig.current.rotation.z,
        pose.tilt * 0.4,
        3,
        delta,
      );
      rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, pose.tilt, 3, delta);
    }

    if (shell.current) {
      // Scroll advances the spin; idle time keeps it alive at a slow crawl.
      const idle = reducedMotion ? 0 : t * 0.16;
      shell.current.rotation.y = THREE.MathUtils.damp(
        shell.current.rotation.y,
        pose.spin + idle,
        2.4,
        delta,
      );
    }

    if (ring.current) {
      ring.current.rotation.x = THREE.MathUtils.damp(
        ring.current.rotation.x,
        Math.PI / 2.35 - pose.ringSpread * 0.5,
        3,
        delta,
      );
      ring.current.rotation.z = THREE.MathUtils.damp(
        ring.current.rotation.z,
        pose.ringSpread * 0.35,
        3,
        delta,
      );
      const spread = 1 + pose.ringSpread * 0.22;
      ring.current.scale.setScalar(THREE.MathUtils.damp(ring.current.scale.x, spread, 3, delta));
    }

    if (halo.current) {
      halo.current.rotation.z = reducedMotion ? 0 : t * 0.25;
      const material = halo.current.material as THREE.MeshBasicMaterial;
      material.opacity = THREE.MathUtils.damp(
        material.opacity,
        0.12 + pose.ringSpread * 0.5,
        3,
        delta,
      );
    }

    if (core.current) {
      core.current.rotation.y = reducedMotion ? 0 : -t * 0.4;
      core.current.rotation.x = reducedMotion ? 0 : t * 0.22;
    }
  });

  return (
    <group ref={rig} dispose={null}>
      <group ref={shell}>
        {/* The driver: a dark machined core, visible through the glass. */}
        <mesh ref={core} geometry={geometry.core}>
          <meshStandardMaterial
            color="#101014"
            metalness={0.95}
            roughness={0.28}
            envMapIntensity={1.4}
          />
        </mesh>

        {/* Faceted inner wireframe — reads as the acoustic lattice. */}
        <mesh geometry={geometry.facets} scale={0.86}>
          <meshBasicMaterial
            color="#6E8BFF"
            wireframe
            transparent
            opacity={0.16}
            toneMapped={false}
          />
        </mesh>

        {/* Glass shell. */}
        <mesh geometry={geometry.shell}>
          <MeshTransmissionMaterial
            samples={6}
            resolution={256}
            transmission={1}
            thickness={1.15}
            roughness={0.05}
            ior={1.42}
            chromaticAberration={0.04}
            distortion={0.18}
            distortionScale={0.3}
            temporalDistortion={0.02}
            attenuationDistance={2.2}
            attenuationColor="#e9ecff"
            color="#ffffff"
          />
        </mesh>

        {/* Machined aluminium ring. */}
        <group ref={ring} rotation={[Math.PI / 2.35, 0, 0]}>
          <mesh geometry={geometry.ring}>
            <meshStandardMaterial
              color="#c9ccd4"
              metalness={1}
              roughness={0.18}
              envMapIntensity={2.2}
            />
          </mesh>
        </group>

        {/* Emitted halo — the sound field made visible in the final chapter. */}
        <mesh ref={halo} geometry={geometry.halo} rotation={[Math.PI / 2.35, 0, 0]}>
          <meshBasicMaterial color="#B08CFF" transparent opacity={0.12} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}
