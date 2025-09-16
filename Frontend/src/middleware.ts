import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = process.env.NEXT_JWT_SECRET || "";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  let userRole = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(SECRET)
      );
      userRole = payload.role;
    } catch (err) {
      userRole = null;
    }
  }

  if (isAdminRoute && userRole !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}
