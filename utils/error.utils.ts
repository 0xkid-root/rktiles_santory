import axios from 'axios'

/** Normalized error kinds for consistent handling; never exposes stack/db/JWT details to UI. */
export type ApiErrorKind =
  | 'network'
  | 'timeout'
  | 'unauthorized'
  | 'forbidden'
  | 'validation'
  | 'conflict'
  | 'rate_limit'
  | 'server'
  | 'unknown'

export type ApiFieldError = { field: string; message: string }

export class ApiRequestError extends Error {
  readonly kind: ApiErrorKind
  readonly status: number | null
  readonly fieldErrors: ApiFieldError[]
  readonly userMessage: string

  constructor(args: {
    message: string
    userMessage: string
    kind: ApiErrorKind
    status?: number | null
    fieldErrors?: ApiFieldError[]
  }) {
    super(args.message)
    this.name = 'ApiRequestError'
    this.kind = args.kind
    this.status = args.status ?? null
    this.fieldErrors = args.fieldErrors ?? []
    this.userMessage = args.userMessage
  }
}

type BackendErrorBody = { success?: boolean; message?: string; errors?: unknown; stack?: unknown }

const SAFE_FALLBACK: Record<ApiErrorKind, string> = {
  network: 'Unable to reach the server. Please check your connection and try again.',
  timeout: 'The request timed out. Please try again.',
  unauthorized: 'Your session is not valid. Please sign in again.',
  forbidden: 'You do not have permission to perform this action.',
  validation: 'Some information is invalid. Please review the highlighted fields.',
  conflict: 'A conflicting record already exists.',
  rate_limit: 'Too many attempts. Please wait a moment and try again.',
  server: 'Something went wrong on our end. Please try again later.',
  unknown: 'Something went wrong. Please try again.',
}

function extractFieldErrors(body: BackendErrorBody | undefined): ApiFieldError[] {
  if (!body || !Array.isArray(body.errors)) return []
  const out: ApiFieldError[] = []
  for (const item of body.errors) {
    if (item && typeof item === 'object' && 'message' in item) {
      const field = 'field' in item && typeof (item as { field?: unknown }).field === 'string'
        ? (item as { field: string }).field
        : ''
      const message = typeof (item as { message?: unknown }).message === 'string'
        ? (item as { message: string }).message
        : ''
      if (message) out.push({ field, message })
    }
  }
  return out
}

function kindFromStatus(status: number | null): ApiErrorKind {
  if (status === 400) return 'validation'
  if (status === 401) return 'unauthorized'
  if (status === 403) return 'forbidden'
  if (status === 409) return 'conflict'
  if (status === 429) return 'rate_limit'
  if (status !== null && status >= 500) return 'server'
  return 'unknown'
}

/** Convert anything thrown by axios/services into a safe ApiRequestError. Never leaks stacks/internals. */
export function normalizeApiError(error: unknown): ApiRequestError {
  if (error instanceof ApiRequestError) return error

  if (axios.isAxiosError(error)) {
    // Network / DNS / CORS / offline (no response received)
    if (!error.response) {
      const isTimeout = error.code === 'ECONNABORTED' || /timeout/i.test(error.message)
      const kind: ApiErrorKind = isTimeout ? 'timeout' : 'network'
      return new ApiRequestError({ message: error.message, userMessage: SAFE_FALLBACK[kind], kind, status: null })
    }

    const status = error.response.status ?? null
    const body = (error.response.data ?? undefined) as BackendErrorBody | undefined
    const kind = kindFromStatus(status)
    const fieldErrors = extractFieldErrors(body)

    // Surface backend's user-safe message; never raw stack/db/internal text.
    const backendMessage = typeof body?.message === 'string' && body.message.trim() ? body.message.trim() : ''
    const userMessage = backendMessage || SAFE_FALLBACK[kind]

    return new ApiRequestError({ message: backendMessage || error.message, userMessage, kind, status, fieldErrors })
  }

  if (error instanceof Error) {
    return new ApiRequestError({ message: error.message, userMessage: SAFE_FALLBACK.unknown, kind: 'unknown' })
  }

  return new ApiRequestError({ message: 'Unknown error', userMessage: SAFE_FALLBACK.unknown, kind: 'unknown' })
}

/** Safe message for UI. Prefers explicit backend user message; never stack traces. */
export function getApiErrorMessage(error: unknown, fallback = SAFE_FALLBACK.unknown): string {
  return normalizeApiError(error).userMessage || fallback
}

/** True if error is an unauthenticated (401) error. */
export function isUnauthorizedError(error: unknown): boolean {
  return normalizeApiError(error).status === 401
}
