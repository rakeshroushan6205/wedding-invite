import { motion } from 'framer-motion'
import {
  HiOutlineSparkles,
  HiOutlineSun,
  HiOutlineMusicNote,
  HiOutlineHeart,
  HiOutlineGift,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineLocationMarker,
} from 'react-icons/hi'
import { events } from '../data/weddingData'
import SectionDivider from './SectionDivider'

const ICONS = [HiOutlineSparkles, HiOutlineSun, HiOutlineMusicNote, HiOutlineHeart, HiOutlineGift]

export default function EventSchedule() {
  return (
    <section id="events" className="relative bg-ivory/15 px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-32 backdrop-blur-sm">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow text-bronze">Save These Dates</p>
        <h2 className="section-heading mt-3 text-[clamp(1.75rem,5vw,3rem)] text-maroon">Wedding Festivities</h2>
        <SectionDivider className="mt-6" />
      </div>

      <div className="mx-auto mt-10 sm:mt-16 grid max-w-6xl gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((ev, i) => {
          const Icon = ICONS[i % ICONS.length]
          return (
            <motion.div
              key={ev.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className="glass-card relative overflow-hidden rounded-2xl p-5 pt-7 sm:p-7 sm:pt-8 shadow-luxury"
            >
              <div
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{ background: 'linear-gradient(90deg, transparent, #E6C887 30%, #C8983E 50%, #E6C887 70%, transparent)' }}
                aria-hidden="true"
              />
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold/10" />
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-gradient-to-br from-gold/20 to-rosegold/10 shadow-gold">
                <Icon className="text-xl sm:text-2xl text-gold" />
              </div>
              <h3 className="section-heading mt-4 text-xl sm:text-2xl text-maroon">{ev.name}</h3>

              <div className="mt-4 space-y-2 font-body text-sm text-maroon/75">
                <p className="flex items-center gap-2">
                  <HiOutlineCalendar className="shrink-0 text-gold" /> {ev.date}
                </p>
                <p className="flex items-center gap-2">
                  <HiOutlineClock className="shrink-0 text-gold" /> {ev.time}
                </p>
                <p className="flex items-center gap-2">
                  <HiOutlineLocationMarker className="shrink-0 text-gold" /> {ev.venue}
                </p>
              </div>

              <p className="mt-4 border-t border-gold/20 pt-3 font-display text-sm italic text-bronze/80">
                {ev.note}
              </p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
