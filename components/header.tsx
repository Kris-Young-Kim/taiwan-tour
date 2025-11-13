"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

// Clerk는 선택적 (환경 변수가 있을 때만 사용)
const hasClerk = typeof window !== "undefined" && process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

const SignInButton = hasClerk ? require("@clerk/nextjs").SignInButton : () => null
const SignUpButton = hasClerk ? require("@clerk/nextjs").SignUpButton : () => null
const SignedIn = hasClerk ? require("@clerk/nextjs").SignedIn : ({ children }: { children: React.ReactNode }) => null
const SignedOut = hasClerk ? require("@clerk/nextjs").SignedOut : ({ children }: { children: React.ReactNode }) => <>{children}</>
const UserButton = hasClerk ? require("@clerk/nextjs").UserButton : () => null

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "#itinerary", label: "일정" },
    { href: "#hotel", label: "호텔" },
    { href: "#testimonials", label: "후기" },
    { href: "#contact", label: "문의" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <div className="h-8 w-8 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
            민
          </div>
          <span className="hidden sm:inline">민투어</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline" className="text-sm bg-transparent">
            문의
          </Button>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline" className="text-sm">
                로그인
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button className="text-sm bg-primary hover:bg-primary/90">
                회원가입
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <Link href="/booking">
              <Button className="text-sm bg-primary hover:bg-primary/90">
                지금 예약하기
              </Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <Link href="/booking">
              <Button className="text-sm bg-primary hover:bg-primary/90">
                지금 예약하기
              </Button>
            </Link>
          </SignedOut>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border md:hidden">
            <div className="container mx-auto max-w-7xl px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-2 border-t border-border">
                <Button variant="outline" className="w-full text-sm bg-transparent">
                  문의
                </Button>
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button variant="outline" className="w-full text-sm">
                      로그인
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button className="w-full text-sm bg-primary hover:bg-primary/90">
                      회원가입
                    </Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center justify-center py-2">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </SignedIn>
                <Link href="/booking">
                  <Button className="w-full text-sm bg-primary hover:bg-primary/90">
                    지금 예약하기
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
