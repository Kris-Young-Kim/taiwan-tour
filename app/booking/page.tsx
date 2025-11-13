"use client"
import { useState, lazy, Suspense } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Loading from "@/components/loading"

// 코드 스플리팅을 위한 lazy loading
const BookingSummary = lazy(() => import("@/components/booking/booking-summary"))
const BookingForm = lazy(() => import("@/components/booking/booking-form"))

// 클라이언트 컴포넌트에서는 metadata를 export할 수 없으므로 제거
// export const metadata: Metadata = {
//   title: "예약하기",
//   description: "대만 타이베이 3박 4일 여행 패키지 예약하기. 실시간 가격 계산 및 간편한 예약 절차",
// }

export default function BookingPage() {
  const [guests, setGuests] = useState(1)
  const [singleRooms, setSingleRooms] = useState(0)

  const BASE_PRICE = 1_350_000
  const SINGLE_ROOM_PRICE = 330_000

  const totalPrice = BASE_PRICE * guests + SINGLE_ROOM_PRICE * singleRooms

  return (
    <>
      <Header />
      <main className="min-h-screen bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Form */}
            <div className="lg:col-span-2">
              <Suspense fallback={<Loading text="예약 폼을 불러오는 중..." />}>
                <BookingForm
                  guests={guests}
                  singleRooms={singleRooms}
                  onGuestsChange={setGuests}
                  onSingleRoomsChange={setSingleRooms}
                />
              </Suspense>
            </div>

            {/* Right: Sticky Summary */}
            <div className="lg:col-span-1">
              <Suspense fallback={<Loading text="예약 요약을 불러오는 중..." />}>
                <BookingSummary
                  guests={guests}
                  singleRooms={singleRooms}
                  totalPrice={totalPrice}
                  basePrice={BASE_PRICE}
                  singleRoomPrice={SINGLE_ROOM_PRICE}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
