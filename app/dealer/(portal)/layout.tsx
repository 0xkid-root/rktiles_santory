import './portal.css'
import { DealerPortalProvider } from '@/components/dealer-portal-context'
import { DealerPortalShell } from '@/components/dealer-portal-shell'

export default function DealerPortalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <DealerPortalProvider><DealerPortalShell>{children}</DealerPortalShell></DealerPortalProvider>
}
