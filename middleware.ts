// Clerk는 선택적 (환경 변수가 있을 때만 사용)
const clerkMiddleware = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  ? require('@clerk/nextjs/server').clerkMiddleware
  : () => (req: any) => req

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

