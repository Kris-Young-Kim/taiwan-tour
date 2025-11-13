import type { Metadata } from "next"
import Header from "@/components/header"
import Hero from "@/components/hero"
import PriceSection from "@/components/price-section"
import ItineraryPreview from "@/components/itinerary-preview"
import Highlights from "@/components/highlights"
import Hotel from "@/components/hotel"
import Testimonials from "@/components/testimonials"
import CTA from "@/components/cta"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "홈",
  description:
    "로타리 세계대회 참석 및 대만 문화 체험 3박 4일 특별 투어. 세계 4대 박물관 국립고궁박물관, 타이베이 101빌딩, 현지 맛집 체험. 2026년 6월 13-16일 출발",
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <PriceSection />
      <ItineraryPreview />
      <Highlights />
      <Hotel />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
