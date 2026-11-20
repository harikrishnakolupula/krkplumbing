import { ClipboardList } from 'lucide-react'
import RequestReview from './RequestReview'
import { SelectField, TextAreaField, TextField } from './FormFields'
import { useRequestForm } from '../hooks/useRequestForm'
import { callbackTimes, getServiceLabel, services } from '../data/services'
import { buildCallbackRequest } from '../utils/bookingUtils'
import { validateCallback } from '../utils/validators'

const initialValues = { name: '', mobile: '', service: '', callbackTime: '', problem: '' }
const serviceOptions = services.map(({ id, title }) => ({ value: id, label: title }))
const build = (values) => buildCallbackRequest(values, getServiceLabel(values.service))

export default function CallbackForm() {
  const { values, errors, request, handleChange, handleSubmit, edit, reset } = useRequestForm({
    initialValues,
    validate: validateCallback,
    build,
  })

  if (request) {
    return <RequestReview request={request} onEdit={edit} onReset={reset} resetLabel="Request another callback" />
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Customer Name" required name="name" value={values.name} onChange={handleChange} error={errors.name} autoComplete="name" />
        <TextField label="Mobile Number" required name="mobile" type="tel" inputMode="tel" value={values.mobile} onChange={handleChange} error={errors.mobile} autoComplete="tel" placeholder="98765 43210" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField label="Required Service" required name="service" value={values.service} onChange={handleChange} error={errors.service} placeholder="Select a service" options={serviceOptions} />
        <SelectField label="Preferred Callback Time" required name="callbackTime" value={values.callbackTime} onChange={handleChange} error={errors.callbackTime} placeholder="Select a time" options={callbackTimes} />
      </div>
      <TextAreaField label="Problem Description" required name="problem" value={values.problem} onChange={handleChange} error={errors.problem} placeholder="Briefly describe the problem" />
      <button type="submit" className="btn btn-primary w-full">
        <ClipboardList className="size-4" aria-hidden="true" />
        Review Callback Request
      </button>
    </form>
  )
}
