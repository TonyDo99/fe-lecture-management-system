import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, res: NextResponse) {
  const token = cookies().get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

// Apply middleware only to these routes
export const config = {
  matcher: ["/list/:path*"], // Protect dashboard pages
};
