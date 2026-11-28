import axios, { type AxiosInstance } from 'axios'
import { apiConfig } from '@/config/api.config'
import { normalizeApiError } from '@/utils/error.utils'

/**
 * Single centralized Axios client for the Dealer Portal. ALL feature API modules reuse this instance.
 * - withCredentials: true → browser sends/receives HTTP-only `token` cookie
 * - JSON headers, request timeout
 * - response interceptor normalizes errors into ApiRequestError
 * No JWT is read, stored, or forwarded; no duplicate clients.
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: apiConfig.baseURL,
  withCredentials: apiConfig.withCredentials,
  timeout: apiConfig.timeoutMs,
  headers: { ...apiConfig.headers },
})

/** Optional centralized hook invoked once on any 401. Registered by DealerAuthProvider; no redirect here. */
let unauthorizedHandler: (() => void) | null = null
export function setUnauthorizedHandler(handler: (() => void) | null) {
  unauthorizedHandler = handler
}

apiClient.interceptors.request.use((config) => {
  // Ensure JSON for plain-object bodies; never attach tokens manually.
  if (config.data && !(config.data instanceof FormData) && !config.headers?.['Content-Type']) {
    config.headers.set?.('Content-Type', 'application/json')
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalized = normalizeApiError(error)
    if (normalized.status === 401 && unauthorizedHandler) {
      // Fire-and-forget; no redirect loops, no extra /auth/me or /auth/logout here.
      try {
        unauthorizedHandler()
      } catch {
        /* never let handler break the rejected promise */
      }
    }
    return Promise.reject(normalized)
  },
)

export default apiClient
