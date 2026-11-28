import { ArrowRight, ArrowUpRight } from 'lucide-react'

export function DealerSection() {
  return (
    <section className="dealer">
      <div className="dealer-background" />
      <div className="dealer-content">
        <p className="eyebrow light">FOR OUR TRADE COMMUNITY</p>
        <h2>Let&apos;s build something<br /><em>beautiful together.</em></h2>
        <p>Looking to grow your tile business with RK Tiles &amp; Sanitary? Explore a partnership built around collections, availability and dependable support.</p>
        <div className="dealer-links">
          <a className="button button-light" href="/dealer">Become a dealer <ArrowRight size={16} /></a>
          <a className="dealer-login" href="/dealer/login">Already a partner? Dealer login <ArrowUpRight size={14} /></a>
        </div>
      </div>
      <span className="dealer-side-note">A PARTNERSHIP IN GOOD TASTE</span>
    </section>
  )
}
