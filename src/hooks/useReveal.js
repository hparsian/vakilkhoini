import { useEffect, useRef } from 'react'

/**
 * Attaches a very light scroll-reveal effect to an element.
 * Adds the "in-view" class once the element enters the viewport.
 * Respects prefers-reduced-motion automatically via CSS.
 */
export default function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
