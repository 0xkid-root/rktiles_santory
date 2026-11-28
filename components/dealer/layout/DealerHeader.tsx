import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export function DealerHeader() {
  return (
    <header className="dealer-page-header">
      <Link className="brand dealer-brand" href="/">
        <span className="brand-monogram">RK</span>
        <span className="brand-name">TILES &amp; SANITARY</span>
      </Link>
      <Link className="detail-back" href="/">
        <ArrowLeft size={15} aria-hidden="true" /> Back to RK Tiles &amp; Sanitary
      </Link>
    </header>
  )
}
