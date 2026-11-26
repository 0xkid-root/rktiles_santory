import type { Metadata } from 'next'
import { DealerCatalogue } from '@/components/dealer-catalogue'

export const metadata: Metadata = {
  title: 'Browse Catalogue | RK Tiles & Sanitary',
  description: 'Browse the RK Tiles central product catalogue and add surfaces to My Cart.',
}

export default function DealerCataloguePage() {
  return <DealerCatalogue />
}
