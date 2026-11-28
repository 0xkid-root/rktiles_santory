import { dealerSignup, dealerLogin, getCurrentUser, dealerLogout } from '@/services/api/auth.api'
import { getApiErrorMessage, isUnauthorizedError } from '@/utils/error.utils'
import { getDealerEligibility } from '@/utils/auth.utils'
import { DealerAccessDeniedError, type DealerAccessDeniedReason } from '@/types/auth.types'
import type { Dealer } from '@/types/dealer.types'
import type { DealerLoginPayload, DealerSignupPayload, DealerSignupOutcome } from '@/types/auth.types'

const GENERIC_INVALID_CREDENTIALS = 'Invalid email or password.'
const PENDING_MESSAGE =
  'Your dealer registration has been submitted successfully. Your account is currently pending approval by the RK Tiles team. You will be able to sign in once your account has been approved.'
const REJECTED_MESSAGE = 'Your dealer registration was not approved. Please contact RK Tiles support.'
const SUSPENDED_MESSAGE = 'Your dealer account has been suspended. Please contact support.'
const INACTIVE_MESSAGE = 'Your dealer account is inactive. Please contact support.'
const WRONG_ROLE_MESSAGE = 'This account is not authorized to access the Dealer Portal.'

function mapEligibilityReason(reason: string): DealerAccessDeniedReason {
  switch (reason) {
    case 'wrong_role':
      return 'wrong_role'
    case 'pending':
      return 'pending'
    case 'rejected':
      return 'rejected'
    case 'suspended':
      return 'suspended'
    case 'inactive':
      return 'inactive'
    default:
      return 'unknown'
  }
}

function deniedMessage(reason: DealerAccessDeniedReason): string {
  switch (reason) {
    case 'wrong_role':
      return WRONG_ROLE_MESSAGE
    case 'pending':
      return PENDING_MESSAGE
    case 'rejected':
      return REJECTED_MESSAGE
    case 'suspended':
      return SUSPENDED_MESSAGE
    case 'inactive':
      return INACTIVE_MESSAGE
    case 'unauthenticated':
      return 'Please sign in to access the Dealer Portal.'
    default:
      return 'You are not authorized to access the Dealer Portal.'
  }
}

/** Clear a backend session cookie. Never throws; used for signup cleanup + ineligible sessions. */
export async function safeLogout(): Promise<void> {
  try {
    await dealerLogout()
  } catch {
    // Cookie cleanup failure must not hide registration success or change auth state.
  }
}

/** Signup API + signup-session cleanup. Never grants portal access. */
export async function registerDealer(payload: DealerSignupPayload): Promise<DealerSignupOutcome> {
  const response = await dealerSignup(payload)
  const dealer = response?.data?.dealer ?? null
  // Backend sets a cookie on signup, but pending dealers must NOT have an active session.
  await safeLogout()
  return {
    pendingApproval: true,
    message: response?.message || PENDING_MESSAGE,
    dealer,
  }
}

/** Login API + eligibility validation. On ineligible successful auth, clears cookie + throws. */
export async function loginDealer(credentials: DealerLoginPayload): Promise<Dealer> {
  let response
  try {
    response = await dealerLogin(credentials)
  } catch (error) {
    if (isUnauthorizedError(error)) throw new DealerAccessDeniedError('unauthenticated', GENERIC_INVALID_CREDENTIALS)
    throw error
  }

  const dealer = response?.data?.dealer ?? null
  const eligibility = getDealerEligibility(dealer)

  if (!eligibility.eligible) {
    const reason = mapEligibilityReason(eligibility.reason)
    // Backend may have set a cookie even for pending/rejected; clear it.
    await safeLogout()
    throw new DealerAccessDeniedError(reason, deniedMessage(reason), dealer)
  }

  return dealer as Dealer
}

/** Session restoration. Returns an eligible approved dealer, or null. Ineligible sessions are cleared. */
export async function restoreSession(): Promise<Dealer | null> {
  let response
  try {
    response = await getCurrentUser()
  } catch {
    // 401/403/invalid cookie/network → not an authenticated dealer session.
    return null
  }

  const user = response?.data?.user ?? null
  const eligibility = getDealerEligibility(user)

  if (!eligibility.eligible) {
    // Pending/rejected/wrong-role/ineligible: deny + attempt logout; safeLogout never throws.
    await safeLogout()
    return null
  }

  return user as Dealer
}

/** Logout API + always-safe. Caller clears frontend state regardless. */
export async function logoutDealer(): Promise<void> {
  await safeLogout()
}

export { getApiErrorMessage }
