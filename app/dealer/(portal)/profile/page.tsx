import type { Metadata } from 'next'
import { DealerProfilePage } from '@/components/dealer-profile'

export const metadata: Metadata = {
  title: 'My Profile | RK Tiles & Sanitary',
  description: 'Review dealer account information and My Cart activity.',
}

export default function DealerProfileRoute() {
  return <DealerProfilePage />
}
