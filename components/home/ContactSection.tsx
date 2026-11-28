import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'

export function ContactSection() {
  return (
    <section className="contact section-pad" id="contact">
      <div className="contact-copy">
        <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
        <h2>Come discover<br />the <em>possibilities.</em></h2>
        <p>Visit RK Tiles &amp; Sanitary for thoughtfully selected surfaces and personal help finding the right finish for your space.</p>
        <a href="#collections" className="button button-dark">Explore collections <ArrowUpRight size={15} /></a>
      </div>
      <div className="contact-details" aria-label="Showroom contact details">
        <a className="contact-card" href="tel:+918574842272"><span className="contact-icon"><Phone size={18} strokeWidth={1.5} /></span><span className="contact-card-copy"><span className="eyebrow">CALL US · 01</span><strong>+91 85748 42272</strong></span><ArrowUpRight className="contact-arrow" size={15} /></a>
        <a className="contact-card" href="tel:+918953818888"><span className="contact-icon"><Phone size={18} strokeWidth={1.5} /></span><span className="contact-card-copy"><span className="eyebrow">CALL US · 02</span><strong>+91 89538 18888</strong></span><ArrowUpRight className="contact-arrow" size={15} /></a>
        <a className="contact-card contact-card-wide" href="mailto:dbsingh087@gmail.com"><span className="contact-icon"><Mail size={18} strokeWidth={1.5} /></span><span className="contact-card-copy"><span className="eyebrow">EMAIL</span><strong>dbsingh087@gmail.com</strong></span><ArrowUpRight className="contact-arrow" size={15} /></a>
        <a className="contact-card contact-card-wide" href="https://www.google.com/maps/search/?api=1&query=Plot%20No.%20386%2C%20Allu%20Nagar%20Diguria%2C%20near%20Royal%20Metro%20Colony%20%2F%20KMC%20Language%20University%20Road%2C%20IIM%20Road%2C%20Lucknow%2C%20Uttar%20Pradesh%20226013%20%2F%20226020" target="_blank" rel="noreferrer"><span className="contact-icon"><MapPin size={18} strokeWidth={1.5} /></span><span className="contact-card-copy"><span className="eyebrow">VISIT OUR SHOWROOM</span><strong>Plot No. 386, Allu Nagar Diguria</strong><span className="contact-address">Near Royal Metro Colony / KMC Language University Road, IIM Road, Lucknow, Uttar Pradesh – 226013 / 226020</span></span><ArrowUpRight className="contact-arrow" size={15} /></a>
      </div>
      <span className="contact-mark" aria-hidden="true">RK</span>
    </section>
  )
}
