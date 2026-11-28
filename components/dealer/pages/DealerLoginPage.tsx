'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { DealerShell } from '@/components/dealer/layout/DealerShell'
import { DealerLoginForm } from '@/components/auth/DealerLoginForm'

export function DealerLoginPage() {
  return (
    <DealerShell
      eyebrow="RK TILES PARTNER PORTAL"
      title={
        <>
          Welcome
          <br />
          <em>back.</em>
        </>
      }
    >
      <p className="dealer-page-intro">
        A dedicated space for RK Tiles &amp; Sanitary trade partners. Dealer accounts are not active yet; this sign-in
        form is a visual preview only.
      </p>
      <DealerLoginForm />
      <p className="dealer-page-footnote">
        Preview the mock dealer workspace:{' '}
        <Link href="/dealer/dashboard">
          Open demo dashboard <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </p>
      <p className="dealer-page-footnote">
        Not a partner yet?{' '}
        <Link href="/dealer/signup">
          Create a dealer account <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </p>
    </DealerShell>
  )
}
