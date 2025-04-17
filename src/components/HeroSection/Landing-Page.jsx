import { HeroSection } from "./hero-section"
import { SocialProofSection } from "./social-proof-section"
import { FeatureSection } from "./feature-section"
import { TestimonialSection } from "./testimonial-section"
import { PricingSection } from "./pricing-section"
import { FaqSection } from "./faq-section"
import { Footer } from "./footer"
import { LoadingScreen } from "./loading-screen"
import { ScrollToTop } from "./scroll-to-top"
import { Header } from "./header"
import ScatterText from "./scatter-text"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <LoadingScreen />
      <ScrollToTop />
      <main className="flex-1">
      <Header />
        {/* <ScatterText/> */}
        <HeroSection />
        <SocialProofSection />
        <FeatureSection />
        <TestimonialSection />
        <PricingSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  )
}
