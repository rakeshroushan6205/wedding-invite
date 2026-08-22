import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import SectionDivider from './SectionDivider'
import { carouselPhotos } from '../data/weddingData'

const IMAGES = carouselPhotos.slice(0, 7)
const INTERVAL_MS = 2000
const ARC_ANGLE = 0.35

function getDimensions() {
  if (typeof window === 'undefined') return { cardW: 320, cardH: 420, arcRadius: 520 }
  const vw = window.innerWidth
  if (vw < 480) return { cardW: 180, cardH: 240, arcRadius: 260 }
  if (vw < 640) return { cardW: 220, cardH: 290, arcRadius: 320 }
  if (vw < 768) return { cardW: 260, cardH: 340, arcRadius: 400 }
  return { cardW: 320, cardH: 420, arcRadius: 520 }
}

function Particles() {
  const items = useRef(
    Array.from({ length: 24 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: 2 + Math.random() * 4,
      d: 5 + Math.random() * 6,
      delay: Math.random() * 5,
    }))
  )

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {items.current.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gold/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s }}
          animate={{ y: [0, -20 - Math.random() * 20, 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: p.d, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

function GlowOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gold/10 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-40 -right-32 w-[30rem] h-[30rem] rounded-full bg-rosegold/10 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-maroon-light/40 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

function getCardStyle(offset, arcRadius) {
  const abs = Math.abs(offset)
  const sign = Math.sign(offset) || 1
  const arcAngle = offset * ARC_ANGLE

  return {
    x: Math.sin(arcAngle) * arcRadius,
    z: -(1 - Math.cos(arcAngle)) * arcRadius * 0.55,
    rotateY: offset * 20,
    scale: 1 - abs * 0.13,
    opacity: 1 - abs * 0.22,
  }
}

function GlassCard({ src, isCenter, onClick, cardW, cardH }) {
  return (
    <motion.div className="relative" onClick={onClick} whileHover={{ scale: isCenter ? 1.06 : 1.03 }} style={{ cursor: 'pointer' }}>
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          width: cardW,
          height: cardH,
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: isCenter
            ? '0 30px 80px rgba(200,152,62,0.3), 0 10px 30px rgba(0,0,0,0.4)'
            : '0 15px 40px rgba(0,0,0,0.3)',
        }}
      >
        <img src={src} alt="" className="w-full h-full object-cover" draggable={false} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
      </div>

      {isCenter && (
        <>
          <div
            className="absolute -inset-4 sm:-inset-6 rounded-[2rem] -z-10"
            style={{
              background: 'radial-gradient(circle, rgba(200,152,62,0.25) 0%, transparent 70%)',
              filter: 'blur(30px)',
            }}
          />
          <div
            className="absolute -inset-[3px] rounded-2xl -z-10"
            style={{
              border: '1px solid rgba(200,152,62,0.25)',
              filter: 'blur(2px)',
            }}
          />
        </>
      )}
    </motion.div>
  )
}

export default function Experience3D() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [dims, setDims] = useState(getDimensions())

  useEffect(() => {
    const handleResize = () => setDims(getDimensions())
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % IMAGES.length)
    }, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [isHovered])

  const { cardW, cardH, arcRadius } = dims

  const positions = IMAGES.map((_, i) => {
    let offset = ((i - activeIndex) % IMAGES.length + IMAGES.length) % IMAGES.length
    if (offset > Math.floor(IMAGES.length / 2)) offset -= IMAGES.length
    return offset
  })

  return (
    <section id="experience" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-maroon/15 py-16 sm:py-20 backdrop-blur-sm">
      <GlowOrbs />
      <Particles />

      <div className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6 text-center">
        <p className="eyebrow text-rosegold-light">An Immersive Glimpse</p>
        <h2 className="section-heading mt-3 text-[clamp(1.75rem,5vw,3rem)] text-ivory">Step Into Our Celebration</h2>
        <SectionDivider className="mt-6" />
      </div>

      <div
        className="relative z-10 mt-8 sm:mt-10 flex w-full items-center justify-center"
        style={{ height: cardH + 60, perspective: '1500px' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setTimeout(() => setIsHovered(false), 3000)}
      >
        {IMAGES.map((src, i) => {
          const offset = positions[i]
          const { x, z, rotateY, scale, opacity } = getCardStyle(offset, arcRadius)
          const zIndex = IMAGES.length - Math.abs(offset)
          const isCenter = offset === 0

          return (
            <motion.div
              key={src}
              className="absolute"
              animate={{ x, z, rotateY, scale, opacity }}
              transition={{ type: 'spring', stiffness: 130, damping: 20, mass: 0.9 }}
              style={{ zIndex, transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
            >
              <GlassCard src={src} isCenter={isCenter} onClick={() => setActiveIndex(i)} cardW={cardW} cardH={cardH} />
            </motion.div>
          )
        })}
      </div>

      <div className="relative z-10 mt-10 flex items-center gap-2">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              height: i === activeIndex ? 10 : 8,
              width: i === activeIndex ? 36 : 8,
              background: i === activeIndex ? '#C8983E' : 'rgba(251,246,236,0.35)',
            }}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="eyebrow relative z-10 mt-6 text-ivory/50"
      >
        Hover to pause &middot; Click any photo
      </motion.p>
    </section>
  )
}
