import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function PriceSection() {
  const includes = [
    "왕복 항공권 (대한항공)",
    "호텔 숙박 3박 (Chong Yu Hotel 4성급)",
    "전용 차량 (43인승)",
    "모든 식사 (1회 자유식 제외)",
    "관광지 입장료",
    "가이드 경비 및 팁",
    "여행자 보험",
  ]

  const excludes = ["개인 경비", "매너팁", "통역 비용", "싱글룸 추가 비용"]

  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">여행 가격 및 포함사항</h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            명확한 가격 책정으로 숨겨진 비용 없이 안심하고 예약하세요
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Pricing */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-accent">가격 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-baseline pb-4 border-b border-border/50">
                <span className="text-foreground/80">기본 요금 (1인)</span>
                <span className="text-3xl font-bold text-primary">₩1,290,000</span>
              </div>
              <div className="flex justify-between items-baseline pb-4 border-b border-border/50">
                <span className="text-foreground/80">싱글룸 추가 (3박)</span>
                <span className="text-2xl font-bold text-accent">+₩330,000</span>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg">
                <p className="text-sm text-foreground/70">
                  <span className="font-semibold">예: 2명 더블룸</span>
                  <br />
                  ₩1,290,000 × 2 = ₩2,580,000
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Special Notes */}
          <Card className="border-accent/20">
            <CardHeader>
              <CardTitle className="text-primary">특이사항</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-3">
                <div className="text-accent font-bold">•</div>
                <p className="text-sm">노쇼핑 기준</p>
              </div>
              <div className="flex gap-3">
                <div className="text-accent font-bold">•</div>
                <p className="text-sm">43인승 전용 차량</p>
              </div>
              <div className="flex gap-3">
                <div className="text-accent font-bold">•</div>
                <p className="text-sm">만찬 10인 1테이블 기준</p>
              </div>
              <div className="flex gap-3">
                <div className="text-accent font-bold">•</div>
                <p className="text-sm">약 150명 단체 행사</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Includes/Excludes */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Check className="text-primary" size={24} />
              포함사항
            </h3>
            <ul className="space-y-3">
              {includes.map((item, i) => (
                <li key={i} className="flex gap-3 text-foreground/80">
                  <Check className="text-primary flex-shrink-0 mt-1" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">불포함사항</h3>
            <ul className="space-y-3">
              {excludes.map((item, i) => (
                <li key={i} className="flex gap-3 text-foreground/60">
                  <span className="text-muted-foreground">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
