"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import { CHAPTERS } from "@/lib/products";

const SCALES = [1, 1.3, 0.9];

function Device({ progress }: { progress: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshPhysicalMaterial>(null);
  const light = useRef<THREE.PointLight>(null);
  const spin = useRef(0);
  const target = useRef(new THREE.Color(CHAPTERS[0].accent));

  useFrame((state, delta) => {
    const p = progress.get();
    const idx = Math.min(
      CHAPTERS.length - 1,
      Math.floor(p * CHAPTERS.length)
    );
    spin.current += delta * 0.25;

    const g = group.current;
    if (g) {
      g.rotation.y = spin.current + p * Math.PI * 1.5;
      g.rotation.x = THREE.MathUtils.damp(
        g.rotation.x,
        0.35 + idx * 0.1,
        3,
        delta
      );
      g.scale.setScalar(
        THREE.MathUtils.damp(g.scale.x, SCALES[idx], 3, delta)
      );
    }

    // chapter-driven color morph
    target.current.set(CHAPTERS[idx].accent);
    mat.current?.color.lerp(target.current, delta * 3);
    if (light.current) light.current.color.lerp(target.current, delta * 3);

    if (ringA.current) ringA.current.rotation.z += delta * 0.5;
    if (ringB.current) ringB.current.rotation.z -= delta * 0.35;
  });

  return (
    <>
      <group ref={group}>
        <RoundedBox args={[2.1, 2.1, 0.5]} radius={0.14} smoothness={4}>
          <meshPhysicalMaterial
            ref={mat}
            color={CHAPTERS[0].accent}
            metalness={0.9}
            roughness={0.18}
            clearcoat={1}
            clearcoatRoughness={0.15}
          />
        </RoundedBox>
        <mesh ref={ringA} rotation={[Math.PI / 2.4, 0.4, 0]}>
          <torusGeometry args={[1.85, 0.012, 16, 128]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.28} />
        </mesh>
        <mesh ref={ringB} rotation={[Math.PI / 1.7, -0.5, 0]}>
          <torusGeometry args={[2.15, 0.008, 16, 128]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.16} />
        </mesh>
      </group>
      <pointLight
        ref={light}
        position={[0, 0, 3]}
        intensity={30}
        distance={9}
        color={CHAPTERS[0].accent}
      />
    </>
  );
}

export default function Showcase3D({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  return (
    <div className="h-full w-full" style={{ touchAction: "pan-y" }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Device progress={progress} />
        <Environment resolution={256}>
          <Lightformer
            form="rect"
            intensity={3}
            position={[0, 4, -8]}
            scale={[8, 3, 1]}
          />
          <Lightformer
            form="rect"
            intensity={1.2}
            position={[-4, 0, 2]}
            rotation-y={Math.PI / 2}
            scale={[4, 1.5, 1]}
          />
          <Lightformer
            form="rect"
            intensity={1.2}
            position={[4, 0, 2]}
            rotation-y={-Math.PI / 2}
            scale={[4, 1.5, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}
