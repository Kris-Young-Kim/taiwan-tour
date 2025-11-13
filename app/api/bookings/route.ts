import { type NextRequest, NextResponse } from "next/server"
import { createBooking, getAllBookings } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log("[API] 예약 요청 수신:", body)

    // 필수 필드 검증
    if (!body.userEmail || !body.totalGuests || body.totalAmount === undefined) {
      return NextResponse.json(
        { error: "필수 필드가 누락되었습니다: userEmail, totalGuests, totalAmount" },
        { status: 400 }
      )
    }

    // 예약 데이터 준비
    const bookingData = {
      packageId: body.packageId || "1", // 기본 패키지 ID
      userEmail: body.userEmail,
      totalGuests: body.totalGuests,
      singleRooms: body.singleRooms || 0,
      totalAmount: body.totalAmount,
      paymentStatus: body.paymentStatus || "pending",
      paymentMethod: body.paymentMethod || "",
      guests: body.guests || [],
      rooms: body.rooms || [],
      checkInDate: body.checkInDate || "2026-06-13",
      checkOutDate: body.checkOutDate || "2026-06-16",
    }

    // Google Sheets에 예약 생성
    const booking = await createBooking(bookingData)

    console.log("[API] 예약 생성 완료:", booking)

    return NextResponse.json(booking, { status: 201 })
  } catch (error: any) {
    console.error("[API] 예약 생성 오류:", error)
    return NextResponse.json(
      { 
        error: "예약 생성 실패",
        message: error.message || "알 수 없는 오류가 발생했습니다"
      },
      { status: 500 }
    )
  }
}

// GET endpoint for retrieving bookings
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    console.log("[API] 예약 조회 요청:", email)

    // Google Sheets에서 예약 목록 조회
    const bookings = await getAllBookings()

    // 이메일로 필터링 (선택사항)
    let filteredBookings = bookings
    if (email) {
      filteredBookings = bookings.filter(
        (booking: any) => booking.user_email === email || booking.userEmail === email
      )
    }

    console.log("[API] 예약 조회 완료:", filteredBookings.length, "건")

    return NextResponse.json(filteredBookings)
  } catch (error: any) {
    console.error("[API] 예약 조회 오류:", error)
    return NextResponse.json(
      { 
        error: "예약 조회 실패",
        message: error.message || "알 수 없는 오류가 발생했습니다"
      },
      { status: 500 }
    )
  }
}
