import { type NextRequest, NextResponse } from "next/server"
import { getAdminStats, getAllBookings } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    console.log("[API] 관리자 통계 조회 요청")

    // Google Sheets에서 통계 데이터 조회
    const stats = await getAdminStats()
    const bookings = await getAllBookings()

    // 추가 통계 계산
    const maxCapacity = 150
    const remainingSeats = Math.max(0, maxCapacity - stats.totalGuests)
    const bookingRate = maxCapacity > 0 ? (stats.totalGuests / maxCapacity) * 100 : 0

    // 객실 분포 계산
    const roomDistribution = {
      double: 0,
      single: 0,
    }

    bookings.forEach((booking: any) => {
      const singleRooms = parseInt(booking.single_rooms || booking.singleRooms || "0", 10)
      const totalGuests = parseInt(booking.total_guests || booking.totalGuests || "0", 10)
      const doubleRooms = Math.ceil((totalGuests - singleRooms) / 2)
      
      roomDistribution.double += doubleRooms
      roomDistribution.single += singleRooms
    })

    const result = {
      totalGuests: stats.totalGuests,
      maxCapacity,
      remainingSeats,
      bookingRate: Math.round(bookingRate * 10) / 10,
      totalRevenue: stats.totalRevenue,
      advancedPayment: stats.completedPayments > 0 ? stats.totalRevenue * 0.5 : 0, // 예시
      pendingPayment: stats.pendingPayments > 0 ? stats.totalRevenue * 0.5 : 0, // 예시
      totalBookings: stats.totalBookings,
      pendingPayments: stats.pendingPayments,
      completedPayments: stats.completedPayments,
      cancelledBookings: 0, // 추후 구현
      roomDistribution,
      costs: {
        flights: 0, // 추후 구현
        hotel: 0, // 추후 구현
        transport: 0, // 추후 구현
        entrance: 0, // 추후 구현
        other: 0, // 추후 구현
      },
    }

    console.log("[API] 관리자 통계 조회 완료")

    return NextResponse.json(result)
  } catch (error: any) {
    console.error("[API] 통계 조회 오류:", error)
    return NextResponse.json(
      { 
        error: "통계 조회 실패",
        message: error.message || "알 수 없는 오류가 발생했습니다"
      },
      { status: 500 }
    )
  }
}
