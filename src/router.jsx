import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const RouterContext = createContext({ pathname: '/', navigate: () => {} })

function getPathname() {
  if (typeof window === 'undefined') return '/'
  return window.location.pathname.replace(/\/+$/, '') || '/'
}

export function RouterProvider({ children, initialPath }) {
  // `initialPath` pins the route during the build-time prerender; in the browser
  // the current location wins.
  const [pathname, setPathname] = useState(initialPath || getPathname())

  useEffect(() => {
    if (initialPath) return
    const onNav = () => setPathname(getPathname())
    window.addEventListener('popstate', onNav)
    window.addEventListener('app:navigate', onNav)
    return () => {
      window.removeEventListener('popstate', onNav)
      window.removeEventListener('app:navigate', onNav)
    }
  }, [initialPath])

  const navigate = useCallback((to) => {
    if (to === getPathname()) return
    window.history.pushState(null, '', to)
    window.dispatchEvent(new Event('app:navigate'))
    window.scrollTo(0, 0)
  }, [])

  return (
    <RouterContext.Provider value={{ pathname, navigate }}>
      {children}
    </RouterContext.Provider>
  )
}

export function useRouter() {
  return useContext(RouterContext)
}

// Matches a path pattern like '/maghalat/:slug' against a real pathname.
export function matchPath(pattern, pathname) {
  const patternParts = pattern.replace(/\/+$/, '').split('/').filter(Boolean)
  const pathParts = pathname.replace(/\/+$/, '').split('/').filter(Boolean)
  if (patternParts.length !== pathParts.length) return null

  const params = {}
  for (let i = 0; i < patternParts.length; i++) {
    const pp = patternParts[i]
    if (pp.startsWith(':')) {
      params[pp.slice(1)] = decodeURIComponent(pathParts[i])
    } else if (pp !== pathParts[i]) {
      return null
    }
  }
  return params
}

export function Link({ to, children, className, onClick, ...rest }) {
  const { navigate } = useRouter()
  const handleClick = (e) => {
    if (onClick) onClick(e)
    if (e.defaultPrevented) return
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    navigate(to)
  }
  return (
    <a href={to} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
