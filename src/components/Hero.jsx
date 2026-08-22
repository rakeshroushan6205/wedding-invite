import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineChevronDown, HiOutlineBookOpen, HiOutlineCalendar } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { couple, heroPoster } from '../data/weddingData'
import FloatingPetals from './FloatingPetals'
import {
  SakuraFlower,
  CherryBlossomBranch,
  BottomGoldenArc,
  GlassSphere,
  DiamondCrystal,
  LightRibbon,
  BokehField,
  DustField,
  FireflyField,
  LensFlares,
} from './HeroDecor'
import '../styles/heroLuxury.css'

const letterVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.3 + 0.045 * i, duration: 0.6, ease: 'easeOut' } }),
}

function AnimatedWord({ text, delayOffset = 0 }) {
  return (
    <span className="inline-flex">
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          custom={i + delayOffset}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'inline-block' }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </span>
  )
}

// Glossy 3D-feeling crystal heart — built from a gradient-filled path plus a
// glass highlight, rather than a flat icon-font glyph.
function HeartCrystal({ className = '' }) {
  return (
    <svg viewBox="0 0 100 100" className={`h-8 w-8 sm:h-11 sm:w-11 ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id="heartGrad" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#FFE3ED" />
          <stop offset="42%" stopColor="#FF8FB3" />
          <stop offset="75%" stopColor="#E14C7C" />
          <stop offset="100%" stopColor="#B82E5C" />
        </linearGradient>
      </defs>
      <path
        d="M50 86 C50 86 14 60 14 36 C14 20 26 10 39 10 C46 10 50 15 50 15 C50 15 54 10 61 10 C74 10 86 20 86 36 C86 60 50 86 50 86 Z"
        fill="url(#heartGrad)"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1"
      />
      <path d="M30 26 C26 30 24 35 25 40" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2.4" strokeLinecap="round" />
      <ellipse cx="33" cy="24" rx="8" ry="5" fill="#FFFFFF" opacity="0.5" transform="rotate(-25 33 24)" />
    </svg>
  )
}

// Interlocked wedding-ring crest shown above the names, so the ring motif is
// visible even though this opaque hero covers the 3D canvas behind it.
function RingCrest() {
  return (
    <svg
      viewBox="0 0 120 72"
      className="h-14 w-24 sm:h-16 sm:w-28"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ringGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F6E3AE" />
          <stop offset="55%" stopColor="#E6C887" />
          <stop offset="100%" stopColor="#C08A2E" />
        </linearGradient>
      </defs>
      <circle cx="45" cy="40" r="22" fill="none" stroke="url(#ringGold)" strokeWidth="4" style={{ filter: 'drop-shadow(0 0 6px rgba(231,199,123,0.65))' }} />
      <circle cx="75" cy="40" r="22" fill="none" stroke="url(#ringGold)" strokeWidth="4" opacity="0.92" style={{ filter: 'drop-shadow(0 0 6px rgba(217,168,160,0.55))' }} />
      <circle cx="60" cy="15" r="4" fill="#FBF6EC" style={{ filter: 'drop-shadow(0 0 8px rgba(251,246,236,0.95))' }} />
      <circle cx="60" cy="15" r="7" fill="none" stroke="#F6E3AE" strokeWidth="1" opacity="0.7" />
    </svg>
  )
}

/**
 * Full-screen, self-contained cinematic title hero. Deliberately opaque
 * (its own burgundy/gold backdrop) rather than translucent over the global
 * 3D canvas, so it reads as a standalone luxury film title-card before the
 * rest of the site begins.
 */
export default function Hero() {
  const [photoOk, setPhotoOk] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  const backRef = useRef(null)
  const midRef = useRef(null)
  const frontRef = useRef(null)
  const rafRef = useRef(null)
  const targetRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const canHover = window.matchMedia?.('(hover: hover)')?.matches
    if (!canHover) return

    const apply = () => {
      rafRef.current = null
      const { x, y } = targetRef.current
      if (backRef.current) backRef.current.style.transform = `translate3d(${x * -10}px, ${y * -8}px, 0)`
      if (midRef.current) midRef.current.style.transform = `translate3d(${x * -16}px, ${y * -12}px, 0)`
      if (frontRef.current) frontRef.current.style.transform = `translate3d(${x * -24}px, ${y * -18}px, 0)`
    }

    const handleMove = (e) => {
      targetRef.current = {
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      }
      if (!rafRef.current) rafRef.current = requestAnimationFrame(apply)
    }

    window.addEventListener('mousemove', handleMove)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <motion.section
      id="hero"
      className="lux-hero relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background: blurred photo, vignette, light rays, fog */}
      <div className="lux-photo-layer" aria-hidden="true">
        {photoOk && <img src={heroPoster} alt="" onError={() => setPhotoOk(false)} />}
      </div>
      <div className="lux-vignette" aria-hidden="true" />
      <div className="lux-rays" aria-hidden="true" />

      {/* Parallax layer 1 — bokeh + lens flares (slowest, farthest) */}
      <div ref={backRef} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <BokehField count={isMobile ? 4 : 7} />
        <LensFlares />
      </div>

      {/* Parallax layer 2 — dust, fireflies, petals */}
      <div ref={midRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <DustField count={isMobile ? 10 : 18} />
        <FireflyField count={isMobile ? 4 : 7} />
        <FloatingPetals />
      </div>

      {/* Parallax layer 3 — spheres, crystals, ribbons, branches, arc (closest) */}
      <div ref={frontRef} className="pointer-events-none absolute inset-0" aria-hidden="true">
        {!isMobile && (
          <>
            <GlassSphere size={70} top="12%" left="6%" duration={10} />
            <GlassSphere size={44} top="63%" left="9%" duration={8} delay={1} />
            <GlassSphere size={58} top="18%" right="8%" duration={11} delay={0.6} />
            <GlassSphere size={36} top="68%" right="11%" duration={9} delay={2} />

            <DiamondCrystal size={14} top="30%" left="17%" duration={4} />
            <DiamondCrystal size={10} top="48%" left="7%" duration={5} delay={1} />
            <DiamondCrystal size={16} top="34%" right="15%" duration={4.5} delay={0.7} />
            <DiamondCrystal size={11} top="58%" right="9%" duration={5.5} delay={1.4} />
            <DiamondCrystal size={9} top="80%" left="23%" duration={4.2} delay={0.3} />

            <LightRibbon
              className="absolute left-0 top-[6%] w-[55%] max-w-[640px] opacity-70"
              viewBox="0 0 600 200"
              d="M0 140 C 150 20, 320 180, 600 60"
            />
            <LightRibbon
              className="absolute right-0 bottom-[16%] w-[50%] max-w-[600px] opacity-60"
              viewBox="0 0 600 200"
              d="M600 40 C 460 160, 280 10, 0 130"
              sparkColor="#F6D8DE"
            />

            <SakuraFlower size={34} style={{ position: 'absolute', top: '58%', left: '4%' }} />
            <SakuraFlower size={24} color="#EFC2CB" style={{ position: 'absolute', top: '24%', left: '83%' }} />
          </>
        )}
        {isMobile && (
          <>
            {/* Same desktop decorations, scaled and repositioned for the
                narrower viewport rather than removed from the hero. */}
            <GlassSphere size={34} top="12%" left="4%" duration={10} />
            <GlassSphere size={24} top="63%" left="5%" duration={8} delay={1} />
            <GlassSphere size={29} top="18%" right="4%" duration={11} delay={0.6} />
            <GlassSphere size={22} top="68%" right="5%" duration={9} delay={2} />

            <DiamondCrystal size={10} top="30%" left="14%" duration={4} />
            <DiamondCrystal size={8} top="48%" left="4%" duration={5} delay={1} />
            <DiamondCrystal size={11} top="34%" right="12%" duration={4.5} delay={0.7} />
            <DiamondCrystal size={8} top="58%" right="4%" duration={5.5} delay={1.4} />
            <DiamondCrystal size={7} top="80%" left="18%" duration={4.2} delay={0.3} />

            <LightRibbon
              className="absolute left-0 top-[8%] w-[78%] opacity-60"
              viewBox="0 0 600 200"
              d="M0 140 C 150 20, 320 180, 600 60"
            />
            <LightRibbon
              className="absolute right-0 bottom-[18%] w-[72%] opacity-50"
              viewBox="0 0 600 200"
              d="M600 40 C 460 160, 280 10, 0 130"
              sparkColor="#F6D8DE"
            />

            <SakuraFlower size={25} style={{ position: 'absolute', top: '58%', left: '2%' }} />
            <SakuraFlower size={19} color="#EFC2CB" style={{ position: 'absolute', top: '24%', left: '80%' }} />
          </>
        )}
        <CherryBlossomBranch className="absolute -right-2 -top-2 w-28 opacity-90 sm:w-40" />
        <BottomGoldenArc />
      </div>

      <div className="lux-fog" aria-hidden="true" />

      {/* Foreground content */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-5 text-center sm:px-6">
        <RingCrest />

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="lux-eyebrow"
        >
          Together With Their Families
        </motion.p>

        <h1 className="lux-names mt-5 text-[clamp(2.1rem,8vw,5.25rem)] leading-[1.08] sm:mt-7">
          <AnimatedWord text={couple.groom} />
          <motion.span
            initial={{ scale: 0, rotate: -30, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.7, type: 'spring' }}
            className="mx-2 inline-block align-middle sm:mx-4"
          >
            <HeartCrystal className="lux-heart" />
          </motion.span>
          <AnimatedWord text={couple.bride} delayOffset={couple.groom.length + 2} />
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="lux-subtitle mt-5 text-[clamp(1rem,2.6vw,1.5rem)] sm:mt-7"
        >
          Request The Pleasure Of Your Presence
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.9, duration: 0.7 }}
          className="lux-pill mt-7 inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 sm:mt-10 sm:px-7 sm:py-3"
        >
          <HiOutlineCalendar size={16} className="text-[#E7C77B]" />
          <span className="font-body text-[clamp(0.6rem,1.4vw,0.8rem)] uppercase tracking-[0.28em] text-[#F3E6D8]">
            {couple.weddingDateDisplay}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.7 }}
        >
          <Link
            to="/invitation"
            className="lux-btn mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3 font-body text-xs uppercase tracking-[0.25em] sm:mt-10 sm:px-10 sm:py-3.5 sm:text-sm"
          >
            <HiOutlineBookOpen size={17} />
            View Invitation
          </Link>
        </motion.div>
      </div>

      <motion.button
        onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
        className="lux-scrollcue absolute bottom-6 z-10 flex flex-col items-center gap-1.5 sm:bottom-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 2.8, duration: 0.6 }, y: { duration: 2, repeat: Infinity } }}
        aria-label="Scroll down"
      >
        <span className="text-[10px] uppercase tracking-[0.35em]">Scroll</span>
        <HiOutlineChevronDown size={20} />
      </motion.button>
    </motion.section>
  )
}
