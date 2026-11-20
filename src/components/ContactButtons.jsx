import { Mail, Phone } from 'lucide-react'
import { WhatsAppIcon } from './icons'
import { getEmailUrl, getTelUrl, getWhatsAppUrl } from '../utils/emailUtils'

/** Renders nothing until a business phone number is configured. */
export function CallButton({ className = 'btn btn-outline', children = 'Call Now', ...rest }) {
  const href = getTelUrl()
  if (!href) return null
  return (
    <a href={href} className={className} {...rest}>
      <Phone className="size-4" aria-hidden="true" />
      {children}
    </a>
  )
}

/** Renders nothing until a business WhatsApp number is configured. */
export function WhatsAppButton({ message, className = 'btn btn-whatsapp', children = 'WhatsApp Us', ...rest }) {
  const href = getWhatsAppUrl(message)
  if (!href) return null
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
      <WhatsAppIcon className="size-4" />
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

/** Renders nothing until a business email is configured. */
export function EmailButton({ className = 'btn btn-outline', children = 'Email Us', ...rest }) {
  const href = getEmailUrl()
  if (!href) return null
  return (
    <a href={href} className={className} {...rest}>
      <Mail className="size-4" aria-hidden="true" />
      {children}
    </a>
  )
}
