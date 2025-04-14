import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = process.env.JWT_SECRET;

export async function middleware(req) {
  const protectedPaths = ["/dashboard", "/profile"];
  const loginPath = "/login";

  // Handle protected routes (/dashboard, /profile)
  const token = req.cookies.get("accesstoken")?.value;
  console.log(token);
  if (protectedPaths.includes(req.nextUrl.pathname)) {
    
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (!SECRET) {
      console.error("JWT_SECRET is not defined");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const secret = new TextEncoder().encode(SECRET);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (err) {
      console.error("Token verification failed:", err.message);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Redirect authenticated users away from /login
  if (req.nextUrl.pathname === loginPath) {
    const token = req.cookies.get("accessToken")?.value;

    if (token && SECRET) {
      try {
        const secret = new TextEncoder().encode(SECRET);
        await jwtVerify(token, secret);
        return NextResponse.redirect(new URL("/dashboard", req.url));
      } catch (err) {
        console.error("Token verification failed for login redirect:", err.message);
        return NextResponse.next();
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/profile", "/login"],
};