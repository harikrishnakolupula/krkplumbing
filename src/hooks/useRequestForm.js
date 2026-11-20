import { useCallback, useState } from 'react'

/**
 * Shared state for the booking, callback and contact forms.
 *
 * The site has no backend, so submitting only validates the fields and builds
 * a `request` (summary, subject, body, mailto link) with `build(values)`.
 * Nothing is sent until the customer presses Send in their own email app.
 */
export function useRequestForm({ initialValues, validate, build }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [request, setRequest] = useState(null)

  const setValue = useCallback((name, value) => {
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => {
      if (!current[name]) return current
      const { [name]: _removed, ...rest } = current
      return rest
    })
  }, [])

  const handleChange = useCallback((event) => setValue(event.target.name, event.target.value), [setValue])

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()
      const form = event.currentTarget
      const found = validate(values)
      setErrors(found)
      if (Object.keys(found).length > 0) {
        requestAnimationFrame(() => form.querySelector('[aria-invalid="true"]')?.focus())
        return
      }
      setRequest(build(values))
    },
    [build, validate, values],
  )

  const edit = useCallback(() => setRequest(null), [])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setRequest(null)
  }, [initialValues])

  return { values, errors, request, setValue, handleChange, handleSubmit, edit, reset }
}
