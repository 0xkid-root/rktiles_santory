import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { AddToCartButton } from '@/components/add-to-cart-button'
import { products } from '@/lib/products'

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = products.find((item) => item.slug === slug)

  return product
    ? { title: `${product.name} | RK Tiles & Sanitary`, description: `${product.name}, a ${product.finish.toLowerCase()} ${product.category.toLowerCase()} surface from RK Tiles & Sanitary.` }
    : { title: 'Surface details | RK Tiles & Sanitary' }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = products.find((item) => item.slug === slug)

  if (!product) notFound()

  const relatedProducts = products.filter((item) => item.slug !== product.slug).slice(0, 3)

  return <main className="detail-page">
    <header className="detail-header"><Link className="brand" href="/"><span className="brand-monogram">RK</span><span className="brand-name">TILES &amp; SANITARY</span></Link><Link className="detail-back" href="/#products"><ArrowLeft size={15}/> All surfaces</Link></header>
    <section className="detail-main">
      <div className="detail-visual"><Image src={product.image} alt={`${product.name} tile surface`} fill priority sizes="(max-width: 700px) 100vw, 55vw"/><span className="detail-photo-label">SURFACE STUDY — {product.code}</span></div>
      <div className="detail-info"><p className="eyebrow">{product.category} / {product.code}</p><h1>{product.name}</h1><p className="detail-description">{product.description}</p><div className="detail-specs"><div><span>FORMAT</span><strong>{product.size}</strong></div><div><span>FINISH</span><strong>{product.finish}</strong></div><div><span>COLOUR</span><strong>{product.color}</strong></div><div><span>AVAILABILITY</span><strong><i className="availability-dot"/> {product.stock}</strong></div></div><AddToCartButton productName={product.name}/><p className="detail-disclaimer">Availability is sample catalogue information and should be confirmed with RK Tiles &amp; Sanitary.</p><Link className="detail-collection-link" href="/#collections">Explore collections <ArrowUpRight size={15}/></Link></div>
    </section>
    <section className="detail-related"><div className="section-title"><p className="eyebrow">CONTINUE EXPLORING</p><h2>More surfaces to consider.</h2></div><div className="detail-related-grid">{relatedProducts.map((item) => <Link className="detail-related-card" key={item.slug} href={`/products/${item.slug}`}><span className="detail-related-image"><Image src={item.image} alt={`${item.name} surface`} fill sizes="(max-width: 700px) 75vw, 30vw"/></span><span className="detail-related-name">{item.name}<ArrowUpRight size={15}/></span><span className="detail-related-spec">{item.size} · {item.finish}</span></Link>)}</div></section>
    <footer className="detail-footer"><Link href="/">RK TILES &amp; SANITARY</Link><span>RK TILES &amp; SANITARY</span><Link href="/dealer">Trade enquiries <ArrowUpRight size={13}/></Link></footer>
  </main>
}
