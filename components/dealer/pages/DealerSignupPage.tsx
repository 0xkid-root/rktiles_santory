'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { DealerShell } from '@/components/dealer/layout/DealerShell'
import { DealerSignupForm } from '@/components/auth/DealerSignupForm'

export function DealerSignupPage() {
  return (
    <DealerShell
      eyebrow="RK TILES PARTNER PORTAL"
      title={
        <>
          Create your<br />
          <em>dealer account.</em>
        </>
      }
    >
      <p className="dealer-page-intro">
        Register your business with RK Tiles &amp; Sanitary. New dealer accounts start as <strong>pending approval</strong>;
        our team reviews your details before granting access to the Dealer Portal. You will be able to sign in once your
        account is approved.
      </p>
      <DealerSignupForm />
      <p className="dealer-page-footnote">
        Already have an account?{' '}
        <Link href="/dealer/login">
          Go to dealer login <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </p>
    </DealerShell>
  )
}
