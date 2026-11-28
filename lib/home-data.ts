/** Shared public homepage content (no API). Preserved exactly from existing markup. */

export const photos = {
  hero: '/rk-hero.png',
  marble: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85',
  wood: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85',
  bath: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=900&q=85',
  detail: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85',
  story: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
} as const

export const heroSlides = [
  { image: photos.hero, alt: 'Sunlit contemporary living room with warm natural stone flooring' },
  { image: photos.marble, alt: 'Bright living space with elegant marble-inspired surfaces' },
  { image: photos.wood, alt: 'Warm interior with natural wood-look flooring' },
  { image: photos.bath, alt: 'Quiet, modern bathroom with refined stone surfaces' },
]

export const navLinks: ReadonlyArray<readonly [string, string]> = [
  ['Home', '#home'],
  ['Collections', '#collections'],
  ['Products', '/products'],
  ['Our story', '#story'],
]

export const whyItems: ReadonlyArray<readonly [string, string, string]> = [
  ['01', 'Thoughtfully curated', 'Collections selected to balance beauty, versatility and modern design.'],
  ['02', 'Quality you can trust', 'Surfaces chosen for dependable quality and everyday performance.'],
  ['03', 'Designs for every space', 'Discover options for living spaces, bathrooms, kitchens and more.'],
  ['04', 'Reliable availability', 'A catalogue backed by a focus on stock visibility and customer support.'],
]
