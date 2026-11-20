import { useMemo } from 'react'
import { ClipboardList } from 'lucide-react'
import Dialog from './Dialog'
import RequestReview from './RequestReview'
import { SelectField, TextAreaField, TextField } from './FormFields'
import { useBooking } from '../context/BookingContext'
import { useRequestForm } from '../hooks/useRequestForm'
import { getServiceLabel, services, timeSlots } from '../data/services'
import { buildBookingRequest } from '../utils/bookingUtils'
import { validateBooking } from '../utils/validators'
import { todayInIST } from '../utils/dateUtils'

const serviceOptions = services.map(({ id, title }) => ({ value: id, label: title }))
const build = (values) => buildBookingRequest(values, getServiceLabel(values.service))

function BookingForm({ initialService, onClose }) {
  const today = todayInIST()
  const initialValues = useMemo(
    () => ({ name: '', mobile: '', email: '', service: initialService, problem: '', address: '', date: '', time: '' }),
    [initialService],
  )
  const validate = useMemo(() => (values) => validateBooking(values, today), [today])

  const { values, errors, request, handleChange, handleSubmit, edit, reset } = useRequestForm({
    initialValues,
    validate,
    build,
  })

  if (request) {
    return (
      <RequestReview request={request} onEdit={edit} onReset={reset} resetLabel="Make another booking request">
        <button type="button" onClick={onClose} className="btn btn-outline !min-h-10 !text-sm">
          Close
        </button>
      </RequestReview>
    )
  }

  return (
    <form id="booking-form" onSubmit={handleSubmit} noValidate className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Full Name" required name="name" value={values.name} onChange={handleChange} error={errors.name} autoComplete="name" placeholder="Your full name" />
        <TextField label="Mobile Number" required name="mobile" type="tel" inputMode="tel" value={values.mobile} onChange={handleChange} error={errors.mobile} autoComplete="tel" placeholder="98765 43210" />
      </div>
      <TextField label="Email Address" name="email" type="email" value={values.email} onChange={handleChange} error={errors.email} autoComplete="email" placeholder="you@example.com" />
      <SelectField label="Select Service" required name="service" value={values.service} onChange={handleChange} error={errors.service} placeholder="Select a service" options={serviceOptions} />
      <TextAreaField label="Problem Description" required name="problem" value={values.problem} onChange={handleChange} error={errors.problem} placeholder="For example: water is leaking from the kitchen pipe under the sink" />
      <TextAreaField label="Complete Address" required name="address" rows={2} value={values.address} onChange={handleChange} error={errors.address} autoComplete="street-address" placeholder="House no., street, area, landmark, city" />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Preferred Date" name="date" type="date" min={today} value={values.date} onChange={handleChange} error={errors.date} />
        <SelectField label="Preferred Time" name="time" value={values.time} onChange={handleChange} placeholder="Any time" options={timeSlots} />
      </div>

      <button type="submit" className="btn btn-accent w-full">
        <ClipboardList className="size-4" aria-hidden="true" />
        Review Booking Summary
      </button>
      <p className="text-center text-xs text-muted">
        You will see a summary first. Your request is sent from your own email application, so it is not submitted until you press Send there.
      </p>
    </form>
  )
}

export default function BookingModal() {
  const { open, service, session, closeBooking } = useBooking()

  return (
    <Dialog
      open={open}
      onClose={closeBooking}
      title="Book a Plumber"
      description="Tell us what you need, review the summary, then send it by email."
    >
      <BookingForm key={session} initialService={service} onClose={closeBooking} />
    </Dialog>
  )
}
