import type { Metadata } from 'next'
import { DealerDashboard } from '@/components/dealer-dashboard'

export const metadata: Metadata = {
  title: 'Dealer Dashboard | RK Tiles & Sanitary',
  description: 'Review your My Cart selection and dealer requirement activity.',
}

export default function DealerDashboardPage() {
  return <DealerDashboard />
}
