import { motion } from 'framer-motion'
import { HiOutlineLocationMarker, HiOutlineBookmark } from 'react-icons/hi'
import { venue, couple } from '../data/weddingData'
import SectionDivider from './SectionDivider'

function downloadICS() {
  const start = new Date(couple.weddingDate)
  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000)
  const fmt = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `SUMMARY:${couple.groom} & ${couple.bride}'s Wedding`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `LOCATION:${venue.address}`,
    `DESCRIPTION:Join us as we celebrate our wedding.`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\n')

  const blob = new Blob([ics], { type: 'text/calendar' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'wedding-event.ics'
  a.click()
  URL.revokeObjectURL(url)
}

export default function Venue() {
  return (
    <section id="venue" className="relative bg-ivory/15 px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-32 backdrop-blur-sm">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow text-bronze">Join Us At</p>
        <h2 className="section-heading mt-3 text-[clamp(1.75rem,5vw,3rem)] text-maroon">The Venue</h2>
        <SectionDivider className="mt-6" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="glass-card mx-auto mt-10 sm:mt-14 grid max-w-5xl overflow-hidden rounded-3xl shadow-luxury md:grid-cols-2"
      >
        <div className="relative h-56 sm:h-72 md:h-full min-h-[200px]">
          <img src={venue.photo} alt={venue.name} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-maroon/50 to-transparent" />
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8">
          <h3 className="section-heading text-xl sm:text-2xl text-maroon">{venue.name}</h3>
          <p className="mt-2 flex items-start gap-2 font-body text-xs sm:text-sm text-maroon/70">
            <HiOutlineLocationMarker className="mt-0.5 shrink-0 text-gold" />
            {venue.address}
          </p>

          <div className="mt-5 sm:mt-6 flex flex-wrap gap-3">
            <a href={venue.mapsLink} target="_blank" rel="noreferrer" className="btn-gold text-xs sm:text-sm">
              Get Directions
            </a>
            <button onClick={downloadICS} className="btn-outline-gold text-xs sm:text-sm">
              <HiOutlineBookmark /> Save Location
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="mx-auto mt-6 sm:mt-8 max-w-5xl overflow-hidden rounded-3xl shadow-luxury"
      >
        <iframe
          title="Venue map"
          src={venue.mapEmbed}
          width="100%"
          height="280"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          className="sm:h-[380px]"
        />
      </motion.div>
    </section>
  )
}
