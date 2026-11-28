import { apiClient } from '@/lib/axios'
import type {
  CurrentUserResponse,
  DealerLoginPayload,
  DealerLoginResponse,
  DealerSignupPayload,
  DealerSignupResponse,
  LogoutResponse,
} from '@/types/auth.types'

/**
 * Dealer Auth API module. Responsible ONLY for HTTP communication via the shared Axios client.
 * No React state, no token handling, no localStorage/sessionStorage. Cookie auth is handled by browser + backend.
 */

export async function dealerSignup(payload: DealerSignupPayload): Promise<DealerSignupResponse> {
  const { data } = await apiClient.post<DealerSignupResponse>('/auth/dealer/signup', payload)
  return data
}

export async function dealerLogin(payload: DealerLoginPayload): Promise<DealerLoginResponse> {
  const { data } = await apiClient.post<DealerLoginResponse>('/auth/dealer/login', payload)
  return data
}

export async function getCurrentUser(): Promise<CurrentUserResponse> {
  const { data } = await apiClient.get<CurrentUserResponse>('/auth/me')
  return data
}

export async function dealerLogout(): Promise<LogoutResponse> {
  const { data } = await apiClient.post<LogoutResponse>('/auth/logout')
  return data
}
