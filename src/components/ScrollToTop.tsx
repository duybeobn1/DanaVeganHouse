import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scrolls to the top of the page whenever the route changes. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation() as any

  useEffect(() => {
    // Avoid forcing scroll on Menu page (any subpath) and when navigating within a page via hashes
    if (!pathname.startsWith('/menu') && !hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [pathname, hash])

  return null
}
