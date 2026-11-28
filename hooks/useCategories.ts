'use client'

import { useCallback, useEffect, useState } from 'react'
import { getCategories } from '@/services/api/categories.api'
import { getApiErrorMessage } from '@/utils/error.utils'
import type { ApiCategory } from '@/types/category.types'

export type CategoriesStatus = 'loading' | 'success' | 'empty' | 'error'

export type UseCategoriesResult = {
  categories: ApiCategory[]
  status: CategoriesStatus
  error: string | null
  isLoading: boolean
  retry: () => void
}

/**
 * Reusable categories loader reusing the shared `apiClient`.
 * loading / success / empty / error + retry. Race-safe.
 */
export function useCategories(): UseCategoriesResult {
  const [categories, setCategories] = useState<ApiCategory[]>([])
  const [status, setStatus] = useState<CategoriesStatus>('loading')
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  const retry = useCallback(() => setReloadKey((key) => key + 1), [])

  useEffect(() => {
    let active = true
    setStatus('loading')
    setError(null)

    getCategories()
      .then((list) => {
        if (!active) return
        setCategories(list)
        setStatus(list.length === 0 ? 'empty' : 'success')
      })
      .catch((err) => {
        if (!active) return
        setCategories([])
        setError(getApiErrorMessage(err))
        setStatus('error')
      })

    return () => {
      active = false
    }
  }, [reloadKey])

  return { categories, status, error, isLoading: status === 'loading', retry }
}
