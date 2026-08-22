import { useRef, useCallback, useState } from 'react'

const MELODY = [
  { note: 523.25, dur: 0.6 }, { note: 587.33, dur: 0.4 },
  { note: 659.25, dur: 0.6 }, { note: 587.33, dur: 0.4 },
  { note: 523.25, dur: 0.3 }, { note: 659.25, dur: 0.3 },
  { note: 783.99, dur: 0.8 }, { note: 659.25, dur: 0.4 },
  { note: 587.33, dur: 0.6 }, { note: 523.25, dur: 0.4 },
  { note: 659.25, dur: 0.6 }, { note: 783.99, dur: 0.4 },
  { note: 880.00, dur: 0.8 }, { note: 783.99, dur: 0.4 },
  { note: 659.25, dur: 0.6 }, { note: 587.33, dur: 0.4 },
  { note: 523.25, dur: 0.3 }, { note: 587.33, dur: 0.3 },
  { note: 659.25, dur: 0.6 }, { note: 523.25, dur: 0.8 },
]

export default function useFluteMusic() {
  const ctxRef = useRef(null)
  const gainRef = useRef(null)
  const timeoutRef = useRef(null)
  const playingRef = useRef(false)
  const [active, setActive] = useState(false)

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    return ctxRef.current
  }, [])

  const playNote = useCallback((ctx, freq, duration, volume, startTime) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, startTime)
    osc.frequency.exponentialRampToValueAtTime(freq * 1.002, startTime + 0.05)
    osc.frequency.exponentialRampToValueAtTime(freq * 0.998, startTime + duration * 0.7)

    gain.gain.setValueAtTime(0, startTime)
    gain.gain.linearRampToValueAtTime(volume, startTime + 0.08)
    gain.gain.setValueAtTime(volume, startTime + duration * 0.6)
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration)

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(2000, startTime)
    filter.frequency.exponentialRampToValueAtTime(800, startTime + duration)

    const osc2 = ctx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(freq * 2, startTime)
    const g2 = ctx.createGain()
    g2.gain.setValueAtTime(0, startTime)
    g2.gain.linearRampToValueAtTime(volume * 0.08, startTime + 0.05)
    g2.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 0.3)

    osc.connect(filter).connect(gain).connect(ctx.destination)
    osc2.connect(g2).connect(ctx.destination)

    osc.start(startTime)
    osc.stop(startTime + duration)
    osc2.start(startTime)
    osc2.stop(startTime + duration)

    return { osc, osc2, gain, g2 }
  }, [])

  const playMelody = useCallback((ctx) => {
    if (!playingRef.current) return
    let t = ctx.currentTime + 0.1
    MELODY.forEach(({ note, dur }) => {
      playNote(ctx, note, dur, 0.08, t)
      t += dur + 0.05
    })
    const loopLen = (t - ctx.currentTime - 0.1) * 1000
    timeoutRef.current = setTimeout(() => {
      if (playingRef.current) playMelody(ctx)
    }, loopLen + 800)
  }, [playNote])

  const start = useCallback(() => {
    const ctx = getCtx()
    if (ctx.state === 'suspended') ctx.resume()
    playingRef.current = true
    setActive(true)
    playMelody(ctx)
  }, [getCtx, playMelody])

  const stop = useCallback(() => {
    playingRef.current = false
    clearTimeout(timeoutRef.current)
    setActive(false)
  }, [])

  const toggle = useCallback(() => {
    if (playingRef.current) stop()
    else start()
  }, [start, stop])

  return { active, start, stop, toggle }
}
