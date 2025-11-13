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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mintour.com"),
  title: {
    default: "민투어 - 대만 타이베이 특별 여행",
    template: "%s | 민투어",
  },
  description:
    "로타리 세계대회 참석 및 대만 문화 체험 3박 4일 특별 투어. 세계 4대 박물관 국립고궁박물관, 타이베이 101빌딩, 현지 맛집 체험. 2026년 6월 13-16일 출발",
  keywords: [
    "대만 여행",
    "타이베이 여행",
    "로타리 세계대회",
    "국립고궁박물관",
    "타이베이 101",
    "패키지 여행",
    "민투어",
    "대만 3박4일",
  ],
  authors: [{ name: "민투어" }],
  creator: "민투어",
  publisher: "민투어",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "민투어",
    title: "민투어 - 대만 타이베이 특별 여행",
    description:
      "로타리 세계대회 참석 및 대만 문화 체험 3박 4일 특별 투어. 세계 4대 박물관 국립고궁박물관, 타이베이 101빌딩, 현지 맛집 체험",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "민투어 대만 타이베이 특별 여행",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "민투어 - 대만 타이베이 특별 여행",
    description:
      "로타리 세계대회 참석 및 대만 문화 체험 3박 4일 특별 투어. 세계 4대 박물관 국립고궁박물관, 타이베이 101빌딩, 현지 맛집 체험",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Google Search Console verification code (추후 설정)
    // google: "your-verification-code",
  },
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
