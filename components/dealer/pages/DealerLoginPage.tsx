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
        A dedicated space for RK Tiles &amp; Sanitary trade partners. Sign in with your approved dealer account. Only
        approved, active dealers can access the Dealer Portal.
      </p>
      <DealerLoginForm />


    </DealerShell>
  )
}
