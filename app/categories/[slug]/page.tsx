import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import ProductCatalog from '@/components/product-catalog'
import { categories } from '@/lib/categories'

export function generateStaticParams() {
  return categories.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = categories.find((item) => item.slug === slug)

  return category
    ? { title: `${category.name} | RK Tiles & Sanitary`, description: `${category.note} Browse ${category.name.toLowerCase()} surfaces from RK Tiles & Sanitary.` }
    : { title: 'Tile collection | RK Tiles & Sanitary' }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = categories.find((item) => item.slug === slug)

  if (!category) notFound()

  return <main className="detail-page catalog-page">
    <header className="detail-header">
      <Link className="brand" href="/"><span className="brand-monogram">RK</span><span className="brand-name">TILES &amp; SANITARY</span></Link>
      <Link className="detail-back" href="/#collections"><ArrowLeft size={15}/> All collections</Link>
    </header>
    <ProductCatalog key={category.slug} initialCategory={category.tag}/>
  </main>
}
