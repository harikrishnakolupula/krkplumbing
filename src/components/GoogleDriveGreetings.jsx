import { useCallback, useMemo, useState } from 'react'
import FestivalBanner from './FestivalBanner'
import { useFestivalGreetings } from '../hooks/useFestivalGreetings'

const DISMISSED_KEY = 'krk-greeting-dismissed'

function readDismissed() {
  try {
    return window.localStorage.getItem(DISMISSED_KEY)
  } catch {
    return null
  }
}

/**
 * Shows owner-uploaded festival greetings from Google Drive, only while a
 * festival is active. Renders nothing on normal days or when Drive is
 * unavailable, so the regular homepage is never affected.
 */
export default function GoogleDriveGreetings() {
  const { slides, today } = useFestivalGreetings()
  const [failedIds, setFailedIds] = useState(() => new Set())
  const [dismissedSignature, setDismissedSignature] = useState(readDismissed)

  const visibleSlides = useMemo(() => slides.filter((slide) => !failedIds.has(slide.id)), [slides, failedIds])
  const signature = `${today}:${visibleSlides.map((slide) => slide.id).join(',')}`

  const handleImageError = useCallback((id) => setFailedIds((current) => new Set(current).add(id)), [])

  const handleClose = useCallback(() => {
    setDismissedSignature(signature)
    try {
      window.localStorage.setItem(DISMISSED_KEY, signature)
    } catch {
      /* the banner will simply return on the next visit */
    }
  }, [signature])

  if (visibleSlides.length === 0 || dismissedSignature === signature) return null

  return <FestivalBanner slides={visibleSlides} onClose={handleClose} onImageError={handleImageError} />
}
