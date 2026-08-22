import { useMemo } from 'react'

export default function FloatingPetals({ className = '' }) {
  const count = typeof window !== 'undefined' && window.innerWidth < 640 ? 8 : 14
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 8 + Math.random() * 12,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 10,
        rotate: Math.random() * 360,
        hue: Math.random() > 0.5 ? '#D9A8A0' : '#C8983E',
      })),
    [count]
  )

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            position: 'absolute',
            top: '-5%',
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.8,
            background: p.hue,
            opacity: 0.55,
            borderRadius: '0 60% 0 60%',
            transform: `rotate(${p.rotate}deg)`,
            animation: `petalFall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes petalFall {
          0%   { transform: translate3d(0, 0, 0) rotate(0deg); opacity: 0; }
          8%   { opacity: 0.6; }
          100% { transform: translate3d(-40px, 115vh, 0) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
