'use client'

import { useId, useState, type FormEvent } from 'react'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import {
  emptyDealerSignupValues,
  validateDealerSignup,
  type DealerSignupErrors,
  type DealerSignupField,
} from '@/features/dealer/signup/signup.validation'
import type { DealerAddress, DealerSignupValues } from '@/types/dealer.types'

const BUSINESS_TYPES = ['Retailer', 'Wholesaler', 'Distributor', 'Contractor', 'Builder', 'Architect', 'Other']

/**
 * Dealer account registration form (Phase 1). Grouped sections, accessible labels, required
 * indicators, per-field + summary error feedback, confirm-password check, password toggles,
 * submit loading state. NOT connected to any API; no fake signup success is shown.
 */
export function DealerSignupForm() {
  const formId = useId()
  const [values, setValues] = useState<DealerSignupValues>(emptyDealerSignupValues)
  const [errors, setErrors] = useState<DealerSignupErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notice, setNotice] = useState('')

  const id = (field: string) => `${formId}-${field}`
  const errorId = (field: string) => `${formId}-${field}-error`

  function update(field: keyof Omit<DealerSignupValues, 'address'>, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  function updateAddress(field: keyof DealerAddress, value: string) {
    setValues((current) => ({ ...current, address: { ...current.address, [field]: value } }))
    setErrors((current) => ({ ...current, [`address.${field}`]: undefined }))
  }

  function error(field: DealerSignupField) {
    return errors[field]
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNotice('')

    const nextErrors = validateDealerSignup(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    try {
      // Phase 1: no backend signup. Real `dealerSignup()` is wired in Phase 2.
      await Promise.resolve()
      setNotice('Dealer signup is not connected in this preview. No account was created.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="dealer-form dealer-signup-form" onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
      <p className="dealer-form-note dealer-form-wide">
        Fields marked <span className="dealer-required" aria-hidden="true">*</span> are required.
      </p>

      <fieldset className="dealer-form-section dealer-form-wide" disabled={isSubmitting}>
        <legend>Owner / account details</legend>

        <div className="dealer-form-grid">
          <label htmlFor={id('ownerName')}>
            Owner name <span className="dealer-required" aria-hidden="true">*</span>
            <input
              id={id('ownerName')}
              name="ownerName"
              type="text"
              autoComplete="name"
              required
              minLength={2}
              value={values.ownerName}
              onChange={(event) => update('ownerName', event.target.value)}
              aria-invalid={Boolean(error('ownerName'))}
              aria-describedby={error('ownerName') ? errorId('ownerName') : undefined}
            />
            {error('ownerName') && <span className="dealer-field-error" id={errorId('ownerName')} role="alert">{error('ownerName')}</span>}
          </label>

          <label htmlFor={id('businessName')}>
            Business name <span className="dealer-required" aria-hidden="true">*</span>
            <input
              id={id('businessName')}
              name="businessName"
              type="text"
              autoComplete="organization"
              required
              minLength={2}
              value={values.businessName}
              onChange={(event) => update('businessName', event.target.value)}
              aria-invalid={Boolean(error('businessName'))}
              aria-describedby={error('businessName') ? errorId('businessName') : undefined}
            />
            {error('businessName') && <span className="dealer-field-error" id={errorId('businessName')} role="alert">{error('businessName')}</span>}
          </label>

          <label className="dealer-form-wide" htmlFor={id('email')}>
            Email address <span className="dealer-required" aria-hidden="true">*</span>
            <input
              id={id('email')}
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="name@business.com"
              value={values.email}
              onChange={(event) => update('email', event.target.value)}
              aria-invalid={Boolean(error('email'))}
              aria-describedby={error('email') ? errorId('email') : undefined}
            />
            {error('email') && <span className="dealer-field-error" id={errorId('email')} role="alert">{error('email')}</span>}
          </label>

          <label htmlFor={id('password')}>
            Password <span className="dealer-required" aria-hidden="true">*</span>
            <span className="dealer-password-field">
              <input
                id={id('password')}
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                minLength={6}
                value={values.password}
                onChange={(event) => update('password', event.target.value)}
                aria-invalid={Boolean(error('password'))}
                aria-describedby={error('password') ? errorId('password') : `${id('password')}-hint`}
              />
              <button type="button" className="dealer-password-toggle" aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} onClick={() => setShowPassword((open) => !open)}>
                {showPassword ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
              </button>
            </span>
            <span className="dealer-field-hint" id={`${id('password')}-hint`}>At least 6 characters.</span>
            {error('password') && <span className="dealer-field-error" id={errorId('password')} role="alert">{error('password')}</span>}
          </label>

          <label htmlFor={id('confirmPassword')}>
            Confirm password <span className="dealer-required" aria-hidden="true">*</span>
            <span className="dealer-password-field">
              <input
                id={id('confirmPassword')}
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={values.confirmPassword}
                onChange={(event) => update('confirmPassword', event.target.value)}
                aria-invalid={Boolean(error('confirmPassword'))}
                aria-describedby={error('confirmPassword') ? errorId('confirmPassword') : undefined}
              />
              <button type="button" className="dealer-password-toggle" aria-label={showConfirmPassword ? 'Hide password' : 'Show password'} aria-pressed={showConfirmPassword} onClick={() => setShowConfirmPassword((open) => !open)}>
                {showConfirmPassword ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
              </button>
            </span>
            {error('confirmPassword') && <span className="dealer-field-error" id={errorId('confirmPassword')} role="alert">{error('confirmPassword')}</span>}
          </label>

          <label htmlFor={id('mobile')}>
            Mobile number <span className="dealer-required" aria-hidden="true">*</span>
            <input
              id={id('mobile')}
              name="mobile"
              type="tel"
              autoComplete="tel"
              required
              minLength={10}
              inputMode="numeric"
              placeholder="9876543210"
              value={values.mobile}
              onChange={(event) => update('mobile', event.target.value)}
              aria-invalid={Boolean(error('mobile'))}
              aria-describedby={error('mobile') ? errorId('mobile') : undefined}
            />
            {error('mobile') && <span className="dealer-field-error" id={errorId('mobile')} role="alert">{error('mobile')}</span>}
          </label>

          <label htmlFor={id('alternateMobile')}>
            Alternate mobile <span className="dealer-optional">(optional)</span>
            <input
              id={id('alternateMobile')}
              name="alternateMobile"
              type="tel"
              autoComplete="tel"
              inputMode="numeric"
              value={values.alternateMobile}
              onChange={(event) => update('alternateMobile', event.target.value)}
              aria-invalid={Boolean(error('alternateMobile'))}
              aria-describedby={error('alternateMobile') ? errorId('alternateMobile') : undefined}
            />
            {error('alternateMobile') && <span className="dealer-field-error" id={errorId('alternateMobile')} role="alert">{error('alternateMobile')}</span>}
          </label>
        </div>
      </fieldset>

      <fieldset className="dealer-form-section dealer-form-wide" disabled={isSubmitting}>
        <legend>Business details</legend>

        <div className="dealer-form-grid">
          <label htmlFor={id('gstNumber')}>
            GST number <span className="dealer-optional">(optional)</span>
            <input
              id={id('gstNumber')}
              name="gstNumber"
              type="text"
              autoComplete="off"
              value={values.gstNumber}
              onChange={(event) => update('gstNumber', event.target.value)}
            />
          </label>

          <label htmlFor={id('businessType')}>
            Business type <span className="dealer-optional">(optional)</span>
            <select
              id={id('businessType')}
              name="businessType"
              value={values.businessType}
              onChange={(event) => update('businessType', event.target.value)}
            >
              <option value="">Select business type</option>
              {BUSINESS_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
        </div>
      </fieldset>

      <fieldset className="dealer-form-section dealer-form-wide" disabled={isSubmitting}>
        <legend>Address details</legend>

        <div className="dealer-form-grid">
          <label className="dealer-form-wide" htmlFor={id('address.street')}>
            Street <span className="dealer-required" aria-hidden="true">*</span>
            <input
              id={id('address.street')}
              name="address.street"
              type="text"
              autoComplete="address-line1"
              required
              value={values.address.street}
              onChange={(event) => updateAddress('street', event.target.value)}
              aria-invalid={Boolean(error('address.street'))}
              aria-describedby={error('address.street') ? errorId('address.street') : undefined}
            />
            {error('address.street') && <span className="dealer-field-error" id={errorId('address.street')} role="alert">{error('address.street')}</span>}
          </label>

          <label htmlFor={id('address.city')}>
            City <span className="dealer-required" aria-hidden="true">*</span>
            <input
              id={id('address.city')}
              name="address.city"
              type="text"
              autoComplete="address-level2"
              required
              value={values.address.city}
              onChange={(event) => updateAddress('city', event.target.value)}
              aria-invalid={Boolean(error('address.city'))}
              aria-describedby={error('address.city') ? errorId('address.city') : undefined}
            />
            {error('address.city') && <span className="dealer-field-error" id={errorId('address.city')} role="alert">{error('address.city')}</span>}
          </label>

          <label htmlFor={id('address.state')}>
            State <span className="dealer-required" aria-hidden="true">*</span>
            <input
              id={id('address.state')}
              name="address.state"
              type="text"
              autoComplete="address-level1"
              required
              value={values.address.state}
              onChange={(event) => updateAddress('state', event.target.value)}
              aria-invalid={Boolean(error('address.state'))}
              aria-describedby={error('address.state') ? errorId('address.state') : undefined}
            />
            {error('address.state') && <span className="dealer-field-error" id={errorId('address.state')} role="alert">{error('address.state')}</span>}
          </label>

          <label htmlFor={id('address.pincode')}>
            PIN code <span className="dealer-required" aria-hidden="true">*</span>
            <input
              id={id('address.pincode')}
              name="address.pincode"
              type="text"
              autoComplete="postal-code"
              inputMode="numeric"
              required
              value={values.address.pincode}
              onChange={(event) => updateAddress('pincode', event.target.value)}
              aria-invalid={Boolean(error('address.pincode'))}
              aria-describedby={error('address.pincode') ? errorId('address.pincode') : undefined}
            />
            {error('address.pincode') && <span className="dealer-field-error" id={errorId('address.pincode')} role="alert">{error('address.pincode')}</span>}
          </label>

          <label htmlFor={id('address.country')}>
            Country <span className="dealer-required" aria-hidden="true">*</span>
            <input
              id={id('address.country')}
              name="address.country"
              type="text"
              autoComplete="country-name"
              required
              value={values.address.country}
              onChange={(event) => updateAddress('country', event.target.value)}
              aria-invalid={Boolean(error('address.country'))}
              aria-describedby={error('address.country') ? errorId('address.country') : undefined}
            />
            {error('address.country') && <span className="dealer-field-error" id={errorId('address.country')} role="alert">{error('address.country')}</span>}
          </label>
        </div>
      </fieldset>

      <button className="button button-dark" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting…' : 'Create dealer account'} <ArrowRight size={16} aria-hidden="true" />
      </button>

      {notice && (
        <p className="form-notice" role="status">
          {notice}
        </p>
      )}
    </form>
  )
}

