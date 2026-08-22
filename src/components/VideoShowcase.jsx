import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlinePlay, HiOutlineX } from 'react-icons/hi'
import { films } from '../data/weddingData'
import SectionDivider from './SectionDivider'

export default function VideoShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const active = films[activeIndex]

  return (
    <section id="films" className="relative bg-maroon/10 px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-32 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gold-radial opacity-40" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="eyebrow text-rosegold-light">Watch Our Story</p>
        <h2 className="section-heading mt-3 text-[clamp(1.75rem,5vw,3rem)] text-ivory">Wedding Films</h2>
        <SectionDivider className="mt-6" />
      </div>

      {/* Featured player */}
      <motion.button
        key={active.id}
        onClick={() => setPlaying(true)}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="group relative mx-auto mt-8 sm:mt-12 block aspect-video w-full max-w-4xl overflow-hidden rounded-2xl shadow-luxury"
      >
        <img
          src={active.thumbnail}
          alt={active.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon/85 via-maroon/10 to-transparent" />

        <motion.span
          whileHover={{ scale: 1.1 }}
          className="absolute left-1/2 top-1/2 flex h-14 w-14 sm:h-20 sm:w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold-light/60 bg-maroon/70 text-gold-light shadow-gold"
        >
          <HiOutlinePlay size={24} className="ml-1 sm:size-7" />
        </motion.span>

        <div className="absolute inset-x-0 bottom-0 p-4 text-left sm:p-7">
          <h3 className="section-heading text-lg text-ivory sm:text-3xl">{active.title}</h3>
          <p className="mt-1 font-display text-xs italic text-ivory/75 sm:text-sm">{active.description}</p>
        </div>
      </motion.button>

      {/* Thumbnail strip */}
      <div className="mx-auto mt-4 sm:mt-6 flex max-w-4xl gap-3 sm:gap-4 overflow-x-auto pb-2 px-0 sm:px-4">
        {films.map((film, i) => (
          <button
            key={film.id}
            onClick={() => setActiveIndex(i)}
            className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border transition sm:h-24 sm:w-40 ${
              i === activeIndex ? 'border-gold shadow-gold' : 'border-gold/20 opacity-70 hover:opacity-100'
            }`}
          >
            <img src={film.thumbnail} alt={film.title} className="h-full w-full object-cover" />
            <span className="absolute inset-0 flex items-center justify-center bg-maroon/30">
              <HiOutlinePlay className="text-ivory" size={14} />
            </span>
            <span className="absolute inset-x-0 bottom-0 bg-maroon/70 px-2 py-1 text-left text-[9px] sm:text-[10px] uppercase tracking-wide text-ivory/90 leading-tight">
              {film.title}
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox player */}
      <AnimatePresence>
        {playing && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-maroon/95 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl overflow-hidden rounded-xl shadow-luxury"
            >
              <video
                key={active.id}
                src={active.video}
                poster={active.thumbnail}
                controls
                autoPlay
                className="aspect-video w-full bg-black"
              />
            </motion.div>
            <button
              onClick={() => setPlaying(false)}
              className="absolute right-6 top-6 text-3xl text-gold-light"
              aria-label="Close video"
            >
              <HiOutlineX />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
