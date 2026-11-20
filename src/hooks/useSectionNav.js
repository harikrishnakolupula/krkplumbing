import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

/**
 * Click handler for in-page links that also works from other routes (e.g. the
 * 404 page) and when the hash is already in the URL.
 */
export function useSectionNav() {
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()

  return useCallback(
    (event, id) => {
      event.preventDefault()
      if (id === 'top') {
        if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' })
        else navigate('/')
        return
      }
      if (pathname === '/' && hash === `#${id}`) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      navigate({ pathname: '/', hash: `#${id}` })
    },
    [pathname, hash, navigate],
  )
}
