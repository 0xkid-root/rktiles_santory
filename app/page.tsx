'use client'

import { SiteHeader } from '@/components/home/SiteHeader'
import { HeroSection } from '@/components/home/HeroSection'
import { IntroSection } from '@/components/home/IntroSection'
import { CollectionsSection } from '@/components/home/CollectionsSection'
import { MaterialSection } from '@/components/home/MaterialSection'
import { WhySection } from '@/components/home/WhySection'
import { InspirationSection } from '@/components/home/InspirationSection'
import { StorySection } from '@/components/home/StorySection'
import { DealerSection } from '@/components/home/DealerSection'
import { ContactSection } from '@/components/home/ContactSection'
import { SiteFooter } from '@/components/home/SiteFooter'

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <HeroSection />
      <IntroSection />
      <CollectionsSection />
      <MaterialSection />
      <WhySection />
      <InspirationSection />
      <StorySection />
      <DealerSection />
      <ContactSection />
      <SiteFooter />
    </main>
  )
}
