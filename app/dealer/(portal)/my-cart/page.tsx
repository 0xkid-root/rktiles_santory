import type { Metadata } from 'next'
import { DealerCart } from '@/components/dealer-cart'

export const metadata: Metadata = {
  title: 'My Cart | RK Tiles & Sanitary',
  description: 'Review selected products and submit a dealer requirement request.',
}

export default function DealerCartPage() {
  return <DealerCart />
}
