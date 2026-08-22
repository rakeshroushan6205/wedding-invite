import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Manages one persistent `Audio` object for the whole session (created
 * once at the App level, not inside the MusicPlayer widget). This matters
 * for autoplay: `play()` must be called synchronously inside the actual
 * user click/tap handler — not after a `setTimeout` or inside a `useEffect`
 * that fires after a delay — or strict mobile browsers (notably iOS Safari)
 * will silently block it. Returning the `play` function here lets the
 * envelope's "Enter The Celebration" click call it directly.
 */
export default function useBackgroundMusic(src) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.5)

  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = true
    audio.volume = volume
    audio.addEventListener('pause', () => setPlaying(false))
    audio.addEventListener('play', () => setPlaying(true))
    audioRef.current = audio
    return () => {
      audio.pause()
      audioRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  const play = useCallback(() => {
    audioRef.current?.play().catch(() => setPlaying(false))
  }, [])

  const pause = useCallback(() => {
    audioRef.current?.pause()
  }, [])

  const toggle = useCallback(() => {
    if (!audioRef.current) return
    if (audioRef.current.paused) play()
    else pause()
  }, [play, pause])

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return
    audioRef.current.muted = !audioRef.current.muted
    setMuted(audioRef.current.muted)
  }, [])

  return { playing, muted, volume, setVolume, play, pause, toggle, toggleMute }
}
