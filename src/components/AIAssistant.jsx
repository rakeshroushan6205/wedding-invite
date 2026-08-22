import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlineChatAlt2, HiOutlineX, HiOutlinePaperAirplane } from 'react-icons/hi'
import { faqs, contact, couple } from '../data/weddingData'

/**
 * A lightweight, fully client-side FAQ assistant — no external AI API call,
 * so it works instantly with zero keys or cost. It matches guest questions
 * against `faqs` in weddingData.js by keyword overlap. To upgrade this to a
 * true LLM-powered assistant, POST `question` to your own backend route
 * that calls the Claude API server-side (never expose an API key in the
 * browser) and render the response the same way.
 */
function findAnswer(question) {
  const q = question.toLowerCase()
  let best = null
  let bestScore = 0
  faqs.forEach((f) => {
    const words = f.q.toLowerCase().split(/\W+/).filter((w) => w.length > 3)
    const score = words.filter((w) => q.includes(w)).length
    if (score > bestScore) {
      bestScore = score
      best = f
    }
  })
  if (best && bestScore > 0) return best.a
  return `I don't have an exact answer for that — for anything specific you can reach us at ${contact.groomPhone} or ${contact.email}.`
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { from: 'bot', text: `Hi! I'm the Wedding Guide for ${couple.groom} & ${couple.bride}'s wedding. Ask me about timing, venue, dress code, or contacts.` },
  ])

  const send = (text) => {
    if (!text.trim()) return
    const answer = findAnswer(text)
    setMessages((m) => [...m, { from: 'user', text }, { from: 'bot', text: answer }])
    setInput('')
  }

  return (
    <div className="mobile-chat-control fixed bottom-5 left-3 z-[80] sm:left-5">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass-card-dark mb-3 flex h-[420px] w-[calc(100vw-24px)] max-w-[360px] flex-col overflow-hidden rounded-2xl shadow-luxury"
          >
            <div className="flex items-center justify-between border-b border-gold/20 px-4 py-3">
              <p className="eyebrow text-gold-light">Wedding Guide</p>
              <button onClick={() => setOpen(false)} aria-label="Close assistant" className="text-gold-light">
                <HiOutlineX />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-xl px-3 py-2 font-body text-sm ${
                    m.from === 'bot' ? 'bg-gold/15 text-ivory' : 'ml-auto bg-rosegold/20 text-ivory'
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 border-t border-gold/20 px-3 py-2">
              {faqs.slice(0, 3).map((f) => (
                <button
                  key={f.q}
                  onClick={() => send(f.q)}
                  className="rounded-full border border-gold/30 px-3 py-1 text-[11px] text-gold-light hover:bg-gold/10"
                >
                  {f.q}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="flex items-center gap-2 border-t border-gold/20 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                className="flex-1 rounded-full border border-gold/30 bg-ivory/10 px-4 py-2 font-body text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
              />
              <button type="submit" className="text-gold-light" aria-label="Send">
                <HiOutlinePaperAirplane className="rotate-90" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.9 }}
        className="glass-card-dark flex h-12 w-12 items-center justify-center rounded-full text-gold-light shadow-gold"
        aria-label="Open Wedding Guide assistant"
      >
        {open ? <HiOutlineX size={20} /> : <HiOutlineChatAlt2 size={20} />}
      </motion.button>
    </div>
  )
}
