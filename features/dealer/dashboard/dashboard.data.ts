import type { LucideIcon } from 'lucide-react'
import { BookOpen, ShoppingCart, UserRound } from 'lucide-react'

export type DealerQuickAction = { href: string; label: string; description: string; icon: LucideIcon }

/**
 * Quick actions shown on the dealer dashboard. Only implemented routes are linked.
 * No fake sales/revenue/order data.
 */
export const dealerQuickActions: DealerQuickAction[] = [
  { href: '/dealer/catalogue', label: 'Explore Catalogue', description: 'Browse RK Tiles surfaces and add to your selection.', icon: BookOpen },
  { href: '/dealer/my-cart', label: 'View Cart', description: 'Review products in your My Cart selection.', icon: ShoppingCart },
  { href: '/dealer/profile', label: 'Manage Profile', description: 'Review your dealer account details.', icon: UserRound },
]
