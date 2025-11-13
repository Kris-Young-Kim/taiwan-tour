/**
 * Google Sheets 연결 테스트 API
 * 
 * 이 API는 Google Sheets 연결이 정상적으로 작동하는지 테스트합니다.
 * GET /api/test/google-sheets
 */

import { NextResponse } from "next/server"
import { readSheet } from "@/lib/google-sheets"

export async function GET() {
  try {
    // Packages 시트에서 데이터 읽기 시도
    const data = await readSheet("Packages!A1:Z1")
    
    return NextResponse.json({
      success: true,
      message: "Google Sheets 연결 성공",
      data: {
        sheetName: "Packages",
        headerRow: data[0] || [],
        rowCount: data.length,
      },
    })
  } catch (error: any) {
    console.error("Google Sheets 연결 테스트 실패:", error)
    
    return NextResponse.json(
      {
        success: false,
        message: "Google Sheets 연결 실패",
        error: error.message || "알 수 없는 오류",
        details: error.toString(),
      },
      { status: 500 }
    )
  }
}

