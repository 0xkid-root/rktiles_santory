import { categories as staticCategories, type TileCategory } from '@/lib/categories'
import type { ApiCategory } from '@/types/category.types'

/** View model preserving the existing public homepage category-card shape. */
export type HomeCategoryCard = {
  key: string
  name: string
  note: string
  image: string
  className: string
  tag: string
  slug: string
  href: string
}

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ')
}

/** Match an API category to an existing static `TileCategory` (slug first, then normalized name). */
export function findStaticCategory(category: Pick<ApiCategory, 'slug' | 'name'>): TileCategory | undefined {
  const slug = normalize(category.slug ?? '')
  const name = normalize(category.name ?? '')
  return (
    staticCategories.find((item) => normalize(item.slug) === slug) ??
    staticCategories.find((item) => normalize(item.name) === name) ??
    staticCategories.find((item) => normalize(item.tag) === name || normalize(item.tag) === slug)
  )
}

/**
 * SAFE route mapping. Never blindly emit a backend slug as href.
 * - If an existing static frontend category matches, link to its existing `/categories/<static-slug>`.
 * - Otherwise, fall back to `/products` (existing route). `/categories/[slug]` is not modified.
 */
export function resolveCategoryRoute(category: Pick<ApiCategory, 'slug' | 'name'>): { href: string; tag: string; slug: string } {
  const match = findStaticCategory(category)
  if (match) return { href: `/categories/${match.slug}`, tag: match.tag, slug: match.slug }
  return { href: '/products', tag: category.name, slug: category.slug }
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85'

/** Map an API category to a homepage card, preserving existing design fields (className, note, image). */
export function toHomeCategoryCard(category: ApiCategory): HomeCategoryCard {
  const match = findStaticCategory(category)
  const route = resolveCategoryRoute(category)
  return {
    key: category._id ?? category.slug ?? category.name,
    name: category.name,
    note: category.description?.trim() || match?.note || '',
    image: category.image?.trim() || match?.image || FALLBACK_IMAGE,
    className: match?.className ?? '',
    tag: route.tag,
    slug: route.slug,
    href: route.href,
  }
}

/** Only live (active + visible) categories; sorted by displayOrder. */
export function mapApiCategories(categories: ApiCategory[]): HomeCategoryCard[] {
  return categories
    .filter((category) => category.isActive !== false && category.isVisible !== false)
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
    .map(toHomeCategoryCard)
}

/** Static safe fallback (used on API error), mapped to the same card shape. */
export function staticCategoryCards(): HomeCategoryCard[] {
  return staticCategories.map((item) => ({
    key: item.slug,
    name: item.name,
    note: item.note,
    image: item.image,
    className: item.className,
    tag: item.tag,
    slug: item.slug,
    href: `/categories/${item.slug}`,
  }))
}
