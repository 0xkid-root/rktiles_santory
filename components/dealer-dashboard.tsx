'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Box, Layers3, ShoppingBag, ShoppingCart } from 'lucide-react'
import { useDealerPortal } from '@/components/dealer-portal-context'

export function DealerDashboard() {
  const { profile, uniqueProducts, totalQuantity, categoryCount, categorySummary, cartProducts } = useDealerPortal()
  const firstName = profile.ownerName.trim().split(/\s+/)[0] || 'Dealer'
  const metrics = [
    { label: 'Unique products in My Cart', value: uniqueProducts, icon: ShoppingBag },
    { label: 'Total quantity selected', value: totalQuantity, icon: Box },
    { label: 'Categories in My Cart', value: categoryCount, icon: Layers3 },
  ]

  return <div className="portal-page">
    <section className="portal-page-heading">
      <div><p className="eyebrow">PARTNER OVERVIEW</p><h1>Good to see you, {firstName}.</h1><p>Review your account and manage the products in your My Cart selection.</p></div>
      <Link className="portal-action-link" href="/dealer/my-cart">My Cart <ArrowRight size={15}/></Link>
    </section>

    <section className="portal-metrics" aria-label="Dealer activity summary">
      {metrics.map(({ label, value, icon: Icon }) => <article className="portal-metric-card" key={label}>
        <span className="portal-metric-icon"><Icon size={17} strokeWidth={1.6}/></span><span className="portal-metric-value">{value}</span><span className="portal-metric-label">{label}</span>
      </article>)}
    </section>

    <div className="portal-dashboard-grid">
      <section className="portal-panel portal-cart-preview">
        <div className="portal-panel-heading"><div><p className="eyebrow">YOUR SELECTION</p><h2>My Cart</h2></div><Link className="portal-text-link" href="/dealer/my-cart">View cart <ArrowUpRight size={14}/></Link></div>
        {cartProducts.length ? <div className="portal-preview-list">
          {cartProducts.slice(0, 4).map(({ product, quantity }) => <Link className="portal-preview-item" href="/dealer/my-cart" key={product.slug}>
            <span className="portal-thumb"><Image src={product.image} alt="" fill sizes="72px"/></span><span className="portal-preview-copy"><strong>{product.name}</strong><small>{product.code} · {product.category}</small></span><span className="portal-quantity-chip">× {quantity}</span>
          </Link>)}
          {cartProducts.length > 4 && <p className="portal-list-footnote">And {cartProducts.length - 4} more {cartProducts.length - 4 === 1 ? 'product' : 'products'} in My Cart.</p>}
        </div> : <div className="portal-empty-inline"><ShoppingCart size={22} strokeWidth={1.4}/><p>Your cart is empty.</p><span>Your selected products will appear here.</span></div>}
      </section>

      <section className="portal-panel portal-category-summary">
        <div className="portal-panel-heading"><div><p className="eyebrow">CATEGORY MIX</p><h2>In your cart</h2></div><span className="portal-count-note">{categoryCount} {categoryCount === 1 ? 'category' : 'categories'}</span></div>
        {categorySummary.length ? <ul className="portal-category-list">{categorySummary.map((category) => <li key={category.tag}><span>{category.name}</span><strong>{category.productCount} {category.productCount === 1 ? 'product' : 'products'} · {category.totalQuantity} qty</strong></li>)}</ul> : <p className="portal-muted-copy">Your category breakdown will appear when you add products to My Cart.</p>}
      </section>
    </div>
  </div>
}
