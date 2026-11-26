'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, X } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { categories } from '@/lib/categories'
import { products } from '@/lib/products'

type ProductCatalogProps = {
  initialCategory?: string
}

const finishFilters = ['Matt', 'Polished', 'Silk', 'Textured']

export default function ProductCatalog({ initialCategory }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory ?? null)
  const [selectedFinish, setSelectedFinish] = useState<string | null>(null)
  const categoryFilters = categories.map((category) => category.tag)
  const visibleProducts = products.filter((product) =>
    (!selectedCategory || product.categoryTags.includes(selectedCategory)) &&
    (!selectedFinish || product.finish === selectedFinish)
  )
  const hasActiveFilters = Boolean(selectedCategory || selectedFinish)
  const title = selectedCategory === 'Bathroom'
    ? 'Bathroom tiles'
    : selectedCategory ?? (selectedFinish ? `${selectedFinish} finish` : 'Designed to inspire. Made to last.')

  const clearFilters = () => {
    setSelectedCategory(null)
    setSelectedFinish(null)
  }

  return <section className="products section-pad" id="products">
    <div className="section-head">
      <div className="section-title">
        <p className="eyebrow">{hasActiveFilters ? 'YOUR SELECTION' : 'CURATED FOR YOU'}</p>
        <h1>{title}</h1>
        {hasActiveFilters && <p className="section-note">{visibleProducts.length} {visibleProducts.length === 1 ? 'surface' : 'surfaces'} match your filters.</p>}
      </div>
      {hasActiveFilters && <button className="text-link clear-category" type="button" onClick={clearFilters}>Clear filters <X size={14}/></button>}
      <Link className="text-link desktop-link" href="/#contact">Enquire about a collection <ArrowUpRight size={15}/></Link>
    </div>
    <div className="catalog-filters">
      <div className="filter-line">
        <span className="eyebrow">CATEGORY</span>
        <ToggleGroup value={selectedCategory ? [selectedCategory] : ['all']} onValueChange={(value) => setSelectedCategory(value?.[0] === 'all' ? null : value?.[0] ?? null)} className="filter-options" aria-label="Filter products by category">
          <ToggleGroupItem value="all" className="filter-chip">All categories</ToggleGroupItem>
          {categoryFilters.map((category) => <ToggleGroupItem value={category} key={category} className="filter-chip">{category}</ToggleGroupItem>)}
        </ToggleGroup>
      </div>
      <div className="filter-line">
        <span className="eyebrow">FINISH</span>
        <ToggleGroup value={selectedFinish ? [selectedFinish] : ['all']} onValueChange={(value) => setSelectedFinish(value?.[0] === 'all' ? null : value?.[0] ?? null)} className="filter-options" aria-label="Filter products by finish">
          <ToggleGroupItem value="all" className="filter-chip">All finishes</ToggleGroupItem>
          {finishFilters.map((finish) => <ToggleGroupItem value={finish} key={finish} className="filter-chip">{finish}</ToggleGroupItem>)}
        </ToggleGroup>
      </div>
    </div>
    <p className="product-count" aria-live="polite">{visibleProducts.length}{' '}{visibleProducts.length === 1 ? 'surface' : 'surfaces'}</p>
    {visibleProducts.length ? <div className="product-grid">
      {visibleProducts.map((product, index) => <Link className="product-card" key={product.code} href={`/products/${product.slug}`} aria-label={`View details for ${product.name}`}>
        <span className="product-image"><Image src={product.image} alt={`${product.name} tile surface`} fill sizes="(max-width: 700px) 75vw, 25vw"/><span className="product-index">0{index + 1}</span><span className="product-action">View details <ArrowUpRight size={14}/></span></span>
        <span className="product-info"><span className="product-name">{product.name}</span><span className="product-code">{product.code}</span><span className="product-spec">{product.size} <i/> {product.finish}</span><span className="stock"><span/> {product.stock}</span></span>
      </Link>)}
    </div> : <div className="product-empty"><p>No surfaces match both filters.</p><button type="button" className="text-link" onClick={clearFilters}>Clear filters <X size={14}/></button></div>}
    <div className="mobile-center"><Link className="text-link" href="/#contact">Explore all surfaces <ArrowUpRight size={15}/></Link></div>
  </section>
}
