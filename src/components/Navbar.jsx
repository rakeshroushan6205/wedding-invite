import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { couple } from '../data/weddingData'

const LINKS = [
  { id: 'experience', label: '3D Experience' },
  { id: 'story', label: 'Our Story' },
  { id: 'countdown', label: 'Countdown' },
  { id: 'events', label: 'Events' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'films', label: 'Films' },
  { id: 'venue', label: 'Venue' },
  { id: 'rsvp', label: 'RSVP' },
  { id: 'wishes', label: 'Wishes' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20, mass: 0.3 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const scrollTo = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-card-dark py-3 shadow-luxury' : 'bg-transparent py-5'
      }`}
    >
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-gold-light via-gold to-rosegold"
        style={{ scaleX: progress, transformOrigin: '0% 50%', width: '100%' }}
      />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <button onClick={() => scrollTo('hero')} className="section-heading text-lg text-gold-light sm:text-xl">
          {couple.groom[0]}&amp;{couple.bride[0]}
        </button>

        <nav className="hidden gap-8 lg:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="font-body text-[12px] uppercase tracking-widest text-gold-light/80 transition-colors hover:text-gold-light"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button
          className="relative z-[70] text-2xl text-gold-light lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
            style={{
              background: 'rgba(43, 10, 18, 0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
            onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
          >
            <motion.nav
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="flex flex-col items-center gap-2 px-6"
            >
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25, delay: 0.05 * i }}
                  onClick={() => scrollTo(l.id)}
                  className="w-full min-w-[220px] rounded-xl px-6 py-4 text-center font-body text-lg uppercase tracking-widest text-gold-light/90 transition-colors hover:bg-gold/10 hover:text-gold-light sm:text-xl"
                >
                  {l.label}
                </motion.button>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
