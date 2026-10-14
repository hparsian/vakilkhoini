import { useEffect } from 'react'
import { useRouter } from '../router.jsx'

// Idle-time prefetching of same-origin links that scroll into view.
// In this SPA the router intercepts left-clicks, so the main win is that any
// link opened in a new tab / window (or a hard navigation) is already warm in
// the HTTP cache. External links and hashed assets are ignored.
//
// quicklink touches `document` at module scope, so it is loaded via a dynamic
// import inside the effect — this keeps it out of the build-time SSR bundle
// (which runs in Node where `document` is undefined) and defers the ~1.5 kB
// until the browser is idle.
export default function LinkPrefetcher() {
  const { pathname } = useRouter()

  useEffect(() => {
    if (typeof window === 'undefined' || !('requestIdleCallback' in window)) return
    let unlisten
    let cancelled = false
    const handle = window.requestIdleCallback(async () => {
      const { listen } = await import('quicklink')
      if (cancelled) return
      unlisten = listen({
        limit: 6,
        throttle: 3,
        ignore: (url) => {
          if (!url.startsWith(window.location.origin)) return true
          if (url.includes('/assets/')) return true
          return false
        },
      })
    })
    return () => {
      cancelled = true
      if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(handle)
      if (typeof unlisten === 'function') unlisten()
    }
  }, [pathname])

  return null
}
