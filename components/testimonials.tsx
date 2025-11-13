"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Testimonials() {
  const testimonials = [
    {
      quote: "가이드분이 정말 친절하고 일정이 알차서 좋았어요. 대만의 문화를 제대로 느낄 수 있었습니다.",
      author: "김미영",
      role: "로타리 회원",
      rating: 5,
    },
    {
      quote: "국립고궁박물관과 타이베이 101 전망대의 경험이 정말 잊을 수 없습니다. 최고의 투어였어요!",
      author: "박준호",
      role: "로타리 회원",
      rating: 5,
    },
    {
      quote: "숙박, 식사, 모든 일정이 완벽하게 준비되어 있었습니다. 스트레스 없이 즐길 수 있었어요.",
      author: "이은지",
      role: "로타리 회원",
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-muted/40 border-t border-border">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">고객 후기</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            지난 여행객들의 소중한 경험과 추천 이야기를 들어보세요.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex flex-col">
              <CardContent className="pt-6 flex-1 flex flex-col">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} size={16} className="fill-accent text-accent" />
                    ))}
                </div>

                {/* Quote */}
                <p className="text-foreground/80 mb-6 flex-1 leading-relaxed italic">"{testimonial.quote}"</p>

                {/* Author */}
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-foreground/60">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* SNS Share Section */}
        <div className="mt-16 pt-12 border-t border-border">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">친구들과 여행을 공유하세요</h3>
            <p className="text-foreground/70">이 특별한 여행을 더 많은 사람들과 함께하세요</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                const url = typeof window !== "undefined" ? window.location.href : ""
                const text = "대만 타이베이 3박 4일 특별 여행 - 민투어"
                const kakaoUrl = `https://story.kakao.com/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
                window.open(kakaoUrl, "_blank")
              }}
            >
              <Share2 size={18} />
              카카오톡 공유
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                const url = typeof window !== "undefined" ? window.location.href : ""
                const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
                window.open(facebookUrl, "_blank")
              }}
            >
              <Share2 size={18} />
              페이스북 공유
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                const url = typeof window !== "undefined" ? window.location.href : ""
                const text = "대만 타이베이 3박 4일 특별 여행 - 민투어"
                const instagramUrl = `https://www.instagram.com/`
                // Instagram은 직접 공유가 제한적이므로 URL 복사 안내
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(url)
                  alert("링크가 클립보드에 복사되었습니다. 인스타그램에 붙여넣기 하세요.")
                } else {
                  window.open(instagramUrl, "_blank")
                }
              }}
            >
              <Share2 size={18} />
              인스타그램 공유
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
