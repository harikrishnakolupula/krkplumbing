import { CalendarCheck, Clock, HeartHandshake, Wallet, Wrench } from 'lucide-react'
import { CallButton } from './ContactButtons'
import { useBooking } from '../context/BookingContext'
import { useSectionNav } from '../hooks/useSectionNav'

const trustItems = [
  { icon: Clock, label: 'Quick Response' },
  { icon: Wrench, label: 'Skilled Plumbers' },
  { icon: Wallet, label: 'Affordable Pricing' },
  { icon: HeartHandshake, label: 'Customer Support' },
]

export default function Hero() {
  const { openBooking } = useBooking()
  const goTo = useSectionNav()

  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-brand-dark text-white">
      <div className="container-page grid items-center gap-10 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:py-20">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-blue-100 ring-1 ring-white/20">
            <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
            Residential &amp; Commercial Plumbing
          </p>
          <h1 id="hero-heading" className="mt-5 text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-[3.5rem]">
            Professional Plumbing Services at <span className="text-accent">Your Doorstep</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-blue-100">
            Fast, Reliable and Affordable Plumbing Solutions for Your Home and Business.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={() => openBooking()} className="btn btn-accent">
              <CalendarCheck className="size-4" aria-hidden="true" />
              Book a Plumber
            </button>
            <CallButton className="btn btn-outline-light" />
            <a href="/#services" onClick={(event) => goTo(event, 'services')} className="btn btn-outline-light">
              Explore Services
            </a>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {trustItems.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5 rounded-2xl bg-white/10 px-3 py-3 ring-1 ring-white/15">
                <Icon className="size-5 shrink-0 text-accent" aria-hidden="true" />
                <span className="text-sm font-semibold">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <div className="absolute -inset-3 rounded-[2rem] bg-accent/90 [transform:rotate(3deg)]" aria-hidden="true" />
          <img
            src="/images/hero-plumber.webp"
            alt="Smiling KRK Plumbing plumber in a navy uniform and hard hat holding a pipe wrench in a modern bathroom"
            width="720"
            height="1280"
            fetchPriority="high"
            decoding="async"
            className="relative aspect-[4/5] w-full rounded-[2rem] object-cover object-top shadow-2xl"
          />
        </div>
      </div>
    </section>
  )
}
