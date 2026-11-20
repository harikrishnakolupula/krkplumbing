import { Info, Quote } from 'lucide-react'

const samples = [
  { quote: 'Sample feedback: describe how quickly the plumber arrived and how the problem was solved.', label: 'Sample customer, Home plumbing' },
  { quote: 'Sample feedback: share how neat the work was and whether the pricing was explained clearly.', label: 'Sample customer, Bathroom work' },
  { quote: 'Sample feedback: mention how easy booking was and how helpful the team was on the call.', label: 'Sample customer, Commercial space' },
]

export default function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="section-pad bg-sky">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Customer Feedback</span>
          <h2 id="testimonials-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
            What Our Customers Will Say
          </h2>
          <p className="mt-4 inline-flex items-start gap-2 rounded-2xl bg-white px-4 py-3 text-left text-sm text-muted ring-1 ring-line">
            <Info className="mt-0.5 size-4 shrink-0 text-brand-dark" aria-hidden="true" />
            Demonstration content only. These are placeholders, not real customer reviews. Genuine reviews will replace them once collected.
          </p>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {samples.map(({ quote, label }) => (
            <li key={label} className="rounded-3xl border border-dashed border-brand/40 bg-white p-6">
              <Quote className="size-8 text-accent" aria-hidden="true" />
              <p className="mt-3 text-ink">{quote}</p>
              <p className="mt-4 text-sm font-semibold text-navy">{label}</p>
              <p className="text-xs text-muted">Demonstration placeholder</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
