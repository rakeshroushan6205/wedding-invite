import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { couple } from '../data/weddingData'
import '../styles/envelopeLuxury.css'

const EASE_LUX = [0.22, 1, 0.36, 1]
const POPPER_COLORS = ['#E5C98A', '#D6B36A', '#F7F0DF', '#F3DCD4', '#C8983E']

// Staggered entrance helper (~1.7s total choreography)
const fade = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.9, ease: EASE_LUX },
})

function CornerOrnament({ className }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
      <path d="M4 40 C4 18 18 4 40 4" stroke="rgba(214,179,106,0.5)" strokeWidth="1" />
      <path d="M10 46 C10 28 28 10 46 10" stroke="rgba(214,179,106,0.3)" strokeWidth="1" />
      <circle cx="40" cy="4" r="1.6" fill="#D6B36A" opacity="0.8" />
      <path d="M22 22 q6 -8 12 -2 q-2 -9 8 -9 q-6 5 0 10 q-8 3 -20 1z" stroke="rgba(214,179,106,0.55)" strokeWidth="0.8" />
    </svg>
  )
}

function drawPopperParticle(ctx, particle) {
  ctx.save()
  ctx.translate(particle.x, particle.y)
  ctx.rotate(particle.rotation)
  ctx.globalAlpha = particle.alpha

  if (particle.type === 'flash') {
    const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size * 4)
    glow.addColorStop(0, 'rgba(255, 247, 220, 0.95)')
    glow.addColorStop(0.28, 'rgba(229, 201, 138, 0.55)')
    glow.addColorStop(1, 'rgba(229, 201, 138, 0)')
    ctx.fillStyle = glow
    ctx.beginPath()
    ctx.arc(0, 0, particle.size * 4, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#F7F0DF'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(-particle.size * 2.2, 0)
    ctx.lineTo(particle.size * 2.2, 0)
    ctx.moveTo(0, -particle.size * 2.2)
    ctx.lineTo(0, particle.size * 2.2)
    ctx.stroke()
  } else {
    ctx.fillStyle = particle.color
    ctx.shadowColor = particle.type === 'star' ? particle.color : 'transparent'
    ctx.shadowBlur = particle.type === 'star' ? particle.size * 2 : 0

    if (particle.type === 'star') {
      ctx.beginPath()
      ctx.moveTo(0, -particle.size)
      ctx.lineTo(particle.size * 0.3, -particle.size * 0.3)
      ctx.lineTo(particle.size, 0)
      ctx.lineTo(particle.size * 0.3, particle.size * 0.3)
      ctx.lineTo(0, particle.size)
      ctx.lineTo(-particle.size * 0.3, particle.size * 0.3)
      ctx.lineTo(-particle.size, 0)
      ctx.lineTo(-particle.size * 0.3, -particle.size * 0.3)
      ctx.closePath()
      ctx.fill()
    } else if (particle.type === 'heart') {
      const s = particle.size
      ctx.beginPath()
      ctx.moveTo(0, s)
      ctx.bezierCurveTo(-s * 1.5, 0, -s * 0.8, -s, 0, -s * 0.35)
      ctx.bezierCurveTo(s * 0.8, -s, s * 1.5, 0, 0, s)
      ctx.fill()
    } else if (particle.type === 'diamond') {
      ctx.beginPath()
      ctx.moveTo(0, -particle.size)
      ctx.lineTo(particle.size * 0.65, 0)
      ctx.lineTo(0, particle.size)
      ctx.lineTo(-particle.size * 0.65, 0)
      ctx.closePath()
      ctx.fill()
    } else if (particle.type === 'rect') {
      ctx.fillRect(-particle.width / 2, -particle.height / 2, particle.width, particle.height)
    } else {
      ctx.beginPath()
      ctx.arc(0, 0, particle.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  ctx.restore()
}

export default function LoadingEnvelope({ onEnter, onMusicStart }) {
  // closed -> seal-off -> flap -> card
  const [stage, setStage] = useState('closed')
  const [showEnter, setShowEnter] = useState(false)
  const [riseY, setRiseY] = useState('-66%')
  const haloRef = useRef(null)
  const envWrapRef = useRef(null)
  const popperCanvasRef = useRef(null)
  const popperFrameRef = useRef(null)
  const popperParticlesRef = useRef([])
  const popperTimerRef = useRef(null)

  // Height-responsive rise — the invitation must never leave the viewport,
  // so the travel distance adapts to the available vertical space.
  useEffect(() => {
    const calc = () => {
      const vh = window.visualViewport?.height ?? window.innerHeight
      setRiseY(vh >= 900 ? '-66%' : vh >= 800 ? '-58%' : vh >= 700 ? '-48%' : '-40%')
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  useEffect(() => {
    const canvas = popperCanvasRef.current
    if (!canvas) return undefined

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      canvas.getContext('2d')?.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })
    return () => window.removeEventListener('resize', resize)
  }, [])

  useEffect(
    () => () => {
      if (popperTimerRef.current) window.clearTimeout(popperTimerRef.current)
      if (popperFrameRef.current) cancelAnimationFrame(popperFrameRef.current)
    },
    []
  )

  const runCornerPoppers = () => {
    const canvas = popperCanvasRef.current
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const width = window.innerWidth
    const height = window.innerHeight
    const mobile = width < 640
    const count = mobile ? 42 : 78
    const particles = []
    const random = (min, max) => min + Math.random() * (max - min)

    const addPopper = (side) => {
      const left = side === 'left'
      const originX = left ? random(0, width * 0.05) : random(width * 0.95, width)
      const originY = random(height * 0.92, height)
      const direction = left ? 1 : -1

      // Short-lived flash at the exact bottom-corner launch point.
      particles.push({
        x: originX,
        y: originY,
        vx: 0,
        vy: 0,
        gravity: 0,
        drag: 1,
        rotation: 0,
        spin: 0,
        size: mobile ? 8 : 11,
        alpha: 0,
        baseAlpha: 0.9,
        age: 0,
        life: 14,
        type: 'flash',
        color: '#F7F0DF',
      })

      for (let i = 0; i < count; i += 1) {
        const angle = (random(35, 75) * Math.PI) / 180
        const speed = random(mobile ? 6.2 : 7.4, mobile ? 10 : 13)
        const roll = Math.random()
        const type = roll < 0.42 ? 'rect' : roll < 0.61 ? 'dot' : roll < 0.77 ? 'diamond' : roll < 0.94 ? 'star' : 'heart'
        const large = Math.random() < 0.07
        const size = large ? random(10, 15) : random(3, 7)

        particles.push({
          x: originX + random(-3, 3),
          y: originY + random(-3, 3),
          vx: direction * Math.cos(angle) * speed,
          vy: -Math.sin(angle) * speed + random(-1.2, 1.3),
          gravity: random(0.095, 0.17),
          drag: random(0.982, 0.992),
          rotation: random(0, Math.PI * 2),
          spin: random(-0.16, 0.16),
          size,
          width: type === 'rect' ? random(3, large ? 10 : 7) : size,
          height: type === 'rect' ? random(5, large ? 16 : 11) : size,
          alpha: 0,
          baseAlpha: random(0.72, 1),
          age: 0,
          life: random(88, 132),
          type,
          color: POPPER_COLORS[Math.floor(Math.random() * POPPER_COLORS.length)],
        })
      }
    }

    addPopper('left')
    addPopper('right')
    popperParticlesRef.current = particles

    if (popperFrameRef.current) cancelAnimationFrame(popperFrameRef.current)
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      const frameWidth = window.innerWidth
      const frameHeight = window.innerHeight
      ctx.clearRect(0, 0, frameWidth, frameHeight)

      const active = popperParticlesRef.current.filter((particle) => particle.age < particle.life)
      popperParticlesRef.current = active
      active.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vx *= particle.drag
        particle.vy += particle.gravity
        particle.rotation += particle.spin
        particle.age += 1
        const fadeIn = Math.min(particle.age / 5, 1)
        const fadeOut = Math.min((particle.life - particle.age) / 22, 1)
        particle.alpha = particle.baseAlpha * fadeIn * fadeOut
        drawPopperParticle(ctx, particle)
      })

      if (active.length) {
        popperFrameRef.current = requestAnimationFrame(animate)
      } else {
        popperFrameRef.current = null
        ctx.clearRect(0, 0, frameWidth, frameHeight)
      }
    }

    popperFrameRef.current = requestAnimationFrame(animate)
  }

  // Very subtle mouse parallax (desktop only) — refs + rAF, no re-renders
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const target = { x: 0, y: 0 }
    let raf = null
    const apply = () => {
      raf = null
      if (haloRef.current) {
        haloRef.current.style.marginLeft = `${target.x * 18}px`
        haloRef.current.style.marginTop = `${target.y * 12}px`
      }
      if (envWrapRef.current) {
        envWrapRef.current.style.transform = `translate3d(${target.x * -6}px, ${target.y * -4}px, 0)`
      }
    }
    const onMove = (e) => {
      target.x = e.clientX / window.innerWidth - 0.5
      target.y = e.clientY / window.innerHeight - 0.5
      if (!raf) raf = requestAnimationFrame(apply)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const handleSealTap = () => {
    if (stage !== 'closed') return
    // Must run synchronously inside the click handler for mobile autoplay.
    onMusicStart?.()

    setStage('seal-off') // Steps 1–2: seal shrinks away with a glow

    setTimeout(() => setStage('flap'), 420) // Step 3: flap lifts open
    // The existing flap transition has a short delay; fire as it visibly opens.
    popperTimerRef.current = window.setTimeout(runCornerPoppers, 700)
    setTimeout(() => setStage('card'), 1500) // Steps 4–6: inner light + card rises

    setTimeout(() => setShowEnter(true), 2750)
  }

  const opened = stage !== 'closed' && stage !== 'seal-off'

  return (
    <motion.div
      className="ev-screen fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
    >
      {/* ── Background layers ── */}
      <div ref={haloRef} className="ev-halo" aria-hidden="true" />
      <div className="ev-vignette" aria-hidden="true" />
      <canvas ref={popperCanvasRef} className="ev-popper-layer" aria-hidden="true" />

      {/* floating dust — few and faint */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="ev-dust"
            style={{
              left: `${(i * 83) % 100}%`,
              top: `${(i * 47 + 13) % 100}%`,
              width: 2 + (i % 3),
              height: 2 + (i % 3),
              animationDuration: `${9 + (i % 5) * 2.5}s`,
              animationDelay: `${(i % 6) * -1.7}s`,
              '--dx': `${((i % 4) - 1.5) * 14}px`,
              '--dy': `${-24 - (i % 4) * 10}px`,
            }}
          />
        ))}
        {[...Array(5)].map((_, i) => (
          <span
            key={`s${i}`}
            className="ev-star"
            style={{
              left: `${[14, 30, 72, 86, 50][i]}%`,
              top: `${[22, 64, 18, 58, 82][i]}%`,
              animationDuration: `${3.2 + i * 0.9}s`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>

      {/* ornamental corners */}
      <CornerOrnament className="pointer-events-none absolute left-3 top-3 w-14 opacity-60 sm:left-6 sm:top-6 sm:w-20" />
      <CornerOrnament className="pointer-events-none absolute right-3 top-3 w-14 rotate-90 opacity-60 sm:right-6 sm:top-6 sm:w-20" />
      <CornerOrnament className="pointer-events-none absolute bottom-3 right-3 w-14 rotate-180 opacity-60 sm:bottom-6 sm:right-6 sm:w-20" />
      <CornerOrnament className="pointer-events-none absolute bottom-3 left-3 w-14 -rotate-90 opacity-60 sm:bottom-6 sm:left-6 sm:w-20" />

      {/* ── Date (gently collapses once opened so the risen card
             always has room and is never cropped) ── */}
      <motion.div
        className="relative z-10 overflow-hidden"
        initial={false}
        animate={opened ? { opacity: 0, height: 0 } : { opacity: 1, height: 'auto' }}
        transition={{ duration: 0.6, ease: EASE_LUX }}
      >
        <motion.p {...fade(0.25)} className="ev-date text-[clamp(0.8rem,2.6vw,1.05rem)] font-medium">
          December 12, 2026
        </motion.p>
        <motion.div {...fade(0.4)} className="mt-3 flex items-center gap-3" aria-hidden="true">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#D6B36A]/70 sm:w-16" />
          <span className="h-1 w-1 rotate-45 bg-[#D6B36A]" />
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#D6B36A]/70 sm:w-16" />
        </motion.div>
      </motion.div>

      {/* ── Envelope ── */}
      <div ref={envWrapRef} className="ev-scene relative z-10 mt-10 will-change-transform sm:mt-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: EASE_LUX }}
        >
          <div className={`ev-envelope ${opened ? 'opened' : ''}`}>
            {/* warm light spilling from inside once open */}
            <div className={`ev-inner-light ${stage === 'card' ? 'on' : ''}`} />

            {/* envelope interior — visible through the opening */}
            <div className="ev-back" />

            {/* invitation card — rises IN FRONT of the opened flap */}
            <motion.div
              className="ev-card ev-paper flex flex-col items-center justify-start pt-[9%] text-center"
              initial={false}
              animate={
                stage === 'card'
                  ? { y: riseY, scale: 1.05, rotateX: 5 }
                  : stage === 'flap'
                    ? { y: '-3%', scale: 1 }
                    : { y: '8%', scale: 0.99 }
              }
              transition={
                stage === 'card'
                  ? { duration: 1.15, ease: EASE_LUX }
                  : { duration: 0.7, ease: EASE_LUX }
              }
              style={{ transformOrigin: 'bottom center', transformPerspective: 1200 }}
            >
              <p className="eyebrow text-[clamp(0.42rem,1.5vw,0.58rem)] text-bronze">Together With Their Families</p>
              <p className="section-heading mt-[3%] flex items-center gap-[0.35em] whitespace-nowrap text-[clamp(1rem,4.6vw,1.6rem)] leading-tight text-maroon">
                {couple.groom}
                <span className="text-[0.8em] text-rosegold">&#10084;</span>
                {couple.bride}
              </p>
              <span className="mx-auto my-[3%] block h-px w-[38%] bg-gradient-to-r from-transparent via-gold to-transparent" />
              <p className="font-body text-[clamp(0.44rem,1.6vw,0.62rem)] tracking-[0.34em] text-bronze/85">
                12 &bull; 12 &bull; 2026
              </p>
            </motion.div>

            {/* sparkles around the rising card */}
            {stage === 'card' && (
              <>
                {[
                  ['-8%', '18%', 0],
                  ['104%', '26%', 0.35],
                  ['-6%', '58%', 0.7],
                  ['103%', '66%', 0.2],
                  ['16%', '-7%', 0.5],
                  ['78%', '-9%', 0.85],
                ].map(([left, top, delay], i) => (
                  <span
                    key={i}
                    className="ev-spark"
                    style={{ left, top, animationDelay: `${delay}s` }}
                    aria-hidden="true"
                  />
                ))}
              </>
            )}

            {/* front pocket — real folded envelope construction */}
            <div className="ev-pocket ev-paper">
              <span className="ev-fold ev-fold-left" />
              <span className="ev-fold ev-fold-right" />
              <span className="ev-fold ev-fold-bottom" />
            </div>

            {/* top flap — rotates back around its top edge, then drops
                below the card in paint order so the card emerges in front */}
            <motion.div
              className={`ev-flap ev-paper-dark ${opened ? 'opened' : ''}`}
              initial={false}
              animate={{ rotateX: opened ? -178 : 0, zIndex: opened ? 1 : 6 }}
              transition={
                stage === 'flap'
                  ? { delay: 0.25, duration: 1.05, ease: [0.65, 0, 0.25, 1] }
                  : { duration: 0.01 }
              }
              style={{ transformPerspective: 1600 }}
            />

            {/* wax seal — anchored wrapper keeps it centred on the flap
                intersection; framer only animates scale/opacity */}
            {!opened && (
              <div className="ev-seal-anchor">
                <motion.button
                  onClick={handleSealTap}
                  className="ev-seal"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={
                    stage === 'seal-off' ? { scale: 0.4, opacity: 0 } : { scale: 1, opacity: 1 }
                  }
                  transition={{
                    enter: { delay: 1.05, type: 'spring', stiffness: 210, damping: 17 },
                    ...(stage === 'seal-off'
                      ? { duration: 0.45, ease: 'easeIn' }
                      : { type: 'spring', stiffness: 210, damping: 17 }),
                  }}
                  whileHover={stage === 'closed' ? { scale: 1.04 } : undefined}
                  whileTap={stage === 'closed' ? { scale: 0.94 } : undefined}
                  disabled={stage !== 'closed'}
                  aria-label="Open the invitation"
                >
                  <span className="section-heading flex items-center gap-[0.18em] text-[clamp(0.95rem,3vw,1.2rem)] leading-none">
                    R<span className="text-[0.68em]">&hearts;</span>P
                  </span>
                  <span className="font-body text-[7px] tracking-[0.32em] text-[#e5c98a]/85">OPEN</span>
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* ── Enter button appears after the card has risen ── */}
      <div className="ev-enter-slot relative z-10 mt-10 h-11 sm:h-12">
        {showEnter && (
          <motion.button
            onClick={() => onEnter()}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_LUX }}
            className="btn-gold"
          >
            Enter The Celebration
          </motion.button>
        )}
      </div>

      {/* ── Bottom instruction ── */}
      {stage === 'closed' ? (
        <motion.div {...fade(1.25)} className="ev-subtitle relative z-10 mt-6 flex flex-col items-center sm:mt-8">
          <p className="ev-open-label text-[clamp(0.66rem,2vw,0.8rem)] font-medium">Open The Invitation</p>
          <p className="mt-2 font-display text-sm italic text-ivory/70 sm:text-base">
            A story written in love <span className="ev-heartbeat ml-1 text-rosegold">&#10084;</span>
          </p>
        </motion.div>
      ) : (
        <div className="ev-subtitle mt-6 h-14 sm:h-16" aria-hidden="true" />
      )}
    </motion.div>
  )
}
