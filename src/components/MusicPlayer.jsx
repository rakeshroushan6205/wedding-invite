import { useState } from 'react'
import { motion } from 'framer-motion'
import { IoPlay, IoPause, IoVolumeHigh, IoVolumeMute } from 'react-icons/io5'

/**
 * Purely presentational — the actual `Audio` object lives in
 * `useBackgroundMusic` at the App level (see hooks/useBackgroundMusic.js),
 * shared with the envelope so playback can start the instant the guest
 * taps "Enter The Celebration", which is what reliably satisfies mobile
 * browsers' autoplay-needs-a-gesture rule.
 */
export default function MusicPlayer({ music }) {
  const { playing, muted, volume, setVolume, toggle, toggleMute } = music
  const [showVolume, setShowVolume] = useState(false)

  return (
    <div
      className="mobile-music-control fixed bottom-5 right-3 z-[80] flex flex-col items-end gap-2 sm:right-5"
      onMouseEnter={() => setShowVolume(true)}
      onMouseLeave={() => setShowVolume(false)}
    >
      {showVolume && (
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="glass-card-dark accent-gold h-1 w-24 cursor-pointer rounded-full"
          aria-label="Music volume"
        />
      )}

      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowVolume((v) => !v)}
          className="glass-card-dark flex h-10 w-10 items-center justify-center rounded-full text-gold-light"
          aria-label={muted ? 'Unmute music' : 'Mute music'}
        >
          {muted || volume === 0 ? <IoVolumeMute size={18} /> : <IoVolumeHigh size={18} />}
        </button>

        <motion.button
          onClick={toggle}
          whileTap={{ scale: 0.9 }}
          className="glass-card-dark flex h-12 w-12 items-center justify-center rounded-full text-gold-light shadow-gold"
          aria-label={playing ? 'Pause music' : 'Play music'}
        >
          <motion.span
            animate={playing ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 8, repeat: playing ? Infinity : 0, ease: 'linear' }}
          >
            {playing ? <IoPause size={20} /> : <IoPlay size={20} />}
          </motion.span>
        </motion.button>
      </div>
    </div>
  )
}
