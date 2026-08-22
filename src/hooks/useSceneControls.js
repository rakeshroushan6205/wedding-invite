import { useEffect, useRef } from 'react'

/**
 * Returns a ref `{ scroll, mouseX, mouseY }` kept in sync with the page,
 * deliberately NOT using React state so listeners never trigger re-renders —
 * the 3D scene reads this ref directly inside its own animation loop.
 *
 * If `sectionRef` is supplied, `scroll` is normalized to that element's own
 * height (0 = section top at viewport top, 1 = fully scrolled past), which
 * is what we want for a hero-scoped 3D scene rather than the whole page.
 */
export default function useSceneControls(sectionRef) {
  const controls = useRef({ scroll: 0, mouseX: 0, mouseY: 0 })

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef?.current
      if (el) {
        const rect = el.getBoundingClientRect()
        const progress = -rect.top / Math.max(rect.height, 1)
        controls.current.scroll = Math.min(Math.max(progress, 0), 1)
      } else {
        const max = document.documentElement.scrollHeight - window.innerHeight
        controls.current.scroll = max > 0 ? Math.min(window.scrollY / max, 1) : 0
      }
    }
    const handlePointer = (e) => {
      controls.current.mouseX = (e.clientX / window.innerWidth) * 2 - 1
      controls.current.mouseY = (e.clientY / window.innerHeight) * 2 - 1
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('pointermove', handlePointer, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('pointermove', handlePointer)
    }
  }, [sectionRef])

  return controls
}
