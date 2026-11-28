'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useId, useState, type FormEvent } from 'react'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { emptyDealerLoginValues, validateDealerLogin, type DealerLoginErrors } from '@/features/dealer/login/login.validation'
import { DealerAccessDeniedError } from '@/types/auth.types'
import { getApiErrorMessage } from '@/utils/error.utils'
import { useDealerAuth } from '@/hooks/useDealerAuth'
import { DASHBOARD_PATH } from '@/context/DealerAuthContext'
import type { DealerLoginValues } from '@/types/dealer.types'

/** Dealer login form connected to real `/auth/dealer/login`. No token handling; HTTP-only cookie. */
export function DealerLoginForm() {
  const formId = useId()
  const router = useRouter()
  const { login } = useDealerAuth()
  const [values, setValues] = useState<DealerLoginValues>(emptyDealerLoginValues)
  const [errors, setErrors] = useState<DealerLoginErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const emailId = `${formId}-email`
  const passwordId = `${formId}-password`
  const emailErrorId = `${formId}-email-error`
  const passwordErrorId = `${formId}-password-error`
  const formErrorId = `${formId}-form-error`

  function update(field: keyof DealerLoginValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    const nextErrors = validateDealerLogin(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    try {
      await login({ email: values.email.trim(), password: values.password })
      router.replace(DASHBOARD_PATH)
    } catch (err) {
      setFormError(err instanceof DealerAccessDeniedError ? err.message : getApiErrorMessage(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="dealer-form dealer-login-form" onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
      <label className="dealer-form-wide" htmlFor={emailId}>
        Email address
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="username"
          required
          placeholder="name@business.com"
          value={values.email}
          onChange={(event) => update('email', event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? emailErrorId : undefined}
          disabled={isSubmitting}
        />
        {errors.email && (
          <span className="dealer-field-error" id={emailErrorId} role="alert">
            {errors.email}
          </span>
        )}
      </label>

      <label className="dealer-form-wide" htmlFor={passwordId}>
        Password
        <span className="dealer-password-field">
          <input
            id={passwordId}
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            placeholder="Enter your password"
            value={values.password}
            onChange={(event) => update('password', event.target.value)}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? passwordErrorId : undefined}
            disabled={isSubmitting}
          />
          <button
            type="button"
            className="dealer-password-toggle"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((open) => !open)}
          >
            {showPassword ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
          </button>
        </span>
        {errors.password && (
          <span className="dealer-field-error" id={passwordErrorId} role="alert">
            {errors.password}
          </span>
        )}
      </label>

      <button className="button button-dark" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Signing in…' : 'Sign in'} <ArrowRight size={16} aria-hidden="true" />
      </button>

      {formError && (
        <p className="form-notice form-notice-error" id={formErrorId} role="alert">
          {formError}
        </p>
      )}

      <p className="dealer-form-help dealer-form-wide">
        <Link href="/dealer/signup">Create a dealer account</Link>
      </p>
    </form>
  )
}
