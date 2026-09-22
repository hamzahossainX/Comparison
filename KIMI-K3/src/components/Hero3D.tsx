"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
} from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";

function Product({ progress }: { progress: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null);
  const { gl } = useThree();
  const drag = useRef({ down: false, px: 0, py: 0, vx: 0, vy: 0 });

  useEffect(() => {
    const el = gl.domElement;
    el.style.cursor = "grab";

    const onDown = (e: PointerEvent) => {
      drag.current.down = true;
      drag.current.px = e.clientX;
      drag.current.py = e.clientY;
      el.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!drag.current.down) return;
      drag.current.vx = (e.clientX - drag.current.px) * 0.0045;
      drag.current.vy = (e.clientY - drag.current.py) * 0.0045;
      drag.current.px = e.clientX;
      drag.current.py = e.clientY;
    };
    const onUp = () => {
      drag.current.down = false;
      el.style.cursor = "grab";
    };

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [gl]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    const p = progress.get();

    // Scroll-driven Apple-style zoom past the product
    g.scale.setScalar(1 + p * 1.8);
    g.position.z = p * 3.4;
    g.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.08 + p * 0.4;

    // Idle spin + drag inertia
    g.rotation.y += delta * 0.22 + drag.current.vx;
    g.rotation.x = THREE.MathUtils.clamp(
      g.rotation.x + drag.current.vy,
      -1.1,
      1.1
    );
    drag.current.vx *= 0.93;
    drag.current.vy *= 0.93;
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.35}>
        <mesh>
          <torusKnotGeometry args={[1, 0.3, 256, 48]} />
          <meshPhysicalMaterial
            transmission={1}
            thickness={1.1}
            roughness={0.08}
            metalness={0}
            ior={1.45}
            clearcoat={1}
            clearcoatRoughness={0.08}
            color="#dbe3ff"
            attenuationColor="#8b9cf9"
            attenuationDistance={1.8}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function Hero3D({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="absolute inset-0 z-0" style={{ touchAction: "pan-y" }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 7], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Product progress={progress} />
        <ContactShadows
          position={[0, -2.4, 0]}
          opacity={0.45}
          scale={14}
          blur={2.8}
          far={4.5}
        />
        <spotLight
          position={[6, 6, 6]}
          intensity={120}
          angle={0.4}
          penumbra={1}
        />
        <pointLight position={[-6, -2, -4]} intensity={60} color="#7c8cf8" />
        <Environment resolution={256}>
          <group rotation={[-Math.PI / 3, 0, 1]}>
            <Lightformer
              form="circle"
              intensity={5}
              position={[0, 5, -9]}
              scale={2.2}
            />
            <Lightformer
              form="rect"
              intensity={1.5}
              position={[-5, 1, -1]}
              rotation-y={Math.PI / 2}
              scale={[6, 2, 1]}
            />
            <Lightformer
              form="rect"
              intensity={1.5}
              position={[5, 1, -1]}
              rotation-y={-Math.PI / 2}
              scale={[6, 2, 1]}
            />
            <Lightformer
              form="rect"
              intensity={1}
              color="#7c8cf8"
              position={[0, -5, 2]}
              rotation-x={-Math.PI / 2}
              scale={[8, 2, 1]}
            />
          </group>
        </Environment>
      </Canvas>
    </div>
  );
}
