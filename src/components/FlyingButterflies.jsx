import { useRef, useEffect } from 'react'

const COLORS = ['#FF6B8A', '#FFD93D', '#6BCBFF', '#C084FC', '#FF9F43']

function Butterfly({ color, index }) {
  const ref = useRef(null)
  const pos = useRef({
    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth - 80 : 400),
    y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight * 0.5 : 300) + 80,
    vx: (Math.random() - 0.5) * 1.5,
    vy: (Math.random() - 0.5) * 1.5,
    phase: Math.random() * Math.PI * 2,
    flap: Math.random() * 10,
  })
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const p = pos.current
    const m = mouseRef.current
    let raf

    const handleMouse = (e) => {
      m.x = e.clientX
      m.y = e.clientY
    }
    window.addEventListener('mousemove', handleMouse)

    const tick = () => {
      const dx = p.x + 14 - m.x
      const dy = p.y + 14 - m.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 120) {
        const flee = (120 - dist) / 120 * 2.5
        p.vx += (dx / dist) * flee * -0.15
        p.vy += (dy / dist) * flee * -0.15
      }

      p.phase += 0.035
      p.flap += 0.12
      p.vx += Math.sin(p.phase * 1.3) * 0.035
      p.vy += Math.cos(p.phase * 0.9) * 0.035
      p.vx *= 0.996
      p.vy *= 0.996
      p.x += p.vx
      p.y += p.vy

      const w = window.innerWidth - 40
      const h = window.innerHeight - 40
      if (p.x < 0) { p.x = 0; p.vx *= -0.8 }
      if (p.x > w) { p.x = w; p.vx *= -0.8 }
      if (p.y < 0) { p.y = 0; p.vy *= -0.8 }
      if (p.y > h) { p.y = h; p.vy *= -0.8 }

      if (ref.current) {
        const sx = 0.5 + Math.abs(Math.sin(p.flap * 2.5)) * 0.5
        const a = Math.atan2(p.vy, p.vx) * (180 / Math.PI) + Math.sin(p.phase) * 15
        ref.current.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${a}deg) scaleX(${sx})`
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        left: pos.current.x,
        top: pos.current.y,
        zIndex: 100,
        pointerEvents: 'none',
        fontSize: 24,
        lineHeight: 1,
        userSelect: 'none',
        filter: `drop-shadow(0 0 4px ${color}80)`,
        transition: 'none',
      }}
    >
      🦋
    </div>
  )
}

export default function FlyingButterflies() {
  return (
    <>
      {COLORS.map((c, i) => (
        <Butterfly key={i} color={c} index={i} />
      ))}
    </>
  )
}
