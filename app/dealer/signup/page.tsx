import type { Metadata } from 'next'
import { DealerSignupPage } from '@/components/dealer/pages/DealerSignupPage'

export const metadata: Metadata = {
  title: 'Create Dealer Account | RK Tiles & Sanitary',
  description: 'Register your business as an RK Tiles & Sanitary dealer. Accounts start pending admin approval.',
}

export default function DealerSignupRoute() {
  return <DealerSignupPage />
}
