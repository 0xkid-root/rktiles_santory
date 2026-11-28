import type { DealerLoginValues } from '@/types/dealer.types'

export type DealerLoginField = keyof DealerLoginValues
export type DealerLoginErrors = Partial<Record<DealerLoginField, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const emptyDealerLoginValues: DealerLoginValues = { email: '', password: '' }

/**
 * Client-side validation for the dealer login form (Phase 1, no API).
 * Required email + valid email + required password. No fake authentication.
 */
export function validateDealerLogin(values: DealerLoginValues): DealerLoginErrors {
  const errors: DealerLoginErrors = {}

  if (!values.email.trim()) errors.email = 'Email address is required.'
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Enter a valid email address.'
  if (!values.password) errors.password = 'Password is required.'

  return errors
}
