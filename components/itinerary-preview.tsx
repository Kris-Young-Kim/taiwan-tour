import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

export default function ItineraryPreview() {
  const days = [
    {
      day: 1,
      date: "6월 13일 (토)",
      title: "인천출발 → 타이베이 도착",
      activities: [
        "국립고궁박물관 (세계 4대 박물관, 약 70만 점 유물)",
        "자오궁 (도교 사원)",
        "라오허제 야시장 (현지 음식 체험)",
      ],
      image: "/taipei-101-night.jpg",
    },
    {
      day: 2,
      date: "6월 14일 (일)",
      title: "타이베이 세계대회",
      activities: [
        "중정기념당 (장개석 총통 기념관)",
        "타이베이 세계대회장",
        "파글로리 돔",
        "난강 전시센터 (TaiNEX)",
        "우정의 집",
        "서문정거리",
      ],
      image: "/taipei-rotary-conference.jpg",
    },
    {
      day: 3,
      date: "6월 15일 (월)",
      title: "타이베이 101빌딩",
      activities: ["타이베이 101빌딩 전망대 (452m, 89층)", "360도 파노라마 뷰", "자유시간 및 쇼핑", "고급 현지식 만찬"],
      image: "/taipei-101-building-view.jpg",
    },
    {
      day: 4,
      date: "6월 16일 (화)",
      title: "단수이 옛거리 → 귀국",
      activities: ["단수이 옛거리 (홍모성, 진리대학)", "타이베이 강변 풍경", "중식 후 귀국", "대한항공으로 귀국"],
      image: "/danshui-old-street-taiwan.jpg",
    },
  ]

  return (
    <section id="itinerary" className="py-16 sm:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">여행 일정</h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            3박 4일간의 특별한 타이베이 경험을 미리 만나보세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {days.map((day) => (
            <Card key={day.day} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${day.image}')` }} />
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-sm text-accent font-semibold">Day {day.day}</span>
                    <CardTitle className="text-2xl mt-1">{day.title}</CardTitle>
                    <CardDescription className="mt-2">{day.date}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {day.activities.map((activity, i) => (
                    <li key={i} className="flex gap-2 text-sm text-foreground/80">
                      <MapPin size={16} className="text-accent flex-shrink-0 mt-0.5" />
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
