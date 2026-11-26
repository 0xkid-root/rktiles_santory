'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export function AddToCartButton({ productName }: { productName: string }) {
  const [added, setAdded] = useState(false)

  return <button className="button button-dark" type="button" onClick={() => setAdded(true)}>
    <span aria-live="polite">{added ? 'Added to cart' : 'Add to cart'}</span>
    <ArrowRight size={16} aria-hidden="true"/>
    <span className="sr-only" role="status">{added ? `${productName} added to your cart.` : ''}</span>
  </button>
}
