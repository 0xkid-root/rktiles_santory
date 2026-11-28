import './portal.css'
import { DealerProtectedRoute } from '@/components/auth/DealerProtectedRoute'
import { DealerPortalProvider } from '@/components/dealer-portal-context'
import { DealerPortalShell } from '@/components/dealer-portal-shell'

export default function DealerPortalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <DealerProtectedRoute>
      <DealerPortalProvider>
        <DealerPortalShell>{children}</DealerPortalShell>
      </DealerPortalProvider>
    </DealerProtectedRoute>
  )
}
