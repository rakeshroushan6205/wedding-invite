import { motion } from 'framer-motion'
import { HiOutlineClipboardCopy } from 'react-icons/hi'
import { useState } from 'react'
import { giftInfo } from '../data/weddingData'
import SectionDivider from './SectionDivider'

export default function GiftSection() {
  const [copied, setCopied] = useState(false)
  const [imgError, setImgError] = useState(false)

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(giftInfo.upiId)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard not available — silently ignore */
    }
  }

  return (
    <section className="relative bg-ivory/20 px-4 sm:px-6 py-16 sm:py-20 md:py-24 backdrop-blur-sm">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow text-bronze">With Gratitude</p>
        <h2 className="section-heading mt-3 text-[clamp(1.75rem,5vw,3rem)] text-maroon">A Small Token</h2>
        <SectionDivider className="mt-6" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-card mx-auto mt-8 sm:mt-12 flex max-w-md flex-col items-center rounded-3xl p-6 sm:p-10 text-center shadow-luxury"
      >
        <p className="font-display text-sm sm:text-base italic text-maroon/80">{giftInfo.message}</p>

        <div className="mt-5 sm:mt-6 flex h-44 w-44 sm:h-52 sm:w-52 items-center justify-center rounded-2xl border border-gold/30 bg-white p-4">
          {imgError ? (
            <p className="px-2 text-center font-body text-xs text-maroon/50">
              Add your UPI QR image to
              <br />
              <code className="text-bronze">/public/media/qr-code.png</code>
            </p>
          ) : (
            <img
              src={giftInfo.qrImage}
              alt="UPI QR code"
              className="h-36 w-36 sm:h-44 sm:w-44 object-contain"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        <button
          onClick={copyUpi}
          className="mt-5 flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2 min-h-[44px] font-body text-xs sm:text-sm text-bronze transition hover:bg-gold/10"
        >
          <HiOutlineClipboardCopy /> {copied ? 'Copied!' : giftInfo.upiId}
        </button>
      </motion.div>
    </section>
  )
}
