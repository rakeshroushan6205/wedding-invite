import { useState, useEffect } from 'react'

const SECTIONS = ['hero', 'experience', 'story', 'countdown', 'events', 'gallery', 'films', 'venue', 'family', 'rsvp', 'wishes', 'finale', 'footer']

export default function useActiveSection() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const observers = []
    const handleIntersect = (id) => (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(id)
        }
      })
    }

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(handleIntersect(id), {
        threshold: 0.15,
      })
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return active
}
