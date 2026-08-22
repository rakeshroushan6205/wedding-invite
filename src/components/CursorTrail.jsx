import { useEffect, useRef } from 'react'

/**
 * Spawns small fading gold hearts that trail the pointer. Disabled
 * automatically on touch devices (no pointer trail) and respects
 * prefers-reduced-motion.
 */
export default function CursorTrail() {
  const lastSpawn = useRef(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (reduceMotion || isTouch) return

    const handleMove = (e) => {
      const now = performance.now()
      if (now - lastSpawn.current < 90) return
      lastSpawn.current = now

      const heart = document.createElement('div')
      heart.className = 'heart-trail'
      heart.innerHTML = '♥'
      heart.style.left = `${e.clientX}px`
      heart.style.top = `${e.clientY}px`
      heart.style.color = Math.random() > 0.5 ? '#C8983E' : '#D9A8A0'
      heart.style.fontSize = `${10 + Math.random() * 8}px`
      heart.style.opacity = '0.85'
      heart.style.transform = 'translate(-50%, -50%) scale(1)'
      heart.style.transition = 'transform 900ms ease-out, opacity 900ms ease-out'
      document.body.appendChild(heart)

      requestAnimationFrame(() => {
        heart.style.transform = `translate(-50%, -150%) scale(0.4) rotate(${Math.random() * 60 - 30}deg)`
        heart.style.opacity = '0'
      })

      setTimeout(() => heart.remove(), 950)
    }

    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [])

  return <div ref={containerRef} aria-hidden="true" />
}
