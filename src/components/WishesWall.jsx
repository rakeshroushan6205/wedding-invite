import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import SectionDivider from './SectionDivider'
import { db } from '../lib/firebase'

const STORAGE_KEY = 'wedding-wishes'

const SEED_WISHES = []

export default function WishesWall() {
  const [wishes, setWishes] = useState([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [firebaseStatus, setFirebaseStatus] = useState('loading')
  const [submitting, setSubmitting] = useState(false)

  const readLocalWishes = () => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
      return stored && stored.length ? stored : SEED_WISHES
    } catch {
      return SEED_WISHES
    }
  }

  useEffect(() => {
    const wishesQuery = query(collection(db, 'wishes'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(
      wishesQuery,
      (snapshot) => {
        const liveWishes = snapshot.docs.map((wish) => ({ id: wish.id, ...wish.data() }))
        const localWishes = readLocalWishes()
        setWishes(liveWishes.length ? liveWishes : localWishes)
        setFirebaseStatus('ready')
      },
      () => {
        setWishes(readLocalWishes())
        setFirebaseStatus('fallback')
      }
    )

    return unsubscribe
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    const wish = { name: name.trim(), message: message.trim() }
    const localNext = [{ id: `local-${Date.now()}`, ...wish }, ...readLocalWishes()]
    setSubmitting(true)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(localNext))
    setName('')
    setMessage('')

    if (firebaseStatus === 'ready') {
      try {
        await addDoc(collection(db, 'wishes'), { ...wish, createdAt: serverTimestamp() })
        setSubmitting(false)
        return
      } catch {
        setFirebaseStatus('fallback')
      }
    }

    setWishes(localNext)
    setSubmitting(false)
  }

  return (
    <section id="wishes" className="relative bg-ivory/15 px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-32 backdrop-blur-sm">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow text-bronze">Leave A Note</p>
        <h2 className="section-heading mt-3 text-[clamp(1.75rem,5vw,3rem)] text-maroon">Wishes Wall</h2>
        <SectionDivider className="mt-6" />
      </div>

      <form onSubmit={submit} className="glass-card mx-auto mt-8 sm:mt-10 grid max-w-xl gap-4 rounded-2xl p-5 sm:p-6 shadow-luxury">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="rounded-lg border border-gold/30 bg-white/60 px-4 py-3 min-h-[44px] font-body text-maroon placeholder:text-maroon/40 focus:border-gold focus:outline-none"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your blessing for the couple…"
          rows={3}
          className="rounded-lg border border-gold/30 bg-white/60 px-4 py-3 font-body text-maroon placeholder:text-maroon/40 focus:border-gold focus:outline-none"
        />
        <button type="submit" disabled={submitting} className="btn-gold w-full sm:w-auto justify-self-stretch sm:justify-self-start disabled:cursor-wait disabled:opacity-60">
          {submitting ? 'Sending…' : 'Send Wishes'}
        </button>
      </form>

      <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false}>
          {wishes.map((w, i) => (
            <motion.div
              key={w.id}
              layout
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
              className="glass-card relative rounded-2xl p-5 shadow-luxury"
              style={{ animation: `float 6s ease-in-out ${(i % 4) * 0.6}s infinite` }}
            >
              <motion.span
                className="absolute -right-2 -top-2 text-lg text-rosegold"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
              >
                ♥
              </motion.span>
              <p className="font-display text-base italic text-maroon/85">&ldquo;{w.message}&rdquo;</p>
              <p className="eyebrow mt-3 text-[10px] text-bronze">— {w.name}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <p className="mx-auto mt-6 sm:mt-8 max-w-xl px-4 text-center font-body text-[10px] sm:text-xs text-maroon/40">
        {firebaseStatus === 'ready'
          ? 'Wishes are shared live with every guest.'
          : 'Wishes are saved on this device until the shared wall is available.'}
      </p>
    </section>
  )
}
