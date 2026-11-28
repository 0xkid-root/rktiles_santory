import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { photos } from '@/lib/home-data'

export function MaterialSection() {
  return (
    <section className="material section-pad">
      <div className="material-image"><Image src={photos.detail} alt="Close detail of natural stone texture and warm material tones" fill sizes="(max-width: 700px) 100vw, 60vw" /></div>
      <div className="material-copy">
        <p className="eyebrow">A CLOSER LOOK</p>
        <h2>Beauty in<br />every <em>detail.</em></h2>
        <p>Natural variation. Considered finishes. The quiet character that makes a surface entirely your own.</p>
        <a className="text-link" href="/products">Discover the details <ArrowUpRight size={15} /></a>
        <span className="material-caption">MATERIAL STUDY — 001</span>
      </div>
    </section>
  )
}
