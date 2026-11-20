import { useEffect, useRef, useState } from 'react'
import { Check, Copy, Info, Mail, PencilLine } from 'lucide-react'
import { businessConfig } from '../config/businessConfig'
import { copyToClipboard, getTelUrl } from '../utils/emailUtils'

/**
 * Summary shown before anything is sent. The site has no backend, so the
 * request only reaches KRK Plumbing when the customer presses Send in their
 * own email app. The copy never claims the request was sent or confirmed.
 */
export default function RequestReview({ request, onEdit, onReset, resetLabel = 'Start a new request', children }) {
  const headingRef = useRef(null)
  const [copyState, setCopyState] = useState('idle')
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  const handleCopy = async () => {
    const ok = await copyToClipboard(request.copyText)
    setCopyState(ok ? 'copied' : 'failed')
    window.setTimeout(() => setCopyState('idle'), 3000)
  }

  const tel = getTelUrl()

  return (
    <div className="grid gap-5">
      <div>
        <h3 ref={headingRef} tabIndex={-1} className="text-xl font-bold text-navy outline-none">
          Review Your {request.title}
        </h3>
        <p className="mt-1 text-sm text-muted">
          Reference: <span className="font-mono font-semibold text-navy">{request.reference}</span>
        </p>
      </div>

      <p role="status" className="flex items-start gap-3 rounded-2xl bg-sky p-4 text-sm text-navy ring-1 ring-brand/30">
        <Info className="mt-0.5 size-5 shrink-0 text-brand-dark" aria-hidden="true" />
        {request.readyMessage}
      </p>

      <dl className="divide-y divide-line rounded-2xl border border-line bg-white">
        {request.summary.map(([label, value]) => (
          <div key={label} className="grid gap-1 px-4 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4">
            <dt className="text-sm font-semibold text-navy">{label}</dt>
            <dd className="text-sm break-words whitespace-pre-line text-ink">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-col gap-3 sm:flex-row">
        {request.mailtoUrl && (
          <a href={request.mailtoUrl} onClick={() => setOpened(true)} className="btn btn-accent flex-1">
            <Mail className="size-4" aria-hidden="true" />
            Send Through Email
          </a>
        )}
        <button type="button" onClick={handleCopy} className="btn btn-outline flex-1">
          {copyState === 'copied' ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
          {copyState === 'copied' ? 'Copied' : 'Copy Details'}
        </button>
        <button type="button" onClick={onEdit} className="btn btn-outline flex-1">
          <PencilLine className="size-4" aria-hidden="true" />
          Edit Details
        </button>
      </div>

      <p aria-live="polite" className="text-sm text-muted">
        {copyState === 'failed' && 'Copying was blocked by your browser. Please select the details above and copy them manually.'}
        {copyState !== 'failed' && opened && (
          <>
            If your email application did not open, copy the details and email them to{' '}
            <a href={`mailto:${businessConfig.email}`} className="font-semibold text-brand-dark underline">
              {businessConfig.email}
            </a>
            {tel && (
              <>
                , or{' '}
                <a href={tel} className="font-semibold text-brand-dark underline">
                  call us
                </a>
              </>
            )}
            .
          </>
        )}
      </p>

      <p className="rounded-2xl bg-sky/70 p-3 text-xs text-muted">
        This website does not send or store your request. KRK Plumbing receives it only after you press Send in your
        email application, and a request does not confirm an appointment until our team contacts you.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {children}
        <button type="button" onClick={onReset} className="text-sm font-semibold text-brand-dark underline underline-offset-2">
          {resetLabel}
        </button>
      </div>
    </div>
  )
}
