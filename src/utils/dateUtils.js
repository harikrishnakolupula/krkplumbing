export const TIMEZONE = 'Asia/Kolkata'

/** Current calendar date in India as YYYY-MM-DD. */
export function todayInIST(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
}

/** Human readable date and time in India, e.g. "7 Nov 2026, 5:30 pm IST". */
export function formatIST(now = new Date()) {
  const text = new Intl.DateTimeFormat('en-IN', {
    timeZone: TIMEZONE,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(now)
  return `${text} IST`
}

/** "2026-11-07" -> "7 Nov 2026". */
export function formatISODate(iso) {
  if (!iso) return ''
  const [year, month, day] = iso.split('-').map(Number)
  if (!year || !month || !day) return iso
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'UTC',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(Date.UTC(year, month - 1, day)))
}

function isRealDate(year, month, day) {
  const date = new Date(Date.UTC(year, month - 1, day))
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
}

const pad = (n) => String(n).padStart(2, '0')

/**
 * Accepts YYYY-MM-DD, YYYY/MM/DD, DD-MM-YYYY and DD/MM/YYYY (the formats most
 * people type in a spreadsheet). Returns YYYY-MM-DD or null when invalid.
 */
export function normalizeDate(input) {
  const text = String(input ?? '').trim()
  if (!text) return null

  let match = text.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/)
  if (match) {
    const [year, month, day] = [Number(match[1]), Number(match[2]), Number(match[3])]
    return isRealDate(year, month, day) ? `${year}-${pad(month)}-${pad(day)}` : null
  }

  match = text.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/)
  if (match) {
    const [day, month, year] = [Number(match[1]), Number(match[2]), Number(match[3])]
    return isRealDate(year, month, day) ? `${year}-${pad(month)}-${pad(day)}` : null
  }
  return null
}
