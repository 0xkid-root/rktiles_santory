/**
 * Centralized API configuration. Single source for backend base URL + client defaults.
 * Next.js inlines NEXT_PUBLIC_* at build time; no secrets are stored here or in frontend env.
 */

const rawBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

if (!rawBaseUrl || !rawBaseUrl.trim()) {
  throw new Error(
    'Missing required environment variable NEXT_PUBLIC_API_BASE_URL. ' +
      'Set it in .env.local (e.g. NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1).',
  )
}

/** Normalize: trim + strip trailing slash so endpoint paths can be appended cleanly. */
const baseURL = rawBaseUrl.trim().replace(/\/+$/, '')

export const apiConfig = {
  baseURL,
  timeoutMs: 15000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
} as const

export const API_BASE_URL = apiConfig.baseURL
