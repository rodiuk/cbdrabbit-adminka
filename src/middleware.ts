import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

const authMiddleware = withAuth(
  function onSuccess(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: (res) => {
        return (
          res?.token != null &&
          ["ADMIN", "MANAGER"]?.includes(res?.token?.role as any)
        );
      },
    },
    pages: {
      signIn: "/signIn",
    },
  }
);

export function middleware(request: NextRequest) {
  const publicRoutes = ["/signIn", "/signUp"];
  const isPublicPage = publicRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isPublicPage) {
    return NextResponse.next();
  } else {
    const response = (authMiddleware as any)(request);

    const token = (request as any).nextauth?.token;

    if (!token) {
      return response;
    }

    if (
      token.role !== "ADMIN" &&
      ["/users", "/promocodes"].some((x) => x === request.nextUrl.pathname)
    ) {
      const url = new URL("/orders");
      return NextResponse.redirect(url);
    }

    return response;
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|img|_next/image|favicon.ico|robots.txt|site.webmanifest|sitemap.xml).*)",
  ],
};
