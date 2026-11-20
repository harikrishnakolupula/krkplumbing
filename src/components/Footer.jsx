import { Mail, MapPin, Phone } from 'lucide-react'
import Logo from './Logo'
import { WhatsAppButton } from './ContactButtons'
import { FacebookIcon, InstagramIcon, YouTubeIcon } from './icons'
import { navLinks } from './Navbar'
import { businessConfig } from '../config/businessConfig'
import { services } from '../data/services'
import { useBooking } from '../context/BookingContext'
import { useSectionNav } from '../hooks/useSectionNav'
import { getTelUrl } from '../utils/emailUtils'

const socials = [
  { key: 'facebook', label: 'Facebook', icon: FacebookIcon },
  { key: 'instagram', label: 'Instagram', icon: InstagramIcon },
  { key: 'youtube', label: 'YouTube', icon: YouTubeIcon },
]

export default function Footer() {
  const { openBooking } = useBooking()
  const goTo = useSectionNav()
  const { phone, email, address, social, businessName: name } = businessConfig
  const activeSocials = socials.filter((item) => social[item.key])

  return (
    <footer className="bg-navy-deep pb-24 text-blue-100 lg:pb-0">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 text-sm">
            Residential and commercial plumbing services you can trust. Fast, reliable and affordable solutions for your
            home and business.
          </p>
          {activeSocials.length > 0 && (
            <ul className="mt-4 flex gap-2">
              {activeSocials.map(({ key, label, icon: Icon }) => (
                <li key={key}>
                  <a
                    href={social[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (opens in a new tab)`}
                    className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent hover:text-navy-deep"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Footer quick links">
          <h2 className="text-base font-bold !text-white">Quick Links</h2>
          <ul className="mt-4 grid gap-1 text-sm">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.id === 'top' ? '/' : `/#${link.id}`}
                  onClick={(event) => goTo(event, link.id)}
                  className="inline-block py-1 hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button type="button" onClick={() => openBooking()} className="py-1 hover:text-accent">
                Book a Plumber
              </button>
            </li>
          </ul>
        </nav>

        <nav aria-label="Footer services">
          <h2 className="text-base font-bold !text-white">Our Services</h2>
          <ul className="mt-4 grid gap-1 text-sm">
            {services.map((service) => (
              <li key={service.id}>
                <button type="button" onClick={() => openBooking(service.id)} className="py-0.5 text-left hover:text-accent">
                  {service.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-base font-bold !text-white">Contact</h2>
          <ul className="mt-4 grid gap-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              {phone ? <a href={getTelUrl()} className="hover:text-accent">{phone}</a> : <span>Phone will be updated soon</span>}
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              {email ? <a href={`mailto:${email}`} className="break-all hover:text-accent">{email}</a> : <span>Email will be updated soon</span>}
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{address || 'Address will be updated soon'}</span>
            </li>
          </ul>
          <div className="mt-4">
            <WhatsAppButton className="btn btn-whatsapp !min-h-10 !text-sm" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="container-page py-5 text-center text-sm">
          &copy; {new Date().getFullYear()} {name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
