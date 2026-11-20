import { CalendarCheck, Phone } from 'lucide-react'
import { WhatsAppIcon } from './icons'
import { useBooking } from '../context/BookingContext'
import { getTelUrl, getWhatsAppUrl } from '../utils/emailUtils'

/**
 * Mobile: a full-width bottom bar (the footer reserves matching space so no
 * content is covered). Desktop: compact buttons in the bottom-right corner.
 */
export default function FloatingButtons() {
  const { openBooking, open } = useBooking()
  const tel = getTelUrl()
  const whatsapp = getWhatsAppUrl()

  if (open) return null

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 p-2 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-md gap-1.5 min-[360px]:gap-2">
          {tel && (
            <a href={tel} className="btn btn-primary flex-1 !gap-1.5 !px-2 whitespace-nowrap min-[360px]:!px-3">
              <Phone className="hidden size-4 shrink-0 min-[360px]:block" aria-hidden="true" />
              Call
            </a>
          )}
          <button
            type="button"
            onClick={() => openBooking()}
            className="btn btn-accent flex-[1.3] !gap-1.5 !px-2 whitespace-nowrap min-[360px]:!px-3"
          >
            <CalendarCheck className="hidden size-4 shrink-0 min-[360px]:block" aria-hidden="true" />
            Book Now
          </button>
          {whatsapp && (
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp flex-[1.2] !gap-1.5 !px-2 whitespace-nowrap min-[360px]:!px-3"
            >
              <WhatsAppIcon className="hidden size-4 shrink-0 min-[360px]:block" />
              WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>

      <div className="fixed right-5 bottom-5 z-40 hidden flex-col items-end gap-3 lg:flex">
        {whatsapp && (
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp (opens in a new tab)"
            className="grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-lg transition-transform hover:scale-105"
          >
            <WhatsAppIcon className="size-7" />
          </a>
        )}
        {tel && (
          <a
            href={tel}
            aria-label="Call now"
            className="grid size-14 place-items-center rounded-full bg-navy text-white shadow-lg transition-transform hover:scale-105"
          >
            <Phone className="size-6" aria-hidden="true" />
          </a>
        )}
        <button type="button" onClick={() => openBooking()} className="btn btn-accent !px-5 shadow-lg">
          <CalendarCheck className="size-4" aria-hidden="true" />
          Book Now
        </button>
      </div>
    </>
  )
}
