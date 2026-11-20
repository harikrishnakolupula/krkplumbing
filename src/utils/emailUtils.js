import { businessConfig } from '../config/businessConfig'

const { phone, whatsapp, email } = businessConfig

export const GENERAL_ENQUIRY_MESSAGE = 'Hello KRK Plumbing, I need plumbing service. Please contact me.'

/** `tel:` link for the business phone, or null when none is configured. */
export function getTelUrl() {
  if (!phone) return null
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

/** wa.me link for the business WhatsApp number, or null when none is configured. */
export function getWhatsAppUrl(message = GENERAL_ENQUIRY_MESSAGE) {
  if (!whatsapp) return null
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`
}

/** Plain `mailto:` link to the business email, or null when none is configured. */
export function getEmailUrl() {
  return email ? `mailto:${email}` : null
}

/** `mailto:` link with the subject and body prefilled for the customer's email app. */
export function buildMailtoUrl({ subject, body }) {
  if (!email) return null
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/** Everything the customer needs to paste into any email or chat app. */
export function buildCopyText({ subject, body }) {
  return [`To: ${email}`, `Subject: ${subject}`, '', body].join('\n')
}

/** Copies text to the clipboard. Resolves to true on success, false otherwise. */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    /* fall through to the legacy approach */
  }

  const area = document.createElement('textarea')
  area.value = text
  area.setAttribute('readonly', '')
  area.style.position = 'fixed'
  area.style.opacity = '0'
  document.body.appendChild(area)
  area.select()
  let copied = false
  try {
    copied = document.execCommand('copy')
  } catch {
    copied = false
  }
  document.body.removeChild(area)
  return copied
}
