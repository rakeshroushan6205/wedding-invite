import { motion } from 'framer-motion'

/**
 * The site's signature motif — a thin gold ring, echoing both the wedding
 * rings and a mandap arch. Reused as the loader, the section divider, and
 * the 3D centerpiece so the whole experience reads as one idea.
 */
export default function SectionDivider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 sm:gap-4 ${className}`}>
      <span className="h-px w-8 sm:w-12 md:w-24 bg-gradient-to-r from-transparent to-gold/70" />
      <motion.svg
        viewBox="0 0 64 64"
        className="ring-divider"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      >
        <circle cx="32" cy="32" r="21" fill="none" stroke="#C8983E" strokeWidth="1.4" />
        <circle cx="32" cy="32" r="14" fill="none" stroke="#E6C887" strokeWidth="0.8" />
        <circle cx="32" cy="11" r="3" fill="#E6C887" />
      </motion.svg>
      <span className="h-px w-8 sm:w-12 md:w-24 bg-gradient-to-l from-transparent to-gold/70" />
    </div>
  )
}
