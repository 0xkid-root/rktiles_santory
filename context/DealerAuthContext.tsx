'use client'

import { createContext, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { setUnauthorizedHandler } from '@/lib/axios'
import * as authService from '@/services/auth/auth.service'
import { isApprovedDealer } from '@/utils/auth.utils'
import { getApiErrorMessage } from '@/utils/error.utils'
import { DealerAccessDeniedError } from '@/types/auth.types'
import type { Dealer } from '@/types/dealer.types'
import type {
  DealerAuthContextValue,
  DealerLoginPayload,
  DealerSignupOutcome,
  DealerSignupPayload,
} from '@/types/auth.types'

export const LOGIN_PATH = '/dealer/login'
export const DASHBOARD_PATH = '/dealer/dashboard'

const DealerAuthContext = createContext<DealerAuthContextValue | null>(null)

export function DealerAuthProvider({ children }: { children: ReactNode }) {
  const [dealer, setDealer] = useState<Dealer | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const restoringRef = useRef(false)
  const mountedRef = useRef(true)
  const versionRef = useRef(0)

  const clearAuth = useCallback(() => {
    setDealer(null)
    setError(null)
  }, [])

  /** Centralized 401 hook from Axios interceptor. Clears state only; no redirect/loop here. */
  const handleUnauthorized = useCallback(() => {
    setDealer(null)
  }, [])

  const isAuthenticated = isApprovedDealer(dealer)

  const refreshSession = useCallback(async () => {
    // Prevent concurrent duplicate /auth/me calls.
    if (restoringRef.current) return
    restoringRef.current = true
    const version = versionRef.current
    if (mountedRef.current) setIsLoading(true)
    try {
      const restored = await authService.restoreSession()
      if (!mountedRef.current) return
      // Don't clobber a concurrent login/logout that happened while restoring.
      if (versionRef.current !== version) return
      if (restored && isApprovedDealer(restored)) {
        setDealer(restored)
        setError(null)
      } else {
        setDealer(null)
      }
    } catch {
      if (mountedRef.current && versionRef.current === version) setDealer(null)
    } finally {
      restoringRef.current = false
      if (mountedRef.current) {
        setIsLoading(false)
        setIsInitialized(true)
      }
    }
  }, [])

  const login = useCallback(async (credentials: DealerLoginPayload) => {
    setError(null)
    try {
      const dealer = await authService.loginDealer(credentials)
      // `dealer` is already eligibility-checked; set as the single source of truth.
      versionRef.current += 1
      setDealer(dealer)
      setIsInitialized(true)
      setIsLoading(false)
    } catch (err) {
      setDealer(null)
      const message = err instanceof DealerAccessDeniedError ? err.message : getApiErrorMessage(err)
      setError(message)
      throw err
    }
  }, [])

  const signup = useCallback(async (payload: DealerSignupPayload): Promise<DealerSignupOutcome> => {
    setError(null)
    try {
      const outcome = await authService.registerDealer(payload)
      // Never mark authenticated after signup; session cookie cleared by auth.service.
      return outcome
    } catch (err) {
      const message = getApiErrorMessage(err)
      setError(message)
      throw err
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await authService.logoutDealer()
    } catch {
      // clear local state regardless
    } finally {
      versionRef.current += 1
      clearAuth()
      setIsInitialized(true)
      setIsLoading(false)
    }
  }, [clearAuth])

  // One-time session restoration on mount; race-safe.
  useEffect(() => {
    mountedRef.current = true
    void refreshSession()
    return () => {
      mountedRef.current = false
    }
  }, [refreshSession])

  // Register centralized 401 handler.
  useEffect(() => {
    setUnauthorizedHandler(handleUnauthorized)
    return () => setUnauthorizedHandler(null)
  }, [handleUnauthorized])

  const value = useMemo<DealerAuthContextValue>(
    () => ({
      dealer,
      isAuthenticated,
      isLoading,
      isInitialized,
      error,
      login,
      signup,
      logout,
      refreshSession,
      clearError: () => setError(null),
    }),
    [dealer, isAuthenticated, isLoading, isInitialized, error, login, signup, logout, refreshSession],
  )

  return <DealerAuthContext.Provider value={value}>{children}</DealerAuthContext.Provider>
}

export { DealerAuthContext }
