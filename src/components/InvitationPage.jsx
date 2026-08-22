import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiOutlineArrowLeft, HiOutlineDownload, HiOutlineShare } from 'react-icons/hi'
import { couple, events, venue, contact } from '../data/weddingData'
import InvitationCard from './invitation/InvitationCard'

function Petal({ index }) {
  const ref = useRef(null)
  const style = useRef({
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 6,
    size: 6 + Math.random() * 8,
    xDrift: (Math.random() - 0.5) * 100,
    rotation: Math.random() * 360,
  })

  return (
    <motion.div
      ref={ref}
      className="absolute top-0 pointer-events-none"
      style={{ left: `${style.current.left}%` }}
      initial={{ y: -20, opacity: 0, rotate: 0 }}
      animate={{
        y: typeof window !== 'undefined' ? window.innerHeight + 20 : 900,
        opacity: [0, 0.7, 0.5, 0],
        rotate: style.current.rotation + 360,
        x: style.current.xDrift,
      }}
      transition={{
        duration: style.current.duration,
        repeat: Infinity,
        delay: style.current.delay,
        ease: 'linear',
      }}
    >
      <svg width={style.current.size} height={style.current.size} viewBox="0 0 20 20">
        <path d="M10 0C10 0 6 6 10 10C14 6 10 0 10 0Z" fill="url(#petal-grad)" opacity={0.6} />
      </svg>
    </motion.div>
  )
}

function FloatingOrb({ index, color }) {
  const x = useRef(10 + Math.random() * 80)
  const y = useRef(10 + Math.random() * 80)
  const duration = useRef(8 + Math.random() * 10)
  const delay = useRef(Math.random() * 5)

  return (
    <motion.div
      className="absolute pointer-events-none rounded-full blur-3xl"
      style={{
        left: `${x.current}%`,
        top: `${y.current}%`,
        width: 120 + Math.random() * 200,
        height: 120 + Math.random() * 200,
        background: color || 'rgba(200,152,62,0.12)',
      }}
      animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0], scale: [1, 1.1, 0.9, 1] }}
      transition={{ duration: duration.current, repeat: Infinity, delay: delay.current, ease: 'easeInOut' }}
    />
  )
}

function SparkleParticle({ index }) {
  const style = useRef({
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 2 + Math.random() * 3,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 4,
  })

  return (
    <motion.div
      className="absolute pointer-events-none rounded-full bg-gold-light"
      style={{
        left: `${style.current.left}%`,
        top: `${style.current.top}%`,
        width: style.current.size,
        height: style.current.size,
      }}
      animate={{ opacity: [0, 0.8, 0], scale: [0, 1, 0] }}
      transition={{ duration: style.current.duration, repeat: Infinity, delay: style.current.delay, ease: 'easeInOut' }}
    />
  )
}

function CornerFlourish({ position, mirror }) {
  const isLeft = position === 'left'

  return (
    <div
      className={`absolute top-0 ${isLeft ? 'left-0' : 'right-0'} pointer-events-none opacity-20`}
      style={{ transform: mirror ? 'scaleX(-1)' : 'none' }}
    >
      <svg width="180" height="180" viewBox="0 0 180 180">
        <path
          d={`M ${isLeft ? 180 : 0} 0 C ${isLeft ? 120 : 60} 20, ${isLeft ? 60 : 120} 60, ${isLeft ? 40 : 140} 100 C ${isLeft ? 20 : 160} 140, ${isLeft ? 10 : 170} 170, 0 180`}
          fill="none"
          stroke="#C8983E"
          strokeWidth="0.8"
          opacity={0.5}
        />
        <path
          d={`M ${isLeft ? 180 : 0} 20 C ${isLeft ? 130 : 50} 35, ${isLeft ? 70 : 110} 70, ${isLeft ? 55 : 125} 105`}
          fill="none"
          stroke="#E6C887"
          strokeWidth="0.5"
          opacity={0.3}
        />
        <circle cx={isLeft ? 160 : 20} cy={isLeft ? 20 : 20} r="3" fill="#E6C887" opacity={0.4} />
        <circle cx={isLeft ? 140 : 40} cy={isLeft ? 50 : 50} r="2" fill="#E6C887" opacity={0.3} />
      </svg>
    </div>
  )
}

const weddingEvent = events.find((e) => e.name === 'Wedding Ceremony')

export default function InvitationPage() {
  const [showBack, setShowBack] = useState(false)
  const [zoomed, setZoomed] = useState(false)

  const handleFlip = useCallback(() => setShowBack((p) => !p), [])
  const handleZoom = useCallback(() => setZoomed((p) => !p), [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleShare = async () => {
    const url = window.location.origin
    if (navigator.share) {
      try { await navigator.share({ title: `${couple.groom} & ${couple.bride}'s Wedding`, url }) } catch {}
    } else {
      await navigator.clipboard?.writeText(url)
    }
  }

  const handleDownload = () => {
    window.print()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #1a0509 0%, #2B0A12 30%, #42121D 60%, #1a0509 100%)' }}
    >
      <svg width="0" height="0">
        <defs>
          <linearGradient id="petal-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E6C887" />
            <stop offset="100%" stopColor="#D9A8A0" />
          </linearGradient>
        </defs>
      </svg>

      <FloatingOrb index={0} color="rgba(200,152,62,0.12)" />
      <FloatingOrb index={1} color="rgba(217,168,160,0.08)" />
      <FloatingOrb index={2} color="rgba(200,152,62,0.06)" />

      {Array.from({ length: typeof window !== 'undefined' && window.innerWidth < 640 ? 10 : 20 }).map((_, i) => (
        <Petal key={i} index={i} />
      ))}

      {Array.from({ length: typeof window !== 'undefined' && window.innerWidth < 640 ? 15 : 30 }).map((_, i) => (
        <SparkleParticle key={i} index={i} />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-maroon-light/20 to-maroon/40 pointer-events-none" />

      <CornerFlourish position="left" mirror={false} />
      <CornerFlourish position="right" mirror={true} />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-3 sm:px-4 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Link
            to="/"
            state={{ skipEnvelope: true }}
            className="group mb-8 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-gold-light/60 transition hover:text-gold-light"
          >
            <HiOutlineArrowLeft size={16} className="transition group-hover:-translate-x-1" />
            Back to Website
          </Link>
        </motion.div>

        <div className="flex w-full items-center justify-center" style={{ perspective: '1500px' }}>
          <InvitationCard
            showBack={showBack}
            onFlip={handleFlip}
            zoomed={zoomed}
            onZoom={handleZoom}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <button onClick={handleDownload} className="btn-gold text-[10px] sm:text-xs">
            <HiOutlineDownload size={14} />
            Download Invitation
          </button>
          <button onClick={handleShare} className="btn-outline-gold text-[10px] sm:text-xs">
            <HiOutlineShare size={14} />
            Share Invitation
          </button>
          <Link to="/" state={{ skipEnvelope: true }} className="btn-outline-gold text-[10px] sm:text-xs">
            <HiOutlineArrowLeft size={14} />
            Back to Website
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="mt-6 sm:mt-8 text-center text-[10px] sm:text-xs uppercase tracking-widest text-ivory/30"
        >
          Click the card to flip &middot; Double-click to zoom
        </motion.p>
      </div>
    </motion.div>
  )
}
