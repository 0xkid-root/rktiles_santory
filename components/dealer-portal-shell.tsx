'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ShoppingCart, UserRound, BookOpen, ChevronDown, LogOut } from 'lucide-react'
import type { ReactNode } from 'react'
import { useDealerPortal } from '@/components/dealer-portal-context'


export function DealerPortalShell({ children }: { children: ReactNode }) {
  const { hydrated, profile, totalQuantity } = useDealerPortal()
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const profileMenuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const initials = profile.ownerName.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase()
  const firstName = profile.ownerName.trim().split(/\s+/)[0] || 'Dealer'

  const navLinks = [
    { href: '/dealer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dealer/profile', label: 'Profile', icon: UserRound },
    { href: '/dealer/my-cart', label: 'My Cart', icon: ShoppingCart, count: totalQuantity },
    { href: '/dealer/catalogue', label: 'Catalogue', icon: BookOpen },
  ]

  useEffect(() => {
    if (!profileMenuOpen) return
    function closeOnOutsideClick(event: PointerEvent) {
      if (!profileMenuRef.current?.contains(event.target as Node)) setProfileMenuOpen(false)
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setProfileMenuOpen(false)
    }
    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [profileMenuOpen])

  if (!hydrated) return <main className="dealer-portal dealer-portal-loading" aria-live="polite">Loading your dealer workspace…</main>

  return <main className="dealer-portal">
    <div className="dealer-portal-frame">
      <div className="dealer-portal-main">
        <header className="portal-topbar">
          <div><p className="eyebrow">RK TILES PARTNER PORTAL</p><span>Welcome back, {firstName}</span></div>
          <div className="portal-profile-menu" ref={profileMenuRef}>
            <button className="portal-topbar-account" type="button" aria-label="Open dealer profile menu" aria-haspopup="menu" aria-expanded={profileMenuOpen} onClick={() => setProfileMenuOpen((open) => !open)}>
              <span className="portal-avatar">{initials}</span><ChevronDown size={14} aria-hidden="true"/>
            </button>
            {profileMenuOpen && <div className="portal-profile-dropdown" role="menu" aria-label="Dealer account">
              <div className="portal-profile-dropdown-identity"><strong>{profile.ownerName}</strong><span>{profile.email}</span></div>
              <Link href="/dealer/dashboard" role="menuitem" onClick={() => setProfileMenuOpen(false)}><LayoutDashboard size={15}/> Dashboard</Link>
              <button className="portal-logout-button" role="menuitem" onClick={() => { setProfileMenuOpen(false); window.location.href = '/dealer/login' }}><LogOut size={15}/> Logout</button>
            </div>}
          </div>
        </header>
        <nav className="portal-nav-bar" aria-label="Dealer portal navigation">
          {navLinks.map(({ href, label, icon: Icon, count }) => {
            const isActive = pathname === href || (href !== '/dealer/dashboard' && pathname.startsWith(href))
            return <Link key={href} href={href} className={`portal-nav-btn${isActive ? ' is-active' : ''}`}>
              <Icon size={16} strokeWidth={1.6}/> {label}
              {count !== undefined && count > 0 && <span className="portal-nav-btn-count">{count}</span>}
            </Link>
          })}
        </nav>
        <div className="portal-content">{children}</div>
      </div>
    </div>
  </main>
}
