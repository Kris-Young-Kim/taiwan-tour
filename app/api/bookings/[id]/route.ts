import { type NextRequest, NextResponse } from "next/server"
import { getBooking } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const bookingId = params.id

    console.log("[API] 예약 상세 조회 요청:", bookingId)

    // Google Sheets에서 예약 조회
    const booking = await getBooking(bookingId)

    if (!booking) {
      return NextResponse.json(
        { error: "예약을 찾을 수 없습니다" },
        { status: 404 }
      )
    }

    console.log("[API] 예약 상세 조회 완료")

    return NextResponse.json(booking)
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

// PUT endpoint for updating booking status
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const bookingId = params.id
    const body = await request.json()

    console.log("[API] 예약 수정 요청:", bookingId, body)

    // Google Sheets에서 예약 수정
    const { updateBooking } = await import("@/lib/db")
    const updatedBooking = await updateBooking(bookingId, body)

    console.log("[API] 예약 수정 완료")

    return NextResponse.json(updatedBooking)
  } catch (error: any) {
    console.error("[API] 예약 수정 오류:", error)
    return NextResponse.json(
      { 
        error: "예약 수정 실패",
        message: error.message || "알 수 없는 오류가 발생했습니다"
      },
      { status: 500 }
    )
  }
}

// DELETE endpoint for cancelling booking
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const bookingId = params.id

    console.log("[API] 예약 취소 요청:", bookingId)

    // Google Sheets에서 예약 상태를 'cancelled'로 변경
    const { updateBooking } = await import("@/lib/db")
    const cancelledBooking = await updateBooking(bookingId, {
      payment_status: "cancelled",
      paymentStatus: "cancelled",
    })

    console.log("[API] 예약 취소 완료")

    return NextResponse.json({
      success: true,
      message: "예약이 성공적으로 취소되었습니다",
      booking: cancelledBooking,
    })
  } catch (error: any) {
    console.error("[API] 예약 취소 오류:", error)
    return NextResponse.json(
      { 
        error: "예약 취소 실패",
        message: error.message || "알 수 없는 오류가 발생했습니다"
      },
      { status: 500 }
    )
  }
}
