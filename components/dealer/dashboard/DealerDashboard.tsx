'use client'

import { DealerOverview } from './DealerOverview'
import { DealerQuickActions } from './DealerQuickActions'

/**
 * Dealer dashboard preview (Phase 1). Composed of modular sections; no API integration.
 * Layout/navigation are provided by the `(portal)` layout (`DealerPortalShell`); mock data is isolated
 * in `@/features/dealer/dashboard/dashboard.data` and `@/components/dealer-portal-context`.
 */
export function DealerDashboard() {
  return (
    <div className="portal-page">
      <DealerOverview />
      <DealerQuickActions />
    </div>
  )
}
