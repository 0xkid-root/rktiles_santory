import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export function DealerFooter() {
  return (
    <footer className="detail-footer">
      <Link href="/">RK TILES &amp; SANITARY</Link>
      <span>RK TILES &amp; SANITARY</span>
      <Link href="/dealer/login">
        Partner login <ArrowUpRight size={13} aria-hidden="true" />
      </Link>
    </footer>
  )
}
