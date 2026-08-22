import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { couple, contact } from '../data/weddingData'
import SectionDivider from './SectionDivider'

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative px-4 pb-8 pt-12 text-center text-ivory/80 sm:px-6 sm:pb-10 sm:pt-16"
      style={{
        background: 'linear-gradient(180deg, rgba(66,18,29,0.92) 0%, rgba(43,10,18,0.97) 100%)',
        borderTop: '1px solid rgba(200,152,62,0.45)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24"
        style={{ background: 'linear-gradient(180deg, rgba(217,168,160,0.14), transparent)' }}
        aria-hidden="true"
      />
      <p className="section-heading text-2xl sm:text-3xl text-gold-light">
        {couple.groom} <span className="text-rosegold">&amp;</span> {couple.bride}
      </p>
      <p className="eyebrow mt-2 text-[10px] sm:text-[11px] text-ivory/60">{couple.weddingDateDisplay} · {couple.city}</p>
      <p className="mt-2 font-body text-xs tracking-[0.25em] text-gold-light/90">{couple.hashtag}</p>

      <SectionDivider className="my-6 sm:my-8" />

      <div className="flex flex-col items-center gap-2 font-body text-xs sm:text-sm text-ivory/70">
        <p>{contact.email}</p>
        <p className="text-center">{contact.groomPhone} · {contact.bridePhone}</p>
      </div>

      <div className="mt-5 sm:mt-6 flex justify-center gap-5 text-lg sm:text-xl text-gold-light">
        <a href={contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href={contact.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp">
          <FaWhatsapp />
        </a>
      </div>

      <p className="mt-8 sm:mt-10 font-body text-[10px] sm:text-xs uppercase tracking-widest text-ivory/40">
        Made With Love ❤
      </p>
    </footer>
  )
}
