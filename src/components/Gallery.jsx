import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlineX, HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { galleryImages, galleryVideos } from '../data/weddingData'
import SectionDivider from './SectionDivider'

function TiltCard({ src, onClick, index }) {
  const ref = useRef(null)
  const [style, setStyle] = useState({})

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setStyle({
      transform: `perspective(800px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg) scale3d(1.03,1.03,1.03)`,
    })
  }
  const reset = () => setStyle({ transform: 'perspective(800px) rotateY(0) rotateX(0) scale3d(1,1,1)' })

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={() => onClick(index)}
      style={{ ...style, transition: 'transform 200ms ease-out' }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="group relative mb-4 block w-full overflow-hidden rounded-xl shadow-luxury"
    >
      <img src={src} alt="" loading="lazy" className="w-full h-auto object-cover transition duration-500 group-hover:scale-110" />
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-maroon/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100">
        <span className="eyebrow p-4 text-ivory">View</span>
      </div>
    </motion.button>
  )
}

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null)

  const close = () => setActiveIndex(null)
  const prev = () => setActiveIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length)
  const next = () => setActiveIndex((i) => (i + 1) % galleryImages.length)

  return (
    <section id="gallery" className="relative bg-ivory/15 px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-32 backdrop-blur-sm">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow text-bronze">Captured Moments</p>
        <h2 className="section-heading mt-3 text-[clamp(1.75rem,5vw,3rem)] text-maroon">Our Gallery</h2>
        <SectionDivider className="mt-6" />
      </div>

      <div className="mx-auto mt-10 sm:mt-14 max-w-6xl columns-1 gap-4 sm:columns-2 md:columns-3">
        {galleryImages.map((src, i) => (
          <TiltCard key={src} src={src} index={i} onClick={setActiveIndex} />
        ))}
      </div>

      {galleryVideos.length > 0 && (
        <div className="mx-auto mt-12 sm:mt-16 max-w-5xl px-0 sm:px-4">
          <p className="eyebrow mb-6 text-center text-bronze">Pre-Wedding Films</p>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={12}
            slidesPerView={1}
            breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 20 } }}
          >
            {galleryVideos.map((src) => (
              <SwiperSlide key={src}>
                <video src={src} controls className="aspect-video w-full rounded-xl shadow-luxury" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-maroon/95 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.img
              key={activeIndex}
              src={galleryImages[activeIndex]}
              alt=""
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-full rounded-lg shadow-luxury"
            />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-maroon/60 px-4 py-1.5 font-body text-xs tracking-widest text-gold-light backdrop-blur-sm">
              {activeIndex + 1} / {galleryImages.length}
            </div>
            <button
              onClick={close}
              className="absolute right-6 top-6 text-3xl text-gold-light"
              aria-label="Close lightbox"
            >
              <HiOutlineX />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-4xl text-gold-light sm:left-8"
              aria-label="Previous image"
            >
              <HiOutlineChevronLeft />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-4xl text-gold-light sm:right-8"
              aria-label="Next image"
            >
              <HiOutlineChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
