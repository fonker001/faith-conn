// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const url = request.nextUrl
  const pathname = url.pathname

  // Public routes (anyone can access)
  const publicRoutes = ["/", "/login", "/sign_up", "/verify_otp"]
  const isPublic = publicRoutes.includes(pathname)

  // If the route is public, just continue
  if (isPublic) {
    return NextResponse.next()
  }

  // All other routes are protected client-side only
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
