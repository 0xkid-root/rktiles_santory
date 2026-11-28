import { apiClient } from '@/lib/axios'
import type { ApiCategoriesResponse, ApiCategory } from '@/types/category.types'

/**
 * Categories API module. Responsible ONLY for HTTP via the shared Axios client.
 * GET /api/v1/categories (public). No token handling; no separate HTTP client.
 */
export async function getCategories(): Promise<ApiCategory[]> {
  const { data } = await apiClient.get<ApiCategoriesResponse>('/categories')
  // Be tolerant of empty/malformed payloads; never throw on shape, only on HTTP/network.
  const list = Array.isArray(data?.data) ? data.data : []
  return list.filter((category): category is ApiCategory => !!category && typeof category.name === 'string' && typeof category.slug === 'string')
}
