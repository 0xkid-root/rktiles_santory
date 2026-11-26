export type TileCategory = {
  name: string
  tag: string
  slug: string
  note: string
  image: string
  className: string
}

export const categories: TileCategory[] = [
  {
    name: 'Floor Tiles',
    tag: 'Floor tiles',
    slug: 'floor-tiles',
    note: 'Ground your space in beauty.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85',
    className: 'category-tall',
  },
  {
    name: 'Wall Tiles',
    tag: 'Wall tiles',
    slug: 'wall-tiles',
    note: 'A new perspective on walls.',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85',
    className: '',
  },
  {
    name: 'Marble Collection',
    tag: 'Marble collection',
    slug: 'marble-collection',
    note: 'Nature, refined by design.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85',
    className: 'category-wide',
  },
  {
    name: 'Wooden Surfaces',
    tag: 'Wooden surfaces',
    slug: 'wooden-surfaces',
    note: 'Warmth in every grain.',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85',
    className: '',
  },
  {
    name: 'Bathroom',
    tag: 'Bathroom',
    slug: 'bathroom',
    note: 'A quieter kind of luxury.',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=900&q=85',
    className: '',
  },
  {
    name: 'Outdoor',
    tag: 'Outdoor',
    slug: 'outdoor',
    note: 'Made for open-air living.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85',
    className: 'category-wide',
  },
]
