import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ACCESS_TOKEN_COOKIE } from '@/lib/auth/session';

export function proxy(request: NextRequest) {
  const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const { pathname } = request.nextUrl;

  const isAuthRoute =
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname.startsWith('/login/') ||
    pathname.startsWith('/signup/');
  const isProtected =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/sponsorships') ||
    pathname.startsWith('/wallet') ||
    pathname.startsWith('/platforms') ||
    pathname.startsWith('/sponsor');

  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/sponsorships/:path*',
    '/wallet/:path*',
    '/platforms/:path*',
    '/sponsor/:path*',
    '/login',
    '/login/:path*',
    '/signup',
    '/signup/:path*',
  ],
};
