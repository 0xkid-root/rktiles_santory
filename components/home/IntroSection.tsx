import { ArrowUpRight } from 'lucide-react'

export function IntroSection() {
  return (
    <section className="intro section-pad" id="intro">
      <div className="intro-label"><span className="eyebrow">THE ART OF SURFACES</span><span className="fine-line" /></div>
      <h2>Spaces are remembered<br />by <em>how they feel.</em></h2>
      <div className="intro-copy">
        <p>The right surface does more than complete a room. It shapes the atmosphere, brings harmony to the space and becomes part of everyday living.</p>
        <a className="text-link" href="#story">A little about us <ArrowUpRight size={15} /></a>
      </div>
    </section>
  )
}
