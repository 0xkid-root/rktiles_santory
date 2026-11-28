import type { ReactNode } from 'react'
import { DealerHeader } from './DealerHeader'
import { DealerFooter } from './DealerFooter'

/**
 * Shared layout for public Dealer pages (enquiry, signup, login).
 * Provides branding header, content wrapper and footer. Contains no form logic or API requests.
 */
export function DealerShell({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children: ReactNode }) {
  return (
    <main className="dealer-page">
      <DealerHeader />
      <section className="dealer-page-content">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {children}
      </section>
      <DealerFooter />
    </main>
  )
}
