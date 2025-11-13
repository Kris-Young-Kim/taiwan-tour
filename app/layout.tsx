import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "민투어 - 대만 타이베이 특별 여행",
  description:
    "로타리 세계대회 참석 및 대만 문화 체험 3박 4일 특별 투어. 세계 4대 박물관 국립고궁박물관, 타이베이 101빌딩, 현지 맛집 체험",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="ko">
        <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}
