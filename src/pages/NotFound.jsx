import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Home, Wrench } from 'lucide-react'
import { useBooking } from '../context/BookingContext'

export default function NotFound() {
  const { openBooking } = useBooking()

  useEffect(() => {
    const previous = document.title
    document.title = 'Page Not Found | KRK Plumbing'
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <section className="section-pad bg-sky" aria-labelledby="not-found-heading">
      <div className="container-page flex flex-col items-center text-center">
        <Wrench className="size-14 text-accent" aria-hidden="true" />
        <p className="mt-4 font-display text-6xl font-bold text-brand-dark">404</p>
        <h1 id="not-found-heading" className="mt-2 text-3xl font-bold">
          This page has sprung a leak
        </h1>
        <p className="mt-3 max-w-md text-muted">We could not find the page you are looking for. It may have moved or never existed.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn btn-primary">
            <Home className="size-4" aria-hidden="true" />
            Back to Home
          </Link>
          <button type="button" onClick={() => openBooking()} className="btn btn-accent">
            Book a Plumber
          </button>
        </div>
      </div>
    </section>
  )
}
