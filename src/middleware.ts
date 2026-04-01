import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Protect /plataforma — redirect to login if not authenticated
  if (request.nextUrl.pathname.startsWith("/plataforma") && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect /login to /plataforma if already authenticated
  if (request.nextUrl.pathname === "/login" && user) {
    return NextResponse.redirect(new URL("/plataforma", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/plataforma/:path*", "/login"],
};
