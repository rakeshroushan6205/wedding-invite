import { motion } from 'framer-motion'
import { familyIntro } from '../data/weddingData'
import SectionDivider from './SectionDivider'

function FamilyColumn({ data, align }) {
  return (
    <div className={align === 'right' ? 'text-right' : 'text-left'}>
      <h3 className="section-heading text-2xl text-maroon">{data.title}</h3>
      <p className="mt-1 font-display text-sm italic text-bronze/80">{data.parents}</p>

      <div className={`mt-6 flex flex-wrap gap-4 ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
        {data.members.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="h-16 w-16 sm:h-20 sm:w-24 overflow-hidden rounded-full border-2 border-gold/50 shadow-gold">
              <img src={m.photo} alt={m.name} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <p className="font-body text-[10px] sm:text-xs text-maroon/80 text-center">{m.name}</p>
            <p className="eyebrow text-[8px] sm:text-[9px] text-bronze/70">{m.relation}</p>
          </motion.div>
        ))}
      </div>
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
