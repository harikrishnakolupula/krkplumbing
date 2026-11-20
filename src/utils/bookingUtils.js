import { businessConfig } from '../config/businessConfig'
import { buildMailtoUrl, buildCopyText } from './emailUtils'
import { formatIST } from './dateUtils'
import { normalizeIndianMobile } from './validators'

const { businessName } = businessConfig
const NOT_PROVIDED = 'Not provided'

const orNotProvided = (value) => (String(value ?? '').trim() ? String(value).trim() : NOT_PROVIDED)

/** Local reference such as KRK-20261107-A9F2. It is not stored anywhere. */
export function makeReference(prefix = 'KRK') {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const random = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `${prefix}-${date}-${random}`
}

function assemble({ kind, title, heading, reference, subject, details, readyMessage }) {
  const summary = details.map(([label, value]) => [label, orNotProvided(value)])
  const body = [
    `${heading} - ${businessName.toUpperCase()}`,
    `Reference: ${reference}`,
    `Prepared: ${formatIST()}`,
    '',
    ...summary.map(([label, value]) => `${label}: ${value}`),
    '',
    `Sent from ${businessConfig.domain}`,
  ].join('\n')

  const request = { kind, title, reference, subject, body, summary, readyMessage }
  return { ...request, mailtoUrl: buildMailtoUrl(request), copyText: buildCopyText(request) }
}

export function buildBookingRequest(values, serviceLabel) {
  const reference = makeReference('KRK')
  const mobile = normalizeIndianMobile(values.mobile)
  return assemble({
    kind: 'booking',
    title: 'Booking Request',
    heading: 'NEW PLUMBING BOOKING REQUEST',
    reference,
    subject: `NEW PLUMBING BOOKING ${reference} - ${serviceLabel} - ${values.name.trim()} - ${mobile}`,
    readyMessage:
      'Your booking details are ready. Your email application will open. Please press Send to send your booking request to KRK Plumbing.',
    details: [
      ['Booking reference', reference],
      ['Customer name', values.name],
      ['Mobile number', mobile],
      ['Email address', values.email],
      ['Selected service', serviceLabel],
      ['Problem description', values.problem],
      ['Address', values.address],
      ['Preferred date', values.date],
      ['Preferred time', values.time],
    ],
  })
}

export function buildCallbackRequest(values, serviceLabel) {
  const reference = makeReference('CB')
  const mobile = normalizeIndianMobile(values.mobile)
  return assemble({
    kind: 'callback',
    title: 'Callback Request',
    heading: 'NEW CALLBACK REQUEST',
    reference,
    subject: `NEW CALLBACK REQUEST ${reference} - ${serviceLabel} - ${values.name.trim()} - ${mobile}`,
    readyMessage:
      'Your callback details are ready. Your email application will open. Please press Send to send your callback request to KRK Plumbing.',
    details: [
      ['Callback reference', reference],
      ['Customer name', values.name],
      ['Mobile number', mobile],
      ['Required service', serviceLabel],
      ['Preferred callback time', values.callbackTime],
      ['Problem description', values.problem],
    ],
  })
}

export function buildContactRequest(values) {
  const reference = makeReference('MSG')
  const mobile = normalizeIndianMobile(values.mobile)
  return assemble({
    kind: 'contact',
    title: 'Message',
    heading: 'NEW CONTACT MESSAGE',
    reference,
    subject: `NEW CONTACT MESSAGE ${reference} - ${values.name.trim()} - ${mobile}`,
    readyMessage:
      'Your message is ready. Your email application will open. Please press Send to send your message to KRK Plumbing.',
    details: [
      ['Message reference', reference],
      ['Name', values.name],
      ['Mobile number', mobile],
      ['Email address', values.email],
      ['Message', values.message],
    ],
  })
}
