import { useState, useCallback, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { couple, events, venue, contact } from '../../data/weddingData'

const weddingEvent = events.find((e) => e.name === 'Wedding Ceremony')

function InvitationFront({ style }) {
  return (
    <div className="absolute inset-0 backface-hidden" style={{ ...style, backfaceVisibility: 'hidden' }}>
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl p-5 sm:p-8 md:p-12"
        style={{
          background: 'linear-gradient(145deg, #FBF6EC 0%, #F3ECDC 40%, #FBF6EC 100%)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.5)',
        }}
      >
        {/* Decorative border */}
        <div className="absolute inset-3 rounded-xl border border-gold/30 pointer-events-none" />
        <div className="absolute inset-4 rounded-xl border border-gold/10 pointer-events-none" />

        {/* Corner ornaments */}
        <svg className="absolute top-4 left-4 w-16 h-16 opacity-30" viewBox="0 0 60 60">
          <path d="M0 0 L30 0 L30 3 L3 3 L3 30 L0 30 Z" fill="#C8983E" />
          <circle cx="12" cy="12" r="4" fill="none" stroke="#C8983E" strokeWidth="0.8" />
        </svg>
        <svg className="absolute top-4 right-4 w-16 h-16 opacity-30 scale-x-[-1]" viewBox="0 0 60 60">
          <path d="M0 0 L30 0 L30 3 L3 3 L3 30 L0 30 Z" fill="#C8983E" />
          <circle cx="12" cy="12" r="4" fill="none" stroke="#C8983E" strokeWidth="0.8" />
        </svg>
        <svg className="absolute bottom-4 left-4 w-16 h-16 opacity-30 scale-y-[-1]" viewBox="0 0 60 60">
          <path d="M0 0 L30 0 L30 3 L3 3 L3 30 L0 30 Z" fill="#C8983E" />
          <circle cx="12" cy="12" r="4" fill="none" stroke="#C8983E" strokeWidth="0.8" />
        </svg>
        <svg className="absolute bottom-4 right-4 w-16 h-16 opacity-30 scale-[-1]" viewBox="0 0 60 60">
          <path d="M0 0 L30 0 L30 3 L3 3 L3 30 L0 30 Z" fill="#C8983E" />
          <circle cx="12" cy="12" r="4" fill="none" stroke="#C8983E" strokeWidth="0.8" />
        </svg>

        {/* Floral divider top */}
        <div className="absolute top-[18%] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-6 px-2">
          <p className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze/60">
            Together With Their Families
          </p>

          <div className="flex items-center gap-2 sm:gap-3">
            <svg width="40" height="1" className="opacity-40 sm:w-60">
              <line x1="0" y1="0" x2="40" y2="0" stroke="#C8983E" strokeWidth="0.5" />
            </svg>
            <svg width="12" height="12" viewBox="0 0 24 24" className="text-gold/60 sm:w-16 sm:h-16">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
            </svg>
            <svg width="40" height="1" className="opacity-40 sm:w-60">
              <line x1="0" y1="0" x2="40" y2="0" stroke="#C8983E" strokeWidth="0.5" />
            </svg>
          </div>

          <h1 className="section-heading text-center text-2xl leading-tight text-maroon sm:text-4xl md:text-5xl">
            {couple.groom}
            <span className="mx-1 sm:mx-3 font-display text-xl text-rosegold sm:text-3xl">&amp;</span>
            {couple.bride}
          </h1>

          <div className="flex items-center gap-2 sm:gap-3">
            <svg width="40" height="1" className="opacity-40 sm:w-60">
              <line x1="0" y1="0" x2="40" y2="0" stroke="#C8983E" strokeWidth="0.5" />
            </svg>
            <svg width="12" height="12" viewBox="0 0 24 24" className="text-gold/60 sm:w-16 sm:h-16">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
            </svg>
            <svg width="40" height="1" className="opacity-40 sm:w-60">
              <line x1="0" y1="0" x2="40" y2="0" stroke="#C8983E" strokeWidth="0.5" />
            </svg>
          </div>

          <p className="text-center font-display text-base italic text-bronze/70 sm:text-lg md:text-xl">
            Request the pleasure of your company
          </p>

          <p className="text-center font-body text-xs sm:text-sm md:text-base uppercase tracking-[0.25em] text-maroon/60">
            {couple.weddingDateDisplay}
          </p>
        </div>

        {/* Floral divider bottom */}
        <div className="absolute bottom-[18%] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        {/* Decorative flower cluster */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-20">
          <svg width="80" height="20" viewBox="0 0 80 20">
            <circle cx="10" cy="10" r="4" fill="#C8983E" />
            <circle cx="25" cy="10" r="3" fill="#D9A8A0" />
            <circle cx="40" cy="10" r="5" fill="#C8983E" />
            <circle cx="55" cy="10" r="3" fill="#D9A8A0" />
            <circle cx="70" cy="10" r="4" fill="#C8983E" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function InvitationBack({ style }) {
  return (
    <div className="absolute inset-0 backface-hidden" style={{ ...style, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
      <div className="relative flex h-full w-full flex-col overflow-y-auto rounded-2xl p-4 sm:p-6 md:p-10"
        style={{
          background: 'linear-gradient(145deg, #FBF6EC 0%, #F3ECDC 40%, #FBF6EC 100%)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.5)',
        }}
      >
        <div className="absolute inset-3 rounded-xl border border-gold/30 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center space-y-3 text-center text-maroon/80 sm:space-y-5">
          <p className="section-heading text-lg text-maroon sm:text-xl md:text-2xl">
            {couple.groom} <span className="text-rosegold">&amp;</span> {couple.bride}
          </p>

          <div className="h-px w-16 sm:w-20 bg-gold/40" />

          <p className="font-display text-xs italic leading-relaxed sm:text-sm md:text-base">
            Together with their families, we request the honor of your presence at their wedding celebration.
          </p>

          <div className="w-full space-y-2 rounded-xl bg-white/50 p-3 sm:p-4 font-body text-[10px] sm:text-xs md:text-sm">
            <p className="flex items-center justify-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C8983E" strokeWidth="1.5" className="shrink-0"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              {weddingEvent?.date || couple.weddingDateDisplay}
            </p>
            <p className="flex items-center justify-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C8983E" strokeWidth="1.5" className="shrink-0"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              {weddingEvent?.time || '7:30 PM onward'}
            </p>
            <p className="flex items-center justify-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C8983E" strokeWidth="1.5" className="shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              {venue.name}, {venue.address}
            </p>
            <p className="flex items-center justify-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C8983E" strokeWidth="1.5" className="shrink-0"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
              {weddingEvent?.note || 'Traditional ceremonial attire'}
            </p>
          </div>

          <div className="h-px w-12 sm:w-16 bg-gold/30" />

          <p className="font-body text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-bronze/60">
            RSVP By {weddingEvent?.date || couple.weddingDateDisplay}
          </p>

          <div className="flex items-center gap-2 sm:gap-3 rounded-xl bg-white/40 px-3 py-2 sm:px-4">
            <svg width="32" height="32" viewBox="0 0 40 40" className="opacity-50 shrink-0 sm:w-10 sm:h-10">
              <rect x="5" y="5" width="30" height="30" rx="2" fill="none" stroke="#C8983E" strokeWidth="1" />
              <circle cx="20" cy="18" r="5" fill="none" stroke="#C8983E" strokeWidth="1" />
              <path d="M10 33 C10 26, 14 22, 20 22 C26 22, 30 26, 30 33" fill="none" stroke="#C8983E" strokeWidth="1" />
              <rect x="15" y="13" width="10" height="10" rx="5" fill="none" stroke="#C8983E" strokeWidth="1" />
            </svg>
            <div className="text-left font-body text-[8px] leading-tight text-bronze/70 sm:text-[10px]">
              <p className="font-semibold text-maroon/80">{contact.groomPhone}</p>
              <p>{contact.email}</p>
            </div>
          </div>

          <p className="font-body text-[8px] sm:text-[9px] uppercase tracking-widest" style={{ color: 'rgba(107,63,29,0.4)' }}>
            {couple.hashtag}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function InvitationCard({ showBack, onFlip, zoomed, onZoom }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile('ontouchstart' in window || window.innerWidth < 768)
  }, [])

  useEffect(() => {
    const handleResize = () => setIsMobile('ontouchstart' in window || window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (isMobile) return
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -12, y: px * 12 })
  }, [isMobile])

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return
    setTilt({ x: 0, y: 0 })
  }, [isMobile])

  const handleDoubleClick = useCallback((e) => {
    e.stopPropagation()
    onZoom()
  }, [onZoom])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{
        opacity: 1,
        scale: zoomed ? (isMobile ? 1.2 : 1.6) : 1,
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      transition={{
        opacity: { duration: 0.8, ease: 'easeOut' },
        scale: { type: 'spring', stiffness: 200, damping: 25 },
        rotateX: { type: 'spring', stiffness: 300, damping: 30 },
        rotateY: { type: 'spring', stiffness: 300, damping: 30 },
      }}
      style={{
        width: 'min(90vw, 420px)',
        height: 'min(130vw, 600px)',
        transformStyle: 'preserve-3d',
        perspective: '1500px',
        cursor: zoomed ? 'zoom-out' : 'pointer',
      }}
      className="relative"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onFlip}
      onDoubleClick={handleDoubleClick}
      whileHover={isMobile ? {} : { scale: zoomed ? (isMobile ? 1.2 : 1.6) : 1.02 }}
    >
      {/* Float animation wrapper */}
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Glow behind card */}
        <motion.div
          className="absolute -inset-8 rounded-[2rem] -z-10"
          animate={{
            background: [
              'radial-gradient(circle, rgba(200,152,62,0.15) 0%, transparent 60%)',
              'radial-gradient(circle, rgba(200,152,62,0.25) 0%, transparent 60%)',
              'radial-gradient(circle, rgba(200,152,62,0.15) 0%, transparent 60%)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* The 3D flip container */}
        <div
          className="relative h-full w-full"
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <motion.div
            className="relative h-full w-full"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: showBack ? 180 : 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <InvitationFront style={{ backfaceVisibility: 'hidden' }} />
            <InvitationBack style={{ backfaceVisibility: 'hidden' }} />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
