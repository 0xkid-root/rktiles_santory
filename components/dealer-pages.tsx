'use client'

import Link from 'next/link'
import { useState, type FormEvent, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'

function DealerShell({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children: ReactNode }) {
  return <main className="dealer-page"><header className="dealer-page-header"><Link className="brand dealer-brand" href="/"><span className="brand-monogram">RK</span><span className="brand-name">TILES &amp; SANITARY</span></Link><Link className="detail-back" href="/"><ArrowLeft size={15}/> Back to RK Tiles &amp; Sanitary</Link></header><section className="dealer-page-content"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{children}</section><footer className="detail-footer"><Link href="/">RK TILES &amp; SANITARY</Link><span>RK TILES &amp; SANITARY</span><Link href="/dealer/login">Partner login <ArrowUpRight size={13}/></Link></footer></main>
}

export function DealerInterestPage() {
  const [notice, setNotice] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNotice('This is a preview form. Your information has not been sent; dealer enquiries will be enabled when RK Tiles & Sanitary adds its contact details.')
  }

  return <DealerShell eyebrow="FOR OUR TRADE COMMUNITY" title={<>A partnership built<br/>around <em>good design.</em></>}>
    <p className="dealer-page-intro">Tell us a little about your business and the kind of partnership you have in mind. Our dealer enquiry form is a front-end preview and does not transmit information.</p>
    <form className="dealer-form" onSubmit={handleSubmit}>
      <label>Full name<input name="name" autoComplete="name" required placeholder="Your name"/></label>
      <label>Business name<input name="business" autoComplete="organization" required placeholder="Your business"/></label>
      <label>Work email<input name="email" type="email" autoComplete="email" required placeholder="name@business.com"/></label>
      <label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="Your phone number"/></label>
      <label className="dealer-form-wide">City / region<input name="city" autoComplete="address-level2" required placeholder="Where is your business based?"/></label>
      <button className="button button-dark" type="submit">Continue your enquiry <ArrowRight size={16}/></button>
      {notice && <p className="form-notice" role="status">{notice}</p>}
    </form>
    <p className="dealer-page-footnote">Already working with us? <Link href="/dealer/login">Go to dealer login <ArrowUpRight size={14}/></Link></p>
  </DealerShell>
}

export function DealerLoginPage() {
  const [notice, setNotice] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNotice('Dealer authentication is not connected in this preview. No sign-in was attempted.')
  }

  return <DealerShell eyebrow="RK TILES PARTNER PORTAL" title={<>Welcome<br/><em>back.</em></>}>
    <p className="dealer-page-intro">A dedicated space for RK Tiles & Sanitary trade partners. Dealer accounts are not active yet; this sign-in form is a visual preview only.</p>
    <form className="dealer-form dealer-login-form" onSubmit={handleSubmit}>
      <label className="dealer-form-wide">Email address<input name="email" type="email" autoComplete="username" required placeholder="name@business.com"/></label>
      <label className="dealer-form-wide">Password<input name="password" type="password" autoComplete="current-password" required placeholder="Enter your password"/></label>
      <button className="button button-dark" type="submit">Sign in <ArrowRight size={16}/></button>
      {notice && <p className="form-notice" role="status">{notice}</p>}
    </form>
    <p className="dealer-page-footnote">Preview the mock dealer workspace: <Link href="/dealer/dashboard">Open demo dashboard <ArrowUpRight size={14}/></Link></p>
    <p className="dealer-page-footnote">Not a partner yet? <Link href="/dealer">Explore becoming a dealer <ArrowUpRight size={14}/></Link></p>
  </DealerShell>
}
