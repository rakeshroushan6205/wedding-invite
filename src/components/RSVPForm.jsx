import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionDivider from './SectionDivider'

const RSVP_ENDPOINT = import.meta.env.VITE_RSVP_ENDPOINT || ''

const initialForm = { name: '', mobile: '', guests: 1, attending: 'yes', message: '' }

export default function RSVPForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please tell us your name'
    if (!/^\+?\d{7,15}$/.test(form.mobile.replace(/\s/g, ''))) e.mobile = 'Enter a valid mobile number'
    if (!form.guests || form.guests < 1) e.guests = 'At least 1 guest'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setStatus('sending')

    const payload = { ...form, submittedAt: new Date().toISOString() }

    try {
      if (RSVP_ENDPOINT) {
        // Wire this to your real backend — Formspree, Google Sheets (Apps
        // Script web app), Airtable, or your own API — via the
        // VITE_RSVP_ENDPOINT environment variable. See README.md.
        const res = await fetch(RSVP_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error('Request failed')
      } else {
        // No backend configured yet — keep responses locally so nothing is
        // lost, and let the host inspect them from the browser console:
        // JSON.parse(localStorage.getItem('rsvp-responses'))
        const stored = JSON.parse(localStorage.getItem('rsvp-responses') || '[]')
        stored.push(payload)
        localStorage.setItem('rsvp-responses', JSON.stringify(stored))
      }
      setStatus('success')
      setForm(initialForm)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="rsvp" className="relative bg-maroon/10 px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-32 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gold-radial opacity-50" />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="eyebrow text-rosegold-light">Kindly Respond</p>
        <h2 className="section-heading mt-3 text-[clamp(1.75rem,5vw,3rem)] text-ivory">RSVP</h2>
        <SectionDivider className="mt-6" />
      </div>

      <div className="relative mx-auto mt-8 sm:mt-12 max-w-xl">
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card-dark flex flex-col items-center rounded-3xl p-12 text-center"
            >
              <motion.svg width="64" height="64" viewBox="0 0 64 64">
                <motion.circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="#C8983E"
                  strokeWidth="2.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8 }}
                />
                <motion.path
                  d="M20 33 L28 41 L44 23"
                  fill="none"
                  stroke="#E6C887"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                />
              </motion.svg>
              <h3 className="section-heading mt-4 text-2xl text-ivory">Thank You!</h3>
              <p className="mt-2 font-body text-sm text-ivory/70">
                Your response has been received. We can&apos;t wait to celebrate with you.
              </p>
              <button onClick={() => setStatus('idle')} className="btn-outline-gold mt-6">
                Submit Another Response
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card-dark grid gap-5 rounded-3xl p-6 sm:p-10"
            >
              <div>
                <label className="eyebrow text-[11px] text-ivory/70" htmlFor="rsvp-name">Full Name</label>
                <input
                  id="rsvp-name"
                  value={form.name}
                  onChange={update('name')}
                  className="mt-2 w-full rounded-lg border border-gold/30 bg-ivory/5 px-4 py-3 min-h-[44px] font-body text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
                  placeholder="Your full name"
                />
                {errors.name && <p className="mt-1 text-xs text-rosegold-light">{errors.name}</p>}
              </div>

              <div>
                <label className="eyebrow text-[11px] text-ivory/70" htmlFor="rsvp-mobile">Mobile Number</label>
                <input
                  id="rsvp-mobile"
                  value={form.mobile}
                  onChange={update('mobile')}
                  type="tel"
                  inputMode="numeric"
                  className="mt-2 w-full rounded-lg border border-gold/30 bg-ivory/5 px-4 py-3 min-h-[44px] font-body text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
                  placeholder="+91 98765 43210"
                />
                {errors.mobile && <p className="mt-1 text-xs text-rosegold-light">{errors.mobile}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="eyebrow text-[11px] text-ivory/70" htmlFor="rsvp-guests">Guests</label>
                  <input
                    id="rsvp-guests"
                    type="number"
                    min={1}
                    max={10}
                    value={form.guests}
                    onChange={update('guests')}
                    className="mt-2 w-full rounded-lg border border-gold/30 bg-ivory/5 px-4 py-3 min-h-[44px] font-body text-ivory focus:border-gold focus:outline-none"
                  />
                  {errors.guests && <p className="mt-1 text-xs text-rosegold-light">{errors.guests}</p>}
                </div>
                <div>
                  <label className="eyebrow text-[11px] text-ivory/70" htmlFor="rsvp-attending">Attending?</label>
                  <select
                    id="rsvp-attending"
                    value={form.attending}
                    onChange={update('attending')}
                    className="mt-2 w-full rounded-lg border border-gold/30 bg-ivory/5 px-4 py-3 min-h-[44px] font-body text-ivory focus:border-gold focus:outline-none"
                  >
                    <option value="yes" className="text-maroon">Joyfully Yes</option>
                    <option value="no" className="text-maroon">Regretfully No</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="eyebrow text-[11px] text-ivory/70">Message For The Couple</label>
                <textarea
                  value={form.message}
                  onChange={update('message')}
                  rows={3}
                  className="mt-2 w-full rounded-lg border border-gold/30 bg-ivory/5 px-4 py-3 font-body text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
                  placeholder="Leave a heartfelt note (optional)"
                />
              </div>

              <button type="submit" disabled={status === 'sending'} className="btn-gold mt-2 disabled:opacity-60">
                {status === 'sending' ? 'Sending…' : 'Send RSVP'}
              </button>
              {status === 'error' && (
                <p className="text-center text-xs text-rosegold-light">
                  Something went wrong — please try again in a moment.
                </p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
