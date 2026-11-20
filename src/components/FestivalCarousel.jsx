import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { driveImageUrl } from '../utils/googleDriveUtils'
import { businessConfig } from '../config/businessConfig'

const AUTOPLAY_MS = 6000

export default function FestivalCarousel({ slides, index, onIndexChange, onImageError }) {
  const [paused, setPaused] = useState(false)
  const count = slides.length
  const multiple = count > 1

  useEffect(() => {
    if (!multiple || paused) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const timer = window.setTimeout(() => onIndexChange((index + 1) % count), AUTOPLAY_MS)
    return () => window.clearTimeout(timer)
  }, [multiple, paused, index, count, onIndexChange])

  const slide = slides[index]
  if (!slide) return null

  const go = (delta) => onIndexChange((index + delta + count) % count)

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Festival greetings"
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="flex min-h-64 items-center justify-center overflow-hidden rounded-2xl bg-white/10 p-2 ring-1 ring-white/20">
        <img
          key={slide.id}
          src={driveImageUrl(slide.id)}
          alt={`${slide.festivalName} greeting from ${businessConfig.businessName}`}
          referrerPolicy="no-referrer"
          onError={() => onImageError(slide.id)}
          className="max-h-[26rem] w-auto max-w-full rounded-xl object-contain"
        />
      </div>

      {multiple && (
        <div className="mt-3 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous greeting"
            className="grid size-11 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <div className="flex items-center gap-1" role="tablist" aria-label="Choose greeting">
            {slides.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show greeting ${i + 1} of ${count}`}
                onClick={() => onIndexChange(i)}
                className="grid size-8 place-items-center"
              >
                <span className={`block h-2.5 rounded-full transition-all ${i === index ? 'w-6 bg-accent' : 'w-2.5 bg-white/50'}`} />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next greeting"
            className="grid size-11 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}
