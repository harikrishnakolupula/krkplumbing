import { useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'
import { businessConfig } from '../config/businessConfig'
import { getActiveSlides, isDriveConfigured, listGreetingFiles } from '../utils/googleDriveUtils'
import { todayInIST } from '../utils/dateUtils'

const REFRESH_MS = Math.max(1, Number(businessConfig.greetingRefreshMinutes) || 10) * 60 * 1000

/**
 * The Drive file list is refetched on an interval (and when the tab regains
 * focus), and the active window is re-evaluated every minute so a greeting
 * appears or disappears at midnight India time without a page reload.
 * When Drive is not configured or unavailable, no slides are returned.
 */
export function useFestivalGreetings() {
  const { data } = useSWR(isDriveConfigured ? 'festival-greetings' : null, () => listGreetingFiles(), {
    refreshInterval: REFRESH_MS,
    revalidateOnFocus: true,
    shouldRetryOnError: true,
    errorRetryCount: 3,
    dedupingInterval: 60 * 1000,
  })

  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60 * 1000)
    return () => window.clearInterval(timer)
  }, [])

  const today = todayInIST(now)

  return useMemo(() => {
    if (!data) return { slides: [], today }
    return { slides: getActiveSlides(data, now), today }
    // `now` only matters through `today`; recompute when the IST date changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, today])
}
