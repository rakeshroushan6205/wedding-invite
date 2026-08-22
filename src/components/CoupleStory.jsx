import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { storyTimeline } from '../data/weddingData'
import SectionDivider from './SectionDivider'

const FIRST_MEETING_YEAR = Number(storyTimeline[0]?.year) || new Date().getFullYear()

export default function CoupleStory() {
  return (
    <section id="story" className="relative bg-ivory/15 px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-32 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl text-center">
        <p className="eyebrow text-bronze">Their Journey</p>
        <h2 className="section-heading mt-3 text-[clamp(1.75rem,5vw,3rem)] text-maroon">A Love Story</h2>
        <SectionDivider className="mt-6" />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 font-display text-[clamp(1rem,2.5vw,1.25rem)] italic text-bronze/80"
        >
          <CountUp end={new Date().getFullYear() - FIRST_MEETING_YEAR} duration={1.6} enableScrollSpy scrollSpyOnce />{' '}
          years of love and counting
        </motion.p>
      </div>

      <div className="relative mx-auto mt-12 sm:mt-16 max-w-4xl">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold to-transparent md:block" />

        <div className="flex flex-col gap-10 sm:gap-16">
          {storyTimeline.map((item, i) => {
            const fromLeft = i % 2 === 0
            return (
              <div key={item.title} className="relative grid items-center gap-6 md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, x: fromLeft ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className={`overflow-hidden rounded-2xl shadow-luxury ${fromLeft ? 'md:order-1' : 'md:order-2'}`}
                >
                  <img src={item.photo} alt={item.title} className="h-48 sm:h-56 md:h-64 w-full object-cover" loading="lazy" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: fromLeft ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
                  className={`glass-card-dark relative rounded-2xl p-5 sm:p-6 ${fromLeft ? 'md:order-2' : 'md:order-1'}`}
                >
                  <span className="section-heading text-3xl sm:text-5xl text-gold/40">{item.year}</span>
                  <h3 className="section-heading mt-1 text-xl sm:text-2xl text-maroon">{item.title}</h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-maroon/70">{item.text}</p>
                  <motion.span
                    className="absolute -top-3 right-6 text-2xl text-rosegold"
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.2 }}
                  >
                    ♥
                  </motion.span>
                </motion.div>

                <span className="absolute left-1/2 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-gold md:block" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
