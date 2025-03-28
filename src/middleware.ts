import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(req: Request) {
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
