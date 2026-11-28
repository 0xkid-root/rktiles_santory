'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { categories } from '@/lib/categories'
import { products } from '@/lib/products'
import { useDealerAuth } from '@/hooks/useDealerAuth'
import type { Dealer } from '@/types/dealer.types'

const STORAGE_KEY = 'rk-dealer-portal-v1'

export type CartLine = { productSlug: string; quantity: number }
export type DealerProfile = {
  ownerName: string
  businessName: string
  dealerId: string
  approvalStatus: string
  registeredAt: string
  email: string
  mobile: string
  alternatePhone: string
  businessType: string
  gstNumber: string
  verificationStatus: string
  address: string
  city: string
  state: string
  pinCode: string
  country: string
}
// No hardcoded demo identity. Real authenticated dealer data is synced in DealerPortalProvider.
const initialProfile: DealerProfile = {
  ownerName: '',
  businessName: '',
  dealerId: '',
  approvalStatus: '',
  registeredAt: '',
  email: '',
  mobile: '',
  alternatePhone: '',
  businessType: '',
  gstNumber: '',
  verificationStatus: '',
  address: '',
  city: '',
  state: '',
  pinCode: '',
  country: '',
}

const initialState = { cart: [] as CartLine[], profile: initialProfile }
const editableProfileFields: (keyof DealerProfile)[] = ['ownerName', 'mobile', 'alternatePhone', 'address', 'city', 'state', 'pinCode']

export function availableStock(productSlug: string) {
  const product = products.find((item) => item.slug === productSlug)
  return Number(product?.stock.match(/\d+/)?.[0] ?? 0)
}

type CartProduct = CartLine & { product: (typeof products)[number] }
type CategorySummary = { tag: string; name: string; productCount: number; totalQuantity: number }
type DealerPortalValue = {
  hydrated: boolean
  cart: CartLine[]
  cartProducts: CartProduct[]
  profile: DealerProfile
  uniqueProducts: number
  totalQuantity: number
  categorySummary: CategorySummary[]
  categoryCount: number
  addToCart: (productSlug: string, quantity?: number) => boolean
  updateQuantity: (productSlug: string, quantity: number) => void
  removeFromCart: (productSlug: string) => void
  updateProfile: (values: Partial<DealerProfile>) => void
}

const DealerPortalContext = createContext<DealerPortalValue | null>(null)

function readStoredState() {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return initialState
    const stored = JSON.parse(raw) as Partial<typeof initialState>
    const cartMap = new Map<string, number>()

    if (Array.isArray(stored.cart)) {
      for (const line of stored.cart) {
        const product = products.find((item) => item.slug === line.productSlug)
        if (!product || !Number.isSafeInteger(line.quantity) || line.quantity < 1) continue
        cartMap.set(product.slug, Math.min(availableStock(product.slug), (cartMap.get(product.slug) ?? 0) + line.quantity))
      }
    }

    const storedProfile: Partial<DealerProfile> = stored.profile && typeof stored.profile === 'object' ? stored.profile : {}
    const profile = { ...initialProfile }
    for (const field of editableProfileFields) {
      const value = storedProfile[field]
      if (typeof value === 'string') profile[field] = value
    }

    return {
      cart: Array.from(cartMap, ([productSlug, quantity]) => ({ productSlug, quantity })),
      profile,
    }
  } catch {
    return initialState
  }
}

function mapDealerToProfile(dealer: Dealer): Partial<DealerProfile> {
  const address = dealer.address ?? {}
  return {
    ownerName: dealer.ownerName ?? dealer.name ?? '',
    businessName: dealer.businessName ?? '',
    dealerId: dealer.dealerId ?? '',
    approvalStatus: dealer.approvalStatus ?? '',
    registeredAt: dealer.createdAt ?? '',
    email: dealer.email ?? '',
    mobile: dealer.mobile ?? '',
    alternatePhone: dealer.alternateMobile ?? '',
    businessType: dealer.businessType ?? '',
    gstNumber: dealer.gstNumber ?? '',
    verificationStatus: dealer.verificationStatus ?? '',
    address: address.street ?? '',
    city: address.city ?? '',
    state: address.state ?? '',
    pinCode: address.pincode ?? '',
    country: address.country ?? '',
  }
}

export function DealerPortalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(initialState)
  const [hydrated, setHydrated] = useState(false)
  const { dealer } = useDealerAuth()

  useEffect(() => {
    setState(readStoredState())
    setHydrated(true)
  }, [])

  // Sync preview profile from the real authenticated dealer (no hardcoded identity). Profile API is out of scope.
  useEffect(() => {
    if (!dealer) return
    const mapped = mapDealerToProfile(dealer)
    setState((current) => ({ ...current, profile: { ...current.profile, ...mapped } }))
  }, [dealer])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // The portal remains usable for the current render if session storage is unavailable.
    }
  }, [hydrated, state])

  const addToCart = useCallback((productSlug: string, quantity = 1) => {
    const stock = availableStock(productSlug)
    if (!stock || !Number.isSafeInteger(quantity) || quantity < 1) return false
    const existing = state.cart.find((line) => line.productSlug === productSlug)
    const currentQuantity = existing?.quantity ?? 0
    if (!products.some((item) => item.slug === productSlug) || currentQuantity >= stock) return false
    setState((current) => {
      const currentLine = current.cart.find((line) => line.productSlug === productSlug)
      const nextQuantity = Math.min(stock, (currentLine?.quantity ?? 0) + quantity)
      if (nextQuantity === (currentLine?.quantity ?? 0)) return current
      return {
        ...current,
        cart: currentLine
          ? current.cart.map((line) => line.productSlug === productSlug ? { ...line, quantity: nextQuantity } : line)
          : [...current.cart, { productSlug, quantity: nextQuantity }],
      }
    })
    return true
  }, [state.cart])

  const updateQuantity = useCallback((productSlug: string, quantity: number) => {
    if (!Number.isSafeInteger(quantity) || quantity < 1) return
    const stock = availableStock(productSlug)
    if (!stock) return
    setState((current) => ({
      ...current,
      cart: current.cart.map((line) => line.productSlug === productSlug
        ? { ...line, quantity: Math.min(stock, quantity) }
        : line),
    }))
  }, [])

  const removeFromCart = useCallback((productSlug: string) => {
    setState((current) => ({ ...current, cart: current.cart.filter((line) => line.productSlug !== productSlug) }))
  }, [])

  const updateProfile = useCallback((values: Partial<DealerProfile>) => {
    setState((current) => {
      const safeValues: Partial<DealerProfile> = {}
      for (const field of editableProfileFields) {
        const value = values[field]
        if (typeof value === 'string') safeValues[field] = value.trim()
      }
      return { ...current, profile: { ...current.profile, ...safeValues } }
    })
  }, [])

  const cartProducts = useMemo(() => state.cart.flatMap((line) => {
    const product = products.find((item) => item.slug === line.productSlug)
    return product ? [{ ...line, product }] : []
  }), [state.cart])
  const categorySummary = useMemo(() => categories.flatMap((category) => {
    const categoryProducts = cartProducts.filter((line) => line.product.categoryTags.includes(category.tag))
    const productCount = categoryProducts.length
    const totalQuantity = categoryProducts.reduce((total, line) => total + line.quantity, 0)
    return productCount ? [{ tag: category.tag, name: category.name, productCount, totalQuantity }] : []
  }), [cartProducts])
  const value = useMemo<DealerPortalValue>(() => ({
    hydrated,
    cart: state.cart,
    cartProducts,
    profile: state.profile,
    uniqueProducts: state.cart.length,
    totalQuantity: state.cart.reduce((total, line) => total + line.quantity, 0),
    categorySummary,
    categoryCount: categorySummary.length,
    addToCart,
    updateQuantity,
    removeFromCart,
    updateProfile,
  }), [hydrated, state, cartProducts, categorySummary, addToCart, updateQuantity, removeFromCart, updateProfile])

  return <DealerPortalContext.Provider value={value}>{children}</DealerPortalContext.Provider>
}

export function useDealerPortal() {
  const value = useContext(DealerPortalContext)
  if (!value) throw new Error('useDealerPortal must be used within DealerPortalProvider')
  return value
}
