import { useId } from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

const controlClass =
  'block w-full rounded-xl border bg-white px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30'

function Shell({ label, required, error, hint, id, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy">
        {label}
        {required ? (
          <span className="text-accent-dark" aria-hidden="true">
            {' '}
            *
          </span>
        ) : (
          <span className="font-normal text-muted"> (optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 flex items-start gap-1 text-sm font-medium text-red-700">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

function ariaFor(id, error, hint) {
  return {
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': error ? `${id}-error` : hint ? `${id}-hint` : undefined,
  }
}

export function TextField({ label, required, error, hint, ...props }) {
  const id = useId()
  return (
    <Shell label={label} required={required} error={error} hint={hint} id={id}>
      <input
        id={id}
        required={false}
        {...ariaFor(id, error, hint)}
        {...props}
        className={`${controlClass} ${error ? 'border-red-500' : 'border-line'}`}
      />
    </Shell>
  )
}

export function TextAreaField({ label, required, error, hint, rows = 3, ...props }) {
  const id = useId()
  return (
    <Shell label={label} required={required} error={error} hint={hint} id={id}>
      <textarea
        id={id}
        rows={rows}
        {...ariaFor(id, error, hint)}
        {...props}
        className={`${controlClass} resize-y ${error ? 'border-red-500' : 'border-line'}`}
      />
    </Shell>
  )
}

export function SelectField({ label, required, error, hint, placeholder, options, ...props }) {
  const id = useId()
  return (
    <Shell label={label} required={required} error={error} hint={hint} id={id}>
      <select
        id={id}
        {...ariaFor(id, error, hint)}
        {...props}
        className={`${controlClass} ${error ? 'border-red-500' : 'border-line'}`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => {
          const item = typeof option === 'string' ? { value: option, label: option } : option
          return (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          )
        })}
      </select>
    </Shell>
  )
}

export function FormError({ message }) {
  if (!message) return null
  return (
    <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-800">
      <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <p>{message}</p>
    </div>
  )
}

export function SuccessPanel({ title = 'Request submitted', message, reference, children }) {
  return (
    <div role="status" className="rounded-2xl border border-green-300 bg-green-50 p-5 text-center">
      <CheckCircle2 className="mx-auto size-12 text-whatsapp" aria-hidden="true" />
      <h3 className="mt-3 text-xl font-bold text-navy">{title}</h3>
      <p className="mt-2 text-ink">{message}</p>
      {reference && (
        <p className="mt-3 text-sm text-muted">
          Reference number: <span className="font-mono font-semibold text-navy">{reference}</span>
        </p>
      )}
      {children}
    </div>
  )
}
