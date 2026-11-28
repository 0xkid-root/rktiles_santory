import type { Dealer } from '@/types/dealer.types'

export const DEALER_ROLE = 'dealer' as const

export type DealerEligibility = { eligible: boolean; reason: 'ok' | 'wrong_role' | 'pending' | 'rejected' | 'suspended' | 'inactive' | 'unknown' }

/**
 * Centralized dealer portal eligibility check. Reused by auth service, context, protected routes.
 * A dealer can access the portal ONLY if role==='dealer' AND approvalStatus==='approved'
 * AND accountStatus==='active' AND isActive===true.
 */
export function getDealerEligibility(user: Dealer | null | undefined): DealerEligibility {
  if (!user) return { eligible: false, reason: 'unknown' }
  if (user.role !== DEALER_ROLE) return { eligible: false, reason: 'wrong_role' }
  if (user.isActive !== true) return { eligible: false, reason: 'inactive' }
  if (user.accountStatus !== 'active') return { eligible: false, reason: 'suspended' }
  if (user.approvalStatus === 'pending') return { eligible: false, reason: 'pending' }
  if (user.approvalStatus === 'rejected') return { eligible: false, reason: 'rejected' }
  if (user.approvalStatus !== 'approved') return { eligible: false, reason: 'unknown' }
  return { eligible: true, reason: 'ok' }
}

export function isApprovedDealer(user: Dealer | null | undefined): boolean {
  return getDealerEligibility(user).eligible
}

export function hasDealerRole(user: Dealer | null | undefined): boolean {
  return user?.role === DEALER_ROLE
}
