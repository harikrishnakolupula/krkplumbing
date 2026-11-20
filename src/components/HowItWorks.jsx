import { ClipboardList, MailCheck, MousePointerClick, Wrench } from 'lucide-react'

const steps = [
  { icon: MousePointerClick, title: 'Select Your Plumbing Service', text: 'Pick the service you need from our list.' },
  { icon: ClipboardList, title: 'Submit Your Booking Details', text: 'Share your problem, address and preferred time.' },
  { icon: MailCheck, title: 'Receive Email Acknowledgement and Callback', text: 'Our team reviews your request and calls you.' },
  { icon: Wrench, title: 'Get Your Plumbing Service After Confirmation', text: 'Once the appointment is confirmed, we get to work.' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="section-pad bg-white">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">How It Works</span>
          <h2 id="how-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
            Four Simple Steps to a Fixed Problem
          </h2>
        </div>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <li key={title} className="relative rounded-3xl border border-line bg-sky p-6">
              <span className="absolute -top-4 left-6 grid size-9 place-items-center rounded-full bg-accent font-display text-base font-bold text-navy-deep">
                <span className="sr-only">Step </span>
                {index + 1}
              </span>
              <Icon className="mt-2 size-9 text-brand-dark" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm text-muted">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
