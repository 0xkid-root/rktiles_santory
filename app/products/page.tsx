import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ProductCatalog from '@/components/product-catalog'

export const metadata = {
  title: 'All Surfaces | RK Tiles & Sanitary',
  description: 'Browse tile collections by category and finish, with product specifications and availability from RK Tiles & Sanitary.',
}

export default function ProductsPage() {
  return <main className="detail-page catalog-page">
    <header className="detail-header">
      <Link className="brand" href="/"><span className="brand-monogram">RK</span><span className="brand-name">TILES &amp; SANITARY</span></Link>
      <Link className="detail-back" href="/"><ArrowLeft size={15}/> Back to home</Link>
    </header>
    <ProductCatalog/>
  </main>
}
