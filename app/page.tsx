'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Mail, MapPin, Menu, Pause, Phone, Play, Search, X } from 'lucide-react'
import { products } from '@/lib/products'
import { categories } from '@/lib/categories'

const photos = {
  hero: '/rk-hero.png',
  marble: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85',
  wood: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85',
  bath: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=900&q=85',
  detail: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85',
  story: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
}

const heroSlides = [
  { image: photos.hero, alt: 'Sunlit contemporary living room with warm natural stone flooring' },
  { image: photos.marble, alt: 'Bright living space with elegant marble-inspired surfaces' },
  { image: photos.wood, alt: 'Warm interior with natural wood-look flooring' },
  { image: photos.bath, alt: 'Quiet, modern bathroom with refined stone surfaces' },
]

const navLinks = [['Home', '#home'], ['Collections', '#collections'], ['Products', '/products'], ['Our story', '#story']]

function BrandMark() {
  return <a className="brand" href="#home" aria-label="RK Tiles and Sanitary home"><span className="brand-monogram">RK</span><span className="brand-name">TILES &amp; SANITARY</span></a>
}

function SectionTitle({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  return <div className="section-title"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{note && <p className="section-note">{note}</p>}</div>
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeSlide, setActiveSlide] = useState(0)
  const [isHeroPaused, setIsHeroPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setReducedMotion(motionPreference.matches)
    updateMotionPreference()
    motionPreference.addEventListener('change', updateMotionPreference)
    return () => motionPreference.removeEventListener('change', updateMotionPreference)
  }, [])

  useEffect(() => {
    if (isHeroPaused || reducedMotion) return
    const interval = window.setInterval(() => setActiveSlide((current) => (current + 1) % heroSlides.length), 6000)
    return () => window.clearInterval(interval)
  }, [activeSlide, isHeroPaused, reducedMotion])
  const filtered = products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()))

  return <main>
    <header className="site-header">
      <div className="nav-wrap"><BrandMark /><nav className="desktop-nav" aria-label="Main navigation">{navLinks.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</nav><div className="nav-actions"><button className="icon-button search-trigger" aria-label="Search products" onClick={() => setSearchOpen(!searchOpen)}><Search size={18} strokeWidth={1.5}/></button><a className="nav-cta" href="#contact">Visit our showroom <ArrowUpRight size={15}/></a><button className="icon-button menu-trigger" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button></div></div>
      {searchOpen && <div className="search-panel"><Search size={18}/><input autoFocus aria-label="Search tile collections" placeholder="Search surfaces..." value={query} onChange={(event) => setQuery(event.target.value)}/><button className="icon-button" onClick={() => { setSearchOpen(false); setQuery('') }} aria-label="Close search"><X size={18}/></button><div className="search-results">{query && (filtered.length ? filtered.map((product) => <Link key={product.code} href={`/products/${product.slug}`} onClick={() => setSearchOpen(false)}>{product.name}<ArrowUpRight size={14}/></Link>) : <span>No surfaces found. Try another name.</span>)}</div></div>}
      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>{navLinks.map(([label, href]) => <a key={label} href={href} onClick={closeMenu}>{label}<ArrowUpRight size={16}/></a>)}<a href="#contact" onClick={closeMenu}>Visit our showroom<ArrowUpRight size={16}/></a></div>
    </header>

    <section className="hero" id="home" aria-label="RK Tiles and Sanitary" aria-roledescription="carousel">{heroSlides.map((slide, index) => <Image key={slide.image} src={slide.image} alt={index === activeSlide ? slide.alt : ''} aria-hidden={index !== activeSlide} fill priority={index === 0} sizes="100vw" className={`hero-image ${index === activeSlide ? 'is-active' : ''}`}/>)}<div className="hero-shade"/><div className="hero-copy"><p className="eyebrow light">SURFACES THAT DEFINE SPACES</p><h1>A foundation for<br/><em>beautiful living.</em></h1><p className="hero-description">Thoughtfully curated surfaces that bring character, elegance and lasting beauty to every space.</p><div className="hero-buttons"><a className="button button-light" href="#collections">Explore collections <ArrowRight size={16}/></a><a className="button button-quiet" href="#story">Discover RK Tiles <ArrowUpRight size={15}/></a></div></div><a className="scroll-cue" href="#intro"><span>SCROLL TO DISCOVER</span><ArrowDown size={15}/></a><div className="hero-controls" role="group" aria-label="Hero image controls"><button className="hero-control" type="button" aria-label="Previous hero image" onClick={() => setActiveSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length)}><ChevronLeft size={15}/></button><span className="hero-index" aria-live="polite">{String(activeSlide + 1).padStart(2, '0')} <span>/</span> {String(heroSlides.length).padStart(2, '0')}</span><button className="hero-control" type="button" aria-label="Next hero image" onClick={() => setActiveSlide((current) => (current + 1) % heroSlides.length)}><ChevronRight size={15}/></button><button className="hero-control" type="button" disabled={reducedMotion} aria-pressed={isHeroPaused} aria-label={reducedMotion ? 'Automatic image changes disabled by reduced-motion preference' : isHeroPaused ? 'Resume automatic image changes' : 'Pause automatic image changes'} onClick={() => setIsHeroPaused((paused) => !paused)}>{isHeroPaused || reducedMotion ? <Play size={13}/> : <Pause size={13}/>}</button></div></section>

    <section className="intro section-pad" id="intro"><div className="intro-label"><span className="eyebrow">THE ART OF SURFACES</span><span className="fine-line"/></div><h2>Spaces are remembered<br/>by <em>how they feel.</em></h2><div className="intro-copy"><p>The right surface does more than complete a room. It shapes the atmosphere, brings harmony to the space and becomes part of everyday living.</p><a className="text-link" href="#story">A little about us <ArrowUpRight size={15}/></a></div></section>

    <section className="collections section-pad" id="collections"><div className="section-head"><SectionTitle eyebrow="A WORLD OF POSSIBILITY" title="Explore our collections" note="Textures, tones and finishes for every vision."/><Link className="text-link desktop-link" href="/products">Explore all surfaces <ArrowUpRight size={15}/></Link></div><div className="category-grid">{categories.map((category, i) => <Link href={`/categories/${category.slug}`} className={`category-card ${category.className}`} key={category.slug}><div className="category-image"><Image src={category.image} alt={`${category.name} tile inspiration`} fill sizes="(max-width: 700px) 100vw, 50vw"/></div><div className="category-overlay"/><div className="category-caption"><span className="category-number">0{i + 1}</span><div><h3>{category.name}</h3><p>{category.note}</p></div><span className="round-arrow"><ArrowUpRight size={17}/></span></div></Link>)}</div></section>

    <section className="material section-pad"><div className="material-image"><Image src={photos.detail} alt="Close detail of natural stone texture and warm material tones" fill sizes="(max-width: 700px) 100vw, 60vw"/></div><div className="material-copy"><p className="eyebrow">A CLOSER LOOK</p><h2>Beauty in<br/>every <em>detail.</em></h2><p>Natural variation. Considered finishes. The quiet character that makes a surface entirely your own.</p><a className="text-link" href="/products">Discover the details <ArrowUpRight size={15}/></a><span className="material-caption">MATERIAL STUDY — 001</span></div></section>

    <section className="why section-pad"><SectionTitle eyebrow="THE RK TILES &amp; SANITARY DIFFERENCE" title="More than a surface." note="A considered choice for spaces that deserve more."/><div className="why-grid">{[['01','Thoughtfully curated','Collections selected to balance beauty, versatility and modern design.'],['02','Quality you can trust','Surfaces chosen for dependable quality and everyday performance.'],['03','Designs for every space','Discover options for living spaces, bathrooms, kitchens and more.'],['04','Reliable availability','A catalogue backed by a focus on stock visibility and customer support.']].map(([n,title,copy])=><article className="why-item" key={n}><span className="why-number">{n}</span><span className="why-rule"/><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className="inspiration section-pad"><div className="section-head"><SectionTitle eyebrow="SPACES TO COME HOME TO" title="Find inspiration for your next space."/><p className="inspiration-note">A collection of quiet moments<br/>and considered materials.</p></div><div className="inspiration-grid"><a href="/products" className="inspiration-card inspiration-large"><Image src={photos.hero} alt="Contemporary living room with limestone flooring" fill sizes="60vw"/><span>01 — Contemporary living <ArrowUpRight size={14}/></span></a><a href="#collections" className="inspiration-card"><Image src={photos.bath} alt="Warm minimalist bathroom with stone surfaces" fill sizes="40vw"/><span>02 — Quiet luxury <ArrowUpRight size={14}/></span></a><a href="#collections" className="inspiration-card"><Image src={photos.marble} alt="Natural marble interior detail" fill sizes="40vw"/><span>03 — Natural stone <ArrowUpRight size={14}/></span></a></div></section>

    <section className="story section-pad" id="story"><div className="story-image"><Image src={photos.story} alt="Architectural interior featuring natural wood and stone finishes" fill sizes="50vw"/><span className="image-note">A PLACE FOR POSSIBILITY</span></div><div className="story-copy"><p className="eyebrow">OUR POINT OF VIEW</p><h2>Every space begins<br/>with the <em>right choice.</em></h2><p>At RK Tiles &amp; Sanitary, we bring together thoughtfully selected designs and surfaces to help transform everyday spaces into something meaningful. From timeless stone-inspired textures to contemporary finishes, our collections are chosen with an appreciation for quality, style and lasting value.</p><a className="button button-dark" href="#contact">Discover our story <ArrowRight size={16}/></a></div></section>

    <section className="dealer"><div className="dealer-background"/><div className="dealer-content"><p className="eyebrow light">FOR OUR TRADE COMMUNITY</p><h2>Let&apos;s build something<br/><em>beautiful together.</em></h2><p>Looking to grow your tile business with RK Tiles &amp; Sanitary? Explore a partnership built around collections, availability and dependable support.</p><div className="dealer-links"><a className="button button-light" href="/dealer">Become a dealer <ArrowRight size={16}/></a><a className="dealer-login" href="/dealer/login">Already a partner? Dealer login <ArrowUpRight size={14}/></a></div></div><span className="dealer-side-note">A PARTNERSHIP IN GOOD TASTE</span></section>

    <section className="contact section-pad" id="contact"><div className="contact-copy"><p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p><h2>Come discover<br/>the <em>possibilities.</em></h2><p>Visit RK Tiles &amp; Sanitary for thoughtfully selected surfaces and personal help finding the right finish for your space.</p><a href="#collections" className="button button-dark">Explore collections <ArrowUpRight size={15}/></a></div><div className="contact-details" aria-label="Showroom contact details"><a className="contact-card" href="tel:+918574842272"><span className="contact-icon"><Phone size={18} strokeWidth={1.5}/></span><span className="contact-card-copy"><span className="eyebrow">CALL US · 01</span><strong>+91 85748 42272</strong></span><ArrowUpRight className="contact-arrow" size={15}/></a><a className="contact-card" href="tel:+918953818888"><span className="contact-icon"><Phone size={18} strokeWidth={1.5}/></span><span className="contact-card-copy"><span className="eyebrow">CALL US · 02</span><strong>+91 89538 18888</strong></span><ArrowUpRight className="contact-arrow" size={15}/></a><a className="contact-card contact-card-wide" href="mailto:dbsingh087@gmail.com"><span className="contact-icon"><Mail size={18} strokeWidth={1.5}/></span><span className="contact-card-copy"><span className="eyebrow">EMAIL</span><strong>dbsingh087@gmail.com</strong></span><ArrowUpRight className="contact-arrow" size={15}/></a><a className="contact-card contact-card-wide" href="https://www.google.com/maps/search/?api=1&query=Plot%20No.%20386%2C%20Allu%20Nagar%20Diguria%2C%20near%20Royal%20Metro%20Colony%20%2F%20KMC%20Language%20University%20Road%2C%20IIM%20Road%2C%20Lucknow%2C%20Uttar%20Pradesh%20226013%20%2F%20226020" target="_blank" rel="noreferrer"><span className="contact-icon"><MapPin size={18} strokeWidth={1.5}/></span><span className="contact-card-copy"><span className="eyebrow">VISIT OUR SHOWROOM</span><strong>Plot No. 386, Allu Nagar Diguria</strong><span className="contact-address">Near Royal Metro Colony / KMC Language University Road, IIM Road, Lucknow, Uttar Pradesh – 226013 / 226020</span></span><ArrowUpRight className="contact-arrow" size={15}/></a></div><span className="contact-mark" aria-hidden="true">RK</span></section>

    <footer className="footer"><div className="footer-main"><div className="footer-brand"><BrandMark/><p>Thoughtfully selected surfaces<br/>for spaces that inspire.</p></div><div className="footer-column"><span className="eyebrow">EXPLORE</span><a href="#home">Home</a><a href="#collections">Collections</a><a href="/products">Products</a><a href="#story">Our story</a><a href="#contact">Contact</a></div><div className="footer-column"><span className="eyebrow">COLLECTIONS</span><a href="#collections">Floor tiles</a><a href="#collections">Wall tiles</a><a href="#collections">Marble</a><a href="#collections">Wooden</a><a href="#collections">Bathroom & outdoor</a></div><div className="footer-column"><span className="eyebrow">CONTACT</span><a href="tel:+918574842272">+91 85748 42272</a><a href="tel:+918953818888">+91 89538 18888</a><a href="mailto:dbsingh087@gmail.com">dbsingh087@gmail.com</a><a href="/dealer">Become a dealer</a><a href="/dealer/login">Dealer login</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} RK Tiles &amp; Sanitary. All rights reserved.</span><span className="footer-tagline">RK TILES &amp; SANITARY</span><div><a href="#contact">Privacy</a><a href="#contact">Terms</a></div></div></footer>

  </main>
}
