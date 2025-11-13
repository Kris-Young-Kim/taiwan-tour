import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "예약하기",
  description: "대만 타이베이 3박 4일 여행 패키지 예약하기. 실시간 가격 계산 및 간편한 예약 절차",
}

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

