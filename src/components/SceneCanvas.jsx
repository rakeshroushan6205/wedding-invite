import { Suspense, useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

const MOODS = {
  hero:        { ambient: '#F3DCD4', aI: 0.55, p: '#E6C887', s: '#E6C887', bokeh: '#FBF6EC', stars: false },
  experience:  { ambient: '#F3DCD4', aI: 0.50, p: '#E6C887', s: '#E6C887', bokeh: '#FBF6EC', stars: false },
  story:       { ambient: '#E8F0E8', aI: 0.55, p: '#D4A574', s: '#E8D5B5', bokeh: '#F5E6CC', stars: false },
  countdown:   { ambient: '#1A1A3E', aI: 0.35, p: '#C8983E', s: '#E6C887', bokeh: '#FBF6EC', stars: true },
  events:      { ambient: '#E8D5B5', aI: 0.50, p: '#C8983E', s: '#E6C887', bokeh: '#F5E6CC', stars: false },
  gallery:     { ambient: '#E8E0D8', aI: 0.50, p: '#C8983E', s: '#E6C887', bokeh: '#FBF6EC', stars: false },
  films:       { ambient: '#1A0A12', aI: 0.30, p: '#C8983E', s: '#E6C887', bokeh: '#D9A8A0', stars: true },
  venue:       { ambient: '#D8E8D0', aI: 0.55, p: '#C8983E', s: '#E6C887', bokeh: '#F5E6CC', stars: false },
  family:      { ambient: '#F0E8D8', aI: 0.50, p: '#C8983E', s: '#E6C887', bokeh: '#FBF6EC', stars: false },
  rsvp:        { ambient: '#F5F0E8', aI: 0.55, p: '#C8983E', s: '#E6C887', bokeh: '#FBF6EC', stars: false },
  wishes:      { ambient: '#F0E8E0', aI: 0.50, p: '#C8983E', s: '#E6C887', bokeh: '#D9A8A0', stars: false },
  finale:      { ambient: '#E8C8D0', aI: 0.50, p: '#E6C887', s: '#E6C887', bokeh: '#FBF6EC', stars: false },
  footer:      { ambient: '#1A1A3E', aI: 0.35, p: '#E6C887', s: '#E6C887', bokeh: '#FBF6EC', stars: true },
}

const DEFAULT_MOOD = MOODS.hero

export function GlowRing({ position, scale = 1, speed = 1, color = '#E6C887', rotation = [Math.PI / 2.4, 0, 0] }) {
  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={1.4}>
      <mesh position={position} scale={scale} rotation={rotation}>
        <torusGeometry args={[1, 0.05, 32, 100]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.8} metalness={0.95} roughness={0.15} />
      </mesh>
    </Float>
  )
}

export function InterlockedRings({ position = [0, 0.4, -1.5], scale = 1 }) {
  return (
    <Float speed={0.5} rotationIntensity={0.3} floatIntensity={0.9}>
      <group position={position} scale={scale}>
        <mesh rotation={[Math.PI / 2.2, 0, 0]} position={[-0.45, 0, 0]}>
          <torusGeometry args={[1, 0.065, 32, 120]} />
          <meshStandardMaterial color="#E6C887" emissive="#E6C887" emissiveIntensity={2.6} metalness={0.95} roughness={0.12} />
        </mesh>
        <mesh rotation={[Math.PI / 2.2, 0.4, 0]} position={[0.45, -0.05, 0.15]}>
          <torusGeometry args={[1, 0.065, 32, 120]} />
          <meshStandardMaterial color="#E9B9AF" emissive="#D9A8A0" emissiveIntensity={2.2} metalness={0.95} roughness={0.15} />
        </mesh>
      </group>
    </Float>
  )
}

export function Diamond({ position, scale = 0.22, speed = 1 }) {
  return (
    <Float speed={speed} rotationIntensity={1.6} floatIntensity={2}>
      <mesh position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial color="#FBF6EC" metalness={0.35} roughness={0.12} clearcoat={1} clearcoatRoughness={0.08} emissive="#E6C887" emissiveIntensity={0.55} />
      </mesh>
    </Float>
  )
}

export function Rose({ position, scale = 1, speed = 1 }) {
  const petals = 6
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.8}>
      <group position={position} scale={scale}>
        {Array.from({ length: petals }).map((_, i) => {
          const angle = (i / petals) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(angle) * 0.22, Math.sin(angle) * 0.22, Math.sin(angle * 2) * 0.08]} rotation={[0, 0, angle]} scale={[0.32, 0.22, 0.18]}>
              <sphereGeometry args={[1, 16, 16]} />
              <MeshDistortMaterial color="#E8B8AE" emissive="#D9A8A0" emissiveIntensity={0.5} distort={0.25} speed={1.5} roughness={0.4} metalness={0.1} />
            </mesh>
          )
        })}
        <mesh position={[0, 0, 0.1]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <MeshDistortMaterial color="#E6C887" emissive="#C8983E" emissiveIntensity={0.6} distort={0.2} speed={1.5} roughness={0.35} metalness={0.2} />
        </mesh>
      </group>
    </Float>
  )
}

function PetalParticle({ petalRef, index }) {
  return null
}

function FallingPetals({ count = 40, color = '#E8B8AE', activeSection }) {
  const meshRef = useRef(null)
  const data = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 16,
        y: Math.random() * 12 - 2,
        z: (Math.random() - 0.5) * 10 - 2,
        speed: 0.3 + Math.random() * 0.5,
        rotSpeed: 0.5 + Math.random() * 2,
        sway: 0.3 + Math.random() * 0.8,
        swaySpeed: 0.5 + Math.random() * 1.5,
        offset: Math.random() * Math.PI * 2,
      })
    }
    return temp
  }, [count])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    data.forEach((d, i) => {
      d.y -= d.speed * 0.012
      d.x += Math.sin(t * d.swaySpeed + d.offset) * d.sway * 0.004
      if (d.y < -4) {
        d.y = 8
        d.x = (Math.random() - 0.5) * 16
        d.z = (Math.random() - 0.5) * 10 - 2
      }
      const mesh = meshRef.current?.children[i]
      if (mesh) {
        mesh.position.set(d.x, d.y, d.z)
        mesh.rotation.z += d.rotSpeed * 0.015
        mesh.rotation.x = Math.sin(t * d.rotSpeed + d.offset) * 0.1
      }
    })
  })

  return (
    <group ref={meshRef}>
      {data.map((d, i) => (
        <mesh key={i} position={[d.x, d.y, d.z]} rotation={[Math.random(), Math.random(), Math.random()]}>
          <planeGeometry args={[0.09, 0.05]} />
          <meshStandardMaterial color={color} transparent opacity={0.55} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

function Butterflies({ count = 6, mood }) {
  const groupRef = useRef(null)
  const data = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 12,
        y: Math.random() * 6 - 1,
        z: (Math.random() - 0.5) * 8 - 1,
        speed: 0.3 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        radius: 0.3 + Math.random() * 0.5,
        height: 0.2 + Math.random() * 0.4,
        wingPhase: Math.random() * Math.PI * 2,
      })
    }
    return temp
  }, [count])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    data.forEach((d, i) => {
      const mesh = groupRef.current?.children[i]
      if (mesh) {
        mesh.position.x = d.x + Math.sin(t * d.speed * 0.3 + d.phase) * d.radius
        mesh.position.y = d.y + Math.sin(t * d.speed * 0.5 + d.phase + 1) * d.height
        mesh.position.z = d.z + Math.cos(t * d.speed * 0.3 + d.phase) * d.radius * 0.5
        mesh.rotation.y = Math.sin(t * d.speed * 0.4 + d.phase) * 0.5
        const wingAngle = Math.sin(t * 3 + d.wingPhase) * 0.4 + 0.3
        if (mesh.children[0]) mesh.children[0].rotation.y = wingAngle
        if (mesh.children[1]) mesh.children[1].rotation.y = -wingAngle
      }
    })
  })

  const wingMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#D9A8A0', emissive: '#C8983E', emissiveIntensity: 0.3, transparent: true, opacity: 0.8, side: THREE.DoubleSide,
  }), [])

  return (
    <group ref={groupRef}>
      {data.map((d, i) => (
        <group key={i} position={[d.x, d.y, d.z]}>
          <mesh position={[-0.08, 0, 0]} rotation={[0, 0.3, 0.2]} material={wingMat}>
            <planeGeometry args={[0.18, 0.1]} />
          </mesh>
          <mesh position={[0.08, 0, 0]} rotation={[0, -0.3, -0.2]} material={wingMat}>
            <planeGeometry args={[0.18, 0.1]} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function BokehLights({ count = 30, color = '#FBF6EC' }) {
  const meshRef = useRef(null)
  const data = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      temp.push({ x: (Math.random() - 0.5) * 20, y: (Math.random() - 0.5) * 16, z: (Math.random() - 0.5) * 14 - 4, s: 0.05 + Math.random() * 0.15, sp: 0.1 + Math.random() * 0.3, ph: Math.random() * Math.PI * 2 })
    }
    return temp
  }, [count])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    data.forEach((d, i) => {
      const mesh = meshRef.current?.children[i]
      if (mesh) {
        mesh.position.y = d.y + Math.sin(t * d.sp + d.ph) * 0.3
        mesh.position.x = d.x + Math.cos(t * d.sp * 0.5 + d.ph) * 0.2
        mesh.material.opacity = 0.2 + Math.sin(t * d.sp + d.ph) * 0.15
      }
    })
  })

  return (
    <group ref={meshRef}>
      {data.map((d, i) => (
        <mesh key={i} position={[d.x, d.y, d.z]}>
          <circleGeometry args={[d.s, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  )
}

function Stars({ count = 400 }) {
  const ref = useRef(null)
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 60
    return pos
  }, [count])

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.getElapsedTime() * 0.008
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#FBF6EC" size={0.08} transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

function Moon() {
  return (
    <Float speed={0.3} rotationIntensity={0.05} floatIntensity={0.2}>
      <mesh position={[5, 4, -8]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#FBF6EC" emissive="#E6C887" emissiveIntensity={0.5} roughness={0.3} metalness={0.1} />
      </mesh>
      <pointLight position={[5, 4, -8]} intensity={0.3} color="#E6C887" distance={15} />
    </Float>
  )
}

function WeddingArch() {
  return (
    <mesh position={[0, -1.4, -5]} rotation={[0, 0, Math.PI]}>
      <torusGeometry args={[4, 0.08, 16, 80, Math.PI]} />
      <meshStandardMaterial color="#C8983E" emissive="#9C7228" emissiveIntensity={0.9} metalness={0.9} roughness={0.25} />
    </mesh>
  )
}

function AmbientMoodLights({ moodData }) {
  const ambientRef = useRef(null)
  const pointRefs = useRef([])

  useFrame(() => {
    const m = moodData.current
    if (ambientRef.current) {
      const target = new THREE.Color(m.ambient)
      ambientRef.current.color.lerp(target, 0.03)
      ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, m.aI, 0.03)
    }
  })

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.5} color="#F3DCD4" />
      <pointLight position={[0, 3, 5]} intensity={3.2} color="#E6C887" distance={18} />
      <pointLight position={[-4, -1, -2]} intensity={1.8} color="#D9A8A0" distance={14} />
      <pointLight position={[3, -2, 2]} intensity={1.4} color="#E6C887" distance={12} />
    </>
  )
}

function CameraRig({ controls, moodData }) {
  useFrame((state) => {
    const { scroll, mouseX, mouseY } = controls.current
    const t = state.clock.getElapsedTime()

    const depthWave = Math.sin(scroll * Math.PI * 3)
    const targetY = 0.6 + Math.sin(t * 0.08) * 0.25 - scroll * 0.4
    const targetZ = 7.5 + depthWave * 1.6
    const targetX = mouseX * 0.7 + Math.cos(scroll * Math.PI * 2) * 0.3

    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetY, 3, 0.016)
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ, 3, 0.016)
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetX, 3, 0.016)

    state.camera.rotation.x = THREE.MathUtils.damp(state.camera.rotation.x, -mouseY * 0.09 + Math.sin(t * 0.1) * 0.015, 4, 0.016)
    state.camera.rotation.y = THREE.MathUtils.damp(state.camera.rotation.y, -mouseX * 0.14, 4, 0.016)
    state.camera.lookAt(0, targetY - 0.5, 0)
  })
  return null
}

function SceneContents({ controls, moodData, reduced = false }) {
  const m = moodData.current

  return (
    <>
      <AmbientMoodLights moodData={moodData} />

      {!reduced && (
        <>
          <Sparkles count={160} scale={[14, 10, 12]} size={2.4} speed={0.4} color="#E6C887" opacity={0.7} />
          <Sparkles count={40} scale={[10, 8, 10]} size={4} speed={0.25} color="#FBF6EC" opacity={0.45} />

          <FallingPetals count={24} color="#E8B8AE" activeSection="" />
          <Butterflies count={5} mood="" />
          <BokehLights count={25} color="#FBF6EC" />
          <Stars count={400} />
          <Moon />
        </>
      )}

      <WeddingArch />
      <InterlockedRings position={[0, 1.1, -1.8]} scale={1.2} />
      <GlowRing position={[-2.6, 0.8, -1]} scale={0.75} speed={0.8} />
      <GlowRing position={[2.8, -0.6, -1.8]} scale={0.85} speed={1.1} color="#D9A8A0" />
      <GlowRing position={[0.5, 2.1, -3.2]} scale={1.15} speed={0.6} />
      {!reduced && (
        <>
          <Diamond position={[-1.7, -1, 0.8]} speed={1.4} scale={0.3} />
          <Diamond position={[2.1, 1.3, 0.4]} speed={1.1} scale={0.22} />
          <Diamond position={[0.8, -1.7, 1.3]} speed={1.6} scale={0.16} />
          <Diamond position={[-2.4, 1.6, 0.2]} speed={1.2} scale={0.18} />
          <Rose position={[-3, -1.6, 0.5]} scale={1.1} speed={0.9} />
          <Rose position={[3, 1.8, -0.6]} scale={0.9} speed={1.2} />
        </>
      )}

      {!reduced && <CameraRig controls={controls} moodData={moodData} />}
    </>
  )
}

export default function SceneCanvas({ controls, activeSection = 'hero', className = '' }) {
  const moodRef = useRef({ ...DEFAULT_MOOD })
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches || window.innerWidth < 640)
    const handler = (e) => setReduced(e.matches || window.innerWidth < 640)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const targetMood = MOODS[activeSection] || DEFAULT_MOOD
  const prevKeys = Object.keys(targetMood)
  prevKeys.forEach((k) => {
    if (typeof targetMood[k] === 'string' && targetMood[k] !== moodRef.current[k]) {
    }
  })
  moodRef.current = targetMood

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <Canvas dpr={reduced ? [1, 1] : [1, 1.5]} camera={{ position: [0, 1.4, 7.5], fov: 55 }} gl={{ antialias: !reduced, alpha: true }}>
        <Suspense fallback={null}>
          <SceneContents controls={controls} moodData={moodRef} reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  )
}
