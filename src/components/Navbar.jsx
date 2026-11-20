import { useEffect, useState } from 'react'
import { CalendarCheck, Menu, X } from 'lucide-react'
import Logo from './Logo'
import { CallButton, WhatsAppButton } from './ContactButtons'
import { useBooking } from '../context/BookingContext'
import { useSectionNav } from '../hooks/useSectionNav'

export const navLinks = [
  { id: 'top', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About Us' },
  { id: 'why-choose-us', label: 'Why Choose Us' },
  { id: 'contact', label: 'Contact Us' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { openBooking } = useBooking()
  const goTo = useSectionNav()

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const handleNav = (event, id) => {
    setOpen(false)
    goTo(event, id)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-3 lg:h-[4.5rem]">
        <a href="/" onClick={(event) => handleNav(event, 'top')} aria-label="KRK Plumbing home" className="rounded-lg">
          <Logo />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.id === 'top' ? '/' : `/#${link.id}`}
              onClick={(event) => handleNav(event, link.id)}
              className="rounded-full px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-sky hover:text-navy"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <WhatsAppButton className="btn btn-whatsapp !min-h-10 !px-4 !py-2 !text-sm" aria-label="Chat on WhatsApp">
            WhatsApp
          </WhatsAppButton>
          <CallButton className="btn btn-outline !min-h-10 !px-4 !py-2 !text-sm" />
          <button type="button" onClick={() => openBooking()} className="btn btn-accent !min-h-10 !px-4 !py-2 !text-sm">
            <CalendarCheck className="size-4" aria-hidden="true" />
            Book a Plumber
          </button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="grid size-11 place-items-center rounded-xl border border-line text-navy lg:hidden"
        >
          {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-white lg:hidden">
          <nav aria-label="Mobile" className="container-page flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.id === 'top' ? '/' : `/#${link.id}`}
                onClick={(event) => handleNav(event, link.id)}
                className="rounded-xl px-4 py-3 text-base font-semibold text-ink hover:bg-sky"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 grid gap-2">
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  openBooking()
                }}
                className="btn btn-accent w-full"
              >
                <CalendarCheck className="size-4" aria-hidden="true" />
                Book a Plumber
              </button>
              <CallButton className="btn btn-outline w-full" />
              <WhatsAppButton className="btn btn-whatsapp w-full" />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
