import type { Metadata } from 'next'
import { DealerLoginPage } from '@/components/dealer/pages/DealerLoginPage'

export const metadata: Metadata = {
  title: 'Dealer Login | RK Tiles & Sanitary',
  description: 'Sign in to the RK Tiles & Sanitary Dealer Portal.',
}

export default function DealerLoginRoute() {
  return <DealerLoginPage />
}
