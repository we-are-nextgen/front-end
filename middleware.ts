import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // Check for NextAuth session cookie
  const sessionToken =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  const isLoggedIn = !!sessionToken
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"

  console.log(`[middleware] ${pathname}: ${isLoggedIn ? "✅ logged in" : "❌ not logged in"}`);

  // Protect certain routes
  if (pathname.startsWith("/dashboard")) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // 🧠 IMPORTANT: Let /login and /register load normally.
  // Don't redirect here — it can cause a loop before cookies are set.
  if (!isLoggedIn && (pathname.startsWith("/login") || pathname.startsWith("/register"))) {
    return NextResponse.next()
  }

  // Optional: Redirect logged-in users from root ("/register") to dashboard
  if (isLoggedIn && (pathname.startsWith("/login") || pathname.startsWith("/register"))) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }


    

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*", // Protect dashboard routes
    "/login",
    "/register",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
