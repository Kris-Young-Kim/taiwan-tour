/**
 * 전체 시스템 연결 테스트 API
 * 
 * 이 API는 Google Sheets 연결과 모든 시트 설정을 확인합니다.
 * GET /api/test/connection
 */

import { NextResponse } from "next/server"
import { readSheet } from "@/lib/google-sheets"

export async function GET() {
  const results: any = {
    success: true,
    sheets: {},
    errors: [],
  }

  // 테스트할 시트 목록
  const sheetsToTest = [
    { name: "Packages", required: true },
    { name: "Bookings", required: true },
    { name: "Guests", required: true },
    { name: "Rooms", required: true },
    { name: "Payments", required: true },
    { name: "Itineraries", required: false },
  ]

  for (const sheet of sheetsToTest) {
    try {
      const data = await readSheet(`${sheet.name}!A1:Z1`)
      
      if (data.length === 0) {
        results.sheets[sheet.name] = {
          exists: false,
          hasHeaders: false,
          headerCount: 0,
          error: "시트가 비어있거나 헤더가 없습니다",
        }
        if (sheet.required) {
          results.errors.push(`${sheet.name} 시트에 헤더가 없습니다`)
        }
      } else {
        const headers = data[0] || []
        results.sheets[sheet.name] = {
          exists: true,
          hasHeaders: headers.length > 0,
          headerCount: headers.length,
          headers: headers,
        }
      }
    } catch (error: any) {
      results.sheets[sheet.name] = {
        exists: false,
        error: error.message || "시트를 찾을 수 없습니다",
      }
      if (sheet.required) {
        results.errors.push(`${sheet.name} 시트 오류: ${error.message}`)
        results.success = false
      }
    }
  }

  // Packages 시트에 데이터가 있는지 확인
  try {
    const packagesData = await readSheet("Packages!A1:Z10")
    if (packagesData.length > 1) {
      results.sheets.Packages.dataRows = packagesData.length - 1
      results.sheets.Packages.hasData = true
    } else {
      results.sheets.Packages.hasData = false
      results.sheets.Packages.warning = "Packages 시트에 데이터가 없습니다. 샘플 데이터를 입력하세요."
    }
  } catch (error) {
    // 이미 위에서 처리됨
  }

  return NextResponse.json(results, {
    status: results.success ? 200 : 500,
  })
}

