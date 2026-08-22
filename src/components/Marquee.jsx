import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * A continuously scrolling gold ribbon. Built with GSAP rather than
 * Framer Motion since an infinite, perfectly-looping marquee is exactly
 * the kind of low-level tween GSAP is best at.
 */
export default function Marquee({ text }) {
  const trackRef = useRef(null)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const tween = gsap.to(el, { xPercent: -50, repeat: -1, duration: 22, ease: 'none' })
    return () => tween.kill()
  }, [])

  const group = Array.from({ length: 6 }).map((_, i) => (
    <span key={i} className="eyebrow whitespace-nowrap text-gold-light/70">
      {text}
    </span>
  ))

  return (
    <div className="overflow-hidden border-y border-gold/20 bg-maroon/15 py-4 backdrop-blur-sm">
      <div ref={trackRef} className="flex w-max gap-12">
        <span className="flex shrink-0 gap-12">{group}</span>
        <span className="flex shrink-0 gap-12">{group}</span>
      </div>
    </div>
  )
}
