import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { photos } from '@/lib/home-data'

export function StorySection() {
  return (
    <section className="story section-pad" id="story">
      <div className="story-image"><Image src={photos.story} alt="Architectural interior featuring natural wood and stone finishes" fill sizes="50vw" /><span className="image-note">A PLACE FOR POSSIBILITY</span></div>
      <div className="story-copy">
        <p className="eyebrow">OUR POINT OF VIEW</p>
        <h2>Every space begins<br />with the <em>right choice.</em></h2>
        <p>At RK Tiles &amp; Sanitary, we bring together thoughtfully selected designs and surfaces to help transform everyday spaces into something meaningful. From timeless stone-inspired textures to contemporary finishes, our collections are chosen with an appreciation for quality, style and lasting value.</p>
        <a className="button button-dark" href="#contact">Discover our story <ArrowRight size={16} /></a>
      </div>
    </section>
  )
}
