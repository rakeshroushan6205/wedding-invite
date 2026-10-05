import { motion } from 'framer-motion'
import { events } from '../data/weddingData'
import SectionDivider from './SectionDivider'
import EventPhoto from './EventPhoto'

export default function EventSchedule() {
  return (
    <section id="events" className="relative bg-ivory/15 px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-32 backdrop-blur-sm">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow text-bronze">Save These Dates</p>
        <h2 className="section-heading mt-3 text-[clamp(1.75rem,5vw,3rem)] text-maroon">Wedding Festivities</h2>
        <SectionDivider className="mt-6" />
      </div>

      <div className="mx-auto mt-10 sm:mt-16 grid max-w-6xl gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((ev, i) => (
          <motion.div
            key={ev.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            whileHover={{ y: -8 }}
            className="group overflow-hidden rounded-2xl shadow-luxury"
          >
            <EventPhoto src={ev.photo} alt={`${ev.name} invitation`} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
