const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Strips spaces, dashes, a leading +91 / 91 / 0 and returns the 10 digit number. */
export function normalizeIndianMobile(input) {
  let digits = String(input ?? '').replace(/[\s\-().]/g, '')
  if (digits.startsWith('+91')) digits = digits.slice(3)
  else if (digits.startsWith('0091')) digits = digits.slice(4)
  else if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2)
  else if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1)
  return digits
}

export function isValidIndianMobile(input) {
  return /^[6-9]\d{9}$/.test(normalizeIndianMobile(input))
}

export function isValidEmail(input) {
  return EMAIL_PATTERN.test(String(input ?? '').trim())
}

function validateMobileField(errors, value) {
  if (!value.trim()) errors.mobile = 'Please enter your mobile number.'
  else if (!isValidIndianMobile(value)) {
    errors.mobile = 'Enter a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9.'
  }
}

export function validateBooking(values, todayISO) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your full name.'
  else if (values.name.trim().length < 2) errors.name = 'Name must be at least 2 characters.'

  validateMobileField(errors, values.mobile)

  if (values.email.trim() && !isValidEmail(values.email)) {
    errors.email = 'Enter a valid email address, or leave this field empty.'
  }
  if (!values.service) errors.service = 'Please select a plumbing service.'

  if (!values.problem.trim()) errors.problem = 'Please describe the problem.'
  else if (values.problem.trim().length < 10) errors.problem = 'Please add a little more detail (at least 10 characters).'

  if (!values.address.trim()) errors.address = 'Please enter your complete address.'
  else if (values.address.trim().length < 10) errors.address = 'Please enter the complete address with area and landmark.'

  if (values.date && todayISO && values.date < todayISO) {
    errors.date = 'Please choose today or a future date.'
  }
  return errors
}

export function validateCallback(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  validateMobileField(errors, values.mobile)
  if (!values.service) errors.service = 'Please select a plumbing service.'
  if (!values.callbackTime) errors.callbackTime = 'Please choose a preferred callback time.'
  if (!values.problem.trim()) errors.problem = 'Please describe the problem.'
  return errors
}

export function validateContact(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  validateMobileField(errors, values.mobile)
  if (values.email.trim() && !isValidEmail(values.email)) {
    errors.email = 'Enter a valid email address, or leave this field empty.'
  }
  if (!values.message.trim()) errors.message = 'Please write your message.'
  return errors
}
