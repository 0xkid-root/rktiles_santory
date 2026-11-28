import type { Metadata } from 'next'
import { DealerInterestPage } from '@/components/dealer/pages/DealerInterestPage'

export const metadata: Metadata = {
  title: 'Become a Dealer | RK Tiles & Sanitary',
  description: 'Explore a trade partnership with RK Tiles & Sanitary.',
}

export default function DealerPage() {
  return <DealerInterestPage />
}
