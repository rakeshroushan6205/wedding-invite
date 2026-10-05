import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const FRONT_IMAGE = '/media/gallery/invitation/front.jpeg'
const BACK_IMAGE = '/media/gallery/invitation/back.png'

function InvitationFace({ src, alt, back = false }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-2xl"
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: back ? 'rotateY(180deg) translateZ(1px)' : 'translateZ(1px)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      <img
        src={src}
        alt={alt}
        draggable="false"
        className="h-full w-full rounded-2xl object-contain"
        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
      />
    </div>
  )
}

export default function InvitationCard({ showBack, onFlip, zoomed = false, onZoom = () => {} }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const updateDevice = () => setIsMobile('ontouchstart' in window || window.innerWidth < 768)
    updateDevice()
    window.addEventListener('resize', updateDevice)
    return () => window.removeEventListener('resize', updateDevice)
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (isMobile) return
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -8, y: px * 8 })
  }, [isMobile])

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) setTilt({ x: 0, y: 0 })
  }, [isMobile])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onFlip()
    }
  }

  const handleDoubleClick = useCallback((e) => {
    e.stopPropagation()
    onZoom()
  }, [onZoom])

  return (
    <motion.div
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-label={showBack ? 'Show the front of the invitation' : 'Flip invitation to the back'}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{
        opacity: 1,
        scale: zoomed ? (isMobile ? 1.12 : 1.35) : 1,
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
        width: 'min(82vw, 380px)',
        aspectRatio: '2 / 3',
        transformStyle: 'preserve-3d',
        perspective: '1500px',
        isolation: 'isolate',
        cursor: zoomed ? 'zoom-out' : 'pointer',
      }}
      className="relative outline-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onFlip}
      onKeyDown={handleKeyDown}
      onDoubleClick={handleDoubleClick}
      whileHover={isMobile ? {} : { scale: zoomed ? 1.35 : 1.025 }}
      whileTap={{ scale: zoomed ? 1.12 : 0.99 }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="absolute -inset-8 -z-10 rounded-[2rem]"
          animate={{
            background: [
              'radial-gradient(circle, rgba(200,152,62,0.14) 0%, transparent 62%)',
              'radial-gradient(circle, rgba(200,152,62,0.3) 0%, transparent 62%)',
              'radial-gradient(circle, rgba(200,152,62,0.14) 0%, transparent 62%)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div
          className="relative h-full w-full"
          style={{
            transform: `rotateY(${showBack ? 180 : 0}deg)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 950ms cubic-bezier(0.22, 1, 0.36, 1)',
            willChange: 'transform',
          }}
        >
          <InvitationFace src={FRONT_IMAGE} alt="Wedding invitation front" />
          <InvitationFace src={BACK_IMAGE} alt="Wedding invitation back" back />
        </div>
      </motion.div>
    </motion.div>
  )
}
