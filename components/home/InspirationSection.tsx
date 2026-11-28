import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { photos } from '@/lib/home-data'
import { SectionTitle } from './SectionTitle'

export function InspirationSection() {
  return (
    <section className="inspiration section-pad">
      <div className="section-head">
        <SectionTitle eyebrow="SPACES TO COME HOME TO" title="Find inspiration for your next space." />
        <p className="inspiration-note">A collection of quiet moments<br />and considered materials.</p>
      </div>
      <div className="inspiration-grid">
        <a href="/products" className="inspiration-card inspiration-large"><Image src={photos.hero} alt="Contemporary living room with limestone flooring" fill sizes="60vw" /><span>01 — Contemporary living <ArrowUpRight size={14} /></span></a>
        <a href="#collections" className="inspiration-card"><Image src={photos.bath} alt="Warm minimalist bathroom with stone surfaces" fill sizes="40vw" /><span>02 — Quiet luxury <ArrowUpRight size={14} /></span></a>
        <a href="#collections" className="inspiration-card"><Image src={photos.marble} alt="Natural marble interior detail" fill sizes="40vw" /><span>03 — Natural stone <ArrowUpRight size={14} /></span></a>
      </div>
    </section>
  )
}
