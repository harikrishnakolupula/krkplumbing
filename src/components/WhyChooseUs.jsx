import { BadgeIndianRupee, CalendarCheck, Clock, Hammer, ShieldCheck, Wrench } from 'lucide-react'

const reasons = [
  { icon: Clock, title: 'Quick Response', text: 'We aim to respond to every request promptly, with emergency help when you need it most.' },
  { icon: ShieldCheck, title: 'Reliable Service', text: 'Clear communication and dependable visits, so you know what to expect.' },
  { icon: Wrench, title: 'Skilled Plumbers', text: 'Capable plumbers for repairs, fittings and installations of every size.' },
  { icon: BadgeIndianRupee, title: 'Affordable Pricing', text: 'Fair, upfront pricing discussed before the work begins.' },
  { icon: Hammer, title: 'Quality Workmanship', text: 'Neat, durable work that is built to last and leaves your space clean.' },
  { icon: CalendarCheck, title: 'Easy Booking', text: 'Book online, by phone or on WhatsApp, whichever is easiest for you.' },
]

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" aria-labelledby="why-heading" className="section-pad bg-navy text-white">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow !text-accent">Why Choose Us</span>
          <h2 id="why-heading" className="mt-2 text-3xl font-bold !text-white sm:text-4xl">
            Plumbing Done Right, Every Time
          </h2>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/15 transition-colors hover:bg-white/15">
              <span className="grid size-12 place-items-center rounded-2xl bg-accent text-navy-deep">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-bold !text-white">{title}</h3>
              <p className="mt-2 text-sm text-blue-100">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
