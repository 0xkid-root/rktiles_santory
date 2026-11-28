'use client'

import Link from 'next/link'
import { useId, useState, type FormEvent } from 'react'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { emptyDealerLoginValues, validateDealerLogin, type DealerLoginErrors } from '@/features/dealer/login/login.validation'
import type { DealerLoginValues } from '@/types/dealer.types'

/**
 * Dealer login form (Phase 1). Required + email validation, password visibility toggle,
 * submit loading state, accessible inputs, signup navigation.
 * NOT connected to any API and does NOT perform fake authentication; submitting shows a preview notice.
 */
export function DealerLoginForm() {
  const formId = useId()
  const [values, setValues] = useState<DealerLoginValues>(emptyDealerLoginValues)
  const [errors, setErrors] = useState<DealerLoginErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notice, setNotice] = useState('')

  const emailId = `${formId}-email`
  const passwordId = `${formId}-password`
  const emailErrorId = `${formId}-email-error`
  const passwordErrorId = `${formId}-password-error`

  function update(field: keyof DealerLoginValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNotice('')

    const nextErrors = validateDealerLogin(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    try {
      // Phase 1: no backend authentication. Real `dealerLogin()` is wired in Phase 2.
      await Promise.resolve()
      setNotice('Dealer authentication is not connected in this preview. No sign-in was attempted.')
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

      {notice && (
        <p className="form-notice" role="status">
          {notice}
        </p>
      )}

      <p className="dealer-form-help dealer-form-wide">
        <Link href="/dealer/signup">Create a dealer account</Link>
      </p>
    </form>
  )
}

