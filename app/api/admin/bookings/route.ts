import { type NextRequest, NextResponse } from "next/server"
import { getAllBookings } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const page = searchParams.get("page") || "1"
    const perPage = 10

    console.log("[API] 관리자 예약 목록 조회 요청 - status:", status, "page:", page)

    // Google Sheets에서 예약 목록 조회
    const allBookings = await getAllBookings()

    // 상태로 필터링
    let filteredBookings = allBookings
    if (status) {
      filteredBookings = allBookings.filter((booking: any) => {
        const bookingStatus = booking.payment_status || booking.paymentStatus || ""
        return bookingStatus.toLowerCase() === status.toLowerCase()
      })
    }

    // 페이지네이션
    const pageNum = Number.parseInt(page, 10)
    const startIndex = (pageNum - 1) * perPage
    const endIndex = startIndex + perPage
    const paginatedBookings = filteredBookings.slice(startIndex, endIndex)

    // 데이터 형식 변환 (관리자 대시보드 형식에 맞춤)
    const formattedBookings = paginatedBookings.map((booking: any) => {
      // Guests 시트에서 첫 번째 게스트 정보 가져오기 (예약자 정보)
      const primaryGuest = booking.guests && booking.guests.length > 0 
        ? booking.guests.find((g: any) => g.is_primary === "true" || g.is_primary === true) || booking.guests[0]
        : null

      return {
        id: booking.booking_number || booking.bookingNumber,
        bookingNumber: booking.booking_number || booking.bookingNumber,
        name: primaryGuest?.name_ko || primaryGuest?.nameKo || "정보 없음",
        phone: primaryGuest?.phone || "정보 없음",
        email: booking.user_email || booking.userEmail || "정보 없음",
        guests: parseInt(booking.total_guests || booking.totalGuests || "0", 10),
        roomType: parseInt(booking.single_rooms || booking.singleRooms || "0", 10) > 0 
          ? `더블+싱글(${booking.single_rooms || booking.singleRooms}개)`
          : "더블룸",
        status: booking.payment_status || booking.paymentStatus || "pending",
        amount: parseFloat(booking.total_amount || booking.totalAmount || "0"),
        createdAt: booking.booking_date || booking.bookingDate || booking.created_at || booking.createdAt,
      }
    })

    console.log("[API] 관리자 예약 목록 조회 완료:", formattedBookings.length, "건")

    return NextResponse.json({
      bookings: formattedBookings,
      total: filteredBookings.length,
      page: pageNum,
      perPage,
    })
  } catch (error: any) {
    console.error("[API] 예약 목록 조회 오류:", error)
    return NextResponse.json(
      { 
        error: "예약 목록 조회 실패",
        message: error.message || "알 수 없는 오류가 발생했습니다"
      },
      { status: 500 }
    )
  }
}
