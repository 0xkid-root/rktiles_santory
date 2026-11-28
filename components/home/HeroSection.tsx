'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { heroSlides } from '@/lib/home-data'

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isHeroPaused, setIsHeroPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setReducedMotion(motionPreference.matches)
    updateMotionPreference()
    motionPreference.addEventListener('change', updateMotionPreference)
    return () => motionPreference.removeEventListener('change', updateMotionPreference)
  }, [])

  useEffect(() => {
    if (isHeroPaused || reducedMotion) return
    const interval = window.setInterval(() => setActiveSlide((current) => (current + 1) % heroSlides.length), 6000)
    return () => window.clearInterval(interval)
  }, [activeSlide, isHeroPaused, reducedMotion])

  return (
    <section className="hero" id="home" aria-label="RK Tiles and Sanitary" aria-roledescription="carousel">
      {heroSlides.map((slide, index) => (
        <Image key={slide.image} src={slide.image} alt={index === activeSlide ? slide.alt : ''} aria-hidden={index !== activeSlide} fill priority={index === 0} sizes="100vw" className={`hero-image ${index === activeSlide ? 'is-active' : ''}`} />
      ))}
      <div className="hero-shade" />
      <div className="hero-copy">
        <p className="eyebrow light">SURFACES THAT DEFINE SPACES</p>
        <h1>A foundation for<br /><em>beautiful living.</em></h1>
        <p className="hero-description">Thoughtfully curated surfaces that bring character, elegance and lasting beauty to every space.</p>
        <div className="hero-buttons">
          <a className="button button-light" href="#collections">Explore collections <ArrowRight size={16} /></a>
          <a className="button button-quiet" href="#story">Discover RK Tiles <ArrowUpRight size={15} /></a>
        </div>
      </div>
      <a className="scroll-cue" href="#intro"><span>SCROLL TO DISCOVER</span><ArrowDown size={15} /></a>
      <div className="hero-controls" role="group" aria-label="Hero image controls">
        <button className="hero-control" type="button" aria-label="Previous hero image" onClick={() => setActiveSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length)}><ChevronLeft size={15} /></button>
        <span className="hero-index" aria-live="polite">{String(activeSlide + 1).padStart(2, '0')} <span>/</span> {String(heroSlides.length).padStart(2, '0')}</span>
        <button className="hero-control" type="button" aria-label="Next hero image" onClick={() => setActiveSlide((current) => (current + 1) % heroSlides.length)}><ChevronRight size={15} /></button>
        <button className="hero-control" type="button" disabled={reducedMotion} aria-pressed={isHeroPaused} aria-label={reducedMotion ? 'Automatic image changes disabled by reduced-motion preference' : isHeroPaused ? 'Resume automatic image changes' : 'Pause automatic image changes'} onClick={() => setIsHeroPaused((paused) => !paused)}>{isHeroPaused || reducedMotion ? <Play size={13} /> : <Pause size={13} />}</button>
      </div>
    </section>
  )
}
