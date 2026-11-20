import { CalendarCheck } from 'lucide-react'
import { services } from '../data/services'
import { useBooking } from '../context/BookingContext'

export default function Services() {
  const { openBooking } = useBooking()

  return (
    <section id="services" aria-labelledby="services-heading" className="section-pad bg-sky">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Our Services</span>
          <h2 id="services-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
            Plumbing Solutions for Every Need
          </h2>
          <p className="mt-4 text-muted">
            From a small leaking tap to complete pipeline installation, choose a service and book in less than a minute.
          </p>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ id, title, description, image, icon: Icon }) => (
            <li
              key={id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-line">
                <img
                  src={image}
                  alt={`${title} by KRK Plumbing`}
                  width="640"
                  height="400"
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-3 left-3 grid size-11 place-items-center rounded-2xl bg-white text-navy shadow-md">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{description}</p>
                <button
                  type="button"
                  onClick={() => openBooking(id)}
                  aria-label={`Book this service: ${title}`}
                  className="btn btn-accent mt-5 w-full"
                >
                  <CalendarCheck className="size-4" aria-hidden="true" />
                  Book This Service
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
