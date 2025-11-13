"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreVertical, Download } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"

export default function BookingsTable() {
  const [sortBy, setSortBy] = useState("recent")

  const bookings = [
    {
      id: "BK001",
      name: "김미영",
      phone: "010-1234-5678",
      email: "kim@example.com",
      guests: 2,
      roomType: "더블룸",
      status: "예약완료",
      date: "2025-11-10",
      amount: "₩2,580,000",
    },
    {
      id: "BK002",
      name: "박준호",
      phone: "010-2345-6789",
      email: "park@example.com",
      guests: 3,
      roomType: "더블+싱글",
      status: "결제대기",
      date: "2025-11-12",
      amount: "₩4,200,000",
    },
    {
      id: "BK003",
      name: "이은지",
      phone: "010-3456-7890",
      email: "lee@example.com",
      guests: 1,
      roomType: "싱글룸",
      status: "예약완료",
      date: "2025-11-08",
      amount: "₩1,620,000",
    },
    {
      id: "BK004",
      name: "최영수",
      phone: "010-4567-8901",
      email: "choi@example.com",
      guests: 4,
      roomType: "더블 2실",
      status: "예약완료",
      date: "2025-11-13",
      amount: "₩5,160,000",
    },
    {
      id: "BK005",
      name: "정민지",
      phone: "010-5678-9012",
      email: "jeong@example.com",
      guests: 2,
      roomType: "더블룸",
      status: "취소",
      date: "2025-11-07",
      amount: "₩2,580,000",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "예약완료":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "결제대기":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
      case "취소":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>최근 예약</CardTitle>
          <p className="text-sm text-foreground/60 mt-1">총 142명 예약</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Download size={16} />
          엑셀 다운로드
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>예약번호</TableHead>
                <TableHead>예약자명</TableHead>
                <TableHead>연락처</TableHead>
                <TableHead>인원</TableHead>
                <TableHead>객실</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>금액</TableHead>
                <TableHead>작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-semibold">{booking.id}</TableCell>
                  <TableCell>{booking.name}</TableCell>
                  <TableCell className="text-sm">{booking.phone}</TableCell>
                  <TableCell className="text-center font-semibold">{booking.guests}명</TableCell>
                  <TableCell className="text-sm">{booking.roomType}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                  </TableCell>
                  <TableCell className="font-semibold">{booking.amount}</TableCell>
                  <TableCell>
                    <button className="p-1 hover:bg-muted rounded-lg transition-colors">
                      <MoreVertical size={18} className="text-foreground/60" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-border/50">
          <p className="text-sm text-foreground/60">1-5 of 142 예약</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              이전
            </Button>
            <Button variant="outline" size="sm">
              다음
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
