import { businessConfig } from '../config/businessConfig'
import { normalizeDate, todayInIST } from './dateUtils'

const DRIVE_FILES_URL = 'https://drive.google.com/file/d/1pdjcuZJpuS-KCIar3J7cYW9SdWIm_KHU/view?usp=drivesdk'

/**
 * Greeting images are named `festival-name__YYYY-MM-DD__YYYY-MM-DD.jpg`:
 * the first date is the first day the greeting shows, the second date is the
 * last day (both inclusive, Asia/Kolkata). JPG, JPEG, PNG and WebP are supported.
 */
const FILENAME_PATTERN = /^(.+?)__(\d{4}-\d{2}-\d{2})__(\d{4}-\d{2}-\d{2})\.(?:jpe?g|png|webp)$/i

export const isDriveConfigured = Boolean(businessConfig.googleDriveFolderId && businessConfig.googleDriveApiKey)

function prettifyName(raw) {
  return raw
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\b\p{L}/gu, (letter) => letter.toUpperCase())
}

/** Returns { festivalName, startDate, endDate } or null when the name does not follow the format. */
export function parseFestivalFilename(fileName) {
  const match = String(fileName ?? '').trim().match(FILENAME_PATTERN)
  if (!match) return null

  const startDate = normalizeDate(match[2])
  const endDate = normalizeDate(match[3])
  if (!startDate || !endDate || startDate > endDate) return null

  const festivalName = prettifyName(match[1])
  if (!festivalName) return null
  return { festivalName, startDate, endDate }
}

/** Public, embeddable URL for an image shared as "Anyone with the link can view". */
export function driveImageUrl(fileId, width = 1400) {
  return `https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w${width}`
}

export function driveViewUrl(fileId) {
  return `https://drive.google.com/file/d/${encodeURIComponent(fileId)}/view`
}

/** Lists the image files in the shared greetings folder (read-only Drive API). */
export async function listGreetingFiles(signal) {
  const { googleDriveFolderId: folderId, googleDriveApiKey: apiKey } = businessConfig
  if (!folderId || !apiKey) return []

  const files = []
  let pageToken = ''
  do {
    const params = new URLSearchParams({
      q: `'${folderId}' in parents and trashed = false and mimeType contains 'image/'`,
      fields: 'nextPageToken, files(id, name, mimeType)',
      pageSize: '200',
      key: apiKey,
    })
    if (pageToken) params.set('pageToken', pageToken)

    const response = await fetch(`${DRIVE_FILES_URL}?${params}`, { signal })
    if (!response.ok) throw new Error(`Google Drive request failed (${response.status})`)
    const data = await response.json()
    files.push(...(data.files ?? []))
    pageToken = data.nextPageToken ?? ''
  } while (pageToken)

  return files
}

/** Greetings whose date range includes today (India time), earliest start first. */
export function getActiveSlides(files, now = new Date()) {
  const today = todayInIST(now)
  return (files ?? [])
    .map((file) => {
      const parsed = parseFestivalFilename(file.name)
      return parsed ? { id: file.id, imageName: file.name, ...parsed } : null
    })
    .filter((slide) => slide && slide.startDate <= today && today <= slide.endDate)
    .sort((a, b) => a.startDate.localeCompare(b.startDate) || a.festivalName.localeCompare(b.festivalName))
}
