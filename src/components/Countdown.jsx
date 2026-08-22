import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { couple } from '../data/weddingData'
import SectionDivider from './SectionDivider'

function getTimeLeft() {
  const diff = +new Date(couple.weddingDate) - +new Date()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: false,
  }
}

function Unit({ value, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="glass-card-dark relative flex w-[72px] sm:w-20 md:w-28 flex-col items-center rounded-2xl py-3 sm:py-5 shadow-gold"
    >
      <div className="absolute inset-0 rounded-2xl animate-pulse-glow bg-gold/10" />
      <motion.span
        key={value}
        initial={{ opacity: 0.4, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="section-heading relative z-10 text-2xl sm:text-3xl md:text-4xl text-gold-light"
      >
        {String(value).padStart(2, '0')}
      </motion.span>
      <span className="eyebrow relative z-10 mt-1 sm:mt-2 text-[9px] sm:text-[10px] text-ivory/70">{label}</span>
    </motion.div>
  )
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft())

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="countdown" className="relative overflow-hidden bg-maroon/10 px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-32 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gold-radial opacity-60" />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="eyebrow text-rosegold-light">{time.done ? 'Forever Has Begun' : 'Counting Down To Forever'}</p>
        <h2 className="section-heading gold-text animate-shimmer mt-3 text-[clamp(1.75rem,5vw,3rem)]">{couple.weddingDateDisplay}</h2>
        <SectionDivider className="mt-6" />

        <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
          <Unit value={time.days} label="Days" delay={0} />
          <Unit value={time.hours} label="Hours" delay={0.1} />
          <Unit value={time.minutes} label="Minutes" delay={0.2} />
          <Unit value={time.seconds} label="Seconds" delay={0.3} />
        </div>
      </div>
    </section>
  )
}
