'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import { availableStock, useDealerPortal } from '@/components/dealer-portal-context'

export function DealerCart() {
  const { cartProducts, uniqueProducts, totalQuantity, categoryCount, categorySummary, updateQuantity, removeFromCart } = useDealerPortal()

  return <div className="portal-page">
    <section className="portal-page-heading">
      <div><p className="eyebrow">YOUR SELECTED SURFACES</p><h1>My Cart.</h1><p>Adjust quantities or remove products from your current selection.</p></div>
    </section>

    {cartProducts.length ? <div className="portal-cart-layout">
      <section className="portal-cart-lines" aria-label="Products in My Cart">
        {cartProducts.map(({ product, quantity }) => {
          const stock = availableStock(product.slug)
          return <article className="portal-cart-line" key={product.slug}>
            <Link className="portal-cart-image" href={`/products/${product.slug}`} aria-label={`View ${product.name} details`}><Image src={product.image} alt={`${product.name} tile surface`} fill sizes="(max-width: 700px) 35vw, 180px"/></Link>
            <div className="portal-cart-product"><p className="eyebrow">{product.category}</p><h2>{product.name}</h2><p className="portal-cart-sku">SKU {product.code}</p><p className="portal-cart-spec">{product.size} <i/> {product.finish}</p><p className="portal-stock"><span/> {product.stock}</p>
              <div className="portal-quantity-control" aria-label={`Quantity controls for ${product.name}`}>
                <button type="button" aria-label={`Decrease ${product.name} quantity`} disabled={quantity <= 1} onClick={() => updateQuantity(product.slug, quantity - 1)}><Minus size={14}/></button>
                <input aria-label={`${product.name} quantity`} type="number" min={1} max={stock} step={1} value={quantity} onChange={(event) => updateQuantity(product.slug, event.currentTarget.valueAsNumber)}/>
                <button type="button" aria-label={`Increase ${product.name} quantity`} disabled={quantity >= stock} onClick={() => updateQuantity(product.slug, quantity + 1)}><Plus size={14}/></button>
              </div>
              <button className="portal-remove-button" type="button" onClick={() => removeFromCart(product.slug)}><Trash2 size={13}/> Remove</button>
            </div>
          </article>
        })}
      </section>

      <aside className="portal-cart-summary" aria-label="My Cart summary">
        <p className="eyebrow">CURRENT SELECTION</p><h2>Your cart activity.</h2>
        <dl className="portal-summary-stats"><div><dt>Unique products</dt><dd>{uniqueProducts}</dd></div><div><dt>Total quantity</dt><dd>{totalQuantity}</dd></div><div><dt>Categories</dt><dd>{categoryCount}</dd></div></dl>
        <div className="portal-summary-categories"><h3>Category breakdown</h3>{categorySummary.map((category) => <div key={category.tag}><span>{category.name}</span><strong>{category.productCount} {category.productCount === 1 ? 'product' : 'products'} · {category.totalQuantity} qty</strong></div>)}</div>
        <Link className="portal-submit-button" href="/dealer/profile">View profile activity <ArrowRight size={15}/></Link>
        <p className="portal-summary-note">This is your working selection only. No order or request is submitted.</p>
      </aside>
    </div> : <section className="portal-empty-state portal-cart-empty"><ShoppingCart size={30} strokeWidth={1.4}/><p className="eyebrow">NOTHING SELECTED YET</p><h2>Your My Cart is empty.</h2><p>Your selected products will appear here.</p></section>}
  </div>
}
