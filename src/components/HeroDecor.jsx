/**
 * Decorative building blocks for the luxury cinematic Hero.
 * Pure presentational pieces — no state, safe to render many of.
 * Kept in their own file so Hero.jsx stays readable.
 */
import { useId } from 'react'

// A single sakura blossom: five soft petals around a center, built from
// overlapping ellipses so each petal reads as a rounded 3D form rather
// than a flat scribble.
export function SakuraFlower({
  size = 28,
  color = '#F6D8DE',
  center = '#E7C77B',
  style = {},
  className = '',
}) {
  const petals = [0, 72, 144, 216, 288]
  const gradId = `petalGrad-${useId()}`
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`lux-sakura ${className}`}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={gradId} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="45%" stopColor={color} stopOpacity="0.95" />
          <stop offset="100%" stopColor={color} stopOpacity="0.55" />
        </radialGradient>
      </defs>
      <g transform="translate(50,50)">
        {petals.map((deg) => (
          <ellipse
            key={deg}
            cx="0"
            cy="-22"
            rx="13"
            ry="20"
            fill={`url(#${gradId})`}
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="0.5"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle r="7" fill={center} opacity="0.95" />
        <circle r="3" fill="#FFF8EE" opacity="0.85" />
      </g>
    </svg>
  )
}

// A small curving branch (top-right corner) carrying a few sakura blossoms.
export function CherryBlossomBranch({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M236 4C200 26 176 18 150 44C124 70 132 96 104 116C80 134 58 128 40 148"
        fill="none"
        stroke="rgba(199,154,82,0.55)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M150 44C140 50 132 64 138 78"
        fill="none"
        stroke="rgba(199,154,82,0.5)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <g opacity="0.9">
        <foreignObject x="206" y="-12" width="56" height="56">
          <SakuraFlower size={48} />
        </foreignObject>
        <foreignObject x="150" y="14" width="40" height="40">
          <SakuraFlower size={34} color="#EFC2CB" />
        </foreignObject>
        <foreignObject x="96" y="86" width="42" height="42">
          <SakuraFlower size={36} />
        </foreignObject>
        <foreignObject x="56" y="120" width="34" height="34">
          <SakuraFlower size={28} color="#EFC2CB" />
        </foreignObject>
      </g>
      <ellipse cx="172" cy="40" rx="6" ry="3" fill="#7A9A5C" opacity="0.6" transform="rotate(-30 172 40)" />
      <ellipse cx="118" cy="108" rx="6" ry="3" fill="#7A9A5C" opacity="0.6" transform="rotate(20 118 108)" />
    </svg>
  )
}

// Full-width thin golden arc that frames the bottom edge, plus a softer
// crescent glow seated at the bottom-left with a few blossoms resting on it.
export function BottomGoldenArc({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: '22vh', minHeight: 160 }}
    >
      <defs>
        <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E7C77B" stopOpacity="0" />
          <stop offset="50%" stopColor="#E7C77B" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#E7C77B" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="crescentGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E7C77B" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#E7C77B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft crescent glow, bottom-left */}
      <circle cx="120" cy="300" r="220" fill="url(#crescentGlow)" style={{ animation: 'lux-flare-pulse 7s ease-in-out infinite' }} />

      {/* thin arc framing the full width */}
      <path
        d="M0 60 C 360 130, 1080 130, 1440 60"
        fill="none"
        stroke="url(#arcGrad)"
        strokeWidth="2"
      />

      {/* crescent stroke shape, bottom-left */}
      <path
        d="M20 300 A 150 150 0 0 1 200 190"
        fill="none"
        stroke="#E7C77B"
        strokeOpacity="0.45"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

// A glossy floating gold sphere with a glass highlight.
export function GlassSphere({ size = 56, top, left, right, bottom, duration = 9, delay = 0 }) {
  return (
    <div
      className="lux-sphere-wrap"
      style={{ top, left, right, bottom, width: size, height: size }}
    >
      <div
        className="lux-sphere"
        style={{ width: '100%', height: '100%', animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
      />
    </div>
  )
}

// A small twinkling diamond crystal.
export function DiamondCrystal({ size = 14, top, left, right, bottom, duration = 4, delay = 0 }) {
  return (
    <div
      className="lux-crystal-wrap"
      style={{ top, left, right, bottom, width: size, height: size, animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
    >
      <div className="lux-crystal" />
    </div>
  )
}

// A curved, glowing light ribbon — a thin gold path with soft bloom and a
// traveling spark, used instead of rings/scribbles.
export function LightRibbon({ d, viewBox = '0 0 600 300', className = '', dashed = true, sparkColor = '#FFF3D6' }) {
  const pathId = `ribbon-${useId()}`
  return (
    <svg viewBox={viewBox} className={className} aria-hidden="true" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`${pathId}-grad`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E7C77B" stopOpacity="0" />
          <stop offset="50%" stopColor="#E7C77B" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#E7C77B" stopOpacity="0" />
        </linearGradient>
        <filter id={`${pathId}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>
      <path id={pathId} d={d} fill="none" stroke={`url(#${pathId}-grad)`} strokeWidth="1.2" />
      <path
        d={d}
        fill="none"
        stroke={`url(#${pathId}-grad)`}
        strokeWidth="6"
        filter={`url(#${pathId}-blur)`}
        opacity="0.5"
      />
      <path
        d={d}
        fill="none"
        stroke={`url(#${pathId}-grad)`}
        strokeWidth="1.4"
        strokeDasharray={dashed ? '2 14' : undefined}
        className="lux-ribbon-path"
      />
      <circle r="3.5" fill={sparkColor}>
        <animateMotion dur="6s" repeatCount="indefinite" path={d} rotate="auto" />
      </circle>
    </svg>
  )
}

// Generates a field of soft drifting bokeh circles.
export function BokehField({ count = 7, seedOffset = 0 }) {
  const items = Array.from({ length: count }, (_, i) => {
    const seed = i + seedOffset
    const size = 30 + ((seed * 37) % 70)
    const left = (seed * 19) % 100
    const top = 10 + ((seed * 53) % 75)
    const dx = ((seed % 2 === 0 ? 1 : -1) * (20 + (seed * 7) % 30))
    const dy = -(20 + (seed * 11) % 35)
    const duration = 10 + (seed * 3) % 12
    const delay = (seed * 1.3) % 8
    const opacity = 0.12 + ((seed * 5) % 18) / 100
    const colors = ['#E7C77B', '#F2D9A8', '#D9A8A0']
    const color = colors[seed % colors.length]
    return { id: seed, size, left, top, dx, dy, duration, delay, opacity, color }
  })

  return (
    <>
      {items.map((p) => (
        <span
          key={p.id}
          className="lux-bokeh"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, ${p.color}66 0%, ${p.color}00 75%)`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            '--dx': `${p.dx}px`,
            '--dy': `${p.dy}px`,
          }}
        />
      ))}
    </>
  )
}

// Generates a field of tiny rising gold dust motes.
export function DustField({ count = 18, seedOffset = 0 }) {
  const items = Array.from({ length: count }, (_, i) => {
    const seed = i + seedOffset
    const size = 2 + (seed % 4)
    const left = (seed * 13) % 100
    const duration = 9 + (seed * 5) % 14
    const delay = (seed * 0.9) % 10
    const dx = ((seed % 2 === 0 ? 1 : -1) * (6 + (seed * 3) % 18))
    const op = 0.4 + ((seed * 7) % 40) / 100
    return { id: seed, size, left, duration, delay, dx, op }
  })

  return (
    <>
      {items.map((p) => (
        <span
          key={p.id}
          className="lux-dust"
          style={{
            left: `${p.left}%`,
            bottom: '-2%',
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            '--dx': `${p.dx}px`,
            '--dust-op': p.op,
          }}
        />
      ))}
    </>
  )
}

// Generates a small field of wandering fireflies.
export function FireflyField({ count = 7, seedOffset = 0 }) {
  const items = Array.from({ length: count }, (_, i) => {
    const seed = i + seedOffset
    const size = 3 + (seed % 3)
    const left = 8 + (seed * 11) % 84
    const top = 12 + (seed * 17) % 70
    const duration = 6 + (seed * 2) % 8
    const delay = (seed * 0.7) % 6
    return { id: seed, size, left, top, duration, delay }
  })

  return (
    <>
      {items.map((p) => (
        <span
          key={p.id}
          className="lux-firefly"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </>
  )
}

// Soft static lens flare blobs (top corners), very low opacity.
export function LensFlares() {
  return (
    <>
      <span className="lux-flare" style={{ top: '6%', left: '14%', width: 180, height: 180, animationDuration: '8s' }} />
      <span className="lux-flare" style={{ top: '10%', right: '12%', width: 140, height: 140, animationDuration: '10s', animationDelay: '2s' }} />
    </>
  )
}
