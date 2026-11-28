'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { DealerShell } from '@/components/dealer/layout/DealerShell'

export function DealerInterestPage() {
  const [notice, setNotice] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNotice(
      'This is a preview form. Your information has not been sent; dealer enquiries will be enabled when RK Tiles & Sanitary adds its contact details.',
    )
  }

  return (
    <DealerShell
      eyebrow="FOR OUR TRADE COMMUNITY"
      title={
        <>
          A partnership built
          <br />
          around <em>good design.</em>
        </>
      }
    >
      <p className="dealer-page-intro">
        Tell us a little about your business and the kind of partnership you have in mind. Our dealer enquiry form is a
        front-end preview and does not transmit information.
      </p>
      <form className="dealer-form" onSubmit={handleSubmit}>
        <label>
          Full name
          <input name="name" autoComplete="name" required placeholder="Your name" />
        </label>
        <label>
          Business name
          <input name="business" autoComplete="organization" required placeholder="Your business" />
        </label>
        <label>
          Work email
          <input name="email" type="email" autoComplete="email" required placeholder="name@business.com" />
        </label>
        <label>
          Phone number
          <input name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" />
        </label>
        <label className="dealer-form-wide">
          City / region
          <input name="city" autoComplete="address-level2" required placeholder="Where is your business based?" />
        </label>
        <button className="button button-dark" type="submit">
          Continue your enquiry <ArrowRight size={16} aria-hidden="true" />
        </button>
        {notice && (
          <p className="form-notice" role="status">
            {notice}
          </p>
        )}
      </form>
      <p className="dealer-page-footnote">
        Already working with us?{' '}
        <Link href="/dealer/login">
          Go to dealer login <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </p>
    </DealerShell>
  )
}
