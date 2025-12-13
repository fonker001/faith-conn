// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const publicRoutes = ["/", "/login", "/sign_up", "/verify_otp"];
  const isPublic = publicRoutes.includes(pathname);

  if (isPublic) {
    return NextResponse.next();
  }

  // Currently no server-side blocking — allowed
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
  runtime: "edge",
};
