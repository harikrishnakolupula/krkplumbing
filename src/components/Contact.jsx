import { useState } from 'react'
import { ClipboardList, Clock, Globe, Mail, MapPin, MapPinned, Phone } from 'lucide-react'
import { businessConfig } from '../config/businessConfig'
import { CallButton, EmailButton, WhatsAppButton } from './ContactButtons'
import CallbackForm from './CallbackForm'
import RequestReview from './RequestReview'
import { TextAreaField, TextField } from './FormFields'
import { WhatsAppIcon } from './icons'
import { useRequestForm } from '../hooks/useRequestForm'
import { buildContactRequest } from '../utils/bookingUtils'
import { getTelUrl } from '../utils/emailUtils'
import { validateContact } from '../utils/validators'

const PENDING = 'Will be updated soon'
const contactInitialValues = { name: '', mobile: '', email: '', message: '' }

function InfoRow({ icon: Icon, label, children }) {
  return (
    <li className="flex items-start gap-4 rounded-2xl border border-line bg-white p-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-sky text-brand-dark">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-navy">{label}</p>
        <div className="text-sm break-words text-muted">{children}</div>
      </div>
    </li>
  )
}

function ContactMessageForm() {
  const { values, errors, request, handleChange, handleSubmit, edit, reset } = useRequestForm({
    initialValues: contactInitialValues,
    validate: validateContact,
    build: buildContactRequest,
  })

  if (request) {
    return <RequestReview request={request} onEdit={edit} onReset={reset} resetLabel="Write another message" />
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Your Name" required name="name" value={values.name} onChange={handleChange} error={errors.name} autoComplete="name" />
        <TextField label="Mobile Number" required name="mobile" type="tel" inputMode="tel" value={values.mobile} onChange={handleChange} error={errors.mobile} autoComplete="tel" placeholder="98765 43210" />
      </div>
      <TextField label="Email Address" name="email" type="email" value={values.email} onChange={handleChange} error={errors.email} autoComplete="email" />
      <TextAreaField label="Message" required rows={4} name="message" value={values.message} onChange={handleChange} error={errors.message} placeholder="How can we help?" />
      <button type="submit" className="btn btn-primary w-full">
        <ClipboardList className="size-4" aria-hidden="true" />
        Review Message
      </button>
    </form>
  )
}

export default function Contact() {
  const [tab, setTab] = useState('callback')
  const { businessName, domain, phone, whatsapp, email, address, serviceAreas, workingHours, mapsEmbedUrl } = businessConfig

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section-pad bg-sky">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Contact Us</span>
          <h2 id="contact-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
            Talk to {businessName}
          </h2>
          <p className="mt-4 text-muted">Call, email, message on WhatsApp, or prepare an email with your details and send it from your own email app.</p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <ul className="grid gap-3">
              <InfoRow icon={Phone} label="Phone">
                {phone ? <a href={getTelUrl()} className="font-semibold text-brand-dark underline">{phone}</a> : PENDING}
              </InfoRow>
              <InfoRow icon={WhatsAppIcon} label="WhatsApp">
                {whatsapp ? (
                  <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-dark underline">
                    +{whatsapp}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  PENDING
                )}
              </InfoRow>
              <InfoRow icon={Mail} label="Email">
                {email ? <a href={`mailto:${email}`} className="font-semibold text-brand-dark underline">{email}</a> : PENDING}
              </InfoRow>
              <InfoRow icon={Globe} label="Website">
                <a href={domain} className="font-semibold text-brand-dark underline">{domain.replace(/^https?:\/\//, '')}</a>
              </InfoRow>
              <InfoRow icon={MapPin} label="Address">
                {address || PENDING}
              </InfoRow>
              <InfoRow icon={MapPinned} label="Service Locations">
                {serviceAreas.length > 0 ? serviceAreas.join(', ') : PENDING}
              </InfoRow>
              <InfoRow icon={Clock} label="Working Hours">
                {workingHours || PENDING}
              </InfoRow>
            </ul>

            <div className="flex flex-wrap gap-3">
              <CallButton className="btn btn-primary" />
              <EmailButton />
              <WhatsAppButton />
            </div>

            <div className="overflow-hidden rounded-3xl border border-line bg-white">
              {mapsEmbedUrl ? (
                <iframe
                  title={`${businessName} location on Google Maps`}
                  src={mapsEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-64 w-full border-0"
                />
              ) : (
                <div className="flex h-48 flex-col items-center justify-center gap-2 p-6 text-center">
                  <MapPin className="size-8 text-brand-dark" aria-hidden="true" />
                  <p className="text-sm text-muted">Google Maps will appear here once the business location is added.</p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-white p-5 shadow-sm sm:p-7">
            <div role="tablist" aria-label="Contact options" className="mb-6 grid grid-cols-2 gap-1 rounded-full bg-sky p-1">
              {[
                { id: 'callback', label: 'Request a Callback' },
                { id: 'message', label: 'Send a Message' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`tab-${item.id}`}
                  aria-selected={tab === item.id}
                  aria-controls={`panel-${item.id}`}
                  onClick={() => setTab(item.id)}
                  className={`min-h-11 rounded-full px-3 text-sm font-semibold transition-colors ${
                    tab === item.id ? 'bg-navy text-white shadow' : 'text-navy hover:bg-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
              {tab === 'callback' ? <CallbackForm /> : <ContactMessageForm />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
