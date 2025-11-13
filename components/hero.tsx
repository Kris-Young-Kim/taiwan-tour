"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const heroImages = [
  {
    url: "/taipei-101-night-skyline.jpg",
    alt: "타이베이 101빌딩",
  },
  {
    url: "/national-palace-museum.jpg",
    alt: "국립고궁박물관",
  },
  {
    url: "/raohe-night-market.jpg",
    alt: "라오허제 야시장",
  },
]

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000) // 5초마다 이미지 변경

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden py-20 sm:py-32 lg:py-48">
      {/* Background with image slide */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10 -z-10" />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: `url('${heroImages[currentImageIndex].url}')` }}
        />
      </AnimatePresence>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center text-center gap-6 sm:gap-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-sm font-medium text-accent"
          >
            ✨ 로타리 세계대회 특별 투어
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-4 text-balance">
              세계 4대 박물관과 타이베이의
              <br />
              정취를 느끼는{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                특별한 여행
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-foreground/70 leading-relaxed">
              로타리 세계대회 참석 및 대만 문화 체험 3박 4일
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Link href="/booking">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                지금 예약하기
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="#itinerary">
              <Button
                size="lg"
                variant="outline"
                className="text-foreground bg-transparent border-primary/30 hover:bg-primary/5"
              >
                일정 보기
              </Button>
            </Link>
          </motion.div>

          {/* Key Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="grid grid-cols-3 gap-4 sm:gap-6 pt-12 border-t border-border/50 w-full max-w-2xl"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-accent">3박 4일</span>
              <span className="text-xs sm:text-sm text-foreground/60">2026년 6월 13-16일</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-accent">150명</span>
              <span className="text-xs sm:text-sm text-foreground/60">함께하는 여행</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-accent">₩1,290,000</span>
              <span className="text-xs sm:text-sm text-foreground/60">1인 요금</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Image indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentImageIndex ? "w-8 bg-primary" : "w-2 bg-primary/30"
            }`}
            aria-label={`이미지 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </section>
  )
}
