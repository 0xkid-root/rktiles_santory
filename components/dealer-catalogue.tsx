'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Check, Search, ShoppingCart } from 'lucide-react'
import { categories } from '@/lib/categories'
import { products } from '@/lib/products'
import { useDealerPortal } from '@/components/dealer-portal-context'

const sizes = Array.from(new Set(products.map((product) => product.size)))
const finishes = Array.from(new Set(products.map((product) => product.finish)))

export function DealerCatalogue() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [size, setSize] = useState('')
  const [finish, setFinish] = useState('')
  const [notice, setNotice] = useState('')
  const { cart, addToCart } = useDealerPortal()

  const visibleProducts = useMemo(() => products.filter((product) => {
    const normalizedSearch = search.trim().toLowerCase()
    const matchesSearch = !normalizedSearch || `${product.name} ${product.code} ${product.category}`.toLowerCase().includes(normalizedSearch)
    return matchesSearch && (!category || product.categoryTags.includes(category)) && (!size || product.size === size) && (!finish || product.finish === finish)
  }), [search, category, size, finish])

  function addProduct(productSlug: string, productName: string) {
    const added = addToCart(productSlug)
    setNotice(added ? `${productName} added to My Cart.` : `The available stock limit for ${productName} is already in My Cart.`)
  }

  return <div className="portal-page">
    <section className="portal-page-heading">
      <div><p className="eyebrow">RK TILES CENTRAL CATALOGUE</p><h1>Browse catalogue.</h1><p>Explore existing RK Tiles surfaces and add products to your personal My Cart selection.</p></div>
      <Link className="portal-action-link" href="/dealer/my-cart"><ShoppingCart size={15}/> My Cart <span className="portal-action-count">{cart.reduce((sum, line) => sum + line.quantity, 0)}</span></Link>
    </section>

    <section className="portal-catalogue-tools" aria-label="Search and filter the catalogue">
      <label className="portal-search"><Search size={16} aria-hidden="true"/><span className="sr-only">Search products</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by product or SKU"/></label>
      <label className="portal-filter"><span>Category</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option value="">All categories</option>{categories.map((item) => <option key={item.tag} value={item.tag}>{item.name}</option>)}</select></label>
      <label className="portal-filter"><span>Tile size</span><select value={size} onChange={(event) => setSize(event.target.value)}><option value="">All sizes</option>{sizes.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
      <label className="portal-filter"><span>Finish</span><select value={finish} onChange={(event) => setFinish(event.target.value)}><option value="">All finishes</option>{finishes.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
    </section>
    <div className="portal-catalogue-result"><p aria-live="polite">{visibleProducts.length} {visibleProducts.length === 1 ? 'surface' : 'surfaces'}</p><span>Stock availability is shown from the central catalogue and is not reserved by adding products.</span></div>
    <p className="sr-only" role="status" aria-live="polite">{notice}</p>

    {visibleProducts.length ? <div className="portal-product-grid">
      {visibleProducts.map((product) => {
        const inCart = cart.find((line) => line.productSlug === product.slug)?.quantity ?? 0
        return <article className="portal-product-card" key={product.slug}>
          <Link className="portal-product-image" href={`/products/${product.slug}`} aria-label={`View ${product.name} product details`}><Image src={product.image} alt={`${product.name} tile surface`} fill sizes="(max-width: 700px) 100vw, 33vw"/><span className="portal-product-detail">Details <ArrowUpRight size={13}/></span></Link>
          <div className="portal-product-copy"><div className="portal-product-title"><div><h2>{product.name}</h2><span>{product.code}</span></div><span className="portal-product-category">{product.category}</span></div>
            <p className="portal-product-spec">{product.size}<i/> {product.finish}</p><p className="portal-stock"><span/> {product.stock}</p>
            <div className="portal-product-actions"><button className="portal-add-button" type="button" onClick={() => addProduct(product.slug, product.name)}><ShoppingCart size={14} aria-hidden="true"/>{inCart ? 'Add another' : 'Add to My Cart'}</button>{inCart > 0 && <span className="portal-in-cart"><Check size={13}/> {inCart} selected</span>}</div>
          </div>
        </article>
      })}
    </div> : <div className="portal-empty-state"><Search size={24} strokeWidth={1.5}/><h2>No surfaces match those filters.</h2><p>Try another search, category, size or finish.</p><button type="button" className="portal-text-button" onClick={() => { setSearch(''); setCategory(''); setSize(''); setFinish('') }}>Clear filters</button></div>}
  </div>
}
