'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useCategories } from '@/hooks/useCategories'
import { mapApiCategories, staticCategoryCards, type HomeCategoryCard } from '@/lib/category-mapping'
import { SectionTitle } from './SectionTitle'

/** Public homepage category section. Categories API (`GET /api/v1/categories`) reusing shared apiClient. No Products API. */
export function CollectionsSection() {
  const { categories: apiCategories, status: categoriesStatus, retry: retryCategories } = useCategories()

  const displayCategories = useMemo(() => {
    if (categoriesStatus === 'success') return mapApiCategories(apiCategories)
    if (categoriesStatus === 'error') return staticCategoryCards() // safe fallback; not broken
    return []
  }, [apiCategories, categoriesStatus])

  const renderCategoryCard = (card: HomeCategoryCard, i: number) => (
    <Link href={card.href} className={`category-card ${card.className}`} key={card.key}>
      <div className="category-image"><Image src={card.image} alt={`${card.name} tile inspiration`} fill sizes="(max-width: 700px) 100vw, 50vw" /></div>
      <div className="category-overlay" />
      <div className="category-caption"><span className="category-number">0{i + 1}</span><div><h3>{card.name}</h3><p>{card.note}</p></div><span className="round-arrow"><ArrowUpRight size={17} /></span></div>
    </Link>
  )

  return (
    <section className="collections section-pad" id="collections">
      <div className="section-head">
        <SectionTitle eyebrow="A WORLD OF POSSIBILITY" title="Explore our collections" note="Textures, tones and finishes for every vision." />
        <Link className="text-link desktop-link" href="/products">Explore all surfaces <ArrowUpRight size={15} /></Link>
      </div>
      {categoriesStatus === 'error' && <p className="category-status category-status-error" role="status">Couldn’t load the latest collections. Showing saved collections. <button type="button" className="category-retry" onClick={retryCategories}>Retry</button></p>}
      <div className="category-grid" aria-busy={categoriesStatus === 'loading'} aria-live="polite">
        {categoriesStatus === 'loading' && <p className="category-status" role="status">Loading collections…</p>}
        {categoriesStatus === 'empty' && <p className="category-status" role="status">No collections available right now. <Link href="/products">Browse all surfaces</Link></p>}
        {displayCategories.map(renderCategoryCard)}
      </div>
    </section>
  )
}
