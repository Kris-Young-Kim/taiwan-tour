import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wifi, Dumbbell, UtensilsCrossed, Phone, Car, Lock, Wind, ShowerHead } from "lucide-react"

export default function HotelDetails() {
  const facilities = [
    { icon: Wifi, name: "무료 Wi-Fi" },
    { icon: Dumbbell, name: "피트니스 센터" },
    { icon: UtensilsCrossed, name: "레스토랑 & 바" },
    { icon: Phone, name: "24시간 프런트 데스크" },
    { icon: Car, name: "공항 셔틀 (별도)" },
  ]

  const roomAmenities = [
    { icon: Wind, name: "에어컨" },
    { icon: UtensilsCrossed, name: "미니바" },
    { icon: Lock, name: "안전금고" },
    { icon: ShowerHead, name: "욕실 어메니티" },
  ]

  const hotelImages = [
    { url: "/luxury-4-star-hotel-taipei.jpg", alt: "호텔 외관" },
    { url: "/hotel-lobby.jpg", alt: "호텔 로비" },
    { url: "/hotel-room.jpg", alt: "호텔 객실" },
    { url: "/hotel-restaurant.jpg", alt: "호텔 레스토랑" },
  ]

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">숙박 호텔 상세 정보</h2>
          <p className="text-foreground/70 text-lg">타이베이 중심부의 편안한 3박 숙박</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Hotel Image Gallery */}
          <div className="space-y-4">
            <div
              className="h-96 bg-cover bg-center rounded-lg"
              style={{ backgroundImage: "url('/luxury-4-star-hotel-taipei.jpg')" }}
            />
            <div className="grid grid-cols-3 gap-4">
              {hotelImages.slice(1).map((image, idx) => (
                <div
                  key={idx}
                  className="h-32 bg-cover bg-center rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ backgroundImage: `url('${image.url}')` }}
                />
              ))}
            </div>
          </div>

          {/* Hotel Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold mb-2">Chong Yu Hotel</h3>
              <p className="text-accent font-semibold text-lg mb-2">4성급 호텔</p>
              <p className="text-foreground/70">타이베이 중심부 최고의 위치</p>
            </div>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">숙박 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <div>
                    <p className="font-semibold">숙박 기간</p>
                    <p className="text-sm text-foreground/70">3박 (2026년 6월 13일 ~ 15일)</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <div>
                    <p className="font-semibold">객실 타입</p>
                    <p className="text-sm text-foreground/70">스탠다드 트윈/더블 객실</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <div>
                    <p className="font-semibold">조식</p>
                    <p className="text-sm text-foreground/70">호텔 뷔페식 조식 3회 포함</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle className="text-lg">편의시설</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {facilities.map((facility, i) => {
                    const Icon = facility.icon
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <Icon className="text-accent" size={20} />
                        <span className="text-sm text-foreground/80">{facility.name}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">객실 어메니티</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {roomAmenities.map((amenity, i) => {
                    const Icon = amenity.icon
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <Icon className="text-accent" size={20} />
                        <span className="text-sm text-foreground/80">{amenity.name}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="bg-primary/5 p-4 rounded-lg">
              <p className="text-sm text-foreground/70">
                웹사이트: <span className="font-semibold">chongyuhotel.com.tw</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

