'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, ShoppingCart, UserRound, BookOpen, ChevronDown, LogOut } from 'lucide-react'
import type { ReactNode } from 'react'
import { useDealerPortal } from '@/components/dealer-portal-context'
import { useDealerAuth } from '@/hooks/useDealerAuth'
import { LOGIN_PATH } from '@/context/DealerAuthContext'

export function DealerPortalShell({ children }: { children: ReactNode }) {
  const { hydrated, totalQuantity } = useDealerPortal()
  const { dealer, logout } = useDealerAuth()
  const router = useRouter()
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const profileMenuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Real authenticated dealer identity (no hardcoded names).
  const ownerName = dealer?.ownerName?.trim() || dealer?.name?.trim() || dealer?.businessName?.trim() || 'Dealer'
  const email = dealer?.email ?? ''
  const businessName = dealer?.businessName?.trim() || ''
  const initials = ownerName.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'D'
  const firstName = ownerName.split(/\s+/)[0] || 'Dealer'

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

  async function handleLogout() {
    if (isLoggingOut) return
    setIsLoggingOut(true)
    setProfileMenuOpen(false)
    try {
      await logout()
    } finally {
      setIsLoggingOut(false)
      router.replace(LOGIN_PATH)
    }
  }

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
              <div className="portal-profile-dropdown-identity"><strong>{ownerName}</strong>{businessName && <span>{businessName}</span>}<span>{email}</span></div>
              <Link href="/dealer/dashboard" role="menuitem" onClick={() => setProfileMenuOpen(false)}><LayoutDashboard size={15}/> Dashboard</Link>
              <button className="portal-logout-button" role="menuitem" onClick={handleLogout} disabled={isLoggingOut}><LogOut size={15}/> {isLoggingOut ? 'Logging out…' : 'Logout'}</button>
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
