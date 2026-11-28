import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { dealerQuickActions } from '@/features/dealer/dashboard/dashboard.data'

/** Useful dashboard actions. Only links to implemented routes; no fake functionality. */
export function DealerQuickActions() {
  return (
    <section className="portal-panel portal-quick-actions" aria-label="Quick actions">
      <div className="portal-panel-heading">
        <div>
          <p className="eyebrow">QUICK ACTIONS</p>
          <h2>Get started</h2>
        </div>
      </div>
      <ul className="portal-quick-action-list">
        {dealerQuickActions.map(({ href, label, description, icon: Icon }) => (
          <li key={href}>
            <Link className="portal-quick-action" href={href}>
              <span className="portal-metric-icon">
                <Icon size={17} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <span className="portal-quick-action-copy">
                <strong>{label}</strong>
                <small>{description}</small>
              </span>
              <ArrowRight size={15} aria-hidden="true" className="portal-quick-action-arrow" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
