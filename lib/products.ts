export type TileProduct = {
  slug: string
  name: string
  code: string
  size: string
  finish: string
  color: string
  category: string
  categoryTags: string[]
  image: string
  stock: string
  description: string
}

export const products: TileProduct[] = [
  {
    slug: 'calacatta-white',
    name: 'Calacatta White',
    code: 'RK—1001',
    size: '600 × 1200 mm',
    finish: 'Polished',
    color: 'Ivory with soft grey veining',
    category: 'Marble collection',
    categoryTags: ['Floor tiles', 'Wall tiles', 'Marble collection', 'Bathroom'],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    stock: '180 boxes available',
    description: 'A luminous marble-inspired surface with delicate, natural-looking veining. An elegant foundation for calm, considered interiors.',
  },
  {
    slug: 'travertine-sand',
    name: 'Travertine Sand',
    code: 'RK—2048',
    size: '600 × 1200 mm',
    finish: 'Matt',
    color: 'Warm sand',
    category: 'Stone collection',
    categoryTags: ['Floor tiles', 'Wall tiles', 'Bathroom', 'Outdoor'],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
    stock: '96 boxes available',
    description: 'Soft, organic variation and a tactile matt finish bring a grounded warmth to contemporary spaces.',
  },
  {
    slug: 'nero-marquina',
    name: 'Nero Marquina',
    code: 'RK—3072',
    size: '800 × 800 mm',
    finish: 'Silk',
    color: 'Deep charcoal with pale veining',
    category: 'Marble collection',
    categoryTags: ['Floor tiles', 'Wall tiles', 'Marble collection', 'Bathroom'],
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85',
    stock: '64 boxes available',
    description: 'A dramatic charcoal stone look with a refined silk sheen, designed to make a confident architectural statement.',
  },
  {
    slug: 'oak-natural',
    name: 'Oak Natural',
    code: 'RK—4120',
    size: '200 × 1200 mm',
    finish: 'Textured',
    color: 'Natural oak',
    category: 'Wooden surfaces',
    categoryTags: ['Floor tiles', 'Wooden surfaces', 'Outdoor'],
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
    stock: '120 boxes available',
    description: 'The familiar warmth of natural oak, translated into a durable surface with subtle grain and an inviting textured finish.',
  },
]
