'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Menu, Search, X } from 'lucide-react'
import { products } from '@/lib/products'
import { navLinks } from '@/lib/home-data'
import { BrandMark } from './BrandMark'

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const closeMenu = () => setMenuOpen(false)

  const filtered = products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <header className="site-header">
      <div className="nav-wrap">
        <BrandMark />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </nav>
        <div className="nav-actions">
          <button className="icon-button search-trigger" aria-label="Search products" onClick={() => setSearchOpen(!searchOpen)}><Search size={18} strokeWidth={1.5} /></button>
          <a className="nav-cta" href="#contact">Visit our showroom <ArrowUpRight size={15} /></a>
          <button className="icon-button menu-trigger" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
      {searchOpen && (
        <div className="search-panel">
          <Search size={18} />
          <input autoFocus aria-label="Search tile collections" placeholder="Search surfaces..." value={query} onChange={(event) => setQuery(event.target.value)} />
          <button className="icon-button" onClick={() => { setSearchOpen(false); setQuery('') }} aria-label="Close search"><X size={18} /></button>
          <div className="search-results">
            {query && (filtered.length
              ? filtered.map((product) => <Link key={product.code} href={`/products/${product.slug}`} onClick={() => setSearchOpen(false)}>{product.name}<ArrowUpRight size={14} /></Link>)
              : <span>No surfaces found. Try another name.</span>)}
          </div>
        </div>
      )}
      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        {navLinks.map(([label, href]) => <a key={label} href={href} onClick={closeMenu}>{label}<ArrowUpRight size={16} /></a>)}
        <a href="#contact" onClick={closeMenu}>Visit our showroom<ArrowUpRight size={16} /></a>
      </div>
    </header>
  )
}
