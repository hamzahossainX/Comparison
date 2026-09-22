import { useEffect, useMemo, useRef } from 'react'
import type { ComponentRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, RoundedBox } from '@react-three/drei'
import { ExtrudeGeometry, MathUtils, Shape } from 'three'
import type { Group } from 'three'
import type { MotionValue } from 'framer-motion'

type SceneProps = { color: string; dark: string; progress: MotionValue<number>; reducedMotion: boolean; rotation: number; active: boolean; resetToken?: number }

function Headphones({ color, dark, progress, reducedMotion, rotation, active }: SceneProps) {
  const group = useRef<Group>(null)
  const { invalidate } = useThree()
  const band = useMemo(() => {
    const shape = new Shape()
    shape.absarc(0, 0.23, 1.11, 0, Math.PI, false)
    shape.lineTo(-0.96, 0.23)
    shape.absarc(0, 0.23, 0.96, Math.PI, 0, true)
    shape.closePath()
    return new ExtrudeGeometry(shape, { depth: 0.27, bevelEnabled: true, bevelSegments: 4, steps: 1, bevelSize: 0.045, bevelThickness: 0.045, curveSegments: 64 })
  }, [])
  useEffect(() => () => band.dispose(), [band])
  useEffect(() => progress.on('change', () => invalidate()), [progress, invalidate])
  useEffect(() => { invalidate() }, [active, color, rotation, invalidate])
  useFrame(({ clock }, delta) => {
    if (!group.current) return
    const scroll = reducedMotion ? 0 : progress.get()
    const damping = reducedMotion ? 1 : 1 - Math.exp(-delta * 5)
    group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, -0.48 + rotation + scroll * 1.2, damping)
    group.current.rotation.z = MathUtils.lerp(group.current.rotation.z, -0.22 + scroll * 0.32, damping)
    group.current.position.y = reducedMotion ? 0 : Math.sin(clock.elapsedTime * 0.65) * 0.035 - scroll * 0.08
    group.current.scale.setScalar(1 - scroll * 0.13)
    if (active && !reducedMotion) invalidate()
  })
  return <group ref={group} rotation={[0.1, -0.48 + rotation, -0.22]}>
    <mesh geometry={band} position={[0, 0, -0.135]} scale={[1, 1.12, 1]}><meshStandardMaterial color={color} metalness={0.35} roughness={0.34}/></mesh>
    <mesh position={[0, 0.24, 0]} scale={[1, 1.1, 1]}><torusGeometry args={[0.952, 0.06, 12, 80, Math.PI]}/><meshStandardMaterial color={dark} roughness={0.88}/></mesh>
    {[-1, 1].map(side => <group key={side} position={[side * 1.035, -0.15, 0]} rotation={[0, 0, side * 0.06]}>
      <mesh position={[0, 0.19, 0]}><cylinderGeometry args={[0.047, 0.047, 0.53, 24]}/><meshStandardMaterial color="#b9c3b7" metalness={0.85} roughness={0.24}/></mesh>
      <RoundedBox args={[0.22, 0.5, 0.3]} radius={0.09} smoothness={4} position={[0, -0.04, 0]}><meshStandardMaterial color={color} metalness={0.3} roughness={0.35}/></RoundedBox>
      <group position={[side * 0.02, -0.52, 0]} rotation={[0.04, side * -0.11, 0]}>
        <RoundedBox args={[0.66, 1.02, 0.44]} radius={0.22} smoothness={6} position={[-side * 0.08, 0, -0.13]}><meshStandardMaterial color={dark} roughness={0.91}/></RoundedBox>
        <RoundedBox args={[0.71, 1.09, 0.34]} radius={0.19} smoothness={6} position={[0, 0, 0.14]}><meshStandardMaterial color={color} metalness={0.38} roughness={0.32}/></RoundedBox>
        <RoundedBox args={[0.59, 0.95, 0.055]} radius={0.18} smoothness={6} position={[0, 0, 0.32]}><meshStandardMaterial color={color} metalness={0.42} roughness={0.36}/></RoundedBox>
        <mesh position={[0, 0, 0.355]}><ringGeometry args={[0.075, 0.083, 40]}/><meshStandardMaterial color={dark} metalness={0.5} roughness={0.45}/></mesh>
        {side === 1 && <><mesh position={[0.17, -0.38, 0.31]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.045, 0.045, 0.07, 20]}/><meshStandardMaterial color={dark} metalness={0.6} roughness={0.4}/></mesh><mesh position={[-0.08, -0.47, 0.3]}><boxGeometry args={[0.09, 0.022, 0.015]}/><meshStandardMaterial color={dark}/></mesh></>}
      </group>
    </group>)}
  </group>
}

function Controls({ resetToken }: { resetToken?: number }) {
  const ref = useRef<ComponentRef<typeof OrbitControls>>(null)
  useEffect(() => { ref.current?.reset() }, [resetToken])
  return <OrbitControls ref={ref} enableZoom={false} enablePan={false} enableDamping minPolarAngle={0.6} maxPolarAngle={2.5} rotateSpeed={0.7}/>
}

export default function Scene(props: SceneProps) {
  return <Canvas camera={{ position: [0, 0.15, 5.9], fov: 37 }} dpr={[1, 1.75]} frameloop="demand" gl={{ antialias: true, alpha: true }} aria-label="Interactive 3D Forma headphones. Drag to rotate.">
    <ambientLight intensity={1.7}/><hemisphereLight args={['#ffffff', '#687763', 2]}/>
    <directionalLight position={[-4, 6, 5]} intensity={4}/><directionalLight position={[4, 2, -3]} intensity={3}/><pointLight position={[0, -3, 4]} intensity={8}/>
    <Headphones {...props}/>
    <Controls resetToken={props.resetToken}/>
  </Canvas>
}
