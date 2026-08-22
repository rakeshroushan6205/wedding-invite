import { useRef, useCallback, useState } from 'react'

const MELODY = [
  { note: 523.25, dur: 0.6 }, { note: 659.25, dur: 0.4 },
  { note: 783.99, dur: 0.6 }, { note: 659.25, dur: 0.4 },
  { note: 523.25, dur: 0.3 }, { note: 587.33, dur: 0.3 },
  { note: 783.99, dur: 0.6 }, { note: 880.00, dur: 0.6 },
  { note: 1046.50, dur: 0.8 }, { note: 783.99, dur: 0.4 },
  { note: 659.25, dur: 0.6 }, { note: 587.33, dur: 0.4 },
  { note: 523.25, dur: 0.6 }, { note: 493.88, dur: 0.4 },
  { note: 440.00, dur: 0.6 }, { note: 523.25, dur: 0.6 },
  { note: 659.25, dur: 0.8 }, { note: 587.33, dur: 0.3 },
  { note: 523.25, dur: 0.3 }, { note: 493.88, dur: 0.6 },
  { note: 440.00, dur: 0.4 }, { note: 392.00, dur: 0.6 },
  { note: 440.00, dur: 0.6 }, { note: 523.25, dur: 0.8 },
  { note: 440.00, dur: 1.2 },
  { note: 587.33, dur: 0.6 }, { note: 659.25, dur: 0.4 },
  { note: 698.46, dur: 0.6 }, { note: 783.99, dur: 0.4 },
  { note: 698.46, dur: 0.3 }, { note: 659.25, dur: 0.3 },
  { note: 587.33, dur: 0.6 }, { note: 523.25, dur: 0.6 },
  { note: 659.25, dur: 0.8 }, { note: 587.33, dur: 0.4 },
  { note: 523.25, dur: 0.6 }, { note: 493.88, dur: 0.4 },
  { note: 440.00, dur: 0.6 }, { note: 523.25, dur: 0.6 },
  { note: 659.25, dur: 1.0 }, { note: 783.99, dur: 0.6 },
  { note: 880.00, dur: 0.6 }, { note: 1046.50, dur: 1.2 },
  { note: 880.00, dur: 0.4 }, { note: 783.99, dur: 0.4 },
  { note: 659.25, dur: 0.6 }, { note: 783.99, dur: 0.8 },
  { note: 659.25, dur: 1.4 },
]

function playPianoNote(ctx, freq, duration, volume, startTime, masterGain) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(freq, startTime)

  gain.gain.setValueAtTime(0, startTime)
  gain.gain.linearRampToValueAtTime(volume, startTime + 0.015)
  gain.gain.setValueAtTime(volume * 0.8, startTime + 0.05)
  gain.gain.exponentialRampToValueAtTime(volume * 0.001, startTime + duration * 0.85)

  osc.connect(gain)
  gain.connect(masterGain)
  osc.start(startTime)
  osc.stop(startTime + duration)

  const osc2 = ctx.createOscillator()
  const g2 = ctx.createGain()
  osc2.type = 'sine'
  osc2.frequency.setValueAtTime(freq * 2, startTime)
  g2.gain.setValueAtTime(0, startTime)
  g2.gain.linearRampToValueAtTime(volume * 0.12, startTime + 0.01)
  g2.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 0.3)
  osc2.connect(g2)
  g2.connect(masterGain)
  osc2.start(startTime)
  osc2.stop(startTime + duration)

  const osc3 = ctx.createOscillator()
  const g3 = ctx.createGain()
  osc3.type = 'sine'
  osc3.frequency.setValueAtTime(freq * 0.5, startTime)
  g3.gain.setValueAtTime(0, startTime)
  g3.gain.linearRampToValueAtTime(volume * 0.06, startTime + 0.02)
  g3.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 0.6)
  osc3.connect(g3)
  g3.connect(masterGain)
  osc3.start(startTime)
  osc3.stop(startTime + duration)
}

export default function useRomanticMusic() {
  const ctxRef = useRef(null)
  const masterGainRef = useRef(null)
  const timeoutRef = useRef(null)
  const playingRef = useRef(false)
  const [active, setActive] = useState(false)
  const [volume, setVolumeState] = useState(0.5)
  const [muted, setMuted] = useState(false)
  const volumeRef = useRef(0.5)
  const mutedRef = useRef(false)

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
      masterGainRef.current = ctxRef.current.createGain()
      masterGainRef.current.gain.value = mutedRef.current ? 0 : volumeRef.current
      masterGainRef.current.connect(ctxRef.current.destination)
    }
    return { ctx: ctxRef.current, master: masterGainRef.current }
  }, [])

  const playMelody = useCallback((ctx, master) => {
    if (!playingRef.current) return
    let t = ctx.currentTime + 0.15
    MELODY.forEach(({ note, dur }) => {
      playPianoNote(ctx, note, dur, 0.07, t, master)
      t += dur + 0.03
    })
    const loopLen = (t - ctx.currentTime - 0.15) * 1000
    timeoutRef.current = setTimeout(() => {
      if (playingRef.current) playMelody(ctx, master)
    }, loopLen + 1200)
  }, [])

  const start = useCallback(() => {
    const { ctx, master } = getCtx()
    if (ctx.state === 'suspended') ctx.resume()
    playingRef.current = true
    setActive(true)
    const targetGain = mutedRef.current ? 0 : volumeRef.current
    master.gain.linearRampToValueAtTime(targetGain, ctx.currentTime + 0.15)
    playMelody(ctx, master)
  }, [getCtx, playMelody])

  const stop = useCallback(() => {
    playingRef.current = false
    clearTimeout(timeoutRef.current)
    if (ctxRef.current && masterGainRef.current) {
      masterGainRef.current.gain.cancelScheduledValues(ctxRef.current.currentTime)
      masterGainRef.current.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 0.1)
    }
    setActive(false)
  }, [])

  const toggle = useCallback(() => {
    if (playingRef.current) stop()
    else start()
  }, [start, stop])

  const pause = stop

  const setVolume = useCallback((v) => {
    volumeRef.current = v
    setVolumeState(v)
    if (masterGainRef.current && ctxRef.current) {
      masterGainRef.current.gain.cancelScheduledValues(ctxRef.current.currentTime)
      const val = mutedRef.current ? 0 : v
      masterGainRef.current.gain.setValueAtTime(val, ctxRef.current.currentTime)
    }
  }, [])

  const toggleMute = useCallback(() => {
    const newMuted = !mutedRef.current
    mutedRef.current = newMuted
    setMuted(newMuted)
    if (masterGainRef.current && ctxRef.current) {
      masterGainRef.current.gain.setValueAtTime(
        newMuted ? 0 : volumeRef.current,
        ctxRef.current.currentTime
      )
    }
  }, [])

  return {
    playing: active, muted, volume,
    setVolume, toggle, pause, toggleMute,
  }
}
