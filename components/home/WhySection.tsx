import { whyItems } from '@/lib/home-data'
import { SectionTitle } from './SectionTitle'

export function WhySection() {
  return (
    <section className="why section-pad">
      <SectionTitle eyebrow="THE RK TILES &amp; SANITARY DIFFERENCE" title="More than a surface." note="A considered choice for spaces that deserve more." />
      <div className="why-grid">
        {whyItems.map(([n, title, copy]) => (
          <article className="why-item" key={n}><span className="why-number">{n}</span><span className="why-rule" /><h3>{title}</h3><p>{copy}</p></article>
        ))}
      </div>
    </section>
  )
}
