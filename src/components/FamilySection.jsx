import { motion } from 'framer-motion'
import { familyIntro } from '../data/weddingData'
import SectionDivider from './SectionDivider'

function FamilyColumn({ data, align }) {
  return (
    <div className={align === 'right' ? 'text-right' : 'text-left'}>
      <h3 className="section-heading text-2xl text-maroon">{data.title}</h3>
      <p className="mt-1 font-display text-sm italic text-bronze/80">{data.parents}</p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mt-6 w-full max-w-sm"
      >
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl border-2 border-gold/60 bg-maroon/20 p-1.5 shadow-luxury ring-1 ring-gold-light/30">
          <div className="pointer-events-none absolute inset-2 z-10 rounded-lg border border-gold-light/60" />
          <img
            src={data.familyPhoto}
            alt={`${data.title} family photograph`}
            className="h-full w-full rounded-lg object-cover"
            loading="lazy"
          />
        </div>
      </motion.div>

    </div>
  )
}

export default function FamilySection() {
  return (
    <section id="family" className="relative bg-ivory/15 px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-32 backdrop-blur-sm">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow text-bronze">With Heartfelt Love</p>
        <h2 className="section-heading mt-3 text-[clamp(1.75rem,5vw,3rem)] text-maroon">Our Families</h2>
        <SectionDivider className="mt-6" />
      </div>

      <div className="mx-auto mt-10 sm:mt-16 grid max-w-5xl gap-8 sm:gap-12 sm:grid-cols-2">
        <FamilyColumn data={familyIntro.bride} align="left" />
        <FamilyColumn data={familyIntro.groom} align="right" />
      </div>
    </section>
  )
}
