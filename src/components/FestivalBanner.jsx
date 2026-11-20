import { useState } from 'react'
import { X } from 'lucide-react'
import FestivalCarousel from './FestivalCarousel'
import Logo from './Logo'
import { WhatsAppIcon } from './icons'
import { businessConfig } from '../config/businessConfig'
import { driveViewUrl } from '../utils/googleDriveUtils'

export default function FestivalBanner({ slides, onClose, onImageError }) {
  const [index, setIndex] = useState(0)
  const safeIndex = Math.min(index, slides.length - 1)
  const current = slides[safeIndex]

  const festivalNames = [...new Set(slides.map((slide) => slide.festivalName))]
  const heading = festivalNames.length === 1 ? `${festivalNames[0]} Greetings` : 'Festival Greetings'

  const shareMessage = `${current.festivalName} greetings from ${businessConfig.businessName}!\n${driveViewUrl(current.id)}\n${businessConfig.domain}`
  const shareUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`

  return (
    <section aria-labelledby="festival-heading" className="relative bg-gradient-to-br from-navy-deep via-navy to-brand-dark text-white">
      <div className="container-page grid items-center gap-6 py-8 md:grid-cols-[1fr_1.1fr] md:gap-10 lg:py-10">
        <div>
          <Logo light />
          <h2 id="festival-heading" className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-3 max-w-md text-blue-100">
            Warm wishes from all of us at {businessConfig.businessName} to you and your family.
          </p>
          <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp mt-5"
          >
            <WhatsAppIcon className="size-4" />
            Share Greeting on WhatsApp
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        <FestivalCarousel slides={slides} index={safeIndex} onIndexChange={setIndex} onImageError={onImageError} />
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close festival greeting"
        className="absolute top-3 right-3 grid size-11 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30"
      >
        <X className="size-5" aria-hidden="true" />
      </button>
    </section>
  )
}
