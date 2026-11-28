'use client'

import { useEffect, type ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useDealerAuth } from '@/hooks/useDealerAuth'
import { isApprovedDealer } from '@/utils/auth.utils'
import { LOGIN_PATH } from '@/context/DealerAuthContext'

function AuthLoading() {
  return (
    <main className="dealer-portal dealer-portal-loading" aria-live="polite" role="status">
      <p>Loading your dealer workspace…</p>
    </main>
  )
}

/**
 * Dealer-only route protection for Next.js App Router.
 * - Renders nothing protected while session restoration is in progress (no flash).
 * - Unauthenticated → redirect to existing `/dealer/login`.
 * - Only role==='dealer' + approvalStatus==='approved' + accountStatus==='active' + isActive===true render children.
 * Frontend protection complements (not replaces) backend authorization.
 */
export function DealerProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading, isInitialized, dealer } = useDealerAuth()
  const router = useRouter()
  const pathname = usePathname()

  const approved = isInitialized && !isLoading && isAuthenticated && isApprovedDealer(dealer)

  useEffect(() => {
    if (!isInitialized || isLoading) return
    if (!approved) {
      // Redirect to login once; preserve where they were going; avoid loops.
      const target = `${LOGIN_PATH}?next=${encodeURIComponent(pathname || '')}`
      if (pathname !== LOGIN_PATH) router.replace(target)
    }
  }, [isInitialized, isLoading, approved, pathname, router])

  if (!isInitialized || isLoading) return <AuthLoading />
  if (!approved) return <AuthLoading />

  return <>{children}</>
}
