import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import confetti from 'canvas-confetti'
import { couple } from '../data/weddingData'

const COLORS = ['#C8983E', '#E6C887', '#D9A8A0', '#FBF6EC', '#F3DCD4', '#E8B8AE']

function launchFlowerBurst() {
  try {
    const defaults = {
      colors: COLORS,
      scalar: 1.2,
      gravity: 0.6,
      drift: 0.4,
      ticks: 250,
      origin: { y: 0.65 },
    }
    confetti({ ...defaults, particleCount: 60, spread: 80, origin: { x: 0.2, y: 0.65 } })
    setTimeout(() => confetti({ ...defaults, particleCount: 60, spread: 80, origin: { x: 0.8, y: 0.65 } }), 200)
    setTimeout(() => confetti({ ...defaults, particleCount: 100, spread: 120, startVelocity: 50, origin: { x: 0.5, y: 0.55 } }), 400)
    setTimeout(() => confetti({ ...defaults, particleCount: 80, spread: 100, startVelocity: 35, origin: { x: 0.3, y: 0.7 } }), 600)
    setTimeout(() => confetti({ ...defaults, particleCount: 80, spread: 100, startVelocity: 35, origin: { x: 0.7, y: 0.7 } }), 600)
    setTimeout(() => confetti({ ...defaults, particleCount: 150, spread: 140, startVelocity: 60, origin: { x: 0.5, y: 0.5 } }), 800)
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        setTimeout(() => confetti({ ...defaults, particleCount: 20, spread: 50, startVelocity: 55, origin: { x: 0.08 + i * 0.09, y: 0.35 + Math.random() * 0.3 } }), i * 80)
      }
    }, 1200)
    setTimeout(() => confetti({ ...defaults, particleCount: 200, spread: 160, startVelocity: 65, origin: { x: 0.5, y: 0.45 } }), 2000)
  } catch (e) { console.error('confetti error', e) }
}

export default function FinaleSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [fired, setFired] = useState(false)

  useEffect(() => {
    if (inView && !fired) {
      launchFlowerBurst()
      setFired(true)
    }
  }, [inView, fired])

  return (
    <section
      id="finale"
      ref={ref}
      className="relative flex min-h-[50vh] sm:min-h-[70vh] items-center justify-center overflow-hidden px-4 py-16 text-center sm:px-6 sm:py-24"
      style={{ background: 'linear-gradient(180deg, rgba(66,18,29,0.22) 0%, rgba(66,18,29,0.5) 78%, rgba(52,13,22,0.72) 100%)' }}
    >
      <div className="absolute inset-0 bg-gold-radial opacity-70" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={fired ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl"
      >
        <p className="eyebrow text-rosegold-light">{couple.groom} &amp; {couple.bride}</p>
        <h2 className="section-heading gold-text animate-shimmer mt-4 text-[clamp(1.75rem,5vw,3rem)] leading-tight">
          Thank You For Being Part Of Our Journey
        </h2>
        <p className="mt-4 sm:mt-6 font-display text-[clamp(1rem,2.5vw,1.25rem)] italic text-ivory/80">
          We are endlessly grateful to celebrate this chapter with the people we love most.
        </p>
      </motion.div>
    </section>
  )
}
