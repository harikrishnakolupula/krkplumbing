import { useId } from 'react'
import { businessConfig } from '../config/businessConfig'

export function LogoMark({ className = 'size-10' }) {
  const gradientId = useId()
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#087BEA" />
          <stop offset="1" stopColor="#073B78" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="#EAF5FF" />
      <path d="M9 31 32 11l23 20" fill="none" stroke="#073B78" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 29v23a3 3 0 0 0 3 3h28a3 3 0 0 0 3-3V29" fill="none" stroke="#073B78" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 22c-4.6 6-8 10.3-8 15a8 8 0 0 0 16 0c0-4.7-3.4-9-8-15z" fill={`url(#${gradientId})`} />
      <path d="M26.5 38a4 4 0 0 0 3 3.8" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".8" />
      <g transform="translate(47 45) rotate(40)">
        <rect x="-3" y="-6" width="6" height="25" rx="3" fill="#FF8617" stroke="#EAF5FF" strokeWidth="1.5" />
        <path d="M-3.5 -15.19V-8H3.5V-15.19A8 8 0 1 1 -3.5 -15.19Z" fill="#FF8617" stroke="#EAF5FF" strokeWidth="1.5" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

/** Logo mark + wordmark. `light` is for navy backgrounds. */
export default function Logo({ light = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="size-10 shrink-0 sm:size-11" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-xl font-bold tracking-tight ${light ? 'text-white' : 'text-navy'}`}>KRK</span>
        <span className="font-display text-sm font-semibold tracking-wide text-accent">
          {businessConfig.businessName.replace('KRK ', '')}
        </span>
      </span>
    </span>
  )
}
