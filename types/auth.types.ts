import type { Dealer } from './dealer.types'

/** Standard backend envelope: { success, message, data }. */
export type ApiResponse<T> = { success: boolean; message: string; data: T }

/** Backend error body: { success:false, message, errors?, stack?(dev) }. */
export type ApiErrorBody = { success?: boolean; message?: string; errors?: ApiFieldError[]; stack?: unknown }
export type ApiFieldError = { field: string; message: string }

/** Dealer signup request payload (no role/approval/account fields; confirm-password is UI-only). */
export type DealerSignupPayload = {
  businessName: string
  ownerName: string
  email: string
  password: string
  mobile: string
  alternateMobile?: string
  gstNumber?: string
  businessType?: string
  address?: {
    street?: string
    city?: string
    state?: string
    pincode?: string
    country?: string
  }
}

export type DealerLoginPayload = { email: string; password: string }

export type DealerSignupData = { dealer: Dealer; token?: string }
export type DealerLoginData = { dealer: Dealer; token?: string }
export type CurrentUserData = { user: Dealer }

export type DealerSignupResponse = ApiResponse<DealerSignupData>
export type DealerLoginResponse = ApiResponse<DealerLoginData>
export type CurrentUserResponse = ApiResponse<CurrentUserData>
export type LogoutResponse = ApiResponse<null>

/** Global auth state. */
export type DealerAuthState = {
  dealer: Dealer | null
  isAuthenticated: boolean
  isLoading: boolean
  isInitialized: boolean
  error: string | null
}

export type DealerAuthContextValue = DealerAuthState & {
  login: (credentials: DealerLoginPayload) => Promise<void>
  signup: (payload: DealerSignupPayload) => Promise<DealerSignupOutcome>
  logout: () => Promise<void>
  refreshSession: () => Promise<void>
  clearError: () => void
}

/** Signup never grants portal access; always pending + cookie cleanup attempted. */
export type DealerSignupOutcome = {
  pendingApproval: true
  message: string
  dealer: Dealer | null
}

/** Why a successfully authenticated backend session is denied portal access. */
export type DealerAccessDeniedReason =
  | 'wrong_role'
  | 'pending'
  | 'rejected'
  | 'suspended'
  | 'inactive'
  | 'unauthenticated'
  | 'unknown'

export class DealerAccessDeniedError extends Error {
  readonly reason: DealerAccessDeniedReason
  readonly dealer: Dealer | null
  constructor(reason: DealerAccessDeniedReason, message: string, dealer: Dealer | null = null) {
    super(message)
    this.name = 'DealerAccessDeniedError'
    this.reason = reason
    this.dealer = dealer
  }
}
