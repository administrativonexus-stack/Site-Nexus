import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/services/supabase/middleware";
import { PRIVATE_ROUTES } from "@/config/navigation";

function isPrivateRoute(pathname: string) {
  return PRIVATE_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export async function proxy(request: NextRequest) {
  if (!isPrivateRoute(request.nextUrl.pathname)) {
    // Public routes must keep working even if Supabase isn't configured yet.
    try {
      const { response } = await updateSession(request);
      return response;
    } catch {
      return NextResponse.next();
    }
  }

  try {
    const { response, user } = await updateSession(request);
    if (user) return response;
  } catch {
    // Supabase not configured — fall through to the login redirect below.
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|avif)$).*)"],
};
