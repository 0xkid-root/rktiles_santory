import { BrandMark } from './BrandMark'

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand"><BrandMark /><p>Thoughtfully selected surfaces<br />for spaces that inspire.</p></div>
        <div className="footer-column"><span className="eyebrow">EXPLORE</span><a href="#home">Home</a><a href="#collections">Collections</a><a href="/products">Products</a><a href="#story">Our story</a><a href="#contact">Contact</a></div>
        <div className="footer-column"><span className="eyebrow">COLLECTIONS</span><a href="#collections">Floor tiles</a><a href="#collections">Wall tiles</a><a href="#collections">Marble</a><a href="#collections">Wooden</a><a href="#collections">Bathroom & outdoor</a></div>
        <div className="footer-column"><span className="eyebrow">CONTACT</span><a href="tel:+918574842272">+91 85748 42272</a><a href="tel:+918953818888">+91 89538 18888</a><a href="mailto:dbsingh087@gmail.com">dbsingh087@gmail.com</a><a href="/dealer/signup">Become a dealer</a><a href="/dealer/login">Dealer login</a></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} RK Tiles &amp; Sanitary. All rights reserved.</span><span className="footer-tagline">RK TILES &amp; SANITARY</span><div><a href="#contact">Privacy</a><a href="#contact">Terms</a></div></div>
    </footer>
  )
}
