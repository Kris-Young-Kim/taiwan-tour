"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

export default function FinanceOverview() {
  const salesData = [
    { name: "6월 13일", value: 150 },
    { name: "6월 14일", value: 280 },
    { name: "6월 15일", value: 420 },
    { name: "6월 16일", value: 142 },
  ]

  const roomData = [
    { name: "더블룸", value: 68, fill: "#1e3a8a" },
    { name: "싱글룸", value: 32, fill: "#d97706" },
    { name: "기타", value: 42, fill: "#6b7280" },
  ]

  return (
    <div className="space-y-6">
      {/* Revenue Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">매출 현황</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-foreground/60">총 매출</span>
              <span className="font-bold text-xl">₩191.7M</span>
            </div>
            <div className="bg-primary/10 h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full" style={{ width: "94.7%" }} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/50">
            <div>
              <p className="text-xs text-foreground/60">예수금</p>
              <p className="font-bold mt-1">₩95.8M</p>
            </div>
            <div>
              <p className="text-xs text-foreground/60">미수금</p>
              <p className="font-bold mt-1">₩95.9M</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Costs Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">비용 구성</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: "항공료", value: "₩84.2M", percent: "44%" },
            { label: "호텔료", value: "₩50.1M", percent: "26%" },
            { label: "차량/가이드", value: "₩35.4M", percent: "18%" },
            { label: "입장료", value: "₩16.8M", percent: "9%" },
            { label: "기타", value: "₩5.2M", percent: "3%" },
          ].map((cost, i) => (
            <div key={i} className="flex justify-between items-center text-sm">
              <span className="text-foreground/80">{cost.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-foreground/60 w-8 text-right">{cost.percent}</span>
                <span className="font-semibold text-right w-20">{cost.value}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Room Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">객실 유형별 예약</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            {roomData.map((room) => (
              <div key={room.name} className="text-center">
                <div className="text-2xl font-bold text-primary">{room.value}</div>
                <p className="text-xs text-foreground/60 mt-1">{room.name}</p>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie data={roomData} cx="50%" cy="50%" innerRadius={30} outerRadius={55} dataKey="value">
                {roomData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
