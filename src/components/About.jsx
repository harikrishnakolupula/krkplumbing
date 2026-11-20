import { Building2, CheckCircle2, Home, ThumbsUp, Timer, Wrench } from 'lucide-react'

const points = [
  { icon: Wrench, text: 'Professional plumbing solutions' },
  { icon: Home, text: 'Residential plumbing' },
  { icon: Building2, text: 'Commercial plumbing' },
  { icon: CheckCircle2, text: 'Quality workmanship' },
  { icon: ThumbsUp, text: 'Customer-focused assistance' },
  { icon: Timer, text: 'Timely service' },
]

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-pad bg-white">
      <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <div className="absolute -bottom-3 -left-3 size-2/3 rounded-3xl bg-accent/90" aria-hidden="true" />
          <img
            src="/images/about-team.webp"
            alt="KRK Plumbing plumbers reviewing a job together with a customer"
            width="960"
            height="720"
            loading="lazy"
            decoding="async"
            className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
          />
        </div>

        <div>
          <span className="eyebrow">About KRK Plumbing</span>
          <h2 id="about-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
            Your Trusted Plumbing Partner
          </h2>
          <p className="mt-4 text-muted">
            KRK Plumbing provides dependable plumbing solutions for homes and businesses. From a dripping tap to a full
            pipeline installation, we focus on neat workmanship, honest communication and showing up when we say we will.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {points.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 rounded-2xl bg-sky px-4 py-3">
                <Icon className="size-5 shrink-0 text-brand-dark" aria-hidden="true" />
                <span className="text-sm font-semibold text-navy">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
